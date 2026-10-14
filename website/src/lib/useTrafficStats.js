import { useState, useEffect } from 'react';
import { loadTrafficStats } from './trafficStats';

// Shared hook: fetches the two real field datasets + incidents CSV and
// computes every dynamic figure the site shows, live in the browser.
// Returns null while loading (first mount only -- cached after that).
export default function useTrafficStats() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    let cancelled = false;
    loadTrafficStats(baseUrl).then((s) => { if (!cancelled) setStats(s); });
    return () => { cancelled = true; };
  }, []);
  return stats;
}
