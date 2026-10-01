"""
VISSIM COM API Automation Script for Tricycle PCU Calibration
Project: Analysis of Tricycle PCU Values in Kampala
Author: Sserunjogi Ambrose (Technical Addendum)

This script automates the calibration of Wiedemann 74 parameters in PTV VISSIM.
Requires: PTV VISSIM installation and COM API license.
"""

import win32com.client as com
import os

def run_pcu_simulation(vissim_path, ax_val, bx_add, bx_mult):
    # Initialize VISSIM
    Vissim = com.Dispatch("Vissim.Vissim")
    Vissim.LoadNet(os.path.join(vissim_path, "Kampala_Wandegeya.inpx"))
    Vissim.LoadLayout(os.path.join(vissim_path, "Kampala_Wandegeya.layx"))

    # Access Driving Behavior (Wiedemann 74)
    # Behavior ID 1 is typically 'Urban (motorized)'
    behav = Vissim.Net.DrivingBehaviors.ItemByKey(1)
    
    # Set Advanced Calibration Parameters
    behav.SetAttValue("W74ax", ax_val)       # Average Standstill Distance
    behav.SetAttValue("W74bxAdd", bx_add)   # Additive Variation
    behav.SetAttValue("W74bxMult", bx_mult) # Multiplicative Variation
    
    # Enable Same-Lane Overtaking (Lateral Behavior)
    behav.SetAttValue("LatOverTakeSameLane", True)
    
    # Run Simulation
    Vissim.Simulation.SetAttValue("SimPeriod", 3600) # 1 hour
    Vissim.Simulation.RunContinuous()
    
    # Extract Results (Queue Length at Link 10)
    queue = Vissim.Net.QueueCounters.ItemByKey(1).GetAttValue("QueueLenMax")
    print(f"Sim Completed: ax={ax_val}, bx_add={bx_add} | Max Queue: {queue}m")
    
    Vissim = None

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="VISSIM Calibration")
    parser.add_argument("--vissim-path", required=True, help="Path to VISSIM Models directory")
    args = parser.parse_args()
    
    # Example Calibration Suite
    calibration_runs = [
        {"ax": 0.5, "bx_add": 2.0, "bx_mult": 3.0},
        {"ax": 0.65, "bx_add": 2.5, "bx_mult": 4.2}, # Kampala Observed
        {"ax": 1.0, "bx_add": 3.0, "bx_mult": 5.0}
    ]
    
    v_path = args.vissim_path
    
    for run in calibration_runs:
        print(f"Starting Simulation with ax={run['ax']}...")
        # run_pcu_simulation(v_path, run['ax'], run['bx_add'], run['bx_mult'])
        print("Note: COM API execution requires active VISSIM license.")
