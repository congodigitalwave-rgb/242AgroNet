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
import { FloatingActions } from "./components/FloatingActions";
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

      {/* Floating Action Buttons: Simulateur & WhatsApp only, auto-hides over text to prevent obstructing reading */}
      <FloatingActions onOpenSimulator={handleOpenSimulator} />

    </div>
  );
}
