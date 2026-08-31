import React, { useState } from "react";
import { Phone, MessageSquare, MapPin, Mail, Clock, ChevronDown, ChevronUp, Send, CheckCircle2, ShieldCheck } from "lucide-react";
import { CONTACT_INFO, FAQ_ITEMS, QUARTIERS_POINTE_NOIRE } from "../data";

export const ContactSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [sentMessage, setSentMessage] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setSentMessage(true);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-xl">
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Équipe Terrain à Pointe-Noire</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-white">
            Contactez 242Agro dès Aujourd'hui
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Réservez votre visite technique sous 48h ou posez toutes vos questions à nos agronomes.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info & Quick Contact Form */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href={`tel:${CONTACT_INFO.phoneClean}`}
                className="bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 hover:border-emerald-400/50 transition-all group flex flex-col justify-between shadow-xl shadow-black/20"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase font-semibold">Téléphone direct</div>
                  <div className="text-lg font-bold text-white font-['Outfit'] mt-1">{CONTACT_INFO.phone}</div>
                  <div className="text-[11px] text-emerald-400 font-medium mt-1">Disponible 7j/7</div>
                </div>
              </a>

              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-950/30 backdrop-blur-2xl p-6 rounded-3xl border border-emerald-400/40 hover:border-emerald-300 transition-all group flex flex-col justify-between shadow-xl shadow-emerald-950/30"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-950/40">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-emerald-200 uppercase font-semibold">WhatsApp 242Agro</div>
                  <div className="text-lg font-bold text-white font-['Outfit'] mt-1">Discuter en direct</div>
                  <div className="text-[11px] text-emerald-300 font-medium mt-1">Réponse en moins de 15 min</div>
                </div>
              </a>
            </div>

            {/* Location & Coverage */}
            <div className="bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 shadow-xl space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-white">Siège & Ateliers d'Assemblage</div>
                  <div className="text-xs text-slate-300">Pointe-Noire, République du Congo</div>
                  <div className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    Interventions sur tous les arrondissements : Tié-Tié, Lumumba, Loandjili, Mongo-Poukou, Ngoyo, Mpita, Côte Sauvage, Vindoulou.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-white/10 text-xs text-slate-300">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Horaires d'installation : <strong className="text-white">Du Lundi au Samedi, 7h30 - 18h00</strong></span>
              </div>
            </div>

            {/* Direct Question Form */}
            <div className="bg-white/5 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl">
              <h3 className="text-base font-bold text-white font-['Outfit'] mb-1">
                Envoyer un message rapide
              </h3>
              <p className="text-xs text-slate-300 mb-4">
                Laissez vos coordonnées, un conseiller agronomique vous rappelle dans la journée.
              </p>

              {sentMessage ? (
                <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Merci ! Votre message a été transmis à notre équipe de Pointe-Noire.</span>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Votre nom"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Numéro WhatsApp / Téléphone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Votre question (ex: J'ai une cour à Ngoyo de 12m²...)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all border border-emerald-400/30 shadow-lg shadow-emerald-950/30"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Envoyer ma demande</span>
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Foire Aux Questions
              </span>
              <h3 className="text-2xl font-bold font-['Outfit'] text-white mt-2">
                Tout ce que vous devez savoir
              </h3>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden transition-all shadow-lg hover:border-white/20"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="font-bold text-sm text-white">{item.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-white/10 pt-3 animate-in fade-in">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
