import pandas as pd
import json
import os
import argparse

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate Thesis Workbook")
    parser.add_argument("--json", required=True, help="Input traffic_dashboard_data.json path")
    parser.add_argument("--output", required=True, help="Output XLSX path")
    parser.add_argument("--base-adt", type=float, required=True, help="Base ADT (Kireka)")
    parser.add_argument("--growth-rate", type=float, required=True, help="Annual Growth Rate")
    args = parser.parse_args()

    json_path = args.json
    output_excel = args.output
    base_adt = args.base_adt
    growth_rate = args.growth_rate

    # 1. Load Data
    with open(json_path, 'r') as f:
        data = json.load(f)

    stations_2021 = data['observedYears'][0]['stations']
    df = pd.DataFrame(stations_2021)
    cols = ['Section_ID', 'Link_Name', 'Region', 'Surface_Type', 'ADT_including_motorbikes', 'ADT_excluding_motorbikes', 'Motorcycles & scooters', 'Truck trailers and semi-trailers']
    df = df[cols]

# 2. Performance Data (from the report)
perf_data = {
    'Station_Group': ['Central 1', 'Central 2', 'Northern', 'Western', 'Eastern', 'Overall'],
    'Uptime_Percentage': [99.2, 98.8, 97.5, 98.1, 99.0, 98.5],
    'Reliability_Score': [5, 5, 4, 4, 5, 4.6]
}
df_perf = pd.DataFrame(perf_data)

# 3. Create Excel writer
writer = pd.ExcelWriter(output_excel, engine='xlsxwriter')
workbook = writer.book

# Sheet 1: Raw Data
df.to_excel(writer, sheet_name='Traffic_Data_2021', index=False)

# Sheet 2: Growth Tool
calc_sheet = workbook.add_worksheet('Growth_Projection_Tool')
calc_sheet.write('A1', 'Uganda Traffic Growth Projection Tool')
header_format = workbook.add_format({'bold': True, 'bg_color': '#D7E4BC', 'border': 1})
calc_sheet.write('A3', 'Parameter', header_format)
calc_sheet.write('B3', 'Value', header_format)
calc_sheet.write('A4', 'Base Year'); calc_sheet.write('B4', 2021)
calc_sheet.write('A5', 'Base ADT (Kireka)'); calc_sheet.write('B5', base_adt)
calc_sheet.write('A6', 'Annual Growth Rate (%)'); calc_sheet.write('B6', growth_rate)
calc_sheet.write('A8', 'Target Year', header_format); calc_sheet.write('B8', 'Projected ADT', header_format)
for i, year in enumerate(range(2022, 2036)):
    row = 8 + i
    calc_sheet.write(row, 0, year)
    formula = f'=B$5 * (1 + B$6)^(A{row+1} - B$4)'
    calc_sheet.write_formula(row, 1, formula)

# Sheet 3: ATC Performance
df_perf.to_excel(writer, sheet_name='ATC_Performance', index=False)

# Sheet 4: Regional Summary
regional_summary = df.groupby('Region')['ADT_including_motorbikes'].agg(['sum', 'mean', 'count']).reset_index()
regional_summary.to_excel(writer, sheet_name='Regional_Summary', index=False)

writer.close()
print(f"Updated Workbook at: {output_excel}")
