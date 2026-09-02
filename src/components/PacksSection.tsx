import React from "react";
import { Check, Sparkles, ArrowRight, ShieldCheck, Tag, Info, ShoppingBag } from "lucide-react";
import { PACKS_DATA, CONTACT_INFO } from "../data";
import { AgroPack } from "../types";

interface PacksSectionProps {
  onSelectPack: (pack: AgroPack) => void;
}

export const PacksSection: React.FC<PacksSectionProps> = ({ onSelectPack }) => {
  return (
    <section id="packs" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-xl">
            <Tag className="w-3.5 h-3.5 text-emerald-400" />
            <span>Offres Clé en Main & Financement 3X</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
            Nos Packs : Du Starter à l'Institutionnel
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Des formules complètes comprenant tout le matériel de culture hors-sol, les animaux, la pose, la formation et 3 mois d'accompagnement agronomique.
          </p>
        </div>

        {/* 4 Packs Grid (from Slide 6) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PACKS_DATA.map((pack) => {
            const isPilote = pack.id === "site_pilote";
            const isPopular = pack.isPopular;

            return (
              <div
                key={pack.id}
                className={`relative rounded-3xl flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? "bg-[#0b281d] border-2 border-emerald-400 shadow-2xl shadow-emerald-950/60 scale-102 lg:-translate-y-2 ring-1 ring-emerald-400/40"
                    : isPilote
                    ? "bg-[#291b0d] border-2 border-amber-400 shadow-2xl shadow-amber-950/50"
                    : "bg-[#0f172a] border border-slate-700/80 shadow-xl shadow-black/40 hover:border-slate-500 hover:-translate-y-1"
                }`}
              >
                {/* Header & Badges */}
                <div className="p-6 sm:p-7">
                  
                  {pack.badge && (
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border ${
                      isPopular
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/60 shadow-sm"
                        : isPilote
                        ? "bg-amber-500/20 text-amber-300 border-amber-400/60 shadow-sm"
                        : "bg-slate-800 text-slate-100 border-slate-600"
                    }`}>
                      <Sparkles className="w-3 h-3" />
                      <span>{pack.badge}</span>
                    </div>
                  )}

                  <h3 className="text-2xl font-black text-white font-['Outfit']">
                    {pack.name}
                  </h3>

                  <p className="text-xs text-slate-200 mt-1 min-h-[32px] leading-relaxed">
                    {pack.subtitle}
                  </p>

                  {/* Surface & Pricing */}
                  <div className="mt-4 pt-4 border-t border-slate-700/60">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 inline-block px-3 py-1 rounded-full mb-2">
                      Surface : {pack.surface}
                    </div>
                    
                    <div className="text-3xl font-extrabold text-white font-['Outfit']">
                      {pack.priceFormatted}
                    </div>
                    
                    {pack.discountNotice && (
                      <span className="text-[11px] font-bold text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 rounded-full inline-block mt-1">
                        {pack.discountNotice}
                      </span>
                    )}

                    <div className="text-xs text-slate-200 mt-2 font-medium">
                      Paiement en 3x : <strong className="text-white font-bold">{(pack.price * 0.3).toLocaleString()} FCFA</strong> à la commande
                    </div>
                  </div>

                  {/* Highlighted Result */}
                  <div className="mt-5 p-3 rounded-2xl bg-[#1e293b] border border-slate-700 text-xs text-slate-100">
                    <span className="font-bold text-emerald-300">&rarr; {pack.savingsOrRevenue}</span>
                  </div>

                  {/* Features List */}
                  <ul className="mt-6 space-y-3 text-xs text-slate-200">
                    {pack.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                </div>

                {/* Card Bottom CTA */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => onSelectPack(pack)}
                    className={`w-full py-3.5 px-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer border active:scale-95 ${
                      isPopular
                        ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-xl shadow-emerald-500/25 border-2 border-emerald-300"
                        : isPilote
                        ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xl shadow-amber-500/25 border-2 border-amber-300"
                        : "bg-[#1e293b] hover:bg-[#334155] text-white border border-slate-600 shadow-md font-bold"
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Choisir ce Pack</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[10px] text-center text-slate-400 mt-2 font-medium">
                    Installation complète sous 3 semaines
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Reassurance Banner under Packs */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#0f172a] border border-slate-700/80 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Besoin d'un dimensionnement sur mesure ?</h4>
              <p className="text-xs text-slate-300">Nous concevons des installations personnalisées pour restaurants, domaines privés et projets communautaires.</p>
            </div>
          </div>
          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-6 py-3.5 rounded-2xl border border-white/15 backdrop-blur-xl transition-all"
          >
            Contacter un Conseiller Technique
          </a>
        </div>

      </div>
    </section>
  );
};
