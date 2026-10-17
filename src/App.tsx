import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ProblemSection } from "./components/ProblemSection";
import { CircularSolution } from "./components/CircularSolution";
import { ProductionAnalytics } from "./components/ProductionAnalytics";
import { PacksSection } from "./components/PacksSection";
import { QuoteSimulator } from "./components/QuoteSimulator";
import { PaymentSchedule } from "./components/PaymentSchedule";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { QRCodeModal } from "./components/QRCodeModal";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { MessageSquare, Calculator, QrCode } from "lucide-react";
import { CONTACT_INFO } from "./data";
import { AgroPack } from "./types";

export default function App() {
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);
  const [selectedPackForSimulator, setSelectedPackForSimulator] = useState<AgroPack | null>(null);

  const handleOpenSimulator = () => {
    const el = document.getElementById("simulateur");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectPack = (pack: AgroPack) => {
    setSelectedPackForSimulator(pack);
    const el = document.getElementById("simulateur");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-lime-500 selection:text-white relative overflow-x-hidden">
      
      {/* Living Animated Agricultural Background with Floating Particles & Drawings */}
      <AnimatedBackground />

      {/* Navigation */}
      <Navbar
        onOpenSimulator={handleOpenSimulator}
      />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero
          onOpenSimulator={handleOpenSimulator}
        />

        {/* Problem Section (Slide 2) */}
        <ProblemSection />

        {/* Circular Ecosystem Solution (Slide 3) */}
        <CircularSolution />

        {/* Production & Financial ROI Analytics (Slide 4 & 5) */}
        <ProductionAnalytics />

        {/* Quote Simulator (Centerpiece Feature) */}
        <QuoteSimulator initialPack={selectedPackForSimulator} />

        {/* 4 Packs Section (Slide 6) */}
        <PacksSection onSelectPack={handleSelectPack} />

        {/* Payment 3X & Support (Slide 7 & 8) */}
        <PaymentSchedule onOpenSimulator={handleOpenSimulator} />

        {/* Contact & FAQ */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenQRCode={() => setIsQRCodeOpen(true)} />

      {/* QR Code Modal for Netlify URL */}
      <QRCodeModal
        isOpen={isQRCodeOpen}
        onClose={() => setIsQRCodeOpen(false)}
      />

      {/* Floating Action Buttons - elevated to bottom-20 / bottom-24 so Netlify badge does not obstruct */}
      <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5 sm:gap-3 pointer-events-none">
        
        {/* Floating Simulator Quick Jump */}
        <button
          onClick={handleOpenSimulator}
          className="pointer-events-auto flex items-center gap-2 bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 hover:text-white px-3.5 py-2.5 rounded-full font-black text-xs shadow-xl shadow-lime-950/30 transition-all hover:scale-105 cursor-pointer border border-lime-300"
          title="Lancer le simulateur de devis"
        >
          <Calculator className="w-4 h-4" />
          <span className="hidden sm:inline">Simuler Devis</span>
        </button>

        {/* Floating QR Code Button */}
        <button
          onClick={() => setIsQRCodeOpen(true)}
          className="pointer-events-auto flex items-center gap-2 bg-[#0c1322]/90 hover:bg-[#131d33] text-emerald-400 hover:text-emerald-300 px-3.5 py-2.5 rounded-full font-bold text-xs shadow-xl shadow-black/60 transition-all hover:scale-105 cursor-pointer border border-emerald-500/30 backdrop-blur-md"
          title="Code QR du site https://242agropn.netlify.app/"
        >
          <QrCode className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline">Code QR</span>
        </button>

        {/* Floating WhatsApp Quick Link */}
        <a
          href={CONTACT_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex items-center gap-2 bg-emerald-600/90 hover:bg-emerald-500 text-white px-4 py-3 rounded-full font-bold text-xs shadow-xl shadow-emerald-950/50 transition-all hover:scale-105 border border-emerald-400/40 backdrop-blur-md"
          title="WhatsApp 242Agro"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">WhatsApp (+242 06 874 22 77)</span>
        </a>

      </div>

    </div>
  );
}
