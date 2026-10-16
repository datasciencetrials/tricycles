import React from 'react';
import PageControls from './PageControls';

export default function EvidenceStatus({ goBack, canGoBack } = {}) {
  return (
    <div className="evidence-status">
      <style>{`
        .evidence-status { max-width: 920px; margin: 0 auto; padding: 28px 18px 80px; color: #1d1d1f; }
        .evidence-panel { margin-top: 34px; background: #fff; border: 1px solid rgba(0,0,0,.08); border-radius: 22px; padding: clamp(24px, 5vw, 46px); box-shadow: 0 18px 45px -30px rgba(0,0,0,.35); }
        .evidence-icon { width: 54px; height: 54px; border-radius: 16px; display: grid; place-items: center; background: #fff3d6; color: #8a5a00; font-size: 1.35rem; }
        .evidence-panel h1 { font-size: clamp(2rem, 4vw, 3rem); letter-spacing: -.03em; margin: 20px 0 12px; }
        .evidence-panel p, .evidence-panel li { color: #5f6065; line-height: 1.65; }
        .evidence-panel strong { color: #1d1d1f; }
      `}</style>
      <PageControls onBack={goBack} canGoBack={canGoBack} exportOptions={[]} />
      <section className="evidence-panel">
        <div className="evidence-icon"><i className="fa-solid fa-shield-halved"></i></div>
        <h1>Thesis evidence review in progress</h1>
        <p>The earlier browser-rendered thesis mixed verified observations with fields that are not present in the governed source files. It has been withheld to prevent unsupported figures being presented as evidence.</p>
        <p><strong>Available now:</strong> the Overview, Summary Tables and Analytics tabs use the source-reconciled four-site dataset, comprising 984 classified movement records, 96 site-hour aggregates and 841 incident records.</p>
        <p>A thesis version will only return here after every table, test, figure and narrative claim has been reconciled to a named source and its measured, modelled or unavailable status is explicit.</p>
      </section>
    </div>
  );
}
