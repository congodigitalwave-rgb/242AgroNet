import React, { useState } from "react";
import { Phone, MessageSquare, Menu, X, Calculator, Sparkles, ShieldCheck, QrCode } from "lucide-react";
import { CONTACT_INFO } from "../data";
import { Logo242Agro } from "./Logo242Agro";

interface NavbarProps {
  onOpenSimulator: () => void;
  onOpenAdvisor: () => void;
  onOpenQRCode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSimulator, onOpenAdvisor, onOpenQRCode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0b1120]/75 backdrop-blur-2xl border-b border-white/10 text-slate-100 transition-all shadow-lg shadow-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <Logo242Agro size="md" showText={true} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#solution" className="hover:text-emerald-400 transition-colors py-1">Notre Solution</a>
            <a href="#production" className="hover:text-emerald-400 transition-colors py-1">Rendements & ROI</a>
            <a href="#packs" className="hover:text-emerald-400 transition-colors py-1">Nos Packs</a>
            <a href="#paiement" className="hover:text-emerald-400 transition-colors py-1">Paiement 3X</a>
            <button 
              onClick={onOpenAdvisor}
              className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-all cursor-pointer bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-full border border-amber-400/30 backdrop-blur-md shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Agronome IA</span>
            </button>
            {onOpenQRCode && (
              <button 
                onClick={onOpenQRCode}
                className="flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 transition-all cursor-pointer bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-full border border-emerald-500/30 backdrop-blur-md shadow-sm text-xs font-semibold"
                title="Afficher & Télécharger le QR Code du site"
              >
                <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                <span>Code QR</span>
              </button>
            )}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${CONTACT_INFO.phoneClean}`}
              className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{CONTACT_INFO.phone}</span>
            </a>

            <button
              id="nav-simulate-quote-btn"
              onClick={onOpenSimulator}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-950/40 hover:shadow-emerald-500/20 border border-emerald-400/30 transition-all cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>Simulateur Devis</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            {onOpenQRCode && (
              <button
                onClick={onOpenQRCode}
                className="text-xs bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 p-2 rounded-xl border border-emerald-500/30"
                title="Code QR du site"
              >
                <QrCode className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onOpenSimulator}
              className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-xl border border-white/10"
              title="Simulateur"
            >
              <Calculator className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0b1120]/95 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-6 space-y-4">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-200">
            <a 
              href="#solution" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-white/5 hover:text-emerald-400"
            >
              Notre Solution Circulaire
            </a>
            <a 
              href="#production" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-white/5 hover:text-emerald-400"
            >
              Rendements & Graphiques ROI
            </a>
            <a 
              href="#packs" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-white/5 hover:text-emerald-400"
            >
              Nos 4 Packs & Tarifs
            </a>
            <a 
              href="#paiement" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-white/5 hover:text-emerald-400"
            >
              Paiement Échelonné en 3 Fois
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdvisor();
              }}
              className="flex items-center gap-2 text-left px-3 py-2 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Diagnostic Agronome IA</span>
            </button>
            {onOpenQRCode && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQRCode();
                }}
                className="flex items-center gap-2 text-left px-3 py-2 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
              >
                <QrCode className="w-4 h-4 text-emerald-400" />
                <span>Afficher le Code QR du site</span>
              </button>
            )}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSimulator();
              }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm py-3 rounded-xl shadow-lg border border-emerald-400/30"
            >
              <Calculator className="w-4 h-4" />
              <span>Lancer le Simulateur de Devis</span>
            </button>

            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-emerald-300 font-semibold text-sm py-2.5 rounded-xl border border-emerald-500/30 backdrop-blur-md"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Direct (+242 06 874 22 77)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
