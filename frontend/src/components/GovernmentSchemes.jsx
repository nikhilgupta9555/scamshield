import React, { useState, useEffect } from 'react';
import { Landmark, ExternalLink, ShieldAlert, CheckCircle, FileSpreadsheet } from 'lucide-react';

export default function GovernmentSchemes() {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/schemes')
      .then(res => res.json())
      .then(data => setSchemes(data))
      .catch(() => {
        setSchemes([
          {
            id: "pm-kisan",
            name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
            benefit: "₹6,000 per year directly transferred in 3 equal installments into farmer bank accounts.",
            eligibility: "Small and marginal farmers holding cultivable land.",
            agristack_integration: "Linked via Farmer ID & e-KYC integration.",
            status: "Active / Next Installment Eligible",
            action_link: "https://pmkisan.gov.in"
          },
          {
            id: "pmfby",
            name: "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
            benefit: "Comprehensive crop insurance covering yield loss due to non-preventable natural risks.",
            eligibility: "All farmers growing notified crops in notified areas.",
            agristack_integration: "Satellite geo-fencing yield assessment integration.",
            status: "Kharif & Rabi Season Open",
            action_link: "https://pmfby.gov.in"
          },
          {
            id: "shc",
            name: "Soil Health Card Scheme (Krishi DSS)",
            benefit: "Free soil testing card providing N-P-K & micronutrient status with fertilizer recommendations.",
            eligibility: "All agricultural landowners across Indian states.",
            agristack_integration: "Digital Soil Registry synced with land parcel GIS map.",
            status: "Report Ready for Download",
            action_link: "https://soilhealth.dac.gov.in"
          }
        ]);
      });
  }, []);

  return (
    <div className="glass-panel rounded-2xl p-5 border border-emerald-800/40 space-y-4 shadow-xl">
      
      <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              Digital India & AgriStack Integration Registry
              <span className="text-[10px] bg-amber-950/80 text-amber-300 border border-amber-800/50 px-2 py-0.5 rounded-md font-semibold">
                Government Alignment
              </span>
            </h2>
            <p className="text-[11px] text-emerald-400/80">
              Direct access to PM-KISAN, PMFBY Insurance & Digital Soil Registry
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {schemes.map(sch => (
          <div key={sch.id} className="bg-slate-950/80 border border-emerald-900/60 hover:border-emerald-500/60 rounded-xl p-4 flex flex-col justify-between transition-all group">
            
            <div>
              <div className="flex items-center justify-between text-[10px] font-bold text-emerald-400 mb-1">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-400" /> {sch.status}
                </span>
                <span className="bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 text-emerald-300">
                  AgriStack Synced
                </span>
              </div>

              <h3 className="text-xs font-extrabold text-slate-100 group-hover:text-amber-300 transition-colors mb-2">
                {sch.name}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                {sch.benefit}
              </p>

              <div className="text-[11px] text-slate-400 bg-slate-900 p-2 rounded border border-slate-800 space-y-1">
                <div><span className="text-emerald-400 font-semibold">Eligibility:</span> {sch.eligibility}</div>
                <div><span className="text-amber-400 font-semibold">AgriStack:</span> {sch.agristack_integration}</div>
              </div>
            </div>

            <a
              href={sch.action_link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full py-1.5 bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/50 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Apply / Verify Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

          </div>
        ))}
      </div>

    </div>
  );
}
