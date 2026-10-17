"""Build the governed, reproducible tricycle PCU analysis workbook."""

from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np
import pandas as pd
import xlsxwriter


def build_workbook(output: Path, n_samples: int, mean_speed: float, std_speed: float, seed: int) -> None:
    rng = np.random.default_rng(seed)
    vehicle_classes = ["Car", "Tricycle", "Motorcycle", "Heavy Truck"]
    data = pd.DataFrame({
        "Timestamp": pd.date_range("2024-01-01 06:00", periods=n_samples, freq="15s"),
        "Vehicle Class": rng.choice(vehicle_classes, n_samples, p=[0.65, 0.12, 0.20, 0.03]),
        "Speed (km/h)": rng.normal(mean_speed, std_speed, n_samples).clip(min=0),
        "Headway (s)": rng.gamma(shape=2.5, scale=1.2, size=n_samples),
    })
    output.parent.mkdir(parents=True, exist_ok=True)
    workbook = xlsxwriter.Workbook(output)
    workbook.set_calc_mode("auto")
    title = workbook.add_format({"bold": True, "font_size": 16, "font_color": "#FFFFFF", "bg_color": "#1F4E78", "valign": "vcenter"})
    subtitle = workbook.add_format({"italic": True, "font_color": "#44546A", "text_wrap": True})
    header = workbook.add_format({"bold": True, "font_color": "#FFFFFF", "bg_color": "#2F75B5", "border": 1, "align": "centre", "valign": "vcenter", "text_wrap": True})
    note = workbook.add_format({"font_color": "#7F6000", "bg_color": "#FFF2CC", "border": 1, "text_wrap": True})
    integer = workbook.add_format({"num_format": "0", "border": 1})
    decimal = workbook.add_format({"num_format": "0.00", "border": 1})
    timestamp = workbook.add_format({"num_format": "yyyy-mm-dd hh:mm:ss", "border": 1})
    text = workbook.add_format({"border": 1})
    formula_error = workbook.add_format({"bg_color": "#F4CCCC", "font_color": "#9C0006"})
    modelled = workbook.add_format({"bg_color": "#D9EAD3", "font_color": "#274E13"})

    ws = workbook.add_worksheet("Data_Compendium")
    ws.merge_range("A1:G1", "Tricycle PCU Stochastic Analysis", title)
    ws.merge_range("A2:G2", "All records on this sheet are simulated, not field observations. Dynamic PCU is modelled as tricycle headway divided by the 2.2 second passenger-car reference headway.", note)
    headers = ["Timestamp", "Vehicle Class", "Speed (km/h)", "Headway (s)", "Dynamic PCU", "Evidence Status", "Method"]
    ws.write_row(2, 0, headers, header)
    for index, row in data.iterrows():
        excel_row = index + 4
        ws.write_datetime(index + 3, 0, row["Timestamp"].to_pydatetime(), timestamp)
        ws.write(index + 3, 1, row["Vehicle Class"], text)
        ws.write_number(index + 3, 2, float(row["Speed (km/h)"]), decimal)
        ws.write_number(index + 3, 3, float(row["Headway (s)"]), decimal)
        ws.write_formula(index + 3, 4, f'=IF(B{excel_row}="Tricycle",D{excel_row}/2.2,0)', decimal, 0)
        ws.write(index + 3, 5, "Modelled", text)
        ws.write(index + 3, 6, "Seeded stochastic sample; PCU = headway / 2.2 s for tricycles", text)
    last_row = n_samples + 2
    ws.add_table(2, 0, last_row, 6, {"name": "tblPCUSimulation", "style": "Table Style Medium 2", "columns": [{"header": value} for value in headers]})
    ws.freeze_panes(3, 2)
    ws.set_column("A:A", 20); ws.set_column("B:B", 16); ws.set_column("C:E", 14); ws.set_column("F:F", 16); ws.set_column("G:G", 62)
    ws.conditional_format(3, 2, last_row, 2, {"type": "3_color_scale", "min_color": "#63BE7B", "mid_color": "#FFEB84", "max_color": "#F8696B"})
    ws.conditional_format(3, 3, last_row, 3, {"type": "data_bar", "bar_color": "#5B9BD5"})
    ws.conditional_format(3, 4, last_row, 4, {"type": "3_color_scale", "min_color": "#FFFFFF", "mid_color": "#FFEB84", "max_color": "#F8696B"})
    ws.conditional_format(3, 4, last_row, 4, {"type": "formula", "criteria": "=ISERROR(E4)", "format": formula_error})
    ws.conditional_format(3, 5, last_row, 5, {"type": "text", "criteria": "containing", "value": "Modelled", "format": modelled})

    assumptions = workbook.add_worksheet("Assumptions_Method")
    assumptions.merge_range("A1:D1", "Model Assumptions and Governance", title)
    headings = ["Parameter", "Value", "Unit", "Evidence and method"]
    assumptions.write_row("A3", headings, header)
    rows = [
        ("Sample size", n_samples, "records", "User-controlled simulation input"),
        ("Mean speed", mean_speed, "km/h", "Model assumption, not a measured statistic"),
        ("Speed standard deviation", std_speed, "km/h", "Model assumption, not a measured statistic"),
        ("Random seed", seed, "integer", "Fixed for reproducibility"),
        ("Passenger-car reference headway", 2.2, "seconds", "Model assumption used in the Dynamic PCU formula"),
        ("Evidence status", "Modelled", "category", "Every generated record is explicitly labelled Modelled"),
    ]
    for r, values in enumerate(rows, start=3): assumptions.write_row(r, 0, values, text)
    assumptions.add_table(2, 0, 2 + len(rows), 3, {"name": "tblPCUAssumptions", "style": "Table Style Medium 2", "columns": [{"header": x} for x in headings]})
    assumptions.set_column("A:A", 34); assumptions.set_column("B:C", 18); assumptions.set_column("D:D", 60); assumptions.freeze_panes(3, 0)

    summary = workbook.add_worksheet("Vehicle_Class_Summary")
    summary.merge_range("A1:F1", "Complete Modelled Population by Vehicle Class", title)
    summary.merge_range("A2:F2", "Summary of all simulated records. No Top-N selection is applied.", subtitle)
    summary_headers = ["Vehicle Class", "Record Count", "Mean Speed (km/h)", "Mean Headway (s)", "Mean Dynamic PCU", "Evidence Status"]
    summary.write_row("A4", summary_headers, header)
    grouped = data.groupby("Vehicle Class").agg(Record_Count=("Vehicle Class", "size"), Mean_Speed=("Speed (km/h)", "mean"), Mean_Headway=("Headway (s)", "mean")).reindex(vehicle_classes)
    for r, vehicle_class in enumerate(vehicle_classes, start=4):
        values = grouped.loc[vehicle_class]; row_number = r + 1
        summary.write(r, 0, vehicle_class, text); summary.write_number(r, 1, int(values["Record_Count"]), integer)
        summary.write_number(r, 2, float(values["Mean_Speed"]), decimal); summary.write_number(r, 3, float(values["Mean_Headway"]), decimal)
        summary.write_formula(r, 4, f'=IF(A{row_number}="Tricycle",D{row_number}/2.2,0)', decimal, 0); summary.write(r, 5, "Modelled", text)
    summary.add_table(3, 0, 7, 5, {"name": "tblVehicleClassSummary", "style": "Table Style Medium 2", "columns": [{"header": x} for x in summary_headers]})
    summary.set_column("A:A", 18); summary.set_column("B:E", 20); summary.set_column("F:F", 18); summary.freeze_panes(4, 1)
    summary.conditional_format(4, 1, 7, 1, {"type": "data_bar", "bar_color": "#5B9BD5"})
    summary.conditional_format(4, 2, 7, 4, {"type": "3_color_scale", "min_color": "#63BE7B", "mid_color": "#FFEB84", "max_color": "#F8696B"})
    summary.conditional_format(4, 4, 7, 4, {"type": "formula", "criteria": "=ISERROR(E5)", "format": formula_error})
    summary.conditional_format(4, 5, 7, 5, {"type": "text", "criteria": "containing", "value": "Modelled", "format": modelled})
    chart = workbook.add_chart({"type": "column"})
    chart.add_series({"name": "Record Count", "categories": "='Vehicle_Class_Summary'!$A$5:$A$8", "values": "='Vehicle_Class_Summary'!$B$5:$B$8", "fill": {"color": "#5B9BD5"}})
    chart.set_title({"name": "Figure 1: Simulated Records by Vehicle Class"}); chart.set_y_axis({"name": "Records", "major_gridlines": {"visible": False}}); chart.set_legend({"none": True})
    summary.insert_chart("H4", chart, {"x_scale": 1.3, "y_scale": 1.2})

    theory = workbook.add_worksheet("Theoretical_Framework")
    theory.merge_range("A1:E1", "Advanced Traffic Flow Parameters", title)
    theory_headers = ["Parameter", "Notation", "Value", "Unit", "Evidence Status and Source"]
    theory.write_row("A3", theory_headers, header)
    theory_rows = [
        ("Critical Density", "k_c", 45, "vehicles/km", "Model assumption, Greenshields model"),
        ("Reaction Time", "tau", 1.2, "seconds", "Model assumption, Wiedemann 74"),
        ("Weaving Displacement", "delta", 0.85, "metres", "Model assumption, requires field validation"),
        ("Tricycle ESAL", "e_T", 0.005, "ratio", "Model assumption, requires axle-load validation"),
    ]
    for r, values in enumerate(theory_rows, start=3): theory.write_row(r, 0, values, text)
    theory.add_table(2, 0, 6, 4, {"name": "tblTheory", "style": "Table Style Medium 2", "columns": [{"header": x} for x in theory_headers]})
    theory.set_column("A:A", 28); theory.set_column("B:D", 16); theory.set_column("E:E", 54); theory.freeze_panes(3, 0)
    theory.conditional_format(3, 2, 6, 2, {"type": "data_bar", "bar_color": "#70AD47"})
    workbook.close()


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate the governed tricycle PCU workbook")
    parser.add_argument("--output", required=True); parser.add_argument("--n-samples", type=int, default=10000)
    parser.add_argument("--mean-speed", type=float, default=35.0); parser.add_argument("--std-speed", type=float, default=10.0); parser.add_argument("--seed", type=int, default=42)
    args = parser.parse_args(); build_workbook(Path(args.output), args.n_samples, args.mean_speed, args.std_speed, args.seed)
    print(f"Generated PCU workbook: {args.output}")


if __name__ == "__main__": main()
