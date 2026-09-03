import React, { useState, useMemo } from "react";
import { 
  Calculator, 
  Sparkles, 
  Download, 
  Send, 
  CheckCircle2, 
  Layers, 
  TrendingUp, 
  Clock, 
  Phone, 
  MapPin, 
  Calendar,
  AlertCircle,
  FileText,
  DollarSign,
  Leaf,
  Feather,
  RefreshCw,
  Droplet,
  ChevronRight,
  Eye
} from "lucide-react";
import confetti from "canvas-confetti";
import { QUARTIERS_POINTE_NOIRE, CONTACT_INFO, PACKS_DATA } from "../data";
import { QuoteConfig, SimulationResult, AgroPack } from "../types";
import { generateOfficialQuotePdf, QuotePdfData } from "../utils/quotePdfGenerator";
import { QuotePreviewModal } from "./QuotePreviewModal";

interface QuoteSimulatorProps {
  initialPack?: AgroPack | null;
}

export const QuoteSimulator: React.FC<QuoteSimulatorProps> = ({ initialPack }) => {
  // State
  const [clientType, setClientType] = useState<"famille" | "ecole_eglise" | "restaurant" | "investisseur">(
    initialPack?.id === "site_pilote" ? "ecole_eglise" : "famille"
  );
  const [surfaceArea, setSurfaceArea] = useState<number>(
    initialPack ? (initialPack.id === "starter" ? 4 : initialPack.id === "productif" ? 15 : 6) : 6
  );
  const [includePotager, setIncludePotager] = useState<boolean>(true);
  const [includePoules, setIncludePoules] = useState<boolean>(
    initialPack ? Boolean(initialPack.hens) : true
  );
  const [poulesCount, setPoulesCount] = useState<number>(
    initialPack?.hens || 10
  );
  const [includeLapins, setIncludeLapins] = useState<boolean>(
    initialPack ? Boolean(initialPack.rabbits) : false
  );
  const [lapinesCount, setLapinesCount] = useState<number>(
    initialPack?.rabbits || 4
  );
  const [includeCompost, setIncludeCompost] = useState<boolean>(true);
  const [irrigationType, setIrrigationType] = useState<"manuelle" | "goutte_a_goutte">("goutte_a_goutte");
  const [includeExtendedMaintenance, setIncludeExtendedMaintenance] = useState<boolean>(false);

  // Client Details Form
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientQuartier, setClientQuartier] = useState(QUARTIERS_POINTE_NOIRE[0]);
  const [notes, setNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuoteRef, setSubmittedQuoteRef] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Synchronize if initialPack changes
  React.useEffect(() => {
    if (initialPack) {
      if (initialPack.id === "starter") {
        setSurfaceArea(4);
        setIncludePoules(false);
        setIncludeLapins(false);
      } else if (initialPack.id === "familial") {
        setSurfaceArea(5);
        setIncludePoules(true);
        setPoulesCount(10);
        setIncludeLapins(false);
      } else if (initialPack.id === "productif") {
        setSurfaceArea(15);
        setIncludePoules(true);
        setPoulesCount(20);
        setIncludeLapins(true);
        setLapinesCount(4);
      } else if (initialPack.id === "site_pilote") {
        setClientType("ecole_eglise");
        setSurfaceArea(12);
        setIncludePoules(true);
        setPoulesCount(10);
        setIncludeLapins(true);
        setLapinesCount(4);
      }
    }
  }, [initialPack]);

  // Dynamic calculations based on 242Agro benchmarks
  const simulation: SimulationResult = useMemo(() => {
    let baseCost = 0;

    // 1. Potager hors-sol cost (bacs + substrat + semences + pose)
    if (includePotager) {
      baseCost += surfaceArea * 42000; // 42k FCFA per m2 all-inclusive
    }

    // 2. Poules pondeuses + Poulailler anti-odeurs
    if (includePoules && poulesCount > 0) {
      baseCost += 120000 + poulesCount * 7000; // 120k shelter + 7k/hen
    }

    // 3. Lapines + Clapiers
    if (includeLapins && lapinesCount > 0) {
      baseCost += 95000 + lapinesCount * 8500; // 95k hutch + 8.5k/rabbit
    }

    // 4. Irrigation goutte-à-goutte
    if (irrigationType === "goutte_a_goutte") {
      baseCost += 45000;
    }

    // 5. Composteur rapide 242Agro
    if (includeCompost) {
      baseCost += 35000;
    }

    // 6. Extended maintenance
    if (includeExtendedMaintenance) {
      baseCost += 90000; // 3 extra months
    }

    // Apply special institutional discount if ecole/eglise (up to 40% capped formula)
    if (clientType === "ecole_eglise") {
      baseCost = Math.round(baseCost * 0.75); // 25% global rebate
    }

    // Ensure realistic bounds matching packs
    const totalPrice = Math.max(180000, Math.round(baseCost / 1000) * 1000);

    // 3-time payment installments (Slide 7)
    const downPayment30 = Math.round(totalPrice * 0.3);
    const deliveryPayment40 = Math.round(totalPrice * 0.4);
    const harvestPayment30 = totalPrice - downPayment30 - deliveryPayment40;

    // Production yields over 6 months (Slide 4 benchmarks)
    // 1 m² -> 22kg vegetables
    // 10 hens -> 1,300 eggs
    // 4 rabbits -> 60kg white meat
    // Compost -> ~30 to 50 bags
    const vegetablesKg = includePotager ? Math.round(surfaceArea * 22) : 0;
    const eggsCount = includePoules ? Math.round((poulesCount / 10) * 1300) : 0;
    const meatKg = includeLapins ? Math.round((lapinesCount / 4) * 60) : 0;
    const compostBags = includeCompost ? Math.round(15 + (surfaceArea * 2) + (poulesCount * 1.2)) : 0;

    // Economic values in FCFA (Slide 5 benchmarks)
    // 22kg veg ~ 110k FCFA for standard setup, or ~1,000 FCFA/kg for organic local market
    const vegetablesValue = vegetablesKg * 1000;
    const eggsValue = Math.round((eggsCount / 30) * 4500); // 4500 FCFA per crate of 30 farm eggs in Pointe-Noire
    const meatValue = meatKg * 3500; // 3500 FCFA/kg rabbit meat
    const compostValue = compostBags * 3000; // 3000 FCFA per 25kg bag

    const totalValue = vegetablesValue + eggsValue + meatValue + compostValue;
    const netProfit6Months = totalValue - totalPrice;
    const roiMonth = totalValue > 0 ? Number(( (totalPrice / (totalValue / 6)) ).toFixed(1)) : 6;
    const breakEvenPercent = Math.min(100, Math.round((totalValue / totalPrice) * 100));

    return {
      totalPrice,
      downPayment30,
      deliveryPayment40,
      harvestPayment30,
      estimated6MonthProduction: {
        vegetablesKg,
        eggsCount,
        meatKg,
        compostBags,
      },
      estimated6MonthValue: {
        vegetablesValue,
        eggsValue,
        meatValue,
        compostValue,
        totalValue,
      },
      netProfit6Months,
      roiMonth,
      breakEvenPercent,
    };
  }, [
    clientType,
    surfaceArea,
    includePotager,
    includePoules,
    poulesCount,
    includeLapins,
    lapinesCount,
    includeCompost,
    irrigationType,
    includeExtendedMaintenance
  ]);

  // Prepare current quote data for PDF & Preview Modal
  const currentQuotePdfData: QuotePdfData = useMemo(() => ({
    clientName,
    clientPhone,
    clientEmail,
    clientQuartier,
    clientType,
    surfaceArea,
    includePotager,
    includePoules,
    poulesCount,
    includeLapins,
    lapinesCount,
    includeCompost,
    irrigationType,
    simulation,
    notes,
  }), [
    clientName,
    clientPhone,
    clientEmail,
    clientQuartier,
    clientType,
    surfaceArea,
    includePotager,
    includePoules,
    poulesCount,
    includeLapins,
    lapinesCount,
    includeCompost,
    irrigationType,
    simulation,
    notes,
  ]);

  // Handle Official PDF Generation with 242Agro Logo & Invoice styling
  const handleDownloadPDF = async () => {
    setIsGeneratingPdf(true);
    try {
      await generateOfficialQuotePdf(currentQuotePdfData);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Submit quote request to backend
  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientPhone) {
      alert("Veuillez renseigner votre numéro de téléphone pour la visite technique.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        clientName: clientName || "Client 242Agro",
        clientPhone,
        clientEmail,
        clientQuartier,
        clientType,
        surfaceArea,
        includePotager,
        includePoules,
        poulesCount,
        includeLapins,
        lapinesCount,
        includeCompost,
        irrigationType,
        totalPrice: simulation.totalPrice,
        notes
      };

      const res = await fetch("/api/quotes/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setSubmittedQuoteRef(data.reference);
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 }
        });
      }
    } catch (err) {
      console.error("Error submitting quote:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="simulateur" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-lime-50 text-[#65a30d] border border-lime-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
            <Calculator className="w-3.5 h-3.5 text-[#65a30d]" />
            <span>Simulateur Intelligent de Devis & Rentabilité</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-['Outfit']">
            Configurez Votre Espace & Estimez Vos Revenus
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Ajustez votre surface disponible à Pointe-Noire, choisissez vos modules et visualisez immédiatement l'échéancier de paiement 3X et le retour sur investissement sur 6 mois.
          </p>
        </div>

        {/* Simulator Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Box 1: Profil & Surface */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xl space-y-6">
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  1. Votre Profil d'Installation
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: "famille", label: "Famille / Cour", icon: "🏡" },
                    { id: "ecole_eglise", label: "École / Église", icon: "🏫" },
                    { id: "restaurant", label: "Restaurant", icon: "🍽️" },
                    { id: "investisseur", label: "Investisseur", icon: "📈" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setClientType(p.id as any)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        clientType === p.id
                          ? "border-2 border-[#84cc16] bg-lime-50 text-slate-950 font-black shadow-sm"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                      }`}
                    >
                      <div className="text-xl mb-1">{p.icon}</div>
                      <div className="text-xs">{p.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Surface Slider */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Superficie disponible : <span className="text-[#65a30d] font-black text-base">{surfaceArea} m²</span>
                  </label>
                  <span className="text-xs text-slate-600">
                    {surfaceArea <= 5 ? "Espace compact (cour / balcon)" : surfaceArea <= 15 ? "Cour familiale moyenne" : "Grand espace / Micro-ferme"}
                  </span>
                </div>
                
                <input
                  type="range"
                  min="2"
                  max="40"
                  step="1"
                  value={surfaceArea}
                  onChange={(e) => setSurfaceArea(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#84cc16]"
                />
                
                <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-medium">
                  <span>2 m² (Starter)</span>
                  <span>10 m² (Familial+)</span>
                  <span>20 m² (Productif)</span>
                  <span>40+ m²</span>
                </div>
              </div>

            </div>

            {/* Box 2: Modules Selection */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xl space-y-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                2. Composition des Modules 242Agro
              </label>

              {/* Module: Potager Hors-Sol */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-lime-100 text-[#65a30d] border border-lime-200 flex items-center justify-center font-bold">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-black text-sm text-slate-950">Bacs Potagers Hors-Sol</div>
                    <div className="text-xs text-slate-600">{surfaceArea} m² de culture · Amarante, tomates, ciboule, piments</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includePotager}
                  onChange={(e) => setIncludePotager(e.target.checked)}
                  className="w-5 h-5 accent-[#84cc16] rounded-lg cursor-pointer"
                />
              </div>

              {/* Module: Poules Pondeuses */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 border border-amber-200 flex items-center justify-center font-bold">
                      <Feather className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-black text-sm text-slate-950">Module Poules Pondeuses</div>
                      <div className="text-xs text-slate-600">Poulailler urbain anti-odeur + lot de poules vaccinées</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={includePoules}
                    onChange={(e) => setIncludePoules(e.target.checked)}
                    className="w-5 h-5 accent-amber-500 rounded-lg cursor-pointer"
                  />
                </div>

                {includePoules && (
                  <div className="pl-13 flex items-center gap-3 pt-2">
                    <span className="text-xs font-semibold text-slate-700">Nombre de poules :</span>
                    {[10, 20, 30].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setPoulesCount(num)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          poulesCount === num
                            ? "bg-amber-500 text-slate-950 shadow-xs font-black"
                            : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {num} poules
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Module: Lapins */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 border border-purple-200 flex items-center justify-center font-bold">
                      🐰
                    </div>
                    <div>
                      <div className="font-black text-sm text-slate-950">Module Lapines Reproductrices</div>
                      <div className="text-xs text-slate-600">Clapiers surélevés + lapines pour viande blanche et compost</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeLapins}
                    onChange={(e) => setIncludeLapins(e.target.checked)}
                    className="w-5 h-5 accent-purple-600 rounded-lg cursor-pointer"
                  />
                </div>

                {includeLapins && (
                  <div className="pl-13 flex items-center gap-3 pt-2">
                    <span className="text-xs font-semibold text-slate-700">Nombre de reproductrices :</span>
                    {[4, 8, 12].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setLapinesCount(num)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          lapinesCount === num
                            ? "bg-purple-600 text-white shadow-xs font-black"
                            : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {num} lapines
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Options: Irrigation & Compost */}
              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplet className="w-4 h-4 text-sky-500" />
                    <span className="text-xs font-bold text-slate-900">Irrigation goutte-à-goutte</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={irrigationType === "goutte_a_goutte"}
                    onChange={(e) => setIrrigationType(e.target.checked ? "goutte_a_goutte" : "manuelle")}
                    className="w-4 h-4 accent-sky-500 cursor-pointer"
                  />
                </div>

                <div className="p-3 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-[#65a30d]" />
                    <span className="text-xs font-bold text-slate-900">Composteur 242Agro</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeCompost}
                    onChange={(e) => setIncludeCompost(e.target.checked)}
                    className="w-4 h-4 accent-[#84cc16] cursor-pointer"
                  />
                </div>
              </div>

            </div>

            {/* Box 3: Demande de Visite Technique */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-950 font-['Outfit']">
                  Réserver une Visite Technique Gratuite à Pointe-Noire (48h)
                </h3>
                <span className="text-[11px] font-bold text-[#65a30d] bg-lime-50 px-2.5 py-0.5 rounded-full border border-lime-200">
                  Sans engagement
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Un technicien agronome 242Agro vient mesurer votre espace et valider l'exposition solaire.
              </p>

              {submittedQuoteRef ? (
                <div className="p-4 rounded-2xl bg-lime-50 border border-lime-300 text-slate-800 text-sm space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#65a30d]">
                    <CheckCircle2 className="w-5 h-5 text-[#65a30d]" />
                    <span>Demande enregistrée avec succès ! (Réf: {submittedQuoteRef})</span>
                  </div>
                  <p className="text-xs text-slate-700">
                    Notre équipe de Pointe-Noire vous appellera au <strong className="text-slate-950">{clientPhone}</strong> sous 48h.
                  </p>
                  <a
                    href={`https://wa.me/242068742277?text=Bonjour,%20j'ai%20validé%20mon%20devis%20Réf:%20${submittedQuoteRef}%20pour%20une%20visite%20à%20${clientQuartier}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-black bg-[#84cc16] hover:bg-lime-500 text-slate-950 px-4 py-2.5 rounded-xl mt-2 shadow-sm border border-lime-300"
                  >
                    <span>Confirmer directement sur WhatsApp</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmitQuote} className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Votre Nom & Prénom *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Jean-Paul M."
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:outline-lime-500 focus:bg-white placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Téléphone (Pointe-Noire) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="Ex: 06 874 22 77"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:outline-lime-500 focus:bg-white placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Quartier à Pointe-Noire *</label>
                      <select
                        value={clientQuartier}
                        onChange={(e) => setClientQuartier(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:outline-lime-500 focus:bg-white"
                      >
                        {QUARTIERS_POINTE_NOIRE.map((q) => (
                          <option key={q} value={q} className="bg-white text-slate-900">{q}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Email (optionnel)</label>
                      <input
                        type="email"
                        placeholder="contact@exemple.cg"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:outline-lime-500 focus:bg-white placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3.5 px-4 rounded-2xl bg-[#84cc16] hover:bg-lime-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-lime-500/20 border-2 border-lime-400 transition-all disabled:opacity-50 active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? "Envoi en cours..." : "Réserver ma Visite Technique Gratuite"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowPreviewModal(true)}
                      className="py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all border border-slate-300 shadow-sm"
                    >
                      <Eye className="w-4 h-4 text-emerald-700" />
                      <span>Aperçu Devis</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadPDF}
                      disabled={isGeneratingPdf}
                      className="py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all border border-slate-800 shadow-sm disabled:opacity-50"
                    >
                      <Download className="w-4 h-4 text-[#84cc16]" />
                      <span>{isGeneratingPdf ? "Génération..." : "Devis PDF"}</span>
                    </button>
                  </div>
                </form>
              )}

            </div>

          </div>

          {/* Right Column: Live Financial & Production Summary Panel */}
          <div className="lg:col-span-5 space-y-6 sticky top-28">
            
            {/* Price & Installments Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 text-slate-900 border border-slate-200 shadow-xl space-y-6">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#65a30d] bg-lime-50 px-3 py-1 rounded-full border border-lime-200">
                  Devis Estimatif Clé en Main
                </span>
                <span className="text-[11px] bg-slate-100 text-slate-700 px-3 py-1 rounded-full border border-slate-200 font-semibold">
                  3 Mois Suivi Inclus
                </span>
              </div>

              {/* Total Price Display */}
              <div>
                <div className="text-xs text-slate-600 font-medium">Montant Total de l'Installation :</div>
                <div className="text-3xl sm:text-4xl font-black text-slate-950 font-['Outfit'] mt-1">
                  {simulation.totalPrice.toLocaleString()} <span className="text-[#65a30d] text-xl">FCFA</span>
                </div>
              </div>

              {/* 3-Time Installment Breakdown */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  Paiement Échelonné en 3 Fois Sans Frais :
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <div className="text-[10px] text-slate-600 uppercase font-semibold">1. Commande</div>
                    <div className="text-sm font-black text-slate-950 mt-1">
                      {simulation.downPayment30.toLocaleString()} F
                    </div>
                    <div className="text-[9px] text-[#65a30d] font-bold">30% (Lancement)</div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <div className="text-[10px] text-slate-600 uppercase font-semibold">2. Livraison</div>
                    <div className="text-sm font-black text-slate-950 mt-1">
                      {simulation.deliveryPayment40.toLocaleString()} F
                    </div>
                    <div className="text-[9px] text-amber-700 font-bold">40% (Pose)</div>
                  </div>

                  <div className="bg-lime-50 p-3 rounded-2xl border border-lime-300">
                    <div className="text-[10px] text-[#65a30d] uppercase font-bold">3. Mois 3</div>
                    <div className="text-sm font-black text-slate-950 mt-1">
                      {simulation.harvestPayment30.toLocaleString()} F
                    </div>
                    <div className="text-[9px] text-[#65a30d] font-extrabold">30% (Récolte)</div>
                  </div>
                </div>
              </div>

              {/* Production Forecast in 6 Months */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">Production Estimée en 6 Mois :</span>
                  <span className="text-[#65a30d] font-bold">Valeur: ~{simulation.estimated6MonthValue.totalValue.toLocaleString()} FCFA</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {includePotager && (
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                      <span className="text-slate-600">🥬 Légumes :</span>
                      <strong className="text-[#65a30d] font-bold">{simulation.estimated6MonthProduction.vegetablesKg} kg</strong>
                    </div>
                  )}
                  {includePoules && poulesCount > 0 && (
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                      <span className="text-slate-600">🥚 Œufs frais :</span>
                      <strong className="text-amber-700 font-bold">{simulation.estimated6MonthProduction.eggsCount}</strong>
                    </div>
                  )}
                  {includeLapins && lapinesCount > 0 && (
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                      <span className="text-slate-600">🐰 Viande :</span>
                      <strong className="text-purple-700 font-bold">{simulation.estimated6MonthProduction.meatKg} kg</strong>
                    </div>
                  )}
                  {includeCompost && (
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                      <span className="text-slate-600">🌱 Compost :</span>
                      <strong className="text-teal-700 font-bold">{simulation.estimated6MonthProduction.compostBags} sacs</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* ROI & Break-even Alert */}
              <div className="p-4 rounded-2xl bg-lime-50 border border-lime-200 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#65a30d]">Remboursement Intégral Estimé :</span>
                  <span className="text-sm font-black text-slate-950 font-['Outfit']">Dès le Mois {simulation.roiMonth}</span>
                </div>
                <div className="text-[11px] text-slate-700">
                  Bénéfice net estimé après 6 mois : <strong className="text-[#65a30d] font-bold">+{Math.max(0, simulation.netProfit6Months).toLocaleString()} FCFA</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(true)}
                  className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm border border-slate-300 transition-all active:scale-95"
                >
                  <Eye className="w-4 h-4 text-emerald-700" />
                  <span>Aperçu du Devis Officiel</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPdf}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#84cc16] hover:bg-lime-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-lime-500/20 border-2 border-lime-400 transition-all active:scale-95 disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>{isGeneratingPdf ? "Génération du PDF..." : "Télécharger ce Devis en PDF"}</span>
                </button>
              </div>

            </div>

            {/* Quick Phone Call Pill */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-lime-50 text-[#65a30d] border border-lime-200 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-950">Une question technique ?</div>
                  <div className="text-slate-600">Parlez directement à un agronome</div>
                </div>
              </div>
              <a
                href={`tel:${CONTACT_INFO.phoneClean}`}
                className="text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl transition-all"
              >
                Appeler
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* Official Invoice-style Quote Preview Modal */}
      <QuotePreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        data={currentQuotePdfData}
      />
    </section>
  );
};
