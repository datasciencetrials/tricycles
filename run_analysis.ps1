# run_analysis.ps1
# This script executes the dynamic analysis pipeline for the Tricycle PCU thesis.

Write-Host "Starting Thesis Analysis Pipeline..." -ForegroundColor Cyan

# 1. Extract Text from Proposal PDF
Write-Host "Extracting text from proposal PDF..."
python .\scripts\extract_proposal_text.py --input ".\docs\SSERUNJOGI AMBROSE_Proposal_V2.1.pdf" --output ".\docs\proposal_extracted.txt"

# 2. Extract Text from DOCX (using the Scope of Work doc since ATC Draft isn't present)
Write-Host "Extracting text from DOCX..."
python .\scripts\extract_docx_text.py --input ".\docs\Scope_of_Work_Tricycle_PCU_Analysis.docx" --output ".\docs\extracted_objectives.txt"

# 3. Generate PCU Analysis Tool Workbook
Write-Host "Generating PCU Workbook..."
python .\scripts\generate_pcu_workbook.py --output ".\data\Tricycle_PCU_Analysis_Tool.xlsx" --n-samples 10000 --mean-speed 35.0 --std-speed 10.0 --seed 42

# 4. Generate Traffic Thesis Workbook
Write-Host "Generating Thesis Traffic Workbook..."
python .\scripts\generate_thesis_workbook.py --json ".\data\traffic_dashboard_data.json" --output ".\data\Uganda_Traffic_Thesis_Workbook.xlsx" --base-adt 103899.86 --growth-rate 0.052

# 5. Generate 40-Slide Presentation
Write-Host "Generating Presentation..."
python .\scripts\generate_40_slide_ppt.py --output ".\docs\Thesis_Presentation_40_Slides.pptx"

# 6. Run VISSIM Automation (Dry Run / API check)
Write-Host "Running VISSIM Calibration script..."
python .\scripts\vissim_automation_calibration.py --vissim-path ".\data\VISSIM_Models"

Write-Host "Pipeline Execution Complete!" -ForegroundColor Green
