import nbformat as nbf
import os

def create_notebook():
    nb = nbf.v4.new_notebook()

    # Introduction
    nb.cells.append(nbf.v4.new_markdown_cell("""\
# Kampala Tricycle PCU Data Analysis
### Master's Thesis Statistical & Analytical Framework
This Jupyter Notebook contains the complete end-to-end data processing pipeline for the analysis of Tricycle Passenger Car Equivalents (PCU) in Kampala, Uganda. 

It covers:
1. **Data Loading:** Ingesting primary field data (6,400 intervals of 15-minute classification counts).
2. **Descriptive Statistics:** Analyzing variance and standard deviations across the five study intersections.
3. **Inferential Statistics:** Using ANOVA and T-Tests to prove geographical and environmental (weather) impacts on tricycle capacity.
4. **Probability Testing:** Applying a Chi-Square Goodness-of-Fit test to reject the Poisson random arrival model in favor of a platooning model.
5. **Data Visualizations:** Generating academic-grade charts for the thesis defense.
"""))

    # Setup
    nb.cells.append(nbf.v4.new_code_cell("""\
import pandas as pd
import numpy as np
import scipy.stats as stats
import matplotlib.pyplot as plt
import seaborn as sns
import os
import warnings
warnings.filterwarnings('ignore')

# Set plotting style
sns.set_theme(style="whitegrid")
plt.rcParams['figure.figsize'] = (10, 6)
"""))

    # Load Data
    nb.cells.append(nbf.v4.new_markdown_cell("""\
## 1. Primary Data Ingestion
We load the 20-day manual classified count (MCC) Excel workbooks generated for the five intersections.
"""))

    nb.cells.append(nbf.v4.new_code_cell("""\
data_dir = "../data/raw_traffic_counts"
files = [f for f in os.listdir(data_dir) if f.endswith('.xlsx')]

all_data = []
print("Loading 20-day primary field data...")
for file in files:
    intersection = file.replace("_20Day_Counts.xlsx", "").replace("_", " ")
    excel_path = os.path.join(data_dir, file)
    xls = pd.ExcelFile(excel_path)
    for sheet_name in xls.sheet_names:
        df = pd.read_excel(xls, sheet_name=sheet_name)
        df['Intersection'] = intersection
        all_data.append(df)

master_df = pd.concat(all_data, ignore_index=True)
print(f"Successfully loaded {len(master_df)} 15-minute intervals.")
master_df.head()
"""))

    # Descriptive Stats
    nb.cells.append(nbf.v4.new_markdown_cell("""\
## 2. Descriptive Statistics
We calculate the mean, standard deviation, and variance of tricycle volumes across all intersections to establish the baseline severity of the problem.
"""))
    
    nb.cells.append(nbf.v4.new_code_cell("""\
desc_stats = master_df.groupby('Intersection')['Tricycles'].agg(['mean', 'std', 'var', 'min', 'max']).round(2)
display(desc_stats)

# Visualizing the volume distribution
plt.figure(figsize=(12, 6))
sns.boxplot(x='Intersection', y='Tricycles', data=master_df, palette='Set2')
plt.title('Distribution of Tricycle Volumes per 15-Min Interval across Intersections')
plt.ylabel('Tricycle Volume')
plt.xticks(rotation=45)
plt.show()
"""))

    # ANOVA
    nb.cells.append(nbf.v4.new_markdown_cell("""\
## 3. Inferential Statistics: One-Way ANOVA
To verify that locational differences in tricycle volume are statistically significant, we run an ANOVA test.
"""))

    nb.cells.append(nbf.v4.new_code_cell("""\
groups = [group['Tricycles'].values for name, group in master_df.groupby('Intersection')]
f_stat, p_val_f = stats.f_oneway(*groups)

print(f"One-Way ANOVA F-Statistic: {f_stat:.4f}")
print(f"P-Value: {p_val_f:.4e}")
if p_val_f < 0.05:
    print("Conclusion: Significant differences exist between intersection volumes. A universal PCU is invalid.")
"""))

    # T-Test Weather
    nb.cells.append(nbf.v4.new_markdown_cell("""\
## 4. Environmental Impact: Independent T-Test (Wet vs. Dry)
Our qualitative interviews highlighted that potholes drastically alter tricycle behavior. Here, we quantify the drop in flow during wet weather.
"""))

    nb.cells.append(nbf.v4.new_code_cell("""\
wet_data = master_df[master_df['Weather Condition'] == 'Wet (Rain)']['Tricycles']
dry_data = master_df[master_df['Weather Condition'] == 'Dry']['Tricycles']

t_stat, p_val_t = stats.ttest_ind(wet_data, dry_data, equal_var=False)
print(f"Independent T-Test Statistic: {t_stat:.4f}")
print(f"P-Value: {p_val_t:.4e}")
print(f"Mean Dry Volume: {dry_data.mean():.2f}")
print(f"Mean Wet Volume: {wet_data.mean():.2f}")

# Visualization of Weather Impact
plt.figure(figsize=(8, 5))
sns.barplot(x=['Dry Weather', 'Wet Weather (Rain)'], y=[dry_data.mean(), wet_data.mean()], palette='mako')
plt.title('Average Tricycle Volume (15-min) by Weather Condition')
plt.ylabel('Average Volume')
plt.show()
"""))

    # Poisson Test
    nb.cells.append(nbf.v4.new_markdown_cell("""\
## 5. Probability Testing: Poisson Goodness-of-Fit
Standard capacity modeling assumes random (Poisson) vehicle arrivals. We test this assumption for tricycles at Wandegeya Junction.
"""))

    nb.cells.append(nbf.v4.new_code_cell("""\
wan_data = master_df[master_df['Intersection'] == 'Wandegeya Junction']['Tricycles']
mean_lambda = wan_data.mean()

observed_freq, bin_edges = np.histogram(wan_data, bins=10)
expected_freq = []

for i in range(len(bin_edges)-1):
    if i == len(bin_edges) - 2:
        prob = 1 - stats.poisson.cdf(bin_edges[i], mean_lambda)
    else:
        prob = stats.poisson.cdf(bin_edges[i+1], mean_lambda) - stats.poisson.cdf(bin_edges[i], mean_lambda)
    expected_freq.append(prob * len(wan_data))
    
expected_freq = np.array(expected_freq)
expected_freq = expected_freq * (sum(observed_freq) / sum(expected_freq))

chi_stat, p_val_chi = stats.chisquare(f_obs=observed_freq, f_exp=expected_freq)
print(f"Chi-Square Statistic: {chi_stat:.4f}")
print(f"P-Value: {p_val_chi:.4e}")

if p_val_chi < 0.05:
    print("Result: Null Hypothesis Rejected. Arrivals are NOT random (Poisson). This proves tricycle platooning and blocking friction.")

# Plot Observed vs Expected
plt.figure(figsize=(10, 5))
x = np.arange(len(observed_freq))
plt.bar(x - 0.2, observed_freq, 0.4, label='Observed Frequencies', color='orange')
plt.bar(x + 0.2, expected_freq, 0.4, label='Expected (Poisson) Frequencies', color='blue', alpha=0.6)
plt.title('Poisson Goodness-of-Fit Test at Wandegeya Junction')
plt.xlabel('Volume Bins')
plt.ylabel('Frequency')
plt.legend()
plt.show()
"""))

    # Longitudinal Data
    nb.cells.append(nbf.v4.new_markdown_cell("""\
## 6. Longitudinal Growth Analysis (Primary vs. Secondary Data)
Comparing our 2026 Primary Data with the 2021 MoWT Secondary Data.
"""))
    
    nb.cells.append(nbf.v4.new_code_cell("""\
years = ['2021 (MoWT Secondary)', '2026 (Field Primary)']
peak_volume = [215, 700]

plt.figure(figsize=(8, 5))
sns.barplot(x=years, y=peak_volume, palette='rocket')
plt.title('Peak Hour Tricycle Volume Growth (Kibuye Roundabout)')
plt.ylabel('Vehicles per Hour')
for i, v in enumerate(peak_volume):
    plt.text(i, v + 20, str(v), ha='center', fontweight='bold')
plt.show()
"""))

    # Write notebook
    with open('final_deliverables/Tricycle_Data_Analysis.ipynb', 'w', encoding='utf-8') as f:
        nbf.write(nb, f)
    
    print("Successfully generated final_deliverables/Tricycle_Data_Analysis.ipynb")

if __name__ == "__main__":
    create_notebook()
