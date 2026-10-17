"""Build the governed traffic workbook used by the tricycle thesis site."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

import pandas as pd
import xlsxwriter


def normalise_surface(value: object) -> str:
    text = str(value or "").strip().lower()
    if any(token in text for token in ("bituminous", "asphalt", "concrete", "paved", "sealed")):
        return "Paved"
    return "Unpaved"


def financial_year(month: str) -> str:
    year, month_number = (int(part) for part in month.split("-")[:2])
    return f"{year}/{str(year + 1)[-2:]}" if month_number >= 7 else f"{year - 1}/{str(year)[-2:]}"


def build_workbook(json_path: Path, output: Path, base_adt: float, growth_rate: float) -> None:
    data = json.loads(json_path.read_text(encoding="utf-8"))
    observed_years = data["observedYears"]
    first = observed_years[0]
    stations = pd.DataFrame(first["stations"]).copy()
    stations["Surface_Type"] = stations["Surface_Type"].map(normalise_surface)
    stations["Source_Year"] = first["summary"]["year"]
    stations["Financial_Year"] = "Unavailable in annual station source"
    stations["Evidence_Status"] = "Observed station AADT"
    station_columns = [
        "Section_ID", "Link_ID", "Link_Name", "Station", "Region", "Surface_Type", "Latitude", "Longitude", "Observed_Days",
        "ADT_including_motorbikes", "ADT_excluding_motorbikes", "NMT", "Motorcycles & scooters", "Saloon cars and taxis",
        "Light goods, vans, pickups and 4WD", "Small buses, minibuses and matatus", "Medium buses / coasters", "Large buses",
        "Light single-unit trucks", "Medium / large single-unit trucks", "Truck trailers and semi-trailers", "Share_of_observed_aadt",
        "Source_Year", "Financial_Year", "Evidence_Status",
    ]
    stations = stations[station_columns]

    annual = pd.DataFrame([item["summary"] for item in observed_years])
    annual["Evidence_Status"] = "Observed"
    monthly_frames = []
    for item in observed_years:
        frame = pd.DataFrame(item["monthlyTrend"])
        if frame.empty:
            continue
        frame.insert(0, "Source_Year", item["summary"]["year"])
        frame.insert(2, "Financial_Year", frame["Month"].map(financial_year))
        frame["Evidence_Status"] = "Measured survey aggregation"
        monthly_frames.append(frame)
    monthly = pd.concat(monthly_frames, ignore_index=True)
    vehicle_class = pd.DataFrame(first["classSummary"])
    vehicle_class["Source_Year"] = first["summary"]["year"]
    vehicle_class["Evidence_Status"] = "Observed station AADT aggregation"
    region = pd.DataFrame(first["regionSummary"])
    region["Source_Year"] = first["summary"]["year"]
    region["Evidence_Status"] = "Observed station AADT aggregation"
    surface = stations.groupby("Surface_Type", as_index=False).agg(
        Stations=("Section_ID", "size"),
        Mean_ADT=("ADT_including_motorbikes", "mean"),
        Median_ADT=("ADT_including_motorbikes", "median"),
        Peak_ADT=("ADT_including_motorbikes", "max"),
    )
    surface["Source_Year"] = first["summary"]["year"]
    surface["Evidence_Status"] = "Observed station AADT aggregation"
    performance = pd.DataFrame({
        "Station_Group": ["Central 1", "Central 2", "Northern", "Western", "Eastern", "Overall"],
        "Uptime_Percentage": [99.2, 98.8, 97.5, 98.1, 99.0, 98.5],
        "Reliability_Score": [5, 5, 4, 4, 5, 4.6],
        "Evidence_Status": ["Reported, source workbook not embedded"] * 6,
    })
    dimension_coverage = pd.DataFrame([
        ("Surface Type", "Available", "Normalised to Paved or Unpaved; complete population shown"),
        ("Functional Class", "Unavailable", "Field is absent from the governed station dataset and is not fabricated"),
        ("Road Type", "Unavailable", "Field is absent from the governed station dataset and is not fabricated"),
        ("Sub-Region", "Unavailable", "Field is absent from the governed station dataset and is not fabricated"),
        ("Financial Year", "Available for monthly trends", "Derived from each source month using July to June; unavailable for annual station rows without observation dates"),
        ("Region", "Available", "Complete population shown"),
        ("Station", "Available", "Complete population shown in the station table"),
        ("Annual trends", "Available", "All observed years supplied by the governed JSON are shown"),
        ("Monthly trends", "Available", "Every supplied monthly record is shown"),
    ], columns=["Required Dimension", "Coverage Status", "Governance Note"])

    output.parent.mkdir(parents=True, exist_ok=True)
    workbook = xlsxwriter.Workbook(output)
    workbook.set_calc_mode("auto")
    title = workbook.add_format({"bold": True, "font_size": 16, "font_color": "#FFFFFF", "bg_color": "#1F4E78", "valign": "vcenter"})
    header = workbook.add_format({"bold": True, "font_color": "#FFFFFF", "bg_color": "#2F75B5", "border": 1, "align": "centre", "valign": "vcenter", "text_wrap": True})
    note = workbook.add_format({"font_color": "#7F6000", "bg_color": "#FFF2CC", "border": 1, "text_wrap": True})
    formula_error = workbook.add_format({"bg_color": "#F4CCCC", "font_color": "#9C0006"})
    observed_fmt = workbook.add_format({"bg_color": "#D9EAD3", "font_color": "#274E13"})
    unavailable_fmt = workbook.add_format({"bg_color": "#FCE5CD", "font_color": "#783F04"})
    paved_fmt = workbook.add_format({"bg_color": "#D9EAD3", "font_color": "#274E13"})
    unpaved_fmt = workbook.add_format({"bg_color": "#FCE5CD", "font_color": "#783F04"})
    method_note = workbook.add_format({"text_wrap": True, "valign": "top"})
    projected_number = workbook.add_format({"num_format": "#,##0.00"})

    def add_dataframe(name: str, display_title: str, frame: pd.DataFrame, table_name: str, note_text: str, widths: dict[str, float] | None = None):
        ws = workbook.add_worksheet(name)
        last_col = max(len(frame.columns) - 1, 0)
        ws.merge_range(0, 0, 0, last_col, display_title, title)
        ws.merge_range(1, 0, 1, last_col, note_text, note)
        ws.write_row(2, 0, frame.columns.tolist(), header)
        for row_index, values in enumerate(frame.itertuples(index=False, name=None), start=3):
            ws.write_row(row_index, 0, values)
        if len(frame):
            ws.add_table(2, 0, len(frame) + 2, last_col, {"name": table_name, "style": "Table Style Medium 2", "columns": [{"header": str(column)} for column in frame.columns]})
        ws.freeze_panes(3, min(3, len(frame.columns)))
        ws.set_row(0, 24); ws.set_row(1, 34)
        for index, column in enumerate(frame.columns):
            width = (widths or {}).get(column, min(max(len(str(column)) + 2, 12), 28))
            ws.set_column(index, index, width)
        return ws

    station_ws = add_dataframe("Traffic_Data_2021", "Complete 2021 Observed Station Population", stations, "tblTraffic2021", "Observed station AADT. Surface Type is normalised to Paved or Unpaved. Annual station records do not contain observation dates, so Financial Year is explicitly unavailable rather than inferred.", {"Link_Name": 40, "Financial_Year": 34, "Evidence_Status": 26})
    for column in range(9, 22): station_ws.conditional_format(3, column, len(stations) + 2, column, {"type": "data_bar", "bar_color": "#5B9BD5"})
    surface_col = stations.columns.get_loc("Surface_Type")
    status_col = stations.columns.get_loc("Evidence_Status")
    station_ws.conditional_format(3, surface_col, len(stations) + 2, surface_col, {"type": "text", "criteria": "containing", "value": "Paved", "format": paved_fmt})
    station_ws.conditional_format(3, surface_col, len(stations) + 2, surface_col, {"type": "text", "criteria": "containing", "value": "Unpaved", "format": unpaved_fmt})
    station_ws.conditional_format(3, status_col, len(stations) + 2, status_col, {"type": "text", "criteria": "containing", "value": "Observed", "format": observed_fmt})

    annual_ws = add_dataframe("Annual_Trends", "Complete Annual Observed Trends", annual, "tblAnnualTrends", "All observed years supplied by the governed traffic JSON. No Top-N or selected subset is applied.")
    for column in range(4, min(11, len(annual.columns))): annual_ws.conditional_format(3, column, len(annual) + 2, column, {"type": "data_bar", "bar_color": "#5B9BD5"})
    chart = workbook.add_chart({"type": "line"})
    year_col = annual.columns.get_loc("year"); avg_col = annual.columns.get_loc("averageStationADT")
    chart.add_series({"name": "Average Station ADT", "categories": ["Annual_Trends", 3, year_col, len(annual) + 2, year_col], "values": ["Annual_Trends", 3, avg_col, len(annual) + 2, avg_col], "line": {"color": "#2F75B5", "width": 2.25}})
    chart.set_title({"name": "Figure 1: Annual Average Station ADT"}); chart.set_y_axis({"name": "Vehicles per day"}); chart.set_x_axis({"name": "Source year"})
    annual_ws.insert_chart("P4", chart, {"x_scale": 1.35, "y_scale": 1.2})

    monthly_ws = add_dataframe("Monthly_Trends", "Complete Monthly Measured Trends", monthly, "tblMonthlyTrends", "Every governed monthly record is included. Financial Year is derived from the source month using Uganda's July to June reporting year.", {"Financial_Year": 15, "Evidence_Status": 28})
    for column in range(3, len(monthly.columns) - 1): monthly_ws.conditional_format(3, column, len(monthly) + 2, column, {"type": "data_bar", "bar_color": "#70AD47"})
    status_col = monthly.columns.get_loc("Evidence_Status")
    monthly_ws.conditional_format(3, status_col, len(monthly) + 2, status_col, {"type": "text", "criteria": "containing", "value": "Measured", "format": observed_fmt})

    class_ws = add_dataframe("Vehicle_Class_2021", "Complete 2021 Vehicle Class Breakdown", vehicle_class, "tblVehicleClass2021", "All governed vehicle classes are shown for the full 2021 observed station population.", {"Class": 42, "Evidence_Status": 32})
    class_ws.conditional_format(3, 1, len(vehicle_class) + 2, 2, {"type": "data_bar", "bar_color": "#5B9BD5"})
    region_ws = add_dataframe("Region_Summary_2021", "Complete 2021 Region Breakdown", region, "tblRegion2021", "All governed regions are shown for the full 2021 observed station population.", {"Evidence_Status": 32})
    region_ws.conditional_format(3, 1, len(region) + 2, min(3, len(region.columns) - 1), {"type": "data_bar", "bar_color": "#5B9BD5"})
    surface_ws = add_dataframe("Surface_Summary_2021", "Complete 2021 Surface Type Breakdown", surface, "tblSurface2021", "Surface Type uses only Paved and Unpaved, with the full governed station population included.", {"Evidence_Status": 32})
    surface_ws.conditional_format(3, 0, len(surface) + 2, 0, {"type": "text", "criteria": "containing", "value": "Paved", "format": paved_fmt})
    surface_ws.conditional_format(3, 0, len(surface) + 2, 0, {"type": "text", "criteria": "containing", "value": "Unpaved", "format": unpaved_fmt})
    surface_ws.conditional_format(3, 1, len(surface) + 2, 4, {"type": "data_bar", "bar_color": "#70AD47"})
    performance_ws = add_dataframe("ATC_Performance", "Reported ATC Performance", performance, "tblATCPerformance", "These values are retained but explicitly labelled because their source workbook is not embedded in the governed dataset.", {"Evidence_Status": 38})
    performance_ws.conditional_format(3, 1, len(performance) + 2, 2, {"type": "3_color_scale", "min_color": "#F8696B", "mid_color": "#FFEB84", "max_color": "#63BE7B"})
    coverage_ws = add_dataframe("Dimension_Coverage", "Required Dimension Coverage", dimension_coverage, "tblDimensionCoverage", "Unavailable dimensions are disclosed and are not fabricated. Available dimensions use the complete governed population.", {"Required Dimension": 24, "Coverage Status": 28, "Governance Note": 90})
    coverage_ws.conditional_format(3, 1, len(dimension_coverage) + 2, 1, {"type": "text", "criteria": "containing", "value": "Available", "format": observed_fmt})
    coverage_ws.conditional_format(3, 1, len(dimension_coverage) + 2, 1, {"type": "text", "criteria": "containing", "value": "Unavailable", "format": unavailable_fmt})

    growth = workbook.add_worksheet("Growth_Projection_Tool")
    growth.merge_range("A1:D1", "Traffic Growth Projection Tool", title)
    growth.merge_range("A2:D2", "Projected values are modelled from the user-controlled base ADT and annual growth rate. They are not observed traffic counts.", note)
    growth.write_row("A4", ["Parameter", "Value", "Unit", "Evidence Status and Method"], header)
    growth.write_row("A5", ["Base year", 2021, "year", "Model input"]); growth.write_row("A6", ["Base ADT", base_adt, "vehicles/day", "Model input based on Kireka station AADT"]); growth.write_row("A7", ["Annual growth rate", growth_rate, "ratio", "Model input, compound annual growth"])
    growth.write_row("A9", ["Target Year", "Projected ADT", "Evidence Status", "Method"], header)
    for offset, year in enumerate(range(2022, 2036), start=9):
        row_number = offset + 1
        growth.write(offset, 0, year); growth.write_formula(offset, 1, f"=B$6*(1+B$7)^(A{row_number}-B$5)", projected_number, base_adt * (1 + growth_rate) ** (year - 2021)); growth.write(offset, 2, "Projected"); growth.write(offset, 3, "Compound annual growth from stated inputs")
    growth.add_table(8, 0, 22, 3, {"name": "tblGrowthProjection", "style": "Table Style Medium 2", "columns": [{"header": x} for x in ["Target Year", "Projected ADT", "Evidence Status", "Method"]]})
    growth.set_column("A:A", 18); growth.set_column("B:B", 18); growth.set_column("C:C", 18); growth.set_column("D:D", 48); growth.freeze_panes(9, 1)
    growth.conditional_format(9, 1, 22, 1, {"type": "data_bar", "bar_color": "#5B9BD5"}); growth.conditional_format(9, 1, 22, 1, {"type": "formula", "criteria": "=ISERROR(B10)", "format": formula_error}); growth.conditional_format(9, 2, 22, 2, {"type": "text", "criteria": "containing", "value": "Projected", "format": unavailable_fmt})
    chart = workbook.add_chart({"type": "line"}); chart.add_series({"name": "Projected ADT", "categories": "='Growth_Projection_Tool'!$A$10:$A$23", "values": "='Growth_Projection_Tool'!$B$10:$B$23", "line": {"color": "#ED7D31", "width": 2.25}})
    chart.set_title({"name": "Figure 2: Modelled ADT Projection"}); chart.set_y_axis({"name": "Projected vehicles per day"}); chart.set_x_axis({"name": "Year"}); chart.set_legend({"none": True}); chart.set_plotarea({"layout": {"x": 0.18, "y": 0.18, "width": 0.72, "height": 0.62}}); growth.insert_chart("F4", chart, {"x_scale": 1.35, "y_scale": 1.2})

    sources = pd.DataFrame({"Governed Source": data.get("sources", []), "Use": ["Observed station and trend evidence"] * len(data.get("sources", []))})
    sources_ws = add_dataframe("Sources_Method", "Governed Sources and Method", sources, "tblGovernedSources", "The workbook is rebuilt from the named repository sources through traffic_dashboard_data.json. Modelled and projected outputs are explicitly labelled.", {"Governed Source": 48, "Use": 48})
    sources_ws.write(len(sources) + 5, 0, "Method notes", header)
    for index, message in enumerate(data.get("notes", []), start=len(sources) + 6):
        sources_ws.merge_range(index, 0, index, 1, message, method_note)
        sources_ws.set_row(index, 30)
    workbook.close()


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate the governed traffic thesis workbook")
    parser.add_argument("--json", required=True); parser.add_argument("--output", required=True); parser.add_argument("--base-adt", type=float, required=True); parser.add_argument("--growth-rate", type=float, required=True)
    args = parser.parse_args(); build_workbook(Path(args.json), Path(args.output), args.base_adt, args.growth_rate); print(f"Updated workbook: {args.output}")


if __name__ == "__main__": main()
