import React from "react";
import { AlertCircle, ShoppingCart, TrendingUp, Users, ArrowRight, ShieldAlert, Check } from "lucide-react";

export const ProblemSection: React.FC = () => {
  return (
    <section id="probleme" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-rose-500/10 text-rose-300 border border-rose-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-xl">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>La Réalité Urbaine à Pointe-Noire</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
            Le Problème : Malnutrition & Dépendance Alimentaire
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Pourquoi continuer à subir les flambées de prix du marché quand chaque mètre carré de votre cour peut produire des aliments frais et des revenus ?
          </p>
        </div>

        {/* 3 Core Pain Points (from Slide 2) */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Card 1: 60% des ménages dépendants */}
          <div className="bg-[#0f172a] rounded-3xl p-8 border border-slate-700/80 shadow-xl shadow-black/40 hover:border-amber-400/60 hover:-translate-y-1 transition-all relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div className="text-4xl font-black text-amber-400 font-['Outfit'] mb-2">
              60%
            </div>
            <h3 className="text-lg font-bold text-white mb-3">
              des ménages dépendants
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed">
              À Pointe-Noire, la majorité des familles dépendent exclusivement du marché pour leur alimentation quotidienne, sans contrôle sur la provenance ni sur la fraîcheur.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-semibold text-slate-300">
              Vulnérabilité face aux pénuries et ruptures
            </div>
          </div>

          {/* Card 2: +40% en saison sèche */}
          <div className="bg-[#0f172a] rounded-3xl p-8 border border-slate-700/80 shadow-xl shadow-black/40 hover:border-rose-400/60 hover:-translate-y-1 transition-all relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-4xl font-black text-rose-400 font-['Outfit'] mb-2">
              +40%
            </div>
            <h3 className="text-lg font-bold text-white mb-3">
              en saison sèche
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed">
              Le coût des légumes frais explose chaque année lors des saisons sèches, rendant une alimentation équilibrée et vitaminée inaccessible pour beaucoup de foyers.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-semibold text-slate-300">
              Inflation récurrente qui pèse sur le pouvoir d'achat
            </div>
          </div>

          {/* Card 3: Écoles & Églises sous pression */}
          <div className="bg-[#0f172a] rounded-3xl p-8 border border-slate-700/80 shadow-xl shadow-black/40 hover:border-indigo-400/60 hover:-translate-y-1 transition-all relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-3xl font-black text-indigo-300 font-['Outfit'] mb-2">
              Écoles & Églises
            </div>
            <h3 className="text-lg font-bold text-white mb-3">
              sous forte pression
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed">
              Budget cantine limité, protéines insuffisantes — les institutions peinent à nourrir correctement leurs élèves et communautés sans dépasser leurs moyens financiers.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-semibold text-slate-300">
              Nécessité d'une solution d'autonomie productive
            </div>
          </div>

        </div>

        {/* Transition Banner: Traditional vs 242Agro */}
        <div className="mt-14 bg-[#0f172a] rounded-3xl p-8 text-white border border-slate-700/80 shadow-2xl shadow-black/50">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-3.5 py-1 rounded-full border border-emerald-500/40">
                La Réponse 242Agro
              </span>
              <h3 className="text-2xl font-bold font-['Outfit'] text-white">
                Passer de la dépendance coûteuse à la souveraineté alimentaire rentable
              </h3>
              <p className="text-slate-200 text-sm leading-relaxed">
                En installant un système hors-sol circulaire, vous produisez vous-mêmes vos légumes, vos œufs et votre viande à coût nul en engrais, tout en valorisant vos espaces inoccupés.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <a
                href="#solution"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm px-6 py-3.5 rounded-2xl transition-all shadow-lg shadow-emerald-500/25 border-2 border-emerald-300 active:scale-95"
              >
                <span>Découvrir la Boucle Circulaire</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
