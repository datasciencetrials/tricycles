import pandas as pd
import numpy as np
import xlsxwriter
import argparse

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate PCU Workbook")
    parser.add_argument("--output", required=True, help="Output XLSX path")
    parser.add_argument("--n-samples", type=int, default=10000, help="Number of samples")
    parser.add_argument("--mean-speed", type=float, default=35.0, help="Mean speed")
    parser.add_argument("--std-speed", type=float, default=10.0, help="Std dev of speed")
    parser.add_argument("--seed", type=int, default=42, help="Random seed")
    args = parser.parse_args()

    output_excel = args.output

    # 1. Generate rows of Stochastic Data
    np.random.seed(args.seed)
    n_samples = args.n_samples

    # Vehicle types
    v_types = ['Car', 'Tricycle', 'Motorcycle', 'Heavy Truck']
    p_dist = [0.65, 0.12, 0.20, 0.03]

    df_bulky = pd.DataFrame({
        'Timestamp': pd.date_range(start='2024-01-01 06:00', periods=n_samples, freq='15s'),
        'Vehicle_Class': np.random.choice(v_types, n_samples, p=p_dist),
        'Speed_kmh': np.random.normal(args.mean_speed, args.std_speed, size=n_samples),
        'Headway_s': np.random.gamma(shape=2.5, scale=1.2, size=n_samples)
    })

# Filter for tricycles and calculate dynamic PCU
df_bulky['Dynamic_PCU'] = 0.0
mask = df_bulky['Vehicle_Class'] == 'Tricycle'
df_bulky.loc[mask, 'Dynamic_PCU'] = df_bulky.loc[mask, 'Headway_s'] / 2.2

writer = pd.ExcelWriter(output_excel, engine='xlsxwriter')
workbook = writer.book
header_fmt = workbook.add_format({'bold': True, 'bg_color': '#D7E4BC', 'border': 1})

# --- Data Compendium ---
sheet_bulky = workbook.add_worksheet('Data_Compendium')
sheet_bulky.write('A1', 'Consolidated Stochastic Headway Data (N=10,000)', header_fmt)

# Write bulky data headers
for col_num, value in enumerate(df_bulky.columns.values):
    sheet_bulky.write(2, col_num, value, header_fmt)

# Write bulky data
for row_num, row_data in enumerate(df_bulky.values):
    for col_num, value in enumerate(row_data):
        if isinstance(value, pd.Timestamp):
            sheet_bulky.write(row_num + 3, col_num, str(value))
        else:
            sheet_bulky.write(row_num + 3, col_num, value)

# --- Theoretical Parameters ---
sheet_theory = workbook.add_worksheet('Theoretical_Framework')
sheet_theory.write('A1', 'Advanced Traffic Flow Parameters', header_fmt)
sheet_theory.write_row('A3', ['Parameter', 'Notation', 'Value', 'Unit', 'Source'], header_fmt)
sheet_theory.write_row('A4', ['Critical Density', 'k_c', 45, 'veh/km', 'Greenshields Model'])
sheet_theory.write_row('A5', ['Reaction Time', 'tau', 1.2, 's', 'Wiedemann 74'])
sheet_theory.write_row('A6', ['Weaving Displ.', 'delta', 0.85, 'm', 'Field Survey 2024'])
sheet_theory.write_row('A7', ['Tricycle ESAL', 'e_T', 0.005, '-', 'Axle Load Survey'])

writer.close()
print(f"Generated PCU workbook: {output_excel}")
