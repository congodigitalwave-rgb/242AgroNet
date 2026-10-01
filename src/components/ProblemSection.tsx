import React from "react";
import { AlertCircle, ShoppingCart, TrendingUp, Users, ArrowRight, Sparkles } from "lucide-react";

export const ProblemSection: React.FC = () => {
  return (
    <section id="probleme" className="py-14 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 border border-rose-200 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span>La Réalité Urbaine à Pointe-Noire</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-['Outfit'] tracking-tight">
            Le Problème : Malnutrition & Dépendance Alimentaire
          </h2>
          <p className="text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed">
            Pourquoi continuer à subir les flambées de prix du marché quand chaque mètre carré de votre cour peut produire des aliments frais et des revenus ?
          </p>
        </div>

        {/* 3 Core Pain Points - Tablet and Mobile Optimized Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8">
          
          {/* Card 1: 60% des ménages dépendants */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 lg:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition-all relative flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-3xl lg:text-4xl font-black text-amber-600 font-['Outfit'] mb-2">
                60%
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-950 mb-2.5">
                des ménages dépendants
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                À Pointe-Noire, la majorité des familles dépendent exclusivement du marché pour leur alimentation quotidienne, sans contrôle sur la provenance ni sur la fraîcheur.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-600">
              Vulnérabilité face aux pénuries et ruptures
            </div>
          </div>

          {/* Card 2: +40% en saison sèche */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 lg:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-rose-400 hover:-translate-y-1 transition-all relative flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-3xl lg:text-4xl font-black text-rose-600 font-['Outfit'] mb-2">
                +40%
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-950 mb-2.5">
                en saison sèche
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                Le coût des légumes frais explose chaque année lors des saisons sèches, rendant une alimentation équilibrée et vitaminée inaccessible pour beaucoup de foyers.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-600">
              Inflation récurrente qui pèse sur le pouvoir d'achat
            </div>
          </div>

          {/* Card 3: Écoles & Églises sous pression */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 lg:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-400 hover:-translate-y-1 transition-all relative flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-2xl sm:text-2xl lg:text-3xl font-black text-indigo-700 font-['Outfit'] mb-2 break-words">
                Écoles & Églises
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-950 mb-2.5">
                sous forte pression
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                Budget cantine limité, protéines insuffisantes — les institutions peinent à nourrir correctement leurs élèves et communautés sans dépasser leurs moyens financiers.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-600">
              Nécessité d'une solution d'autonomie productive
            </div>
          </div>

        </div>

        {/* Transition Banner: High Contrast, 100% Readable on Tablets & All Screens */}
        <div className="mt-10 sm:mt-14 bg-[#0f172a] text-white rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Decorative Glow */}
          <div className="absolute -right-16 -top-16 w-72 h-72 bg-lime-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3.5 text-left">
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-950 bg-lime-400 px-3.5 py-1 rounded-full shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                <span>La Réponse 242Agro</span>
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-['Outfit'] text-white leading-tight">
                Passer de la dépendance coûteuse à la souveraineté alimentaire rentable
              </h3>
              <p className="text-slate-200 text-sm sm:text-base font-normal leading-relaxed">
                En installant un système hors-sol circulaire, vous produisez vous-mêmes vos légumes, vos œufs et votre viande à coût nul en engrais, tout en valorisant vos espaces inoccupés.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end w-full">
              <a
                href="#solution"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 font-black text-sm px-6 py-4 rounded-2xl transition-all shadow-lg active:scale-95"
              >
                <span>Découvrir la Boucle Circulaire</span>
                <ArrowRight className="w-4 h-4 text-slate-950 shrink-0" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
