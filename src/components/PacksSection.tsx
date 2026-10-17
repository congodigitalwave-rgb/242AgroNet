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
          <div className="inline-flex items-center gap-2 bg-lime-50 text-[#65a30d] border border-lime-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
            <Tag className="w-3.5 h-3.5 text-[#65a30d]" />
            <span>Offres Clé en Main & Financement 3X</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-['Outfit']">
            Nos Packs : Du Starter à l'Institutionnel
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Des formules complètes comprenant tout le matériel de culture hors-sol, les animaux, la pose, la formation et 3 mois d'accompagnement agronomique.
          </p>
        </div>

        {/* 4 Packs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PACKS_DATA.map((pack) => {
            const isPilote = pack.id === "site_pilote";
            const isPopular = pack.isPopular;

            return (
              <div
                key={pack.id}
                className={`relative rounded-3xl flex flex-col justify-between transition-all duration-300 bg-white ${
                  isPopular
                    ? "border-2 border-[#84cc16] shadow-xl lg:-translate-y-2 ring-4 ring-lime-400/20"
                    : isPilote
                    ? "border-2 border-amber-400 shadow-xl ring-4 ring-amber-400/20"
                    : "border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 hover:-translate-y-1"
                }`}
              >
                {/* Header & Badges */}
                <div className="p-6 sm:p-7">
                  
                  {pack.badge && (
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border ${
                      isPopular
                        ? "bg-lime-100 text-[#65a30d] border-lime-300 shadow-xs"
                        : isPilote
                        ? "bg-amber-100 text-amber-800 border-amber-300 shadow-xs"
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}>
                      <Sparkles className="w-3 h-3" />
                      <span>{pack.badge}</span>
                    </div>
                  )}

                  <h3 className="text-2xl font-black text-slate-950 font-['Outfit']">
                    {pack.name}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1 min-h-[32px] leading-relaxed">
                    {pack.subtitle}
                  </p>

                  {/* Surface & Pricing */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#65a30d] bg-lime-50 border border-lime-200 inline-block px-3 py-1 rounded-full mb-2">
                      Surface : {pack.surface}
                    </div>
                    
                    <div className="text-3xl font-black text-slate-950 font-['Outfit']">
                      {pack.priceFormatted}
                    </div>
                    
                    {pack.discountNotice && (
                      <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full inline-block mt-1">
                        {pack.discountNotice}
                      </span>
                    )}

                    <div className="text-xs text-slate-600 mt-2 font-medium">
                      Paiement en 3x : <strong className="text-slate-950 font-bold">{Math.round(pack.price * 0.4).toLocaleString()} FCFA</strong> (40%) à la commande
                    </div>
                  </div>

                  {/* Highlighted Result */}
                  <div className="mt-5 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                    <span className="font-bold text-[#65a30d]">&rarr; {pack.savingsOrRevenue}</span>
                  </div>

                  {/* Features List */}
                  <ul className="mt-6 space-y-3 text-xs text-slate-600">
                    {pack.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#65a30d] shrink-0 mt-0.5" />
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
                        ? "bg-[#84cc16] hover:bg-lime-500 text-slate-950 shadow-lg shadow-lime-500/25 border-lime-400"
                        : isPilote
                        ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 border-amber-400"
                        : "bg-slate-950 hover:bg-slate-800 text-white border-slate-900 shadow-sm"
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Choisir ce Pack</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[10px] text-center text-slate-500 mt-2 font-medium">
                    Installation complète sous 3 semaines
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Reassurance Banner under Packs */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-lime-50 text-[#65a30d] border border-lime-200 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-950">Besoin d'un dimensionnement sur mesure ?</h4>
              <p className="text-xs text-slate-600">Nous concevons des installations personnalisées pour restaurants, domaines privés et projets communautaires.</p>
            </div>
          </div>
          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold px-6 py-3.5 rounded-2xl border border-slate-900 shadow-sm transition-all"
          >
            Contacter un Conseiller Technique
          </a>
        </div>

      </div>
    </section>
  );
};
