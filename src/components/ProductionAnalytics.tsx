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
    <section id="production" className="py-20 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-lime-50 text-[#65a30d] border border-lime-200 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
            <TrendingUp className="w-3.5 h-3.5 text-[#65a30d]" />
            <span>Données Réelles & Rentabilité Mesurable</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-['Outfit'] text-slate-950">
            Ce Que Vous Produisez en 6 Mois
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Des rendements prouvés sur le terrain à Pointe-Noire, calculés sur un module standard (Potager + 10 poules + 4 lapines).
          </p>
        </div>

        {/* 4 Standard Production Metric Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Card 1: 1 m2 potager */}
          <div className="bg-white rounded-3xl p-6 border border-lime-200 relative overflow-hidden shadow-sm group hover:shadow-xl hover:border-lime-500 hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#65a30d]">1 m² potager</span>
              <span className="px-2.5 py-1 rounded-full bg-lime-50 text-[#65a30d] border border-lime-200 text-xs font-bold">Maraîchage</span>
            </div>
            <div className="text-3xl font-black font-['Outfit'] text-slate-950 mb-1">
              22 kg
            </div>
            <div className="text-sm font-bold text-[#65a30d] mb-3">
              de légumes frais
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Amarante, oseille de Guinée, ciboule, tomates & piments récoltés en continu.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-600 flex justify-between">
              <span>Valeur estimée :</span>
              <span className="font-bold text-[#65a30d]">110 000 FCFA</span>
            </div>
          </div>

          {/* Card 2: 10 poules */}
          <div className="bg-white rounded-3xl p-6 border border-amber-200 relative overflow-hidden shadow-sm group hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">10 poules</span>
              <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold">Aviculture</span>
            </div>
            <div className="text-3xl font-black font-['Outfit'] text-slate-950 mb-1">
              1 300
            </div>
            <div className="text-sm font-bold text-amber-600 mb-3">
              œufs frais de ferme
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Protéines quotidiennes saines pour les enfants et cantines scolaires.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-600 flex justify-between">
              <span>Valeur estimée :</span>
              <span className="font-bold text-amber-600">195 000 FCFA</span>
            </div>
          </div>

          {/* Card 3: 4 lapines */}
          <div className="bg-white rounded-3xl p-6 border border-purple-200 relative overflow-hidden shadow-sm group hover:shadow-xl hover:border-purple-400 hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700">4 lapines</span>
              <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold">Cuniculiculture</span>
            </div>
            <div className="text-3xl font-black font-['Outfit'] text-slate-950 mb-1">
              60 kg
            </div>
            <div className="text-sm font-bold text-purple-700 mb-3">
              de viande blanche saine
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Chair tendre et diététique avec une vitesse de reproduction remarquable.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-600 flex justify-between">
              <span>Valeur estimée :</span>
              <span className="font-bold text-purple-700">210 000 FCFA</span>
            </div>
          </div>

          {/* Card 4: Bonus Compost */}
          <div className="bg-white rounded-3xl p-6 border border-teal-200 relative overflow-hidden shadow-sm group hover:shadow-xl hover:border-teal-400 hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Bonus compost</span>
              <span className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-xs font-bold">Fertilisant Bio</span>
            </div>
            <div className="text-3xl font-black font-['Outfit'] text-slate-950 mb-1">
              1,5 tonne
            </div>
            <div className="text-sm font-bold text-teal-700 mb-3">
              revendables ou réutilisés
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Engrais organique prêt à l'emploi issu du recyclage naturel des fientes.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-600 flex justify-between">
              <span>Valeur estimée :</span>
              <span className="font-bold text-teal-700">150 000 FCFA</span>
            </div>
          </div>

        </div>

        {/* Financial ROI Deep Dive */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Analyse Financière & Retour sur Investissement
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-slate-950 mt-2">
                Le ROI : 665 000 FCFA de Valeur en 6 Mois
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Un investissement qui se rembourse tout seul dès le 6ème mois.
              </p>
            </div>

            {/* Quick Toggle between Visuals */}
            <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              <button
                onClick={() => setActiveTab("waterfall")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "waterfall"
                    ? "bg-[#84cc16] text-slate-950 shadow-xs font-extrabold"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                Cascade des Flux (Waterfall)
              </button>
              <button
                onClick={() => setActiveTab("cumulative")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "cumulative"
                    ? "bg-[#84cc16] text-slate-950 shadow-xs font-extrabold"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                Courbe d'Amortissement
              </button>
            </div>
          </div>

          {/* Key Metrics Highlight Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-6">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-600 font-medium">Investissement Initial</div>
              <div className="text-xl font-black text-rose-600 font-['Outfit']">444 000 FCFA</div>
              <div className="text-[10px] text-slate-500">Site Pilote École/Église</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-600 font-medium">Valeur Produite (6 mois)</div>
              <div className="text-xl font-black text-[#65a30d] font-['Outfit']">665 000 FCFA</div>
              <div className="text-[10px] text-slate-500">Légumes + Œufs + Viande + Compost</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-600 font-medium">Bénéfice Net Réel</div>
              <div className="text-xl font-black text-amber-600 font-['Outfit']">+221 000 FCFA</div>
              <div className="text-[10px] text-slate-500">Dès le 6ème mois</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-600 font-medium">Point Mort (Break-even)</div>
              <div className="text-xl font-black text-teal-700 font-['Outfit']">Mois 5,5</div>
              <div className="text-[10px] text-slate-500">Remboursement total garanti</div>
            </div>
          </div>

          {/* Recharts Container */}
          <div className="h-80 w-full pt-4">
            {activeTab === "waterfall" ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={WATERFALL_ROI_DATA} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} opacity={0.7} />
                  <XAxis dataKey="name" stroke="#64748b" tick={{ fill: "#475569", fontSize: 12 }} />
                  <YAxis
                    stroke="#64748b"
                    tick={{ fill: "#475569", fontSize: 11 }}
                    tickFormatter={(v) => `${v / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "1rem", color: "#0f172a", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
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
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} opacity={0.7} />
                  <XAxis dataKey="month" stroke="#64748b" tick={{ fill: "#475569", fontSize: 12 }} />
                  <YAxis
                    stroke="#64748b"
                    tick={{ fill: "#475569", fontSize: 11 }}
                    tickFormatter={(v) => `${v / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "1rem", color: "#0f172a", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                    formatter={(value: any) => [`${Number(value).toLocaleString()} FCFA`]}
                  />
                  <Legend wrapperStyle={{ paddingTop: "10px" }} />
                  <Line type="monotone" dataKey="cumulRevenu" name="Valeur Récoltes Cumulée" stroke="#16a34a" strokeWidth={3} dot={{ r: 5, fill: "#16a34a" }} />
                  <Line type="monotone" dataKey="cumulDepense" name="Investissement Initial" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="balance" name="Solde Net (Rentabilité)" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5, fill: "#f59e0b" }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-lime-50 border border-lime-200 text-xs text-slate-800 flex items-center justify-between">
            <span>✨ <strong>Synthèse économique :</strong> Dès la fin du 6ème mois, votre installation est 100% amortie et continue de produire des denrées alimentaires à coût quasi nul.</span>
          </div>

        </div>

      </div>
    </section>
  );
};
