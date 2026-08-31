import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  Cell,
} from "recharts";
import { TrendingUp, Award, DollarSign, Calendar, Sparkles, Sprout, ArrowUpRight } from "lucide-react";
import { STANDARD_MODULE_YIELD_6_MONTHS, WATERFALL_ROI_DATA, MONTHLY_BREAKEVEN_DATA } from "../data";

export const ProductionAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"waterfall" | "cumulative">("waterfall");

  return (
    <section id="production" className="py-20 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-xl">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Données Réelles & Rentabilité Mesurable</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-white">
            Ce Que Vous Produisez en 6 Mois
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Des rendements prouvés sur le terrain à Pointe-Noire, calculés sur un module standard (Potager + 10 poules + 4 lapines).
          </p>
        </div>

        {/* 4 Standard Production Metric Cards (from Slide 4) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Card 1: 1 m2 potager */}
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-emerald-500/30 relative overflow-hidden shadow-xl shadow-black/20 group hover:border-emerald-500 hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">1 m² potager</span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-semibold">Maraîchage</span>
            </div>
            <div className="text-3xl font-black font-['Outfit'] text-white mb-1">
              22 kg
            </div>
            <div className="text-sm font-semibold text-emerald-300 mb-3">
              de légumes frais
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Amarante, oseille de Guinée, ciboule, tomates & piments récoltés en continu.
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-300 flex justify-between">
              <span>Valeur estimée :</span>
              <span className="font-bold text-emerald-400">110 000 FCFA</span>
            </div>
          </div>

          {/* Card 2: 10 poules */}
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-amber-500/30 relative overflow-hidden shadow-xl shadow-black/20 group hover:border-amber-500 hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">10 poules</span>
              <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-semibold">Aviculture</span>
            </div>
            <div className="text-3xl font-black font-['Outfit'] text-white mb-1">
              1 300
            </div>
            <div className="text-sm font-semibold text-amber-300 mb-3">
              œufs frais de ferme
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Protéines quotidiennes saines pour les enfants et cantines scolaires.
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-300 flex justify-between">
              <span>Valeur estimée :</span>
              <span className="font-bold text-amber-400">195 000 FCFA</span>
            </div>
          </div>

          {/* Card 3: 4 lapines */}
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-purple-500/30 relative overflow-hidden shadow-xl shadow-black/20 group hover:border-purple-500 hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">4 lapines</span>
              <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-semibold">Cuniculiculture</span>
            </div>
            <div className="text-3xl font-black font-['Outfit'] text-white mb-1">
              60 kg
            </div>
            <div className="text-sm font-semibold text-purple-300 mb-3">
              de viande blanche saine
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Chair tendre et diététique avec une vitesse de reproduction remarquable.
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-300 flex justify-between">
              <span>Valeur estimée :</span>
              <span className="font-bold text-purple-400">210 000 FCFA</span>
            </div>
          </div>

          {/* Card 4: Bonus Compost */}
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-teal-500/30 relative overflow-hidden shadow-xl shadow-black/20 group hover:border-teal-500 hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Bonus compost</span>
              <span className="px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 text-xs font-semibold">Fertilisant Bio</span>
            </div>
            <div className="text-3xl font-black font-['Outfit'] text-white mb-1">
              50 sacs
            </div>
            <div className="text-sm font-semibold text-teal-300 mb-3">
              revendables ou réutilisés
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Engrais organique prêt à l'emploi issu du recyclage naturel des fientes.
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-300 flex justify-between">
              <span>Valeur estimée :</span>
              <span className="font-bold text-teal-400">150 000 FCFA</span>
            </div>
          </div>

        </div>

        {/* Financial ROI Deep Dive (from Slide 5) */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl shadow-black/40">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Analyse Financière & Retour sur Investissement
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-white mt-2">
                Le ROI : 665 000 FCFA de Valeur en 6 Mois
              </h3>
              <p className="text-slate-300 text-sm mt-1">
                Un investissement qui se rembourse tout seul dès le 6ème mois.
              </p>
            </div>

            {/* Quick Toggle between Visuals */}
            <div className="inline-flex bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl">
              <button
                onClick={() => setActiveTab("waterfall")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "waterfall"
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg border border-emerald-400/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Cascade des Flux (Waterfall)
              </button>
              <button
                onClick={() => setActiveTab("cumulative")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "cumulative"
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg border border-emerald-400/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Courbe d'Amortissement
              </button>
            </div>
          </div>

          {/* Key Metrics Highlight Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-6">
            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <div className="text-xs text-slate-400">Investissement Initial</div>
              <div className="text-xl font-bold text-rose-400 font-['Outfit']">444 000 FCFA</div>
              <div className="text-[10px] text-slate-400">Site Pilote École/Église</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <div className="text-xs text-slate-400">Valeur Produite (6 mois)</div>
              <div className="text-xl font-bold text-emerald-400 font-['Outfit']">665 000 FCFA</div>
              <div className="text-[10px] text-slate-400">Légumes + Œufs + Viande + Compost</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <div className="text-xs text-slate-400">Bénéfice Net Netto</div>
              <div className="text-xl font-bold text-amber-400 font-['Outfit']">+221 000 FCFA</div>
              <div className="text-[10px] text-slate-400">Dès le 6ème mois</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <div className="text-xs text-slate-400">Point Mort (Break-even)</div>
              <div className="text-xl font-bold text-teal-400 font-['Outfit']">Mois 5,5</div>
              <div className="text-[10px] text-slate-400">Remboursement total garanti</div>
            </div>
          </div>

          {/* Recharts Container */}
          <div className="h-80 w-full pt-4">
            {activeTab === "waterfall" ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={WATERFALL_ROI_DATA} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.5} />
                  <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
                  <YAxis
                    stroke="#94a3b8"
                    tick={{ fill: "#cbd5e1", fontSize: 11 }}
                    tickFormatter={(v) => `${v / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: "rgba(15, 23, 42, 0.9)", backdropFilter: "blur(12px)", borderColor: "rgba(255, 255, 255, 0.15)", borderRadius: "1rem", color: "#fff" }}
                    formatter={(value: any) => [`${Number(value).toLocaleString()} FCFA`, "Montant"]}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {WATERFALL_ROI_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MONTHLY_BREAKEVEN_DATA} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.5} />
                  <XAxis dataKey="month" stroke="#94a3b8" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
                  <YAxis
                    stroke="#94a3b8"
                    tick={{ fill: "#cbd5e1", fontSize: 11 }}
                    tickFormatter={(v) => `${v / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: "rgba(15, 23, 42, 0.9)", backdropFilter: "blur(12px)", borderColor: "rgba(255, 255, 255, 0.15)", borderRadius: "1rem", color: "#fff" }}
                    formatter={(value: any) => [`${Number(value).toLocaleString()} FCFA`]}
                  />
                  <Legend wrapperStyle={{ paddingTop: "10px" }} />
                  <Line type="monotone" dataKey="cumulRevenu" name="Valeur Récoltes Cumulée" stroke="#10b981" strokeWidth={3} dot={{ r: 5, fill: "#10b981" }} />
                  <Line type="monotone" dataKey="cumulDepense" name="Investissement Initial" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="balance" name="Solde Net (Rentabilité)" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5, fill: "#f59e0b" }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-emerald-950/40 backdrop-blur-xl border border-emerald-500/30 text-xs text-emerald-200 flex items-center justify-between">
            <span>✨ <strong>Synthèse économique :</strong> Dès la fin du 6ème mois, votre installation est 100% amortie et continue de produire des denrées alimentaires à coût quasi nul.</span>
          </div>

        </div>

      </div>
    </section>
  );
};
