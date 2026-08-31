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
  ChevronRight
} from "lucide-react";
import confetti from "canvas-confetti";
import { QUARTIERS_POINTE_NOIRE, CONTACT_INFO, PACKS_DATA } from "../data";
import { QuoteConfig, SimulationResult, AgroPack } from "../types";

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

  // Handle PDF Generation
  const handleDownloadPDF = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      const ref = `242AGRO-${Date.now().toString().slice(-6)}`;

      // Brand Header
      doc.setFillColor(16, 185, 129); // emerald-500
      doc.rect(0, 0, 210, 35, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("242Agro - DEVIS TECHNIQUE ESTIMATIF", 15, 20);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Agriculture Urbaine Hors-Sol & Élevage Intégré à Pointe-Noire", 15, 28);
      doc.text(`Réf : ${ref} | Date : ${new Date().toLocaleDateString("fr-FR")}`, 130, 28);

      // Client & Project Info Box
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("INFORMATIONS DU PROJET", 15, 48);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Client : ${clientName || "Client Particulier / Institution"}`, 15, 56);
      doc.text(`Téléphone : ${clientPhone || "Non renseigné"}`, 15, 62);
      doc.text(`Quartier : ${clientQuartier} (Pointe-Noire, Congo)`, 15, 68);
      doc.text(`Profil : ${clientType.toUpperCase()} | Surface : ${surfaceArea} m²`, 15, 74);

      // Configuration Details Table Header
      doc.setFillColor(241, 245, 249);
      doc.rect(15, 82, 180, 8, "F");
      doc.setFont("helvetica", "bold");
      doc.text("DÉSIGNATION DES MODULES 242AGRO", 20, 88);
      doc.text("ESTIMATION (FCFA)", 150, 88);

      // Items
      let y = 98;
      doc.setFont("helvetica", "normal");

      if (includePotager) {
        doc.text(`• Bacs maraîchers hors-sol (${surfaceArea} m²) + Substrat bio enrichi + Semences`, 20, y);
        doc.text(`${(surfaceArea * 42000).toLocaleString()} FCFA`, 150, y);
        y += 8;
      }

      if (includePoules && poulesCount > 0) {
        doc.text(`• Module Avicole urbain (${poulesCount} poules pondeuses vaccinées + abri anti-odeur)`, 20, y);
        doc.text(`${(120000 + poulesCount * 7000).toLocaleString()} FCFA`, 150, y);
        y += 8;
      }

      if (includeLapins && lapinesCount > 0) {
        doc.text(`• Module Cunicole (${lapinesCount} lapines reproductrices + clapiers surélevés)`, 20, y);
        doc.text(`${(95000 + lapinesCount * 8500).toLocaleString()} FCFA`, 150, y);
        y += 8;
      }

      doc.text(`• Système d'arrosage (${irrigationType === "goutte_a_goutte" ? "Goutte-à-goutte économique" : "Manuel optimisé"})`, 20, y);
      doc.text(`${(irrigationType === "goutte_a_goutte" ? 45000 : 0).toLocaleString()} FCFA`, 150, y);
      y += 8;

      if (includeCompost) {
        doc.text(`• Unité de compostage accéléré 242Agro (Boucle circulaire zéro coût)`, 20, y);
        doc.text("35 000 FCFA", 150, y);
        y += 8;
      }

      doc.text(`• Pose complète + Formation pratique + Suivi agronomique 3 mois`, 20, y);
      doc.text("INCLUS", 150, y);
      y += 12;

      // Total Box
      doc.setFillColor(236, 253, 245);
      doc.rect(15, y, 180, 14, "F");
      doc.setFont("helvetica", "bold");
      doc.setTextColor(4, 120, 87);
      doc.setFontSize(13);
      doc.text("TOTAL INVESTISSEMENT CLÉ EN MAIN :", 20, y + 9);
      doc.text(`${simulation.totalPrice.toLocaleString()} FCFA`, 140, y + 9);

      y += 24;

      // Payment Schedule (Slide 7)
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("ÉCHÉANCIER DE PAIEMENT EN 3 FOIS SANS FRAIS :", 15, y);

      y += 8;
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(`1. À la commande (30%) : ${simulation.downPayment30.toLocaleString()} FCFA (lancement fabrication)`, 20, y);
      y += 6;
      doc.text(`2. À la livraison & pose (40%) : ${simulation.deliveryPayment40.toLocaleString()} FCFA (début production & formation)`, 20, y);
      y += 6;
      doc.text(`3. Au Mois 3 après 1ère récolte (30%) : ${simulation.harvestPayment30.toLocaleString()} FCFA (autofinancé)`, 20, y);

      y += 14;

      // Production & ROI Projections (Slide 4 & 5)
      doc.setFillColor(254, 243, 199);
      doc.rect(15, y, 180, 32, "F");
      doc.setTextColor(146, 64, 14);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("RENDEMENTS ET GAINS ESTIMÉS SUR 6 MOIS :", 20, y + 7);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(9);
      doc.text(`• Légumes frais récoltés : ${simulation.estimated6MonthProduction.vegetablesKg} kg (~${simulation.estimated6MonthValue.vegetablesValue.toLocaleString()} FCFA)`, 20, y + 14);
      doc.text(`• Œufs frais de ferme : ${simulation.estimated6MonthProduction.eggsCount} unités (~${simulation.estimated6MonthValue.eggsValue.toLocaleString()} FCFA)`, 20, y + 20);
      doc.text(`• Viande blanche saine : ${simulation.estimated6MonthProduction.meatKg} kg (~${simulation.estimated6MonthValue.meatValue.toLocaleString()} FCFA)`, 20, y + 26);
      doc.text(`• Valeur totale produite : ${simulation.estimated6MonthValue.totalValue.toLocaleString()} FCFA | Remboursement estimé : Mois ${simulation.roiMonth}`, 105, y + 14);
      doc.text(`• Bénéfice Net après 6 mois : +${Math.max(0, simulation.netProfit6Months).toLocaleString()} FCFA`, 105, y + 20);

      // Contact & Validation Footer
      y += 44;
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(`Contact 242Agro Pointe-Noire : ${CONTACT_INFO.phone} | ${CONTACT_INFO.email}`, 15, y);
      doc.text("Ce devis est une estimation préliminaire. Une visite technique sur site sous 48h confirme les métrés exacts.", 15, y + 5);

      // Save PDF
      doc.save(`Devis_242Agro_${ref}.pdf`);

      // Trigger Confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error("PDF generation failed:", err);
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
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-xl">
            <Calculator className="w-3.5 h-3.5" />
            <span>Simulateur Intelligent de Devis & Rentabilité</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
            Configurez Votre Espace & Estimez Vos Revenus
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Ajustez votre surface disponible à Pointe-Noire, choisissez vos modules et visualisez immédiatement l'échéancier de paiement 3X et le retour sur investissement sur 6 mois.
          </p>
        </div>

        {/* Simulator Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Box 1: Profil & Surface */}
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 border border-white/10 shadow-2xl shadow-black/20 space-y-6">
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
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
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer backdrop-blur-xl ${
                        clientType === p.id
                          ? "border-emerald-400 bg-emerald-500/20 text-white font-bold shadow-lg shadow-emerald-950/30"
                          : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="text-xl mb-1">{p.icon}</div>
                      <div className="text-xs">{p.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Surface Slider */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Superficie disponible : <span className="text-emerald-400 font-extrabold text-base">{surfaceArea} m²</span>
                  </label>
                  <span className="text-xs text-slate-400">
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
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>2 m² (Starter)</span>
                  <span>10 m² (Familial+)</span>
                  <span>20 m² (Productif)</span>
                  <span>40+ m²</span>
                </div>
              </div>

            </div>

            {/* Box 2: Modules Selection */}
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 border border-white/10 shadow-2xl shadow-black/20 space-y-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                2. Composition des Modules 242Agro
              </label>

              {/* Module: Potager Hors-Sol */}
              <div className="p-4 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-between backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">Bacs Potagers Hors-Sol</div>
                    <div className="text-xs text-slate-400">{surfaceArea} m² de culture · Amarante, tomates, ciboule, piments</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includePotager}
                  onChange={(e) => setIncludePotager(e.target.checked)}
                  className="w-5 h-5 accent-emerald-500 rounded-lg cursor-pointer"
                />
              </div>

              {/* Module: Poules Pondeuses */}
              <div className="p-4 rounded-2xl border border-white/10 bg-white/5 space-y-3 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
                      <Feather className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">Module Poules Pondeuses</div>
                      <div className="text-xs text-slate-400">Poulailler urbain anti-odeur + lot de poules vaccinées</div>
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
                    <span className="text-xs font-semibold text-slate-300">Nombre de poules :</span>
                    {[10, 20, 30].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setPoulesCount(num)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer backdrop-blur-md ${
                          poulesCount === num
                            ? "bg-amber-500 text-stone-950 shadow-md font-extrabold"
                            : "bg-white/10 border border-white/10 text-slate-300 hover:bg-white/15"
                        }`}
                      >
                        {num} poules
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Module: Lapins */}
              <div className="p-4 rounded-2xl border border-white/10 bg-white/5 space-y-3 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center font-bold">
                      🐰
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">Module Lapines Reproductrices</div>
                      <div className="text-xs text-slate-400">Clapiers surélevés + lapines pour viande blanche et compost</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeLapins}
                    onChange={(e) => setIncludeLapins(e.target.checked)}
                    className="w-5 h-5 accent-purple-500 rounded-lg cursor-pointer"
                  />
                </div>

                {includeLapins && (
                  <div className="pl-13 flex items-center gap-3 pt-2">
                    <span className="text-xs font-semibold text-slate-300">Nombre de reproductrices :</span>
                    {[4, 8, 12].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setLapinesCount(num)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer backdrop-blur-md ${
                          lapinesCount === num
                            ? "bg-purple-600 text-white shadow-md font-extrabold"
                            : "bg-white/10 border border-white/10 text-slate-300 hover:bg-white/15"
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
                <div className="p-3 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-between backdrop-blur-xl">
                  <div className="flex items-center gap-2">
                    <Droplet className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-bold text-white">Irrigation goutte-à-goutte</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={irrigationType === "goutte_a_goutte"}
                    onChange={(e) => setIrrigationType(e.target.checked ? "goutte_a_goutte" : "manuelle")}
                    className="w-4 h-4 accent-sky-500 cursor-pointer"
                  />
                </div>

                <div className="p-3 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-between backdrop-blur-xl">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white">Composteur 242Agro</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeCompost}
                    onChange={(e) => setIncludeCompost(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500 cursor-pointer"
                  />
                </div>
              </div>

            </div>

            {/* Box 3: Demande de Visite Technique */}
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 border border-white/10 shadow-2xl shadow-black/20 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white font-['Outfit']">
                  Réserver une Visite Technique Gratuite à Pointe-Noire (48h)
                </h3>
                <span className="text-[11px] font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Sans engagement
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Un technicien agronome 242Agro vient mesurer votre espace et valider l'exposition solaire.
              </p>

              {submittedQuoteRef ? (
                <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-400/40 text-emerald-200 text-sm space-y-2 backdrop-blur-xl">
                  <div className="flex items-center gap-2 font-bold text-emerald-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Demande enregistrée avec succès ! (Réf: {submittedQuoteRef})</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Notre équipe de Pointe-Noire vous appellera au <strong className="text-white">{clientPhone}</strong> sous 48h.
                  </p>
                  <a
                    href={`https://wa.me/242068742277?text=Bonjour,%20j'ai%20validé%20mon%20devis%20Réf:%20${submittedQuoteRef}%20pour%20une%20visite%20à%20${clientQuartier}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl mt-2 shadow-lg border border-emerald-400/30"
                  >
                    <span>Confirmer directement sur WhatsApp</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmitQuote} className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">Votre Nom & Prénom *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Jean-Paul M."
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white text-xs focus:outline-emerald-500 placeholder:text-slate-500 backdrop-blur-md"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">Téléphone (Pointe-Noire) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="Ex: 06 874 22 77"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white text-xs focus:outline-emerald-500 placeholder:text-slate-500 backdrop-blur-md"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">Quartier à Pointe-Noire *</label>
                      <select
                        value={clientQuartier}
                        onChange={(e) => setClientQuartier(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#0b1120] text-white text-xs focus:outline-emerald-500"
                      >
                        {QUARTIERS_POINTE_NOIRE.map((q) => (
                          <option key={q} value={q} className="bg-[#0b1120] text-white">{q}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">Email (optionnel)</label>
                      <input
                        type="email"
                        placeholder="contact@exemple.cg"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white text-xs focus:outline-emerald-500 placeholder:text-slate-500 backdrop-blur-md"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-emerald-950/40 border border-emerald-400/30 transition-all disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? "Envoi en cours..." : "Réserver ma Visite Technique Gratuite"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadPDF}
                      className="py-3.5 px-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all border border-white/10 backdrop-blur-xl"
                    >
                      <Download className="w-4 h-4 text-emerald-400" />
                      <span>Télécharger Devis PDF</span>
                    </button>
                  </div>
                </form>
              )}

            </div>

          </div>

          {/* Right Column: Live Financial & Production Summary Panel */}
          <div className="lg:col-span-5 space-y-6 sticky top-28">
            
            {/* Price & Installments Card */}
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 text-white border border-white/15 shadow-2xl shadow-black/40 space-y-6">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Devis Estimatif Clé en Main
                </span>
                <span className="text-[11px] bg-white/10 text-slate-300 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                  3 Mois Suivi Inclus
                </span>
              </div>

              {/* Total Price Display */}
              <div>
                <div className="text-xs text-slate-400">Montant Total de l'Installation :</div>
                <div className="text-3xl sm:text-4xl font-black text-white font-['Outfit'] mt-1">
                  {simulation.totalPrice.toLocaleString()} <span className="text-emerald-400 text-xl">FCFA</span>
                </div>
              </div>

              {/* 3-Time Installment Breakdown (Slide 7) */}
              <div className="space-y-3 pt-3 border-t border-white/10">
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Paiement Échelonné en 3 Fois Sans Frais :
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white/5 p-3 rounded-2xl border border-white/10 backdrop-blur-xl">
                    <div className="text-[10px] text-slate-400 uppercase">1. Commande</div>
                    <div className="text-sm font-extrabold text-white mt-1">
                      {simulation.downPayment30.toLocaleString()} F
                    </div>
                    <div className="text-[9px] text-emerald-400 font-semibold">30% (Lancement)</div>
                  </div>

                  <div className="bg-white/5 p-3 rounded-2xl border border-white/10 backdrop-blur-xl">
                    <div className="text-[10px] text-slate-400 uppercase">2. Livraison</div>
                    <div className="text-sm font-extrabold text-white mt-1">
                      {simulation.deliveryPayment40.toLocaleString()} F
                    </div>
                    <div className="text-[9px] text-amber-400 font-semibold">40% (Pose)</div>
                  </div>

                  <div className="bg-emerald-950/60 p-3 rounded-2xl border border-emerald-400/40 backdrop-blur-xl">
                    <div className="text-[10px] text-emerald-200 uppercase">3. Mois 3</div>
                    <div className="text-sm font-extrabold text-white mt-1">
                      {simulation.harvestPayment30.toLocaleString()} F
                    </div>
                    <div className="text-[9px] text-emerald-300 font-bold">30% (Récolte)</div>
                  </div>
                </div>
              </div>

              {/* Production Forecast in 6 Months */}
              <div className="space-y-3 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">Production Estimée en 6 Mois :</span>
                  <span className="text-emerald-400 font-semibold">Valeur: ~{simulation.estimated6MonthValue.totalValue.toLocaleString()} FCFA</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {includePotager && (
                    <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 backdrop-blur-md flex items-center justify-between">
                      <span className="text-slate-300">🥬 Légumes :</span>
                      <strong className="text-emerald-400">{simulation.estimated6MonthProduction.vegetablesKg} kg</strong>
                    </div>
                  )}
                  {includePoules && poulesCount > 0 && (
                    <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 backdrop-blur-md flex items-center justify-between">
                      <span className="text-slate-300">🥚 Œufs frais :</span>
                      <strong className="text-amber-400">{simulation.estimated6MonthProduction.eggsCount}</strong>
                    </div>
                  )}
                  {includeLapins && lapinesCount > 0 && (
                    <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 backdrop-blur-md flex items-center justify-between">
                      <span className="text-slate-300">🐰 Viande :</span>
                      <strong className="text-purple-300">{simulation.estimated6MonthProduction.meatKg} kg</strong>
                    </div>
                  )}
                  {includeCompost && (
                    <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 backdrop-blur-md flex items-center justify-between">
                      <span className="text-slate-300">🌱 Compost :</span>
                      <strong className="text-teal-400">{simulation.estimated6MonthProduction.compostBags} sacs</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* ROI & Break-even Alert */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-teal-950/60 border border-emerald-400/30 space-y-1.5 backdrop-blur-xl">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-300">Remboursement Intégral Estimé :</span>
                  <span className="text-sm font-black text-white font-['Outfit']">Dès le Mois {simulation.roiMonth}</span>
                </div>
                <div className="text-[11px] text-slate-300">
                  Bénéfice net estimé après 6 mois : <strong className="text-emerald-400">+{Math.max(0, simulation.netProfit6Months).toLocaleString()} FCFA</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                type="button"
                onClick={handleDownloadPDF}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-emerald-950/40 border border-emerald-400/30 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger ce Devis en PDF</span>
              </button>

            </div>

            {/* Quick Phone Call Pill */}
            <div className="p-4 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-white">Une question technique ?</div>
                  <div className="text-slate-400">Parlez directement à un agronome</div>
                </div>
              </div>
              <a
                href={`tel:${CONTACT_INFO.phoneClean}`}
                className="text-xs font-bold bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl border border-white/10 backdrop-blur-md transition-all"
              >
                Appeler
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
