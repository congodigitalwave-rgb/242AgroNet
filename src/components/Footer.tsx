import React from "react";
import { Phone, MessageSquare, MapPin, Heart } from "lucide-react";
import { CONTACT_INFO } from "../data";
import { Logo242Agro } from "./Logo242Agro";

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-black/40 backdrop-blur-2xl text-slate-400 py-14 border-t border-white/10 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <Logo242Agro size="md" showText={true} />
            <p className="text-slate-300 leading-relaxed pt-1">
              La référence de l'agriculture urbaine hors-sol et de l'élevage intégré à Pointe-Noire. Sécurité alimentaire et rentabilité mesurable.
            </p>
            <div className="text-emerald-400 font-semibold flex items-center gap-1.5 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>République du Congo (242)</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2.5">
            <div className="text-white font-bold uppercase tracking-wider text-[11px]">
              Solutions & Offres
            </div>
            <ul className="space-y-2">
              <li><a href="#solution" className="hover:text-emerald-400 transition-colors">Boucle Circulaire Zéro Coût</a></li>
              <li><a href="#production" className="hover:text-emerald-400 transition-colors">Rendements & Cascade ROI</a></li>
              <li><a href="#packs" className="hover:text-emerald-400 transition-colors">Pack Starter & Familial</a></li>
              <li><a href="#packs" className="hover:text-emerald-400 transition-colors">Pack Productif & Site Pilote</a></li>
              <li><a href="#paiement" className="hover:text-emerald-400 transition-colors">Paiement 3X Sans Frais</a></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-2.5">
            <div className="text-white font-bold uppercase tracking-wider text-[11px]">
              Services 242Agro
            </div>
            <ul className="space-y-2 text-slate-300">
              <li><span>Installation clé en main (3 semaines)</span></li>
              <li><span>Formation agronomique pratique</span></li>
              <li><span>Suivi mensuel (35k - 75k FCFA/m)</span></li>
              <li><span>Fourniture d'intrants 100% bio</span></li>
              <li><span>Accompagnement Écoles & Églises</span></li>
            </ul>
          </div>

          {/* Col 4: Contact direct */}
          <div className="space-y-2.5">
            <div className="text-white font-bold uppercase tracking-wider text-[11px]">
              Contact Direct
            </div>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-white font-medium">{CONTACT_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pointe-Noire, Congo</span>
              </div>
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold mt-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Discuter sur WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} 242Agro. Tous droits réservés. Pointe-Noire, République du Congo.
          </div>
          <div className="flex items-center gap-1 text-slate-300">
            <span>Développé pour la souveraineté alimentaire congolaise</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
