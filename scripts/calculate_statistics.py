import os
import pandas as pd
import numpy as np
import scipy.stats as stats
import warnings
warnings.filterwarnings('ignore')

def run_statistical_analysis():
    data_dir = "data/raw_traffic_counts"
    files = [f for f in os.listdir(data_dir) if f.endswith('.xlsx')]
    
    all_data = []
    print("Loading massive datasets...")
    for file in files:
        intersection = file.replace("_20Day_Counts.xlsx", "").replace("_", " ")
        excel_path = os.path.join(data_dir, file)
        xls = pd.ExcelFile(excel_path)
        for sheet_name in xls.sheet_names:
            df = pd.read_excel(xls, sheet_name=sheet_name)
            df['Intersection'] = intersection
            all_data.append(df)
            
    master_df = pd.concat(all_data, ignore_index=True)
    
    print("\n--- 1. DESCRIPTIVE STATISTICS (TRICYCLE VOLUMES) ---")
    desc_stats = master_df.groupby('Intersection')['Tricycles'].agg(['mean', 'std', 'var', 'min', 'max']).round(2)
    print(desc_stats)
    
    print("\n--- 2. INFERENTIAL STATISTICS (T-TEST: WET VS DRY) ---")
    wet_data = master_df[master_df['Weather Condition'] == 'Wet (Rain)']['Tricycles']
    dry_data = master_df[master_df['Weather Condition'] == 'Dry']['Tricycles']
    
    t_stat, p_val_t = stats.ttest_ind(wet_data, dry_data, equal_var=False)
    print(f"Independent T-Test Statistic: {t_stat:.4f}")
    print(f"P-Value: {p_val_t:.4e} (Significant: {p_val_t < 0.05})")
    print(f"Mean Dry: {dry_data.mean():.2f}, Mean Wet: {wet_data.mean():.2f}")
    
    print("\n--- 3. INFERENTIAL STATISTICS (ONE-WAY ANOVA) ---")
    # Groups for ANOVA
    groups = [group['Tricycles'].values for name, group in master_df.groupby('Intersection')]
    f_stat, p_val_f = stats.f_oneway(*groups)
    print(f"F-Statistic: {f_stat:.4f}")
    print(f"P-Value: {p_val_f:.4e} (Significant differences exist: {p_val_f < 0.05})")
    
    print("\n--- 4. PROBABILITY TEST (POISSON GOODNESS-OF-FIT) ---")
    # Take Wandegeya Tricycle counts to test if they fit a Poisson distribution
    wan_data = master_df[master_df['Intersection'] == 'Wandegeya Junction']['Tricycles']
    mean_lambda = wan_data.mean()
    
    # Create frequency bins
    observed_freq, bin_edges = np.histogram(wan_data, bins=10)
    # Calculate expected frequencies using Poisson PMF
    expected_freq = []
    for i in range(len(bin_edges)-1):
        if i == len(bin_edges) - 2:
            # Last bin gets remaining probability
            prob = 1 - stats.poisson.cdf(bin_edges[i], mean_lambda)
        else:
            prob = stats.poisson.cdf(bin_edges[i+1], mean_lambda) - stats.poisson.cdf(bin_edges[i], mean_lambda)
        expected_freq.append(prob * len(wan_data))
        
    expected_freq = np.array(expected_freq)
    
    # Normalize expected to match sum of observed exactly
    expected_freq = expected_freq * (sum(observed_freq) / sum(expected_freq))
    
    chi_stat, p_val_chi = stats.chisquare(f_obs=observed_freq, f_exp=expected_freq)
    print(f"Chi-Square Statistic: {chi_stat:.4f}")
    print(f"P-Value: {p_val_chi:.4e}")
    if p_val_chi < 0.05:
        print("Result: Reject Null Hypothesis. Arrival distribution significantly deviates from a pure Poisson model (likely due to clustering/platooning).")
    else:
        print("Result: Fail to reject Null Hypothesis. Arrivals fit a Poisson distribution.")

    # Write summary text file
    with open("data/statistical_summary.txt", "w") as f:
        f.write(f"ANOVA P-Value: {p_val_f:.4e}\n")
        f.write(f"T-Test P-Value: {p_val_t:.4e}\n")
        f.write(f"Chi-Square P-Value: {p_val_chi:.4e}\n")
        f.write(f"Wandegeya Mean: {desc_stats.loc['Wandegeya Junction', 'mean']}\n")
        f.write(f"Natete Mean: {desc_stats.loc['Natete Junction', 'mean']}\n")

if __name__ == "__main__":
    run_statistical_analysis()
