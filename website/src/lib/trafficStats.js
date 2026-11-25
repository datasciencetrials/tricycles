// ---------------------------------------------------------------------------
// Single source of truth for every data-backed figure shown on the Overview,
// Analytics, Summary Tables and Thesis tabs.
//
// DATA-INTEGRITY CORRECTION (see Thesis, Chapter 4 opening note): an
// independent source-reconciliation audit against the original raw
// per-junction traffic-count workbooks found that the dataset previously
// shipped here (a synthetic 20-day / 7-day, 5-intersection series with
// per-interval headway and V/C-ratio fields) cannot be verified against any
// actual field record and has been withdrawn in full. This module now loads
// ONLY the source-reconciled data:
//
//   raw_movements.csv   984 real classified hourly movement records,
//                       reconciled 1:1 against the four supplied raw
//                       per-junction count workbooks (Kibuye, Wandegeya,
//                       Bakuli, Bwaise; every source total independently
//                       re-summed and confirmed to match). Two consecutive
//                       days (2026-08-02/03), 07:00-18:00. No headway, V/C,
//                       or capacity field exists in the source data, so none
//                       is reported here.
//   site_hour.csv       The same 984 records aggregated to 96 site-hour
//                       rows, carrying the workbook's own static + dynamic
//                       PCU model (speed-area static baseline; demand-
//                       pressure dynamic adjustment) computed at that grain.
//   incidents.csv       841 real traffic-incident records (type x severity),
//                       independently verified against the source incident
//                       log and unaffected by the correction above.
//
// Natete Junction was named in the original study proposal but no raw count
// workbook for it was ever supplied -- it is carried in the UI as a
// disclosed no-data site, never assigned a fabricated figure.
//
// Every number below is computed at runtime from these three CSVs; nothing
// is a hand-typed constant. FORMULAS documents each figure's derivation for
// the UI's Methodology panels.
// ---------------------------------------------------------------------------

export const REAL_SITES = ['Kibuye', 'Wandegeya', 'Bakuli', 'Bwaise'];
export const NO_DATA_SITES = [
  { name: 'Natete', note: 'Named in the original study proposal; no raw traffic-count workbook was ever supplied for this site. Excluded from every primary result below -- no figure is estimated or assumed for it.' },
];
export const SITE_JUNCTION_TYPE = { Kibuye: 'Roundabout', Wandegeya: 'Cross Junction', Bakuli: 'Cross Junction', Bwaise: 'Cross Junction' };

// --- tiny CSV parser (data is clean/numeric, no quoted commas) ------------
// Strips trailing \r on every line so CRLF-saved source workbooks (the raw
// movement export in particular) don't leave a stray \r baked into the last
// header/cell of every row -- which would otherwise silently turn every
// lookup on that final column (e.g. TimePeriod) into `undefined`.
export function parseCsv(text) {
  const lines = text.trim().split('\n').map((l) => l.replace(/\r$/, ''));
  const headers = lines[0].split(',');
  return lines.slice(1).map((line) => {
    const cells = line.split(',');
    const row = {};
    headers.forEach((h, i) => {
      const v = cells[i];
      row[h] = v !== '' && !isNaN(v) ? parseFloat(v) : v;
    });
    return row;
  });
}

// --- basic statistics -------------------------------------------------------
const sum = (arr) => arr.reduce((a, b) => a + b, 0);
const mean = (arr) => sum(arr) / arr.length;
const variance = (arr) => {
  const m = mean(arr);
  return sum(arr.map((x) => (x - m) ** 2)) / (arr.length - 1);
};
const std = (arr) => Math.sqrt(variance(arr));

function quantileSorted(sorted, q) {
  const n = sorted.length;
  if (n === 1) return sorted[0];
  const pos = q * (n - 1);
  const lo = Math.floor(pos), hi = Math.ceil(pos);
  if (lo === hi) return sorted[lo];
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);
}
function mode(arr) {
  const freq = new Map();
  arr.forEach((v) => freq.set(v, (freq.get(v) || 0) + 1));
  let best = arr[0], bestCount = 0;
  freq.forEach((count, v) => {
    if (count > bestCount || (count === bestCount && v < best)) { best = v; bestCount = count; }
  });
  return { value: best, count: bestCount };
}
function describe(arr) {
  const s = [...arr].sort((a, b) => a - b);
  const n = s.length;
  const m = mean(s);
  const sd = n > 1 ? std(s) : 0;
  const q1 = quantileSorted(s, 0.25), q3 = quantileSorted(s, 0.75);
  return {
    n, mean: m, median: quantileSorted(s, 0.5), mode: mode(s).value, std: sd,
    min: s[0], max: s[n - 1], q1, q3, iqr: q3 - q1,
    cv: m !== 0 ? (sd / Math.abs(m)) * 100 : null,
  };
}

function erf(x) {
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
  const t = 1 / (1 + p * x);
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}
const normalCdf = (z) => 0.5 * (1 + erf(z / Math.sqrt(2)));
const pFromZ = (z) => 2 * (1 - normalCdf(Math.abs(z)));
function pFromChiSquare(chi2, df) {
  const z = (Math.pow(chi2 / df, 1 / 3) - (1 - 2 / (9 * df))) / Math.sqrt(2 / (9 * df));
  return 1 - normalCdf(z);
}

function oneWayAnova(groups) {
  const all = groups.flat();
  const grandMean = mean(all);
  const k = groups.length, n = all.length;
  const ssBetween = sum(groups.map((g) => g.length * (mean(g) - grandMean) ** 2));
  const ssWithin = sum(groups.map((g) => sum(g.map((x) => (x - mean(g)) ** 2))));
  const df1 = k - 1, df2 = n - k;
  const msBetween = ssBetween / df1, msWithin = ssWithin / df2;
  const F = msBetween / msWithin;
  const p = pFromChiSquare(F * df1, df1);
  return { F, df1, df2, p };
}

function pearson(x, y) {
  const mx = mean(x), my = mean(y);
  const cov = sum(x.map((xi, i) => (xi - mx) * (y[i] - my)));
  const sxx = sum(x.map((xi) => (xi - mx) ** 2));
  const sx = Math.sqrt(sxx);
  const sy = Math.sqrt(sum(y.map((yi) => (yi - my) ** 2)));
  const r = cov / (sx * sy);
  const n = x.length;
  const t = r * Math.sqrt((n - 2) / (1 - r * r));
  const slope = cov / sxx;
  const intercept = my - slope * mx;
  return { r, r2Pct: r * r * 100, p: pFromZ(t), n, slope, intercept };
}

function chiSquareIndependence(table) {
  const rowTotals = table.map((row) => sum(row));
  const colTotals = table[0].map((_, j) => sum(table.map((row) => row[j])));
  const grandTotal = sum(rowTotals);
  let chi2 = 0;
  const expected = table.map((row, i) => row.map((_, j) => (rowTotals[i] * colTotals[j]) / grandTotal));
  table.forEach((row, i) => row.forEach((obs, j) => { chi2 += ((obs - expected[i][j]) ** 2) / expected[i][j]; }));
  const df = (table.length - 1) * (table[0].length - 1);
  return { chi2, df, p: pFromChiSquare(chi2, df), expected };
}

// rank-with-ties primitive shared by the two rank-based tests below
function rankWithTies(values) {
  const idx = values.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0]);
  const ranks = new Array(values.length);
  let i = 0;
  while (i < idx.length) {
    let j = i;
    while (j + 1 < idx.length && idx[j + 1][0] === idx[i][0]) j += 1;
    const avgRank = (i + j) / 2 + 1;
    for (let k = i; k <= j; k += 1) ranks[idx[k][1]] = avgRank;
    i = j + 1;
  }
  return ranks;
}

function kruskalWallis(groups) {
  const all = groups.flat();
  const n = all.length;
  const ranks = rankWithTies(all);
  let offset = 0;
  const groupRankSums = groups.map((g) => {
    const rs = sum(ranks.slice(offset, offset + g.length));
    offset += g.length;
    return rs;
  });
  const k = groups.length;
  const H = (12 / (n * (n + 1))) * sum(groupRankSums.map((rs, i) => (rs * rs) / groups[i].length)) - 3 * (n + 1);
  const df = k - 1;
  return { H, df, p: pFromChiSquare(H, df) };
}

// Poisson goodness-of-fit helpers (exact log-space pmf)
function poissonPmf(k, lambda) {
  let logFact = 0;
  for (let i = 2; i <= k; i++) logFact += Math.log(i);
  return Math.exp(-lambda + k * Math.log(lambda) - logFact);
}
function poissonBinExpected(loInclusive, hiExclusive, lambda, n) {
  let p = 0;
  for (let k = loInclusive; k < hiExclusive; k++) p += poissonPmf(k, lambda);
  return n * p;
}

const groupBy = (rows, key) => rows.reduce((acc, r) => {
  (acc[r[key]] = acc[r[key]] || []).push(r);
  return acc;
}, {});

// ---------------------------------------------------------------------------
// Assumptions and static PCU model (Objective 1 / Assumptions_References).
// Every value below is an explicit, editable literature-based assumption
// used only because the raw counts carry no measured speed, headway or
// dimension data for tricycles at these sites -- disclosed here rather than
// silently baked into a single unexplained constant.
// ---------------------------------------------------------------------------
export const ASSUMPTIONS = {
  car: { length: 4, width: 1.65, speed: 45, staticPCU: 1 },
  motorcycle: { length: 2, width: 0.75, speed: 40, staticPCU: 0.5 },
  passengerTricycle: { length: 2.9, width: 1.4, speed: 27.5 },
  cargoTricycle: { length: 3.2, width: 1.5, speed: 27.5 },
  demandSensitivityBeta: 0.4,
  dryPavementFactor: 1,
  wetPavementScenarioFactor: 1.1,
  severeQcPassengerShareThreshold: 0.3,
  severeQcPassengerCountMinimum: 50,
  // Disclosed, editable assumption used ONLY to draw a full 24-hour axis on
  // the hourly traffic profile chart. The source counts cover 07:00-18:00
  // only; no vehicle was ever counted overnight. This ratio is the fraction
  // of the straight trend-line between the real 18:00 and (next) 07:00
  // values that the modeled curve dips to at its lowest point -- it is a
  // plain mathematical construction (a cosine-shaped dip), not a figure
  // taken from external literature or additional field data. It exists so
  // an unmistakably "modeled" overnight segment can be shown for context
  // without ever being presented as measured.
  overnightTroughRatio: 0.15,
};
function areaOf(v) { return v.length * v.width; }
function staticPcuSpeedArea(v, car) { return (car.speed / v.speed) * (areaOf(v) / areaOf(car)); }
export const STATIC_PCU = {
  passengerTricycle: staticPcuSpeedArea(ASSUMPTIONS.passengerTricycle, ASSUMPTIONS.car),
  cargoTricycle: staticPcuSpeedArea(ASSUMPTIONS.cargoTricycle, ASSUMPTIONS.car),
};

// Hours actually surveyed in the source data (2 consecutive days at each
// site, 07:00-18:00 inclusive). Every other hour of the day has zero real
// observations anywhere in the source workbooks.
const REAL_HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
// The 12 unsurveyed hours, in clock order starting the evening after 18:00
// and running through to just before 07:00 the next morning.
const MODELED_HOURS = [19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6];

// Builds the disclosed, purely mathematical overnight connector described
// above ASSUMPTIONS.overnightTroughRatio: a straight trend line between the
// two real anchor values (18:00 and the next 07:00), multiplied by a
// cosine-shaped dip that reaches `troughRatio` of the trend line at its
// midpoint and returns to 1 (i.e. touches the real value) at both ends.
function buildOvernightConnector(hour18Value, hour7Value, troughRatio) {
  const steps = MODELED_HOURS.length + 1; // 13 hour-to-hour intervals, 18->...->07
  return MODELED_HOURS.map((hour, i) => {
    const p = (i + 1) / steps; // strictly between 0 and 1
    const trend = hour18Value + (hour7Value - hour18Value) * p;
    const dip = Math.sin(Math.PI * p); // 0 at p=0/1, 1 at p=0.5
    const value = trend * (1 - (1 - troughRatio) * dip);
    return { hour, value: Math.max(0, value) };
  });
}

// Builds a full 0-23 hourly profile for one or more grain-matching
// `siteHour` rows: real measured means for 07:00-18:00, plus a disclosed
// modeled connector for the remaining 12 hours. `valueKey` is a numeric
// field already present on each siteHour row (e.g. MotorizedFlow,
// TricycleTotal).
function buildHourlyProfile24(rows, valueKey) {
  const byHour = groupBy(rows, 'TimeFrom');
  const realByHour = {};
  REAL_HOURS.forEach((h) => {
    const hh = `${String(h).padStart(2, '0')}:00:00`;
    const hourRows = byHour[hh] || [];
    realByHour[h] = hourRows.length ? mean(hourRows.map((r) => r[valueKey])) : 0;
  });
  const connector = buildOvernightConnector(realByHour[18], realByHour[7], ASSUMPTIONS.overnightTroughRatio);
  const modeledByHour = {};
  connector.forEach(({ hour, value }) => { modeledByHour[hour] = value; });
  return Array.from({ length: 24 }, (_, hour) => ({
    hour,
    isReal: REAL_HOURS.includes(hour),
    value: REAL_HOURS.includes(hour) ? realByHour[hour] : modeledByHour[hour],
  }));
}

export function computeTrafficStats(rawMovements, siteHour, incidents) {
  // ---- normalize numeric fields on raw_movements ----
  rawMovements.forEach((r) => {
    r.TricycleTotal = r.TricycleTotal ?? (r.CargoTricycle + r.PassengerTricycle);
  });

  // =========================================================================
  // A. Source reconciliation summary (Appendix / Methodology) -- verbatim
  //    from the independent per-junction reconciliation, one row per real
  //    site, vehicle-class totals re-summed from the raw source counts.
  // =========================================================================
  const VEHICLE_CLASS_KEYS = ['Carts', 'Bicycles', 'Motorcycles', 'CargoTricycle', 'PassengerTricycle', 'CarsTaxi', 'LightGoods', 'MinibusMatatu', 'Coaster', 'Bus', 'LightTruck', 'HeavyTruck', 'Trailer'];
  const reconciliationBySite = {};
  REAL_SITES.forEach((site) => {
    const rows = rawMovements.filter((r) => r.Site === site);
    const entry = { records: rows.length };
    VEHICLE_CLASS_KEYS.forEach((k) => { entry[k] = sum(rows.map((r) => r[k])); });
    reconciliationBySite[site] = entry;
  });
  const reconciliationTotal = { records: rawMovements.length };
  VEHICLE_CLASS_KEYS.forEach((k) => { reconciliationTotal[k] = sum(Object.values(reconciliationBySite).map((e) => e[k])); });

  // =========================================================================
  // B. Static PCU + per-site exposure (Objective 1 / Results_By_Site)
  // =========================================================================
  const byRawSite = groupBy(rawMovements, 'Site');
  const resultsBySite = {};
  REAL_SITES.forEach((site) => {
    const rows = byRawSite[site] || [];
    const motorizedVehicles = sum(rows.map((r) => r.MotorizedTotal));
    const passengerTri = sum(rows.map((r) => r.PassengerTricycle));
    const cargoTri = sum(rows.map((r) => r.CargoTricycle));
    const totalTri = passengerTri + cargoTri;
    resultsBySite[site] = {
      junctionType: SITE_JUNCTION_TYPE[site],
      motorizedVehicles, passengerTri, cargoTri, totalTri,
      tricycleShare: motorizedVehicles ? totalTri / motorizedVehicles : 0,
      passengerStaticPCU: STATIC_PCU.passengerTricycle,
      cargoStaticPCU: STATIC_PCU.cargoTricycle,
    };
  });
  const allSitesMotorized = sum(REAL_SITES.map((s) => resultsBySite[s].motorizedVehicles));
  const allSitesPassengerTri = sum(REAL_SITES.map((s) => resultsBySite[s].passengerTri));
  const allSitesCargoTri = sum(REAL_SITES.map((s) => resultsBySite[s].cargoTri));
  const allSitesTotalTri = allSitesPassengerTri + allSitesCargoTri;

  // =========================================================================
  // C. Dynamic PCU model, from site_hour.csv (the workbook's own per-site-
  //    hour model: Demand Pressure = hourly flow / that site's max hourly
  //    flow; Demand Factor = 1 + beta*(DemandPressure-0.5); Dynamic PCU =
  //    Static PCU * Demand Factor). Aggregated here by site, by time period,
  //    and by intersection type, weighted by each row's real tricycle count.
  // =========================================================================
  const byHourSite = groupBy(siteHour, 'Site');
  const weightedMean = (rows, valueKey, weightKey) => {
    const w = sum(rows.map((r) => r[weightKey]));
    return w ? sum(rows.map((r) => r[valueKey] * r[weightKey])) / w : mean(rows.map((r) => r[valueKey]));
  };
  const dynamicPcuBySite = {};
  REAL_SITES.forEach((site) => {
    const rows = byHourSite[site] || [];
    const totalTri = sum(rows.map((r) => r.TricycleTotal));
    dynamicPcuBySite[site] = {
      junctionType: SITE_JUNCTION_TYPE[site],
      meanDemandPressure: mean(rows.map((r) => r.DemandPressure)),
      peakDemandPressure: Math.max(...rows.map((r) => r.DemandPressure)),
      passengerDynamicPCU: weightedMean(rows, 'PassengerDynamicPCU', 'PassengerTricycle'),
      cargoDynamicPCU: weightedMean(rows, 'CargoDynamicPCU', 'CargoTricycle'),
      combinedDynamicPCU: weightedMean(rows, 'CombinedDynamicPCU', 'TricycleTotal'),
      totalTri,
    };
  });
  const allRows = siteHour;
  const combinedDynamicPCUOverall = weightedMean(allRows, 'CombinedDynamicPCU', 'TricycleTotal');
  const passengerDynamicPCUOverall = weightedMean(allRows, 'PassengerDynamicPCU', 'PassengerTricycle');
  const cargoDynamicPCUOverall = weightedMean(allRows, 'CargoDynamicPCU', 'CargoTricycle');

  // --- time-of-day effect ---
  const timePeriods = ['Morning Peak', 'Midday / Off-Peak', 'Evening Peak'];
  const dynamicPcuByTimePeriod = {};
  timePeriods.forEach((tp) => {
    const rows = siteHour.filter((r) => r.TimePeriod === tp);
    dynamicPcuByTimePeriod[tp] = {
      usableFlow: sum(rows.map((r) => r.MotorizedFlow)),
      passengerTri: sum(rows.map((r) => r.PassengerTricycle)),
      cargoTri: sum(rows.map((r) => r.CargoTricycle)),
      totalTri: sum(rows.map((r) => r.TricycleTotal)),
      meanDemandPressure: mean(rows.map((r) => r.DemandPressure)),
      passengerDynamicPCU: weightedMean(rows, 'PassengerDynamicPCU', 'PassengerTricycle'),
      cargoDynamicPCU: weightedMean(rows, 'CargoDynamicPCU', 'CargoTricycle'),
      combinedDynamicPCU: weightedMean(rows, 'CombinedDynamicPCU', 'TricycleTotal'),
    };
  });

  // --- intersection-type effect (descriptive only -- Kibuye is the only
  //     roundabout in the study, so no valid statistical comparison exists;
  //     the workbook's own caution is carried through verbatim) ---
  const byJunctionType = groupBy(siteHour, 'JunctionType');
  const dynamicPcuByJunctionType = {};
  Object.entries(byJunctionType).forEach(([jt, rows]) => {
    dynamicPcuByJunctionType[jt] = {
      sitesRepresented: [...new Set(rows.map((r) => r.Site))],
      usableFlow: sum(rows.map((r) => r.MotorizedFlow)),
      totalTri: sum(rows.map((r) => r.TricycleTotal)),
      meanDemandPressure: mean(rows.map((r) => r.DemandPressure)),
      combinedDynamicPCU: weightedMean(rows, 'CombinedDynamicPCU', 'TricycleTotal'),
    };
  });

  // --- weather / pavement condition: disclosed data-availability table, not
  //     an empirical dry/wet comparison (zero wet-pavement records exist) ---
  const weatherAvailability = {};
  ['Sunny', 'Unknown'].forEach((w) => {
    const rows = siteHour.filter((r) => r.Weather === w);
    weatherAvailability[w] = {
      records: rows.length,
      totalTri: sum(rows.map((r) => r.TricycleTotal)),
      combinedDynamicPCU: rows.length ? weightedMean(rows, 'CombinedDynamicPCU', 'TricycleTotal') : null,
    };
  });
  const wetPavementScenario = {
    dryPassengerPCU: passengerDynamicPCUOverall,
    dryCargoPCU: cargoDynamicPCUOverall,
    dryCombinedPCU: combinedDynamicPCUOverall,
    wetPassengerPCU: passengerDynamicPCUOverall * ASSUMPTIONS.wetPavementScenarioFactor,
    wetCargoPCU: cargoDynamicPCUOverall * ASSUMPTIONS.wetPavementScenarioFactor,
    wetCombinedPCU: combinedDynamicPCUOverall * ASSUMPTIONS.wetPavementScenarioFactor,
  };

  // =========================================================================
  // C2. Full 24-hour hourly traffic profile (Overview / Analytics chart).
  //     Hours 07:00-18:00 are the real, measured mean hourly values (per
  //     surveyed junction, averaged across the 2 survey days and, for the
  //     "All Sites" series, across the 4 sites too). No vehicle was ever
  //     counted outside that window; hours 19:00-06:00 use the disclosed,
  //     purely mathematical overnight connector defined above
  //     (ASSUMPTIONS.overnightTroughRatio) and are always flagged
  //     isReal:false so the UI can render them as a visually distinct,
  //     toggleable "modeled" segment rather than measured data.
  // =========================================================================
  const hourlyProfile24 = {
    motorizedFlow: buildHourlyProfile24(siteHour, 'MotorizedFlow'),
    tricycleTotal: buildHourlyProfile24(siteHour, 'TricycleTotal'),
  };
  const hourlyProfile24BySite = {};
  REAL_SITES.forEach((site) => {
    const rows = byHourSite[site] || [];
    hourlyProfile24BySite[site] = {
      motorizedFlow: buildHourlyProfile24(rows, 'MotorizedFlow'),
      tricycleTotal: buildHourlyProfile24(rows, 'TricycleTotal'),
    };
  });

  // =========================================================================
  // D. Sensitivity analyses
  // =========================================================================
  const speedSensitivity = [
    { scenario: 'Low impact / faster', speed: 35, passengerStaticPCU: staticPcuSpeedArea({ ...ASSUMPTIONS.passengerTricycle, speed: 35 }, ASSUMPTIONS.car), cargoStaticPCU: staticPcuSpeedArea({ ...ASSUMPTIONS.cargoTricycle, speed: 35 }, ASSUMPTIONS.car) },
    { scenario: 'Base', speed: 27.5, passengerStaticPCU: STATIC_PCU.passengerTricycle, cargoStaticPCU: STATIC_PCU.cargoTricycle },
    { scenario: 'High impact / slower', speed: 20, passengerStaticPCU: staticPcuSpeedArea({ ...ASSUMPTIONS.passengerTricycle, speed: 20 }, ASSUMPTIONS.car), cargoStaticPCU: staticPcuSpeedArea({ ...ASSUMPTIONS.cargoTricycle, speed: 20 }, ASSUMPTIONS.car) },
  ];
  const regionalBenchmark = [
    { benchmark: 'Ghana signalized intersections', lower: 0.67, upper: 0.75, basePassengerStaticPCU: STATIC_PCU.passengerTricycle, withinRange: false, source: 'Cited in the original study proposal, p.12' },
    { benchmark: 'Indian urban roads', lower: 0.91, upper: 1.32, basePassengerStaticPCU: STATIC_PCU.passengerTricycle, withinRange: true, source: 'Cited in the original study proposal, p.12' },
  ];

  // High-concentration sensitivity: 7 flagged Kibuye passenger-tricycle
  // records (passenger count > 50 and > 30% of the motorized movement) are
  // retained in every primary figure above; this table quantifies their
  // influence without deleting or correcting them.
  const flaggedRows = rawMovements.filter((r) => String(r.HighConcentrationReview).trim() === 'Yes');
  const withoutFlagged = rawMovements.filter((r) => String(r.HighConcentrationReview).trim() !== 'Yes');
  const sensitivityMetric = (rows, key) => sum(rows.map((r) => r[key]));
  const allDataSensitivity = {
    flaggedCount: flaggedRows.length,
    motorizedVehicles: { allData: sensitivityMetric(rawMovements, 'MotorizedTotal'), flagsRemoved: sensitivityMetric(withoutFlagged, 'MotorizedTotal') },
    passengerTri: { allData: sensitivityMetric(rawMovements, 'PassengerTricycle'), flagsRemoved: sensitivityMetric(withoutFlagged, 'PassengerTricycle') },
    cargoTri: { allData: sensitivityMetric(rawMovements, 'CargoTricycle'), flagsRemoved: sensitivityMetric(withoutFlagged, 'CargoTricycle') },
    totalTri: { allData: allSitesTotalTri, flagsRemoved: sensitivityMetric(withoutFlagged, 'PassengerTricycle') + sensitivityMetric(withoutFlagged, 'CargoTricycle') },
    kibuyePassengerShare: {
      allData: resultsBySite.Kibuye.passengerTri / resultsBySite.Kibuye.motorizedVehicles,
      flagsRemoved: (() => {
        const kib = withoutFlagged.filter((r) => r.Site === 'Kibuye');
        return sum(kib.map((r) => r.PassengerTricycle)) / sum(kib.map((r) => r.MotorizedTotal));
      })(),
    },
  };

  // =========================================================================
  // E. Legitimate inferential statistics computed directly on the real,
  //    reconciled data (n = 984 raw movement records, or n = 96 site-hour
  //    rows where noted). Every test below uses fields that were genuinely
  //    recorded; none substitutes for headway, V/C or capacity data that
  //    does not exist in the source counts.
  // =========================================================================

  // --- Tricycle volume by site (one-way ANOVA + Kruskal-Wallis robustness
  //     check), on every real raw movement record, n=984, 4 real sites ---
  const triBySiteGroups = REAL_SITES.map((s) => (byRawSite[s] || []).map((r) => r.TricycleTotal));
  const tricycleSiteAnova = oneWayAnova(triBySiteGroups);
  const tricycleSiteKruskalWallis = kruskalWallis(triBySiteGroups);
  const tricycleDescribeBySite = {};
  REAL_SITES.forEach((s, i) => { tricycleDescribeBySite[s] = describe(triBySiteGroups[i]); });

  // --- Tricycle volume by time-of-day (one-way ANOVA + Kruskal-Wallis),
  //     n=984, 3 real time periods (Morning Peak / Midday-Off-Peak /
  //     Evening Peak) -- the real replacement for the old 2-group peak/
  //     off-peak comparison, since the source data has 3 real periods ---
  const byRawTimePeriod = groupBy(rawMovements, 'TimePeriod');
  const triByPeriodGroups = timePeriods.map((tp) => (byRawTimePeriod[tp] || []).map((r) => r.TricycleTotal));
  const tricyclePeriodAnova = oneWayAnova(triByPeriodGroups);
  const tricyclePeriodKruskalWallis = kruskalWallis(triByPeriodGroups);
  const tricycleDescribeByPeriod = {};
  timePeriods.forEach((tp, i) => { tricycleDescribeByPeriod[tp] = describe(triByPeriodGroups[i]); });

  // --- Correlation: hourly all-data motorized flow vs hourly tricycle
  //     total, across the 96 real site-hour rows -- two independently
  //     observed quantities (not the demand-pressure/PCU relationship, which
  //     is definitional by formula and is never presented as a statistical
  //     finding here) ---
  const flowTricycleCorrelation = pearson(siteHour.map((r) => r.MotorizedFlow), siteHour.map((r) => r.TricycleTotal));
  const flowTricyclePairs = siteHour.map((r) => ({ x: r.MotorizedFlow, y: r.TricycleTotal, site: r.Site }));

  // --- Poisson goodness-of-fit: hourly tricycle-arrival counts at Kibuye
  //     (the site with the most tricycle activity and thus the most
  //     informative real hourly series), n=24 real hourly aggregates.
  //     Disclosed small-n limitation stated alongside the result. ---
  const kibuyeHourly = (byHourSite.Kibuye || []).map((r) => r.TricycleTotal);
  const kibuyeLambda = mean(kibuyeHourly);
  const kibuyeN = kibuyeHourly.length;
  const poissonBinEdgesKibuye = [[0, 20], [20, 40], [40, 60], [60, 200]];
  const kibuyePoissonBins = poissonBinEdgesKibuye.map(([lo, hi]) => ({
    label: `${lo}-${hi === 200 ? '60+' : hi - 1}`,
    observed: kibuyeHourly.filter((v) => v >= lo && v < hi).length,
    expected: poissonBinExpected(lo, hi, kibuyeLambda, kibuyeN),
  }));
  const kibuyePoissonChiSq = sum(kibuyePoissonBins.map((b) => ((b.observed - b.expected) ** 2) / b.expected));

  // --- Incidents: real, independently-verified data, unaffected by the
  //     correction above -- crosstab + chi-square test of independence ---
  const incidentSeverityByType = {};
  incidents.forEach((r) => {
    incidentSeverityByType[r.IncidentType] = incidentSeverityByType[r.IncidentType] || { Fatal: 0, Serious: 0, Minor: 0 };
    incidentSeverityByType[r.IncidentType][r.Severity] = (incidentSeverityByType[r.IncidentType][r.Severity] || 0) + 1;
  });
  const incidentTotalsByType = {};
  incidents.forEach((r) => { incidentTotalsByType[r.IncidentType] = (incidentTotalsByType[r.IncidentType] || 0) + 1; });
  const incidentSeverityTotals = { Fatal: 0, Serious: 0, Minor: 0 };
  incidents.forEach((r) => { incidentSeverityTotals[r.Severity] = (incidentSeverityTotals[r.Severity] || 0) + 1; });
  const incidentTypeNames = Object.keys(incidentSeverityByType);
  const severityLevels = ['Fatal', 'Serious', 'Minor'];
  const incidentChiSquareTable = incidentTypeNames.map((t) => severityLevels.map((s) => incidentSeverityByType[t][s] || 0));
  const incidentChiSquare = chiSquareIndependence(incidentChiSquareTable);
  incidentChiSquare.typeNames = incidentTypeNames;
  incidentChiSquare.severityLevels = severityLevels;

  // --- vehicle-class composition, per site, from the real raw counts ---
  const compositionBySite = {};
  const COMP_CLASSES = ['Motorcycles', 'PassengerTricycle', 'CargoTricycle', 'CarsTaxi', 'OtherMotorized'];
  REAL_SITES.forEach((site) => {
    const rows = byHourSite[site] || [];
    const comp = {};
    comp.Motorcycles = sum(rows.map((r) => r.Motorcycles));
    comp.PassengerTricycle = sum(rows.map((r) => r.PassengerTricycle));
    comp.CargoTricycle = sum(rows.map((r) => r.CargoTricycle));
    comp.CarsTaxi = sum(rows.map((r) => r.CarsTaxi));
    comp.OtherMotorized = sum(rows.map((r) => r.OtherMotorized));
    const total = sum(Object.values(comp));
    const pct = {};
    COMP_CLASSES.forEach((c) => { pct[c] = total ? (comp[c] / total) * 100 : 0; });
    compositionBySite[site] = pct;
  });

  return {
    reconciliationBySite, reconciliationTotal, VEHICLE_CLASS_KEYS,
    resultsBySite, allSitesMotorized, allSitesPassengerTri, allSitesCargoTri, allSitesTotalTri,
    dynamicPcuBySite, combinedDynamicPCUOverall, passengerDynamicPCUOverall, cargoDynamicPCUOverall,
    dynamicPcuByTimePeriod, timePeriods, dynamicPcuByJunctionType,
    weatherAvailability, wetPavementScenario,
    speedSensitivity, regionalBenchmark, allDataSensitivity,
    tricycleSiteAnova, tricycleSiteKruskalWallis, tricycleDescribeBySite,
    tricyclePeriodAnova, tricyclePeriodKruskalWallis, tricycleDescribeByPeriod,
    flowTricycleCorrelation, flowTricyclePairs,
    kibuyePoissonBins, kibuyePoissonChiSq, kibuyeLambda, kibuyeN,
    incidentSeverityByType, incidentTotalsByType, incidentSeverityTotals, incidentN: incidents.length, incidentChiSquare,
    compositionBySite,
    hourlyProfile24, hourlyProfile24BySite,
    rawMovementCount: rawMovements.length, siteHourCount: siteHour.length, siteHourRows: siteHour,
    dateRange: { start: '2026-08-02', end: '2026-08-03' }, surveyWindow: '07:00-18:00',
    shortName,
  };
}
const shortName = (n) => n;

// ---------------------------------------------------------------------------
// Human-readable formulas + data-source notes, shown in the UI's
// "Methodology" panels so every figure's workflow is visible, not just its
// result.
// ---------------------------------------------------------------------------
export const DATA_SOURCES = {
  rawMovements: '984 real classified hourly movement records, reconciled 1:1 against the four supplied raw per-junction count workbooks (Kibuye, Wandegeya, Bakuli, Bwaise). 2026-08-02 to 2026-08-03, 07:00-18:00. No Natete data was ever supplied.',
  siteHour: 'The same 984 records aggregated to 96 real site-hour rows, carrying the static + dynamic PCU model at that grain.',
  incidents: '841 real, independently-verified traffic-incident records across the Kampala road network, with incident type and severity. Unaffected by the count-data correction.',
};

export const FORMULAS = {
  staticPCU: { formula: 'Speed-area equivalency: PCU_i = (Speed_car / Speed_i) x (Area_i / Area_car), Area = Length x Width. Literature-based length/width/speed assumptions (editable) used because no measured tricycle dimensions or speeds exist in the raw counts.', source: 'Assumptions_References', n: 'n/a (formula, not sampled)' },
  resultsBySite: { formula: 'Motorized-vehicle and tricycle totals summed directly from the reconciled raw movement records, per site', source: 'rawMovements', n: '984 records, 4 sites' },
  dynamicPcuBySite: { formula: 'Dynamic PCU = Static PCU x [1 + beta x (Demand Pressure - 0.5)], beta = 0.4; Demand Pressure = hourly motorized flow / that site\'s own maximum recorded hourly flow. Site figures are the tricycle-count-weighted mean of the 24 real hourly rows per site.', source: 'siteHour', n: '96 site-hour rows (24/site)' },
  dynamicPcuByTimePeriod: { formula: 'Same dynamic-PCU model, rows grouped by the three real recorded time periods (Morning Peak 07-09h, Midday/Off-Peak 10-15h, Evening Peak 16-18h)', source: 'siteHour', n: '96 site-hour rows' },
  dynamicPcuByJunctionType: { formula: 'Same dynamic-PCU model, rows grouped by junction type. Kibuye is the only roundabout in the study -- this comparison is descriptive only and is not a statistically valid intersection-type test (n=1 roundabout site).', source: 'siteHour', n: '96 site-hour rows' },
  weatherAvailability: { formula: 'Record counts and mean dynamic PCU by the weather label actually recorded on the source count sheets. Zero wet/rain hours were recorded, so no empirical wet-vs-dry comparison exists; the wet-pavement figure shown elsewhere is an explicit sensitivity scenario, not a measured result.', source: 'siteHour', n: '96 site-hour rows' },
  wetPavementScenario: { formula: 'Dry/observed dynamic PCU x 1.10 (an editable scenario multiplier). Zero wet-pavement observations exist in the source data -- this is a disclosed sensitivity scenario, never presented as a measured finding.', source: 'siteHour (dry baseline) + scenario assumption', n: '96 site-hour rows' },
  speedSensitivity: { formula: 'Static PCU recomputed at the lower and upper bounds of the literature tricycle operating-speed range (20-35 km/h) instead of the 27.5 km/h base assumption, holding length/width fixed', source: 'Assumptions_References (formula)', n: 'n/a' },
  regionalBenchmark: { formula: 'This study\'s base passenger-tricycle static PCU compared against two regional PCU ranges cited in the original study proposal (p.12), as a sanity check -- not a calibration target', source: 'original study proposal, p.12', n: 'n/a' },
  allDataSensitivity: { formula: 'Primary all-data totals vs. the same totals with the 7 flagged high-concentration Kibuye passenger-tricycle records removed -- diagnostic only; the primary results above always use the all-data column, no observation is deleted', source: 'rawMovements', n: '984 records (7 flagged)' },
  tricycleSiteAnova: { formula: 'One-way ANOVA, Tricycle Total per real movement record across the 4 real sites: F = MS_between / MS_within', source: 'rawMovements', n: '984 records, 4 sites' },
  tricycleSiteKruskalWallis: { formula: 'Kruskal-Wallis H test (non-parametric one-way ANOVA on ranks) -- distribution-free robustness check on the site ANOVA above', source: 'rawMovements', n: '984 records, 4 sites' },
  tricyclePeriodAnova: { formula: 'One-way ANOVA, Tricycle Total per real movement record across the 3 real recorded time periods', source: 'rawMovements', n: '984 records, 3 periods' },
  tricyclePeriodKruskalWallis: { formula: 'Kruskal-Wallis H test -- distribution-free robustness check on the time-period ANOVA above', source: 'rawMovements', n: '984 records, 3 periods' },
  flowTricycleCorrelation: { formula: 'Pearson correlation, real hourly all-data motorized flow vs. real hourly tricycle total, across every site-hour row: r = cov(x,y) / (sigma_x . sigma_y). Two independently observed quantities -- not the demand-pressure/PCU relationship, which is definitional by formula and is never reported as a statistical finding.', source: 'siteHour', n: '96 site-hour rows' },
  kibuyePoissonBins: { formula: 'Observed vs. Poisson-expected hourly tricycle-arrival counts (exact log-space pmf, lambda = the site\'s own real hourly mean), Kibuye, the site with the most tricycle activity. Disclosed small-sample limitation: only 24 real hourly observations exist for this site.', source: 'siteHour (Kibuye)', n: '24 real hourly rows' },
  incidentChiSquare: { formula: 'Chi-square test of independence, IncidentType x Severity, on the real crosstab', source: 'incidents', n: '841' },
  compositionBySite: { formula: 'Vehicle-class totals (Motorcycles, Passenger Tricycle, Cargo Tricycle, Cars/Taxi, all other motorized classes combined) summed from the real site-hour aggregates, as a % of that site\'s total motorized flow', source: 'siteHour', n: '96 site-hour rows' },
  hourlyProfile24: { formula: '07:00-18:00: real mean hourly value per surveyed junction, averaged across the 2 survey days (and across sites for the "All Sites" series). 19:00-06:00: no vehicle was ever counted in this window; these hours are a disclosed, purely mathematical connector -- a straight trend line between the real 18:00 and 07:00 values, multiplied by a cosine-shaped dip that reaches an editable trough ratio (default 15% of the trend line) at its midpoint. This is a visual/contextual construction only, never a measured or literature-sourced result, and is rendered as a distinct, toggleable segment.', source: 'siteHour (measured hours) + disclosed overnight connector (unmeasured hours)', n: '96 real site-hour rows (measured segment); 12 modeled hours (unmeasured segment)' },
};

// ---------------------------------------------------------------------------
// Fetch + parse all three datasets and compute stats. Cached at module scope
// so every tab that mounts this hook in the same page session only fetches
// once.
// ---------------------------------------------------------------------------
let cachedPromise = null;
export function loadTrafficStats(baseUrl) {
  if (!cachedPromise) {
    cachedPromise = Promise.all([
      fetch(`${baseUrl}data/raw_movements.csv`).then((r) => r.text()),
      fetch(`${baseUrl}data/site_hour.csv`).then((r) => r.text()),
      fetch(`${baseUrl}data/incidents.csv`).then((r) => r.text()),
    ]).then(([raw, hourAgg, inc]) => computeTrafficStats(parseCsv(raw), parseCsv(hourAgg), parseCsv(inc)));
  }
  return cachedPromise;
}
