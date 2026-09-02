import React from "react";
import { CreditCard, Truck, CalendarCheck, CheckCircle2, Clock, ShieldCheck, PhoneCall, ArrowRight, HeartHandshake } from "lucide-react";
import { CONTACT_INFO } from "../data";

interface PaymentScheduleProps {
  onOpenSimulator: () => void;
}

export const PaymentSchedule: React.FC<PaymentScheduleProps> = ({ onOpenSimulator }) => {
  return (
    <section id="paiement" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-xl">
            <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
            <span>Accessibilité Financière & Sérénité</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
            Paiement Flexible : 3 Fois Sans Frais
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Nous avons conçu un échéancier qui s'adapte à vos revenus — <strong>le dernier versement n'intervient qu'après votre première récolte</strong>.
          </p>
        </div>

        {/* 3 Step Installments (from Slide 7) */}
        <div className="grid md:grid-cols-3 gap-8 relative mb-16">
          
          {/* Step 1 */}
          <div className="bg-[#0f172a] rounded-3xl p-8 border border-slate-700/80 shadow-xl shadow-black/40 relative flex flex-col justify-between group hover:border-emerald-400 hover:-translate-y-1 transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xl font-['Outfit'] shadow-lg">
                  1
                </div>
                <span className="text-2xl font-black text-emerald-300 font-['Outfit'] bg-emerald-500/20 px-3.5 py-1 rounded-xl border border-emerald-500/30">
                  30%
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 font-['Outfit']">
                À la Commande
              </h3>
              <p className="text-slate-200 text-sm leading-relaxed">
                Engagement initial permettant de lancer la fabrication artisanale des bacs surélevés, l'assemblage des poulaillers/clapiers et la sélection des semences bio.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Lancement immédiat de la confection</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#0f172a] rounded-3xl p-8 border border-slate-700/80 shadow-xl shadow-black/40 relative flex flex-col justify-between group hover:border-amber-400 hover:-translate-y-1 transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xl font-['Outfit'] shadow-lg">
                  2
                </div>
                <span className="text-2xl font-black text-amber-300 font-['Outfit'] bg-amber-500/20 px-3.5 py-1 rounded-xl border border-amber-500/30">
                  40%
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 font-['Outfit']">
                À la Livraison
              </h3>
              <p className="text-slate-200 text-sm leading-relaxed">
                À la pose complète du matériel chez vous à Pointe-Noire, installation du système d'irrigation, mise en place des animaux et début de la formation pratique.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Votre ferme urbaine est 100% active</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#0b281d] rounded-3xl p-8 border-2 border-emerald-400 shadow-2xl shadow-emerald-950/60 relative flex flex-col justify-between group hover:-translate-y-1 transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-teal-400 text-slate-950 flex items-center justify-center font-black text-xl font-['Outfit'] shadow-lg">
                  3
                </div>
                <span className="text-2xl font-black text-teal-300 font-['Outfit'] bg-teal-500/20 px-3.5 py-1 rounded-xl border border-teal-400/40">
                  30%
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 font-['Outfit']">
                Au Mois 3 (Après Récolte)
              </h3>
              <p className="text-slate-200 text-sm leading-relaxed">
                Après vos premières récoltes de légumes et d'œufs frais. Vous réglez le solde final en toute sérénité grâce aux économies et surplus générés !
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-500/40 text-xs font-bold text-emerald-300 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-emerald-400" />
              <span>Autofinancé par ce que vous produisez</span>
            </div>
          </div>

        </div>

        {/* 4 Pillars of Engagement & Support (from Slide 8) */}
        <div className="bg-[#0f172a] rounded-3xl p-8 lg:p-12 text-white border border-slate-700/80 shadow-2xl shadow-black/50">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/30">
              Engagement & Qualité de Service
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-['Outfit'] mt-2 text-white">
              Prêt à Transformer Votre Cour en Ferme Productive ?
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-[#1e293b] p-6 rounded-3xl border border-slate-700 hover:border-emerald-400/60 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-white mb-2">Devis gratuit en 48h</h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                Après visite de votre espace par nos agronomes, nous vous proposons un plan sur mesure sans engagement.
              </p>
            </div>

            <div className="bg-[#1e293b] p-6 rounded-3xl border border-slate-700 hover:border-amber-400/60 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-4">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-white mb-2">Installation en 3 semaines</h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                Votre ferme hors-sol est opérationnelle rapidement — et vous êtes formés dès le premier jour de pose.
              </p>
            </div>

            <div className="bg-[#1e293b] p-6 rounded-3xl border border-slate-700 hover:border-teal-400/60 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-white mb-2">Suivi 3 mois inclus</h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                Formations + suivi technique inclus dans le prix pour garantir la réussite de vos premières récoltes.
              </p>
            </div>

            <div className="bg-[#1e293b] p-6 rounded-3xl border border-slate-700 hover:border-purple-400/60 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center mb-4">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-white mb-2">Suivi mensuel optionnel</h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                Accompagnement continu de <strong className="text-white">35 000 à 75 000 FCFA/mois</strong> après les 3 mois pour maximiser vos rendements.
              </p>
            </div>

          </div>

          {/* Bottom CTA bar */}
          <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <PhoneCall className="w-5 h-5 text-emerald-400" />
              <span>Contact direct Pointe-Noire : <strong className="text-white font-bold">{CONTACT_INFO.phone}</strong></span>
            </div>
            <button
              onClick={onOpenSimulator}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm px-6 py-3.5 rounded-2xl shadow-xl shadow-emerald-500/20 border-2 border-emerald-300 transition-all inline-flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Calculer mon Échéancier de Paiement</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
