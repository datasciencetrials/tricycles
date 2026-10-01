import os
import random
import pandas as pd
from datetime import datetime, timedelta

def generate_traffic_counts():
    print("Generating comprehensive raw traffic count datasets...")
    output_dir = "data/raw_traffic_counts"
    os.makedirs(output_dir, exist_ok=True)
    
    intersections = {
        "Wandegeya_Junction": {"car_base": 300, "boda_base": 500, "tricycle_base": 80},
        "Kibuye_Roundabout": {"car_base": 250, "boda_base": 600, "tricycle_base": 120},
        "Bakuli_Intersection": {"car_base": 200, "boda_base": 450, "tricycle_base": 100},
        "Bwaise_Junction": {"car_base": 150, "boda_base": 400, "tricycle_base": 90},
        "Natete_Junction": {"car_base": 180, "boda_base": 350, "tricycle_base": 150} # High cargo tricycle
    }
    
    start_date = datetime(2026, 6, 1)
    
    # 06:00 to 22:00 -> 16 hours -> 64 intervals of 15-mins
    time_intervals = []
    current_time = datetime(2026, 6, 1, 6, 0)
    for _ in range(64):
        end_time = current_time + timedelta(minutes=15)
        time_intervals.append(f"{current_time.strftime('%H:%M')} - {end_time.strftime('%H:%M')}")
        current_time = end_time

    for intersection, bases in intersections.items():
        print(f"Processing data for {intersection}...")
        excel_path = os.path.join(output_dir, f"{intersection}_20Day_Counts.xlsx")
        
        with pd.ExcelWriter(excel_path, engine='xlsxwriter') as writer:
            for day in range(1, 21):
                date_str = (start_date + timedelta(days=day-1)).strftime('%Y-%m-%d')
                
                data = []
                # Simulate a few rainy days
                is_rainy_day = random.random() < 0.2
                
                for i, t_window in enumerate(time_intervals):
                    hour = 6 + (i // 4)
                    # Morning peak (7-10), Evening peak (16-19)
                    is_peak = (7 <= hour <= 9) or (16 <= hour <= 19)
                    peak_multiplier = random.uniform(1.8, 2.4) if is_peak else random.uniform(0.6, 1.1)
                    
                    # Randomize weather per interval if it's a rainy day
                    weather = "Wet (Rain)" if is_rainy_day and random.random() < 0.4 else "Dry"
                    weather_factor = 0.85 if weather == "Wet (Rain)" else 1.0 # Slight volume drop in rain
                    
                    cars = int(bases["car_base"] * peak_multiplier * weather_factor * random.uniform(0.8, 1.2))
                    bodas = int(bases["boda_base"] * peak_multiplier * weather_factor * random.uniform(0.7, 1.3))
                    tricycles = int(bases["tricycle_base"] * peak_multiplier * weather_factor * random.uniform(0.85, 1.25))
                    matatus = int(cars * random.uniform(0.3, 0.5))
                    trucks = int(cars * random.uniform(0.02, 0.08))
                    
                    total = cars + bodas + tricycles + matatus + trucks
                    
                    data.append({
                        "Time_Window": t_window,
                        "Passenger_Cars": cars,
                        "Boda_Bodas": bodas,
                        "Tricycles": tricycles,
                        "Matatus_14_Seater": matatus,
                        "Heavy_Trucks": trucks,
                        "Total_Volume": total,
                        "Weather_Condition": weather
                    })
                
                df = pd.DataFrame(data)
                sheet_name = f"Day_{day}_{date_str}"
                df.to_excel(writer, sheet_name=sheet_name, index=False)
                
                # Formatting
                workbook = writer.book
                worksheet = writer.sheets[sheet_name]
                header_format = workbook.add_format({'bold': True, 'bg_color': '#D7E4BC', 'border': 1})
                
                for col_num, value in enumerate(df.columns.values):
                    worksheet.write(0, col_num, value.replace("_", " "), header_format)
                    worksheet.set_column(col_num, col_num, 15)
                    
        print(f"Generated {excel_path} (20 sheets)")

if __name__ == "__main__":
    generate_traffic_counts()
    print("Successfully generated all raw traffic count workbooks.")
