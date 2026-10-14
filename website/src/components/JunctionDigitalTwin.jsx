import React, { useEffect, useRef } from 'react';

// ---------------------------------------------------------------------------
// Junction Digital Twin -- an animated schematic of one junction's approach
// legs, with moving markers standing in for vehicles.
//
// IMPORTANT -- like the Directional Split simulator this reuses, this is a
// disclosed illustration, not a physics simulation and not a measurement.
// Nothing about vehicle positions, exact paths, or moment-to-moment motion
// was recorded in the field data. What IS real and drives every number you
// can read off this animation:
//   - the junction type / leg count (author-confirmed)
//   - each leg's assumed share of the junction's real ADT (the same
//     Directional Split model computed alongside this component)
//   - the vehicle-class mix (Cars/Motorcycles/Tricycles/Minibuses/Heavy
//     Trucks), which is real, measured field20 data for this junction
//   - the mean V/C ratio, which sets how congested (slow/dense) the
//     animation looks, also real field20 data
// The layout itself (legs spaced evenly around a circle) is schematic and
// not to scale or true bearing -- real leg bearings were not part of this
// study's scope.
// ---------------------------------------------------------------------------

const VEHICLE_SIZE = { Cars: 5.5, Boda_bodas: 3.4, Tricycles: 4.4, Minibuses: 6.4, Heavy_Trucks: 7.4 };

function pickWeighted(classMix, rand) {
  const total = classMix.reduce((a, r) => a + r.sharePct, 0) || 1;
  let x = rand() * total;
  for (const r of classMix) {
    x -= r.sharePct;
    if (x <= 0) return r.vehicleClass;
  }
  return classMix[0]?.vehicleClass || 'Cars';
}

export default function JunctionDigitalTwin({
  legConfig, legFlows, classMix, vcMean, classColors, hubColor = '#0071e3', laneColor = 'rgba(0,0,0,0.16)',
  labelColor = '#1d1d1f', subColor = '#6e6e73', height = 640,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const stateRef = useRef({ particles: [], last: 0 });
  const paramsRef = useRef({});

  // keep latest props available to the running animation loop without
  // tearing the loop down and restarting it on every render
  paramsRef.current = { legConfig, legFlows, classMix, vcMean, classColors };

  useEffect(() => {
    // junction changed -- old particles reference the previous leg layout,
    // so clear them rather than let them jump to a mismatched leg count
    stateRef.current.particles = [];
  }, [legConfig, legFlows]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return undefined;
    const ctx = canvas.getContext('2d');
    let raf;
    let seed = 42;
    const rand = () => {
      // deterministic PRNG so the animation is reproducible frame-to-frame
      // rather than relying on Math.random's non-seeded state
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return (seed % 10000) / 10000;
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const step = (t) => {
      const { legConfig: cfg, legFlows: flows, classMix: mix, vcMean: vc, classColors: colors } = paramsRef.current;
      const dt = stateRef.current.last ? Math.min((t - stateRef.current.last) / 1000, 0.05) : 0.016;
      stateRef.current.last = t;

      const w = canvas.clientWidth;
      const h = height;
      const cx = w / 2;
      const cy = h / 2;
      const outerR = Math.min(w, h) / 2 - 84;
      const hubR = 30;
      const n = cfg.legs.length;
      const congestion = Math.max(0, Math.min(1, (vc - 0.5) / 0.6)); // 0 free-flow .. 1 saturated
      const speedFactor = 1 - 0.65 * congestion;
      const maxVol = Math.max(...flows.map((f) => f.volume), 1);

      ctx.clearRect(0, 0, w, h);

      // legs -- drawn as a full carriageway band (not a single thin line), with
      // a dashed center lane-divider and solid edge lines standing in for real
      // lane markings, so the roadway itself communicates width/multi-lane
      // structure. Carriageway width is still schematic (not to scale).
      const angles = cfg.legs.map((_, i) => (Math.PI * 2 * i) / n - Math.PI / 2);
      const legWidths = cfg.legs.map((_, i) => (flows[i]?.isPrimary ? 46 : 32));
      angles.forEach((ang, i) => {
        const ex = cx + Math.cos(ang) * outerR;
        const ey = cy + Math.sin(ang) * outerR;
        const legW = legWidths[i];
        const perp = ang + Math.PI / 2;
        const px = Math.cos(perp), py = Math.sin(perp);

        // carriageway band
        ctx.strokeStyle = laneColor;
        ctx.lineWidth = legW;
        ctx.lineCap = 'butt';
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(ex, ey);
        ctx.stroke();

        // edge lines (carriageway shoulders)
        ctx.strokeStyle = 'rgba(0,0,0,0.22)';
        ctx.lineWidth = 1.5;
        [-1, 1].forEach((side) => {
          ctx.beginPath();
          ctx.moveTo(cx + px * (legW / 2) * side, cy + py * (legW / 2) * side);
          ctx.lineTo(ex + px * (legW / 2) * side, ey + py * (legW / 2) * side);
          ctx.stroke();
        });

        // dashed center lane-divider, separating the two directions of flow
        ctx.strokeStyle = 'rgba(255,255,255,0.85)';
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 10]);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        ctx.setLineDash([]);

        // leg label
        const lx = cx + Math.cos(ang) * (outerR + 26);
        const ly = cy + Math.sin(ang) * (outerR + 26);
        ctx.fillStyle = labelColor;
        ctx.font = '600 13px Inter, system-ui, sans-serif';
        ctx.textAlign = Math.cos(ang) > 0.3 ? 'left' : Math.cos(ang) < -0.3 ? 'right' : 'center';
        const shortLeg = cfg.legs[i].split(' — ')[0].split(' (')[0];
        ctx.fillText(`${flows[i]?.isPrimary ? '★ ' : ''}${shortLeg}`, lx, ly);
        ctx.fillStyle = subColor;
        ctx.font = '500 11.5px Inter, system-ui, sans-serif';
        ctx.fillText(`${Math.round(flows[i]?.volume || 0).toLocaleString()} ADT/day`, lx, ly + 16);

        // spawn particles proportional to this leg's simulated share of real
        // ADT. Each direction of travel is pinned to its own side of the
        // center divider (outbound / dir:1 on one lane, inbound / dir:-1 on
        // the other) so the two-way flow reads as two distinct lanes rather
        // than randomly-scattered dots.
        const laneOffset = legW * 0.24;
        const laneJitter = legW * 0.14;
        const vol = flows[i]?.volume || 0;
        const spawnPerSec = (vol / maxVol) * 9 + 0.4;
        if (rand() < spawnPerSec * dt) {
          const cls = pickWeighted(mix, rand);
          stateRef.current.particles.push({
            leg: i, t: 0, dir: 1,
            speed: (0.28 + rand() * 0.12) * speedFactor,
            offset: laneOffset + (rand() - 0.5) * laneJitter,
            cls,
          });
        }
        if (rand() < spawnPerSec * dt * 0.85) {
          const cls = pickWeighted(mix, rand);
          stateRef.current.particles.push({
            leg: i, t: 1, dir: -1,
            speed: (0.28 + rand() * 0.12) * speedFactor,
            offset: -laneOffset + (rand() - 0.5) * laneJitter,
            cls,
          });
        }
      });

      // hub -- color ramps green -> orange -> red with mean V/C
      const hubColorMix = congestion < 0.5
        ? `rgba(48, 209, 88, ${0.85})`
        : congestion < 0.85 ? `rgba(255, 159, 10, 0.9)` : `rgba(255, 69, 58, 0.9)`;
      ctx.beginPath();
      ctx.fillStyle = hubColorMix;
      ctx.arc(cx, cy, hubR, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // particles
      stateRef.current.particles = stateRef.current.particles.filter((p) => {
        p.t += p.dir * p.speed * dt;
        if (p.t <= 0 || p.t >= 1) return false;
        const ang = angles[p.leg];
        const r = hubR + p.t * (outerR - hubR);
        const px = cx + Math.cos(ang) * r + Math.cos(ang + Math.PI / 2) * p.offset;
        const py = cy + Math.sin(ang) * r + Math.sin(ang + Math.PI / 2) * p.offset;
        ctx.beginPath();
        ctx.fillStyle = colors[p.cls] || '#0071e3';
        ctx.arc(px, py, VEHICLE_SIZE[p.cls] || 4, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });
      // cap particle count defensively so a tab left open all day doesn't grow unbounded
      if (stateRef.current.particles.length > 260) {
        stateRef.current.particles.splice(0, stateRef.current.particles.length - 260);
      }

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: `${height}px`, position: 'relative' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: `${height}px` }} />
    </div>
  );
}
