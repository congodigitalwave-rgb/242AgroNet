import React, { useState } from "react";
import { Phone, MessageSquare, Menu, X, Calculator } from "lucide-react";
import { CONTACT_INFO } from "../data";
import { Logo242Agro } from "./Logo242Agro";

interface NavbarProps {
  onOpenSimulator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSimulator }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 transition-all shadow-sm">
      {/* Top Utility Bar - sleek dark charcoal with lime green accent (as seen in template) */}
      <div className="bg-[#0f172a] text-slate-300 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 font-medium text-slate-200">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
              Pointe-Noire, République du Congo
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-300">
              Agri-tech urbaine circulaire & élevage hors-sol
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold bg-rose-500 text-white shadow-xs">
              Offre Pilote -25%
            </span>
            <a
              href={`tel:${CONTACT_INFO.phoneClean}`}
              className="text-lime-400 hover:text-lime-300 flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{CONTACT_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar - crisp white with high contrast typography */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo & Brand */}
            <a href="#" className="flex items-center gap-3 group">
              <Logo242Agro size="md" showText={true} darkText={true} />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
              <a href="#solution" className="hover:text-[#65a30d] transition-colors py-1">Notre Solution</a>
              <a href="#production" className="hover:text-[#65a30d] transition-colors py-1">Rendements & ROI</a>
              <a href="#packs" className="hover:text-[#65a30d] transition-colors py-1">Nos 4 Packs</a>
              <a href="#paiement" className="hover:text-[#65a30d] transition-colors py-1">Paiement 3X</a>
              <a href="#contact" className="hover:text-[#65a30d] transition-colors py-1">Contact & Visite 48h</a>
            </nav>

            {/* Action CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-950 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>

              <button
                id="nav-simulate-quote-btn"
                onClick={onOpenSimulator}
                className="flex items-center gap-2 text-xs font-black uppercase tracking-wider bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 hover:text-white px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
              >
                <Calculator className="w-4 h-4" />
                <span>Simuler mon Devis</span>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={onOpenSimulator}
                className="md:hidden text-xs bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 p-2.5 rounded-xl font-bold"
                title="Simulateur"
              >
                <Calculator className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-700 hover:text-slate-950 p-2 rounded-xl bg-slate-100 border border-slate-200"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-2 text-sm font-semibold text-slate-800">
            <a 
              href="#solution" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-lime-50 hover:text-[#65a30d]"
            >
              Notre Solution Circulaire
            </a>
            <a 
              href="#production" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-lime-50 hover:text-[#65a30d]"
            >
              Rendements & Graphiques ROI
            </a>
            <a 
              href="#packs" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-lime-50 hover:text-[#65a30d]"
            >
              Nos 4 Packs & Tarifs
            </a>
            <a 
              href="#paiement" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-lime-50 hover:text-[#65a30d]"
            >
              Paiement Échelonné en 3 Fois
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-lime-50 hover:text-[#65a30d]"
            >
              Contact & Visite 48h
            </a>
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSimulator();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 hover:text-white font-black text-sm py-3 rounded-xl shadow-md"
            >
              <Calculator className="w-4 h-4" />
              <span>Lancer le Simulateur de Devis</span>
            </button>

            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm py-2.5 rounded-xl border border-slate-300"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Direct (+242 06 874 22 77)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
