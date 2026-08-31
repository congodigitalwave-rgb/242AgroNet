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
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-xl">
            <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Écosystème Autonome & Zéro Déchet</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
            Notre Solution : Potagers Hors-Sol + Élevage Intégré
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Un système en circuit fermé conçu pour éliminer les coûts récurrents et maximiser la productivité de chaque mètre carré.
          </p>
        </div>

        {/* The 3 Core Pillars (from Slide 3) */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-xl shadow-black/20 hover:border-emerald-500/50 hover:-translate-y-1 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-['Outfit']">
              Clé en main
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Installation complète, matériel professionnel, semences, animaux vaccinés, formation pratique et suivi agronomique pendant 3 mois — <strong className="text-white">tout est inclus</strong>.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-xl shadow-black/20 hover:border-amber-500/50 hover:-translate-y-1 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold mb-4">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-['Outfit']">
              Boucle circulaire
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Légumes &rarr; animaux &rarr; compost &rarr; légumes. Un écosystème productif et autonome où chaque sous-produit devient la nourriture du suivant.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-xl shadow-black/20 hover:border-teal-500/50 hover:-translate-y-1 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-bold mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-['Outfit']">
              100% Organique
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Zéro engrais chimique de synthèse. Une production saine, naturelle et durable respectueuse de la santé de votre famille et de vos clients.
            </p>
          </div>

        </div>

        {/* Circular Interactive Showcase Block */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 lg:p-12 text-white border border-white/15 shadow-2xl shadow-black/30">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Interactive Loop Explanation */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Le Moteur de Rentabilité 242Agro</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit']">
                La Boucle Circulaire Zéro Coût
              </h3>

              <div className="p-4 rounded-2xl bg-emerald-950/40 backdrop-blur-xl border border-emerald-500/40 text-emerald-200 text-sm flex items-center justify-between shadow-inner">
                <span className="font-medium">Coût d'intrants artificiels :</span>
                <span className="text-xl font-black text-white font-['Outfit'] bg-emerald-600/80 px-3.5 py-1 rounded-xl shadow-md border border-emerald-400/30">
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
                      className={`w-full text-left p-4 rounded-2xl transition-all border flex items-start gap-4 cursor-pointer backdrop-blur-xl ${
                        isActive
                          ? "bg-white/10 border-emerald-400/80 shadow-lg shadow-emerald-950/30"
                          : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl shrink-0 ${
                        isActive ? "bg-emerald-500 text-white shadow-md" : "bg-white/10 text-slate-400"
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-bold text-sm text-white">{step.title}</h4>
                          <span className="text-[10px] font-semibold uppercase bg-white/10 text-emerald-300 px-2.5 py-0.5 rounded-full border border-white/10">
                            {step.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
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
              <div className="relative rounded-3xl overflow-hidden bg-white/5 border border-white/15 p-3 shadow-2xl backdrop-blur-xl">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950">
                  <img
                    src={IMAGES.circular}
                    alt="Boucle Circulaire 242Agro"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#0a0f1d]/85 backdrop-blur-xl border border-white/10 shadow-xl">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="font-bold text-white">Écosystème auto-alimenté</span>
                      <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">100% Autonome</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1.5">
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
