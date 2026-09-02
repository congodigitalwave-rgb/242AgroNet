import React from "react";
import { Phone, MessageSquare, MapPin, Heart, QrCode, Download } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { CONTACT_INFO } from "../data";
import { Logo242Agro } from "./Logo242Agro";

interface FooterProps {
  onOpenQRCode?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQRCode }) => {
  const url = CONTACT_INFO.websiteUrl || "https://242agropn.netlify.app/";

  return (
    <footer className="relative bg-white text-slate-600 py-14 border-t border-slate-200 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-slate-200">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <Logo242Agro size="md" showText={true} />
            <p className="text-slate-600 leading-relaxed pt-1">
              La référence de l'agriculture urbaine hors-sol et de l'élevage intégré à Pointe-Noire. Sécurité alimentaire et rentabilité mesurable.
            </p>
            <div className="text-[#65a30d] font-bold flex items-center gap-1.5 pt-1">
              <span className="w-2 h-2 rounded-full bg-[#84cc16] animate-pulse"></span>
              <span>République du Congo (242)</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2.5">
            <div className="text-slate-950 font-black uppercase tracking-wider text-[11px]">
              Solutions & Offres
            </div>
            <ul className="space-y-2">
              <li><a href="#solution" className="hover:text-[#65a30d] transition-colors">Boucle Circulaire Zéro Coût</a></li>
              <li><a href="#production" className="hover:text-[#65a30d] transition-colors">Rendements & Cascade ROI</a></li>
              <li><a href="#packs" className="hover:text-[#65a30d] transition-colors">Pack Starter & Familial</a></li>
              <li><a href="#packs" className="hover:text-[#65a30d] transition-colors">Pack Productif & Site Pilote</a></li>
              <li><a href="#paiement" className="hover:text-[#65a30d] transition-colors">Paiement 3X Sans Frais</a></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-2.5">
            <div className="text-slate-950 font-black uppercase tracking-wider text-[11px]">
              Services 242Agro
            </div>
            <ul className="space-y-2 text-slate-600">
              <li><span>Installation clé en main (3 semaines)</span></li>
              <li><span>Formation agronomique pratique</span></li>
              <li><span>Suivi mensuel (35k - 75k FCFA/m)</span></li>
              <li><span>Fourniture d'intrants 100% bio</span></li>
              <li><span>Accompagnement Écoles & Églises</span></li>
            </ul>
          </div>

          {/* Col 4: Contact & QR Code */}
          <div className="space-y-3">
            <div className="text-slate-950 font-black uppercase tracking-wider text-[11px]">
              Code QR & Contact
            </div>
            
            {/* Embedded QR Code Card */}
            <div 
              onClick={onOpenQRCode}
              className="p-3 bg-slate-50 hover:bg-lime-50 rounded-2xl border border-slate-200 hover:border-lime-300 flex items-center gap-3 transition-all cursor-pointer group shadow-xs"
              title="Cliquer pour agrandir et télécharger le QR code"
            >
              <div className="p-1.5 bg-white rounded-xl shadow-xs border border-slate-200 shrink-0">
                <QRCodeCanvas
                  value={url}
                  size={58}
                  level="M"
                  fgColor="#090d16"
                  bgColor="#ffffff"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-[#65a30d] font-bold text-[11px] group-hover:text-lime-700">
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Scanner / Télécharger</span>
                </div>
                <div className="text-[10px] text-slate-500">
                  Accès mobile direct Netlify
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-slate-600 pt-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#65a30d]" />
                <span className="text-slate-950 font-bold">{CONTACT_INFO.phone}</span>
              </div>
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-bold"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Discuter sur WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} 242Agro. Tous droits réservés. Pointe-Noire, République du Congo.
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            {onOpenQRCode && (
              <button
                onClick={onOpenQRCode}
                className="text-[#65a30d] hover:text-lime-700 font-bold flex items-center gap-1 cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Afficher le QR Code</span>
              </button>
            )}
            <span>•</span>
            <span>Développé pour la souveraineté alimentaire congolaise</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
