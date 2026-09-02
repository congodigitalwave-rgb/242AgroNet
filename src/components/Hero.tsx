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
    <section className="relative overflow-hidden pt-8 pb-20 lg:pt-14 lg:pb-24">
      {/* Dynamic Diagonal Lime Accent Slice in background inspired by reference mockup */}
      <div 
        className="absolute top-0 right-0 w-[55%] h-[85%] bg-gradient-to-bl from-lime-400/25 via-emerald-400/15 to-transparent pointer-events-none -z-5" 
        style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)" }}
      />
      <div 
        className="absolute -top-12 right-[10%] w-[380px] h-[380px] bg-lime-400/15 rounded-full blur-3xl pointer-events-none -z-5" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Location & Certification Badge */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 text-xs text-slate-800 shadow-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#65a30d] shrink-0" />
                <span>Spécialement calibré pour <strong className="text-slate-950 font-black">Pointe-Noire & Littoral</strong></span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-rose-500 text-white px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>Offre Pilote Disponible</span>
              </div>
            </div>

            {/* Main Headline - High-contrast solid colors ensuring 100% visibility */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black font-['Outfit'] tracking-tight text-slate-950 leading-[1.12]">
              Transformez votre espace en moteur de <span className="text-[#65a30d] font-black">sécurité alimentaire</span> et de <span className="text-amber-600 font-black">rentabilité</span>.
            </h1>

            {/* Pitch Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-700 max-w-2xl leading-relaxed font-normal">
              L'agriculture urbaine hors-sol, clé en main, conçue pour générer un <strong className="text-[#65a30d] font-bold">retour sur investissement mesurable dès 6 mois</strong> à Pointe-Noire.
            </p>

            {/* Key Bullet Highlights - Pristine white cards with light borders & smooth shadows */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-slate-800 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm hover:border-lime-500 hover:shadow-md transition-all">
                <div className="w-9 h-9 rounded-xl bg-lime-100 text-[#65a30d] flex items-center justify-center shrink-0 font-black">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span><strong className="text-[#65a30d] font-bold">0 FCFA</strong> d'engrais (Boucle bio)</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-800 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-400 hover:shadow-md transition-all">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 font-black">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span><strong className="text-amber-700 font-bold">Remboursé en 6 mois</strong> par récoltes</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-800 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm hover:border-lime-500 hover:shadow-md transition-all">
                <div className="w-9 h-9 rounded-xl bg-lime-100 text-[#65a30d] flex items-center justify-center shrink-0 font-black">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span><strong className="text-slate-950 font-bold">Clé en main :</strong> Pose + 3 mois suivi</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-800 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm hover:border-teal-500 hover:shadow-md transition-all">
                <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 font-black">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span><strong className="text-teal-700 font-bold">Paiement 3X :</strong> 30% / 40% / 30%</span>
              </div>
            </div>

            {/* Action Buttons - Punchy Red/Coral and Radiant Lime (like the mockup) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
              <button
                id="hero-simulator-cta"
                onClick={onOpenSimulator}
                className="inline-flex items-center justify-center gap-3 bg-[#e11d48] hover:bg-[#be123c] text-white font-black px-7 py-4 rounded-2xl shadow-lg shadow-rose-500/25 transition-all text-base group cursor-pointer active:scale-95"
              >
                <Calculator className="w-5 h-5 group-hover:scale-110 transition-transform text-white" />
                <span>Simuler mon Devis & ROI</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white" />
              </button>

              <a
                href="#packs"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-900 font-bold px-6 py-4 rounded-2xl border-2 border-slate-300 shadow-sm hover:border-[#65a30d] transition-all text-base active:scale-95"
              >
                <Sprout className="w-5 h-5 text-[#65a30d]" />
                <span>Voir les 4 Packs 242Agro</span>
              </a>

              <button
                onClick={onOpenAdvisor}
                className="inline-flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold px-4 py-4 rounded-2xl border border-amber-300 shadow-xs transition-all text-sm cursor-pointer active:scale-95"
                title="Conseiller IA"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Conseiller IA</span>
              </button>
            </div>

            {/* Reassurance Footer in Hero */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-600 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#65a30d]" />
                <span className="font-semibold text-slate-800">{CONTACT_INFO.quoteDelay}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <span className="font-semibold text-slate-800">Production dès 3 semaines</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-black text-[#65a30d] bg-lime-100 px-2 py-0.5 rounded-md border border-lime-200">+140 espaces</span>
                <span className="font-medium text-slate-600">aménagés et productifs</span>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Interactive Image Carousel */}
          <div className="lg:col-span-5 relative">
            <div 
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="relative rounded-3xl overflow-hidden bg-white p-3 border border-slate-200 shadow-xl group transition-all"
            >
              
              {/* Main Visual Image Viewport */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                  </div>
                ))}
                
                {/* Floating Top Badge */}
                <div className="absolute top-3.5 left-3.5 z-20 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-2 sm:p-2.5 shadow-lg flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-lime-100 text-[#65a30d] flex items-center justify-center font-bold text-xs border border-lime-300">
                    <Sprout className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#65a30d] font-black">
                      {activeSlide.badge}
                    </div>
                    <div className="text-xs font-black text-slate-900 max-w-[170px] truncate">
                      {activeSlide.title}
                    </div>
                  </div>
                </div>

                {/* Floating Stat Metric Badge */}
                <div className="absolute top-3.5 right-3.5 z-20 bg-white/95 backdrop-blur-md border border-amber-200 rounded-2xl px-3 py-2 shadow-lg text-right">
                  <div className="text-[9px] uppercase tracking-wider text-amber-700 font-bold">
                    {activeSlide.statLabel}
                  </div>
                  <div className="text-xs sm:text-sm font-black text-slate-950 font-['Outfit']">
                    {activeSlide.statValue}
                  </div>
                </div>

                {/* Navigation Arrow Controls on Hover/Touch */}
                <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 z-20 flex justify-between pointer-events-none">
                  <button
                    onClick={prevSlide}
                    className="pointer-events-auto w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-lg transition-all opacity-85 hover:opacity-100 hover:scale-110 cursor-pointer border border-slate-200"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="pointer-events-auto w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-lg transition-all opacity-85 hover:opacity-100 hover:scale-110 cursor-pointer border border-slate-200"
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Slide Title & Subtitle at Bottom of Image */}
                <div className="absolute bottom-3 inset-x-3 z-20 bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-slate-200 flex items-center justify-between shadow-md">
                  <div className="pr-2 truncate">
                    <div className="text-xs font-black text-slate-900 truncate">
                      {activeSlide.title}
                    </div>
                    <div className="text-[11px] text-slate-600 truncate">
                      {activeSlide.subtitle}
                    </div>
                  </div>
                  <button
                    onClick={() => setIsAutoPlaying((prev) => !prev)}
                    className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer shrink-0"
                    title={isAutoPlaying ? "Mettre en pause" : "Lancer le défilement automatique"}
                  >
                    {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#65a30d]" />}
                  </button>
                </div>
              </div>

              {/* Slider Dots & Thumbnail Selector Bar */}
              <div className="mt-3 p-2.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                  {HERO_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        idx === currentSlideIndex
                          ? "w-7 bg-[#65a30d]"
                          : "w-2 bg-slate-300 hover:bg-slate-400"
                      }`}
                      title={slide.title}
                      aria-label={`Aller à la diapositive ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-600 font-medium">
                  <span className="text-[#65a30d] font-black">
                    {currentSlideIndex + 1}
                  </span>
                  <span>/</span>
                  <span>{HERO_SLIDES.length}</span>
                  <span className="hidden sm:inline text-slate-500 ml-1">projets à Pointe-Noire</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
