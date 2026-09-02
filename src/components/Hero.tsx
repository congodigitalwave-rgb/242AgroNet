import React, { useState, useEffect, useCallback } from "react";
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Sprout,
  ShieldCheck,
  MapPin,
  Calculator,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play
} from "lucide-react";
import { HERO_SLIDES, CONTACT_INFO } from "../data";
import { Logo242Agro } from "./Logo242Agro";

interface HeroProps {
  onOpenSimulator: () => void;
  onOpenAdvisor: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSimulator, onOpenAdvisor }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  const activeSlide = HERO_SLIDES[currentSlideIndex];

  return (
    <section className="relative overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Location & Certification Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 bg-[#0f172a] border border-emerald-400/40 rounded-full px-4 py-1.5 text-xs text-emerald-300 shadow-md">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Conçu spécialement pour <strong className="text-white font-bold">Pointe-Noire & Littoral Congolais</strong></span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 px-3.5 py-1 rounded-full text-xs font-bold shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Écosystème Circulaire Breveté</span>
              </div>
            </div>

            {/* Main Headline - High-contrast solid colors ensuring 100% visibility on all screens and tablets */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold font-['Outfit'] tracking-tight text-white leading-[1.15]">
              Transformez votre espace en moteur de <span className="text-emerald-400 font-black">sécurité alimentaire</span> et de <span className="text-amber-400 font-black">rentabilité</span>.
            </h1>

            {/* Pitch Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-200 max-w-2xl leading-relaxed font-normal">
              L'agriculture urbaine hors-sol, clé en main, conçue pour générer un <strong className="text-emerald-300 font-bold">retour sur investissement mesurable dès 6 mois</strong> à Pointe-Noire.
            </p>

            {/* Key Bullet Highlights */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-slate-100 bg-[#0f172a] p-3.5 rounded-2xl border border-slate-700/80 shadow-md hover:border-emerald-400/60 transition-all">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/40">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span><strong className="text-emerald-300 font-bold">0 FCFA</strong> d'engrais (Boucle bio)</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-100 bg-[#0f172a] p-3.5 rounded-2xl border border-slate-700/80 shadow-md hover:border-amber-400/60 transition-all">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/40">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span><strong className="text-amber-300 font-bold">Remboursé en 6 mois</strong> par récoltes</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-100 bg-[#0f172a] p-3.5 rounded-2xl border border-slate-700/80 shadow-md hover:border-emerald-400/60 transition-all">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/40">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span><strong className="text-white font-bold">Clé en main :</strong> Pose + 3 mois suivi</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-100 bg-[#0f172a] p-3.5 rounded-2xl border border-slate-700/80 shadow-md hover:border-teal-400/60 transition-all">
                <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/40">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span><strong className="text-teal-300 font-bold">Paiement 3X :</strong> 30% / 40% / 30%</span>
              </div>
            </div>

            {/* Action Buttons - Radiant and High-contrast */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
              <button
                id="hero-simulator-cta"
                onClick={onOpenSimulator}
                className="inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-4 rounded-2xl shadow-xl shadow-emerald-500/30 border-2 border-emerald-300 transition-all text-base group cursor-pointer active:scale-95"
              >
                <Calculator className="w-5 h-5 group-hover:scale-110 transition-transform text-slate-950" />
                <span>Simuler mon Devis & ROI</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-slate-950" />
              </button>

              <a
                href="#packs"
                className="inline-flex items-center justify-center gap-2 bg-[#1e293b] hover:bg-[#334155] text-white font-bold px-5 py-4 rounded-2xl border border-slate-600 shadow-md transition-all text-base active:scale-95"
              >
                <Sprout className="w-5 h-5 text-emerald-400" />
                <span>Voir les 4 Packs 242Agro</span>
              </a>

              <button
                onClick={onOpenAdvisor}
                className="inline-flex items-center justify-center gap-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 font-bold px-4 py-4 rounded-2xl border-2 border-amber-400/50 shadow-md transition-all text-sm cursor-pointer active:scale-95"
                title="Conseiller IA"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Conseiller IA</span>
              </button>
            </div>

            {/* Reassurance Footer in Hero */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-300 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-medium text-slate-200">{CONTACT_INFO.quoteDelay}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span className="font-medium text-slate-200">Production dès 3 semaines</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/30 text-emerald-300">+140 espaces</span>
                <span className="font-medium text-slate-300">aménagés et productifs</span>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Interactive Image Carousel */}
          <div className="lg:col-span-5 relative">
            <div 
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="relative rounded-3xl overflow-hidden bg-[#0f172a] p-3 border border-slate-700/80 shadow-2xl shadow-black/60 group transition-all"
            >
              
              {/* Main Visual Image Viewport */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-950">
                {HERO_SLIDES.map((slide, idx) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      idx === currentSlideIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Shadow overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/30" />
                  </div>
                ))}
                
                {/* Floating Top Badge */}
                <div className="absolute top-3.5 left-3.5 z-20 bg-[#0a0f1d]/85 backdrop-blur-xl border border-emerald-400/30 rounded-2xl p-2 sm:p-2.5 shadow-xl flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
                    <Sprout className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold">
                      {activeSlide.badge}
                    </div>
                    <div className="text-xs font-bold text-white max-w-[170px] truncate">
                      {activeSlide.title}
                    </div>
                  </div>
                </div>

                {/* Floating Stat Metric Badge */}
                <div className="absolute top-3.5 right-3.5 z-20 bg-[#0a0f1d]/85 backdrop-blur-xl border border-amber-400/30 rounded-2xl px-3 py-2 shadow-xl text-right">
                  <div className="text-[9px] uppercase tracking-wider text-amber-300 font-semibold">
                    {activeSlide.statLabel}
                  </div>
                  <div className="text-xs sm:text-sm font-black text-white font-['Outfit']">
                    {activeSlide.statValue}
                  </div>
                </div>

                {/* Navigation Arrow Controls on Hover/Touch */}
                <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 z-20 flex justify-between pointer-events-none">
                  <button
                    onClick={prevSlide}
                    className="pointer-events-auto w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg transition-all opacity-80 hover:opacity-100 hover:scale-110 cursor-pointer"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="pointer-events-auto w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg transition-all opacity-80 hover:opacity-100 hover:scale-110 cursor-pointer"
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Slide Title & Subtitle at Bottom of Image */}
                <div className="absolute bottom-3 inset-x-3 z-20 bg-slate-900/85 backdrop-blur-md p-2.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="pr-2 truncate">
                    <div className="text-xs font-bold text-white truncate">
                      {activeSlide.title}
                    </div>
                    <div className="text-[11px] text-slate-300 truncate">
                      {activeSlide.subtitle}
                    </div>
                  </div>
                  <button
                    onClick={() => setIsAutoPlaying((prev) => !prev)}
                    className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer shrink-0"
                    title={isAutoPlaying ? "Mettre en pause" : "Lancer le défilement automatique"}
                  >
                    {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-emerald-400" />}
                  </button>
                </div>
              </div>

              {/* Slider Dots & Thumbnail Selector Bar */}
              <div className="mt-3 p-2.5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                  {HERO_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        idx === currentSlideIndex
                          ? "w-7 bg-emerald-400"
                          : "w-2 bg-white/25 hover:bg-white/50"
                      }`}
                      title={slide.title}
                      aria-label={`Aller à la diapositive ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-300 font-medium">
                  <span className="text-emerald-400 font-bold">
                    {currentSlideIndex + 1}
                  </span>
                  <span>/</span>
                  <span>{HERO_SLIDES.length}</span>
                  <span className="hidden sm:inline text-slate-400 ml-1">projets à Pointe-Noire</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
