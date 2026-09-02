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
          <div className="inline-flex items-center gap-2 bg-lime-50 text-[#65a30d] border border-lime-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
            <CreditCard className="w-3.5 h-3.5 text-[#65a30d]" />
            <span>Accessibilité Financière & Sérénité</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-['Outfit']">
            Paiement Flexible : 3 Fois Sans Frais
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Nous avons conçu un échéancier qui s'adapte à vos revenus — <strong>le dernier versement n'intervient qu'après votre première récolte</strong>.
          </p>
        </div>

        {/* 3 Step Installments */}
        <div className="grid md:grid-cols-3 gap-8 relative mb-16">
          
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative flex flex-col justify-between group hover:shadow-xl hover:border-lime-500 hover:-translate-y-1 transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#84cc16] text-slate-950 flex items-center justify-center font-black text-xl font-['Outfit'] shadow-xs">
                  1
                </div>
                <span className="text-2xl font-black text-[#65a30d] font-['Outfit'] bg-lime-50 px-3.5 py-1 rounded-xl border border-lime-200">
                  30%
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-950 mb-2 font-['Outfit']">
                À la Commande
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Engagement initial permettant de lancer la fabrication artisanale des bacs surélevés, l'assemblage des poulaillers/clapiers et la sélection des semences bio.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#65a30d]" />
              <span>Lancement immédiat de la confection</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative flex flex-col justify-between group hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xl font-['Outfit'] shadow-xs">
                  2
                </div>
                <span className="text-2xl font-black text-amber-700 font-['Outfit'] bg-amber-50 px-3.5 py-1 rounded-xl border border-amber-200">
                  40%
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-950 mb-2 font-['Outfit']">
                À la Livraison
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                À la pose complète du matériel chez vous à Pointe-Noire, installation du système d'irrigation, mise en place des animaux et début de la formation pratique.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500" />
              <span>Votre ferme urbaine est 100% active</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-8 border-2 border-[#84cc16] shadow-xl ring-4 ring-lime-400/20 relative flex flex-col justify-between group hover:-translate-y-1 transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#84cc16] text-slate-950 flex items-center justify-center font-black text-xl font-['Outfit'] shadow-xs">
                  3
                </div>
                <span className="text-2xl font-black text-[#65a30d] font-['Outfit'] bg-lime-50 px-3.5 py-1 rounded-xl border border-lime-200">
                  30%
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-950 mb-2 font-['Outfit']">
                Au Mois 3 (Après Récolte)
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Après vos premières récoltes de légumes et d'œufs frais. Vous réglez le solde final en toute sérénité grâce aux économies et surplus générés !
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-lime-200 text-xs font-bold text-[#65a30d] flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-[#65a30d]" />
              <span>Autofinancé par ce que vous produisez</span>
            </div>
          </div>

        </div>

        {/* 4 Pillars of Engagement & Support */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 text-slate-900 border border-slate-200 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Engagement & Qualité de Service
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-['Outfit'] mt-2 text-slate-950">
              Prêt à Transformer Votre Cour en Ferme Productive ?
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 hover:border-lime-500 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-2xl bg-lime-100 text-[#65a30d] border border-lime-200 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-slate-950 mb-2">Devis gratuit en 48h</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Après visite de votre espace par nos agronomes, nous vous proposons un plan sur mesure sans engagement.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 border border-amber-200 flex items-center justify-center mb-4">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-slate-950 mb-2">Installation en 3 semaines</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Votre ferme hors-sol est opérationnelle rapidement — et vous êtes formés dès le premier jour de pose.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-700 border border-teal-200 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-slate-950 mb-2">Suivi 3 mois inclus</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Formations + suivi technique inclus dans le prix pour garantir la réussite de vos premières récoltes.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 hover:border-purple-400 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 border border-purple-200 flex items-center justify-center mb-4">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-slate-950 mb-2">Suivi mensuel optionnel</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accompagnement continu de <strong className="text-slate-900">35 000 à 75 000 FCFA/mois</strong> après les 3 mois pour maximiser vos rendements.
              </p>
            </div>

          </div>

          {/* Bottom CTA bar */}
          <div className="mt-10 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <PhoneCall className="w-5 h-5 text-[#65a30d]" />
              <span>Contact direct Pointe-Noire : <strong className="text-slate-950 font-bold">{CONTACT_INFO.phone}</strong></span>
            </div>
            <button
              onClick={onOpenSimulator}
              className="bg-[#84cc16] hover:bg-lime-500 text-slate-950 font-black text-sm px-6 py-3.5 rounded-2xl shadow-md border-2 border-lime-400 transition-all inline-flex items-center gap-2 cursor-pointer active:scale-95"
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
