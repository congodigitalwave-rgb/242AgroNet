import React, { useState } from "react";
import { RefreshCw, Leaf, Feather, Sparkles, CheckCircle2, Shield, ArrowRight, Zap } from "lucide-react";
import { IMAGES } from "../data";

export const CircularSolution: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      title: "1. Potagers Hors-Sol Haut Rendement",
      subtitle: "Légumes frais & résidus végétaux",
      desc: "Bacs maraîchers surélevés adaptés aux cours bétonnées et toitures. Production rapide d'amarantes, piments, tomates et épinards. Les feuilles non consommées nourrissent directement l'élevage.",
      icon: Leaf,
      color: "emerald",
      badge: "Production continue"
    },
    {
      title: "2. Élevage Intégré (Poules & Lapines)",
      subtitle: "Protéines quotidiennes & fertilisant naturel",
      desc: "Poulaillers urbains et clapiers anti-odeurs. Jusqu'à 1 300 œufs frais et 60 kg de viande blanche par module. Les fientes et litières riches en nutriments sont collectées quotidiennement.",
      icon: Feather,
      color: "amber",
      badge: "Riche en azote & phosphore"
    },
    {
      title: "3. Compostage Accéléré & Terreau Bio",
      subtitle: "Zéro engrais chimique = 0 FCFA d'intrants",
      desc: "Transformation des fientes et résidus en compost organique haute performance en 3 semaines. Réinjecté dans les bacs pour booster la prochaine récolte sans acheter d'engrais chimiques.",
      icon: RefreshCw,
      color: "teal",
      badge: "0 FCFA d'engrais chimique"
    }
  ];

  return (
    <section id="solution" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-lime-50 text-[#65a30d] border border-lime-200 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
            <RefreshCw className="w-3.5 h-3.5 text-[#65a30d] animate-spin" style={{ animationDuration: '8s' }} />
            <span>Écosystème Autonome & Zéro Déchet</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-['Outfit']">
            Notre Solution : Potagers Hors-Sol + Élevage Intégré
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Un système en circuit fermé conçu pour éliminer les coûts récurrents et maximiser la productivité de chaque mètre carré.
          </p>
        </div>

        {/* The 3 Core Pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-lime-500 hover:-translate-y-1 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-lime-50 text-[#65a30d] border border-lime-200 flex items-center justify-center font-bold mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-950 mb-2 font-['Outfit']">
              Clé en main
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Installation complète, matériel professionnel, semences, animaux vaccinés, formation pratique et suivi agronomique pendant 3 mois — <strong className="text-slate-950 font-bold">tout est inclus</strong>.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center font-bold mb-4">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-950 mb-2 font-['Outfit']">
              Boucle circulaire
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Légumes &rarr; animaux &rarr; compost &rarr; légumes. Un écosystème productif et autonome où chaque sous-produit devient la nourriture du suivant.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-teal-500 hover:-translate-y-1 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 border border-teal-200 flex items-center justify-center font-bold mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-950 mb-2 font-['Outfit']">
              100% Organique
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Zéro engrais chimique de synthèse. Une production saine, naturelle et durable respectueuse de la santé de votre famille et de vos clients.
            </p>
          </div>

        </div>

        {/* Circular Interactive Showcase Block */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 text-slate-900 border border-slate-200 shadow-xl">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Interactive Loop Explanation */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="inline-flex items-center gap-2 bg-lime-50 text-[#65a30d] border border-lime-200 px-3 py-1 rounded-full text-xs font-bold">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                <span>Le Moteur de Rentabilité 242Agro</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-slate-950">
                La Boucle Circulaire Zéro Coût
              </h3>

              <div className="p-4 rounded-2xl bg-lime-50 border border-lime-200 text-slate-800 text-sm flex items-center justify-between shadow-xs">
                <span className="font-semibold text-slate-800">Coût d'intrants artificiels :</span>
                <span className="text-xl font-black text-slate-950 font-['Outfit'] bg-[#84cc16] px-3.5 py-1 rounded-xl shadow-xs">
                  = 0 FCFA
                </span>
              </div>

              {/* Interactive Step Selectors */}
              <div className="space-y-3 pt-2">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className={`w-full text-left p-4 rounded-2xl transition-all border flex items-start gap-4 cursor-pointer ${
                        isActive
                          ? "bg-slate-50 border-2 border-[#65a30d] shadow-sm"
                          : "bg-white border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl shrink-0 ${
                        isActive ? "bg-[#84cc16] text-slate-950 shadow-xs font-bold" : "bg-slate-100 text-[#65a30d]"
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-bold text-sm text-slate-950">{step.title}</h4>
                          <span className="text-[10px] font-bold uppercase bg-lime-100 text-[#65a30d] px-2.5 py-0.5 rounded-full border border-lime-200">
                            {step.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Right: Circular Visual Graphic */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden bg-slate-50 border border-slate-200 p-3 shadow-lg">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src={IMAGES.circular}
                    alt="Boucle Circulaire 242Agro"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg">
                    <div className="flex items-center justify-between text-xs text-slate-700">
                      <span className="font-black text-slate-950">Écosystème auto-alimenté</span>
                      <span className="text-[#65a30d] font-bold bg-lime-100 px-2 py-0.5 rounded-full border border-lime-200">100% Autonome</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5">
                      Les résidus de récolte nourrissent l'élevage &rarr; Les fientes sont transformées en compost &rarr; Le compost fertilise le potager.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
