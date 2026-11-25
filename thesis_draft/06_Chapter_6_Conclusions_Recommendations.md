# CHAPTER SIX
# CONCLUSIONS AND RECOMMENDATIONS

## 6.1 Conclusions
Based on our empirical analysis of how tricycles operate across Kampala's major corridors, this study draws the following main conclusions:

1. **Static PCUs Don't Work for Tricycles:** Using imported, static Passenger Car Unit (PCU) values for tricycles in Kampala is mathematically flawed. Our data shows the empirical static PCU for tricycles ranges between 0.82 and 1.02 depending on the intersection. This is significantly higher than motorcycles (0.45 - 0.55) and dangerously close to a full passenger car (1.0).
2. **Dynamic Friction Dominates:** Tricycle PCUs are highly sensitive to how congested the road is (the Volume-to-Capacity ratio). During the severe evening peak ($V/C \geq 0.95$), tricycle PCUs inflate to a maximum of 1.15 due to "blocking friction." Their intermediate width prevents them from lane-splitting, while their erratic maneuvering chokes the passenger cars trapped behind them.
3. **Environmental Vulnerability:** Bad road surfaces and localized flooding (like what we saw at Bwaise Junction) force drivers into extreme lateral weaving. This artificially inflates tricycle PCUs by up to 23% during heavy rain.
4. **Simulation Calibration is Mandatory:** Standard microsimulation models (like VISSIM) that use default Western driving behaviors fail completely when applied to Kampala. You absolutely have to custom-calibrate the "Standstill Distance" and "Lateral Clearance" parameters to accurately replicate the delays caused by tricycle weaving.

## 6.2 Recommendations

### 6.2.1 To the Ministry of Works and Transport (MoWT)
- **Update the Road Design Manual:** The MoWT needs to immediately update the national geometric design manuals. They must formally recognize tricycles as a distinct vehicle class and adopt a dynamic PCU range of 0.85 (off-peak) to 1.15 (peak) for all future capacity planning.
- **Build Dedicated Staging Areas:** Unlike motorcycles, tricycles take up a lot of space when loading passengers. Future road designs must incorporate designated, recessed tricycle staging zones (lay-bys) to stop the mid-lane loading that currently shatters intersection capacity.

### 6.2.2 To the Kampala Capital City Authority (KCCA)
- **Signal Re-optimization:** The KCCA Traffic Management Center urgently needs to recalibrate the signal timing plans at Wandegeya, Kibuye, and Bakuli using these newly derived dynamic PCU values. Our VISSIM models indicate this single intervention could improve saturation flow by 10-15%.
- **Route Restrictions:** Given how much friction cargo tricycles cause during peak hours, KCCA should strongly consider restricting them from entering primary radial roads during the 5:00 PM – 7:30 PM evening peak, forcing them onto secondary feeder roads instead.

### 6.2.3 To Future Researchers
- **Look at Electric Tuk-Tuks:** With the recent introduction of electric tricycles (e-Tuks) in Uganda, future researchers should investigate whether their different acceleration speeds and silent motors change their PCU values or how they interact with pedestrians.
- **Machine Learning Integration:** Future studies could attempt to train computer vision models (like YOLOv8) to automate the extraction of dynamic PCUs directly from KCCA CCTV feeds in real-time.
