"""Regenerate the complete site-hour analytical table from raw movements.

The raw movement export is the governed source. Every unique combination of
site, date and hour is retained. This prevents silently dropping valid hours
when a source worksheet has an irregular layout.
"""

from __future__ import annotations

import csv
from collections import Counter, defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
RAW_PATH = ROOT / "data" / "raw_movements.csv"
OUTPUT_PATHS = (
    ROOT / "data" / "site_hour.csv",
    ROOT / "website" / "public" / "data" / "site_hour.csv",
)

SITE_ORDER = ["Bakuli", "Bwaise", "Kibuye", "Wandegeya", "Natete"]
GROUP_KEYS = ["Site", "JunctionType", "Date", "TimeFrom", "TimePeriod"]
SUM_FIELDS = [
    "MotorizedTotal",
    "Motorcycles",
    "CargoTricycle",
    "PassengerTricycle",
    "CarsTaxi",
    "TricycleTotal",
]
OTHER_MOTORISED_FIELDS = [
    "LightGoods",
    "MinibusMatatu",
    "Coaster",
    "Bus",
    "LightTruck",
    "HeavyTruck",
    "Trailer",
]
PASSENGER_STATIC_PCU = 1.006611570247934
CARGO_STATIC_PCU = 1.1900826446280994
DEMAND_SENSITIVITY_BETA = 0.4

FIELDNAMES = [
    "Site",
    "JunctionType",
    "Date",
    "TimeFrom",
    "TimePeriod",
    "Weather",
    "MotorizedFlow",
    "Motorcycles",
    "CargoTricycle",
    "PassengerTricycle",
    "CarsTaxi",
    "OtherMotorized",
    "TricycleTotal",
    "TricycleShare",
    "SiteMaxHourlyFlow",
    "DemandPressure",
    "DemandFactor",
    "PassengerStaticPCU",
    "CargoStaticPCU",
    "PassengerDynamicPCU",
    "CargoDynamicPCU",
    "CombinedDynamicPCU",
    "PassengerPCULoad",
    "CargoPCULoad",
    "CombinedPCULoad",
]


def number(value: str) -> int | float:
    parsed = float(value or 0)
    return int(parsed) if parsed.is_integer() else parsed


def governed_weather(rows: list[dict[str, str]]) -> str:
    """Use the most frequent known label, with lexical tie-breaking."""
    labels = [row["Weather"] for row in rows if row["Weather"] != "Unknown"]
    if not labels:
        return "Unknown"
    counts = Counter(labels)
    return min(counts, key=lambda label: (-counts[label], label))


def build_rows(raw_rows: list[dict[str, str]]) -> list[dict[str, object]]:
    groups: dict[tuple[str, ...], list[dict[str, str]]] = defaultdict(list)
    for row in raw_rows:
        groups[tuple(row[key] for key in GROUP_KEYS)].append(row)

    site_rank = {site: index for index, site in enumerate(SITE_ORDER)}
    ordered_groups = sorted(
        groups.items(),
        key=lambda item: (site_rank[item[0][0]], item[0][2], item[0][3]),
    )

    base_rows: list[dict[str, object]] = []
    for key, rows in ordered_groups:
        totals = {
            field: sum(number(row[field]) for row in rows)
            for field in SUM_FIELDS
        }
        other_motorised = sum(
            number(row[field]) for row in rows for field in OTHER_MOTORISED_FIELDS
        )
        base_rows.append(
            {
                **dict(zip(GROUP_KEYS, key)),
                "Weather": governed_weather(rows),
                "MotorizedFlow": totals["MotorizedTotal"],
                "Motorcycles": totals["Motorcycles"],
                "CargoTricycle": totals["CargoTricycle"],
                "PassengerTricycle": totals["PassengerTricycle"],
                "CarsTaxi": totals["CarsTaxi"],
                "OtherMotorized": other_motorised,
                "TricycleTotal": totals["TricycleTotal"],
            }
        )

    site_maximums: dict[str, float] = {}
    for row in base_rows:
        site = str(row["Site"])
        flow = float(row["MotorizedFlow"])
        site_maximums[site] = max(site_maximums.get(site, 0), flow)

    output_rows: list[dict[str, object]] = []
    for row in base_rows:
        flow = float(row["MotorizedFlow"])
        passenger_count = float(row["PassengerTricycle"])
        cargo_count = float(row["CargoTricycle"])
        tricycle_total = float(row["TricycleTotal"])
        site_maximum = site_maximums[str(row["Site"])]
        demand_pressure = flow / site_maximum
        demand_factor = 1 + DEMAND_SENSITIVITY_BETA * (demand_pressure - 0.5)
        passenger_dynamic = PASSENGER_STATIC_PCU * demand_factor
        cargo_dynamic = CARGO_STATIC_PCU * demand_factor
        passenger_load = passenger_count * passenger_dynamic
        cargo_load = cargo_count * cargo_dynamic
        output_rows.append(
            {
                **row,
                "TricycleShare": tricycle_total / flow if flow else 0,
                "SiteMaxHourlyFlow": int(site_maximum),
                "DemandPressure": demand_pressure,
                "DemandFactor": demand_factor,
                "PassengerStaticPCU": PASSENGER_STATIC_PCU,
                "CargoStaticPCU": CARGO_STATIC_PCU,
                "PassengerDynamicPCU": passenger_dynamic,
                "CargoDynamicPCU": cargo_dynamic,
                "CombinedDynamicPCU": (
                    (passenger_load + cargo_load) / tricycle_total
                    if tricycle_total
                    else 0
                ),
                "PassengerPCULoad": passenger_load,
                "CargoPCULoad": cargo_load,
                "CombinedPCULoad": passenger_load + cargo_load,
            }
        )
    return output_rows


def main() -> None:
    with RAW_PATH.open(newline="", encoding="utf-8-sig") as handle:
        raw_rows = list(csv.DictReader(handle))
    output_rows = build_rows(raw_rows)

    expected_groups = {
        (row["Site"], row["Date"], row["TimeFrom"]) for row in raw_rows
    }
    actual_groups = {
        (row["Site"], row["Date"], row["TimeFrom"]) for row in output_rows
    }
    if actual_groups != expected_groups:
        raise RuntimeError("Generated rows do not cover every governed site-hour group")

    for path in OUTPUT_PATHS:
        path.parent.mkdir(parents=True, exist_ok=True)
        with path.open("w", newline="", encoding="utf-8") as handle:
            writer = csv.DictWriter(handle, fieldnames=FIELDNAMES, lineterminator="\n")
            writer.writeheader()
            writer.writerows(output_rows)

    print(
        f"Generated {len(output_rows)} complete site-hour rows "
        f"from {len(raw_rows)} raw records"
    )


if __name__ == "__main__":
    main()
