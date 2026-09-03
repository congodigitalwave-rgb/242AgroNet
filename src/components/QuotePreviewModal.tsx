import React, { useState } from "react";
import { X, Download, Printer, CheckCircle2, ShieldCheck, Share2, Sparkles } from "lucide-react";
import { QuotePdfData, generateOfficialQuotePdf } from "../utils/quotePdfGenerator";
import { Logo242Agro } from "./Logo242Agro";
import { CONTACT_INFO } from "../data";
import confetti from "canvas-confetti";

interface QuotePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: QuotePdfData;
}

export const QuotePreviewModal: React.FC<QuotePreviewModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const ref = data.reference || `DEV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const dateStr = data.dateStr || new Date().toISOString().slice(0, 10);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generateOfficialQuotePdf({
        ...data,
        reference: ref,
        dateStr: dateStr,
      });
      setDownloadSuccess(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-slate-100 text-slate-900 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col relative border border-slate-300">
        
        {/* Modal Top Actions Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xl z-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-lime-100 text-[#65a30d] border border-lime-300 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black font-['Outfit'] text-slate-950 flex items-center gap-2">
                <span>Aperçu du Devis Officiel</span>
                <span className="text-[10px] font-bold bg-lime-100 text-[#65a30d] border border-lime-300 px-2 py-0.5 rounded-full">
                  Conforme Facture 242Agro
                </span>
              </h3>
              <p className="text-xs text-slate-500">Document certifié avec logo officiel, échéancier et conditions techniques</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="px-3.5 py-2 rounded-xl bg-[#84cc16] hover:bg-lime-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm border border-lime-400 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isGenerating ? "Création..." : downloadSuccess ? "Téléchargé !" : "Télécharger PDF"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all cursor-pointer hidden sm:flex items-center justify-center"
              title="Imprimer le devis"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-950 border border-slate-200 transition-all cursor-pointer"
              title="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Printable Sheet Body */}
        <div className="p-4 sm:p-8 flex justify-center">
          <div className="w-full max-w-[800px] bg-white rounded-2xl shadow-xl border border-slate-300 overflow-hidden text-slate-900 font-sans">
            
            {/* 1. Header Bar (Exact match to attached receipt) */}
            <div className="bg-[#1b5e20] text-white px-6 py-5 relative border-b-4 border-amber-600">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                {/* Logo & Brand Title */}
                <div className="flex items-center gap-4">
                  <div className="bg-white rounded-2xl p-2 shadow-md border border-slate-100 shrink-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center aspect-square">
                    <Logo242Agro size="md" showText={false} withGlow={false} />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black font-['Outfit'] tracking-tight text-white">
                      242Agro
                    </div>
                    <div className="text-xs sm:text-sm text-lime-200 font-medium">
                      Devis officiel & Cahier des charges technique • Pointe-Noire (Congo)
                    </div>
                  </div>
                </div>

                {/* Slogan */}
                <div className="text-right sm:max-w-[280px]">
                  <p className="text-xs italic text-lime-100 leading-snug">
                    « Transformons vos espaces en sources de vie, de revenus et d'autonomie. »
                  </p>
                </div>
              </div>
            </div>

            {/* Document Content */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Document Reference & Date */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                  <h2 className="text-lg sm:text-xl font-black text-emerald-800 font-['Outfit'] tracking-wide">
                    DEVIS TECHNIQUE ESTIMATIF N° {ref}
                  </h2>
                </div>
                <div className="text-xs sm:text-sm text-slate-600 font-semibold">
                  Date : <span className="text-slate-950">{dateStr}</span>
                </div>
              </div>

              {/* Client Details Section (Table format like attached invoice) */}
              <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 space-y-2.5 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2">
                  <div className="sm:col-span-4 text-slate-500 font-medium">Client / Demandeur :</div>
                  <div className="sm:col-span-8 font-black text-slate-950">{data.clientName || "Client Particulier"}</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2">
                  <div className="sm:col-span-4 text-slate-500 font-medium">Téléphone & WhatsApp :</div>
                  <div className="sm:col-span-8 font-bold text-slate-900">{data.clientPhone || "Non communiqué"}</div>
                </div>

                {data.clientEmail && (
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2">
                    <div className="sm:col-span-4 text-slate-500 font-medium">Email de contact :</div>
                    <div className="sm:col-span-8 text-slate-800">{data.clientEmail}</div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2">
                  <div className="sm:col-span-4 text-slate-500 font-medium">Localisation du site :</div>
                  <div className="sm:col-span-8 font-bold text-slate-900">{data.clientQuartier || "Pointe-Noire"}, République du Congo</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2">
                  <div className="sm:col-span-4 text-slate-500 font-medium">Type d'espace & Surface :</div>
                  <div className="sm:col-span-8 font-bold text-slate-900">
                    {data.clientType === "famille" ? "Cour / Toiture Familiale" : data.clientType === "restaurant" ? "Restaurant / Hôtel" : data.clientType === "ecole_eglise" ? "École / Église" : "Site Productif Investisseur"} • <span className="text-emerald-700">{data.surfaceArea} m² alloués</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2">
                  <div className="sm:col-span-4 text-slate-500 font-medium">Formule d'accompagnement :</div>
                  <div className="sm:col-span-8 text-emerald-800 font-bold">
                    Installation Clé en Main (Fourniture + Pose + Formation + Suivi 3 Mois Inclus)
                  </div>
                </div>
              </div>

              {/* Modules & Services Breakdown Table (Corporate Quotation Grid) */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="bg-slate-800 text-white px-5 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-between">
                  <div className="flex-1 font-black">Désignation des Modules & Équipements 242Agro</div>
                  <div className="text-right font-black w-36 sm:w-48">Montant Estimé (FCFA)</div>
                </div>

                <div className="divide-y divide-slate-200 text-xs sm:text-sm bg-white">
                  {data.includePotager && (
                    <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors">
                      <div className="space-y-1">
                        <div className="font-bold text-slate-950 text-sm sm:text-base flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                          Potager Maraîcher Hors-Sol ({data.surfaceArea} m²)
                        </div>
                        <div className="text-xs text-slate-600">
                          Bacs de culture surélevés traités • Substrat bio enrichi • Semences maraîchères sélectionnées
                        </div>
                      </div>
                      <div className="font-black text-slate-950 sm:text-right text-base whitespace-nowrap">
                        {(data.surfaceArea * 42000).toLocaleString()} FCFA
                      </div>
                    </div>
                  )}

                  {data.includePoules && data.poulesCount > 0 && (
                    <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors">
                      <div className="space-y-1">
                        <div className="font-bold text-slate-950 text-sm sm:text-base flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                          Module Avicole Urbain ({data.poulesCount} Poules Pondeuses)
                        </div>
                        <div className="text-xs text-slate-600">
                          Poules vaccinées prêtes à pondre • Poulailler surélevé aéré anti-odeur • Mangeoires & abreuvoirs
                        </div>
                      </div>
                      <div className="font-black text-slate-950 sm:text-right text-base whitespace-nowrap">
                        {(120000 + data.poulesCount * 7000).toLocaleString()} FCFA
                      </div>
                    </div>
                  )}

                  {data.includeLapins && data.lapinesCount > 0 && (
                    <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors">
                      <div className="space-y-1">
                        <div className="font-bold text-slate-950 text-sm sm:text-base flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                          Module Cunicole Hors-Sol ({data.lapinesCount} Lapines Reproductrices)
                        </div>
                        <div className="text-xs text-slate-600">
                          Clapiers métalliques grillagés hygiéniques • Abreuvoirs automatiques à pipette • Mâle reproducteur
                        </div>
                      </div>
                      <div className="font-black text-slate-950 sm:text-right text-base whitespace-nowrap">
                        {(95000 + data.lapinesCount * 8500).toLocaleString()} FCFA
                      </div>
                    </div>
                  )}

                  <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors">
                    <div className="space-y-1">
                      <div className="font-bold text-slate-950 text-sm sm:text-base flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        Système d'Arrosage Économe ({data.irrigationType === "goutte_a_goutte" ? "Goutte-à-Goutte Sectorisé" : "Manuel Optimisé"})
                      </div>
                      <div className="text-xs text-slate-600">
                        {data.irrigationType === "goutte_a_goutte"
                          ? "Ligne goutte-à-goutte avec régulateur et vannes sectorisées (économie d'eau de 70%)"
                          : "Tuyauterie renforcée + Raccords rapides et pomme d'arrosage micro-pluie"}
                      </div>
                    </div>
                    <div className={`font-black sm:text-right text-base whitespace-nowrap ${data.irrigationType === "goutte_a_goutte" ? "text-slate-950" : "text-emerald-700"}`}>
                      {data.irrigationType === "goutte_a_goutte" ? "45 000 FCFA" : "INCLUS"}
                    </div>
                  </div>

                  {data.includeCompost && (
                    <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors">
                      <div className="space-y-1">
                        <div className="font-bold text-slate-950 text-sm sm:text-base flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                          Unité de Compostage Accéléré 242Agro
                        </div>
                        <div className="text-xs text-slate-600">
                          Composteur rotatif hermétique anti-odeur pour valoriser litières et fanes maraîchères
                        </div>
                      </div>
                      <div className="font-black text-slate-950 sm:text-right text-base whitespace-nowrap">
                        35 000 FCFA
                      </div>
                    </div>
                  )}

                  <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50/60 border-t border-emerald-200">
                    <div className="space-y-1">
                      <div className="font-black text-emerald-950 text-sm sm:text-base flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        Pack Sérénité : Montage Clé en Main, Formation & Suivi Agronomique
                      </div>
                      <div className="text-xs text-emerald-800">
                        Livraison & pose complète sous 3 semaines • Formation pratique de 2 jours • 3 mois de visites agronomiques
                      </div>
                    </div>
                    <div className="font-black text-emerald-700 sm:text-right text-base whitespace-nowrap">
                      OFFERT (INCLUS)
                    </div>
                  </div>
                </div>
              </div>

              {/* Big Green Total Box (Exact replicate of invoice MONTANT ENCAISSÉ) */}
              <div className="bg-[#1b5e20] text-white rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
                <div className="text-sm sm:text-base font-black uppercase tracking-wider text-lime-100">
                  MONTANT TOTAL ESTIMÉ :
                </div>
                <div className="text-2xl sm:text-3xl font-black font-['Outfit'] text-white">
                  {data.simulation.totalPrice.toLocaleString()} FCFA
                </div>
              </div>

              {/* 3-Time Payment Schedule (Exact 30% / 40% / 30%) */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Modalités de Règlement Échelonné (Paiement 3X Sans Frais) :
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="text-[11px] text-slate-500 font-semibold uppercase">1. À la commande (30%)</div>
                    <div className="text-base font-black text-slate-950 mt-1">
                      {data.simulation.downPayment30.toLocaleString()} FCFA
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">Lancement fabrication atelier</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="text-[11px] text-slate-500 font-semibold uppercase">2. À la livraison (40%)</div>
                    <div className="text-base font-black text-slate-950 mt-1">
                      {data.simulation.deliveryPayment40.toLocaleString()} FCFA
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">Pose & début formation</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-lime-50 border border-lime-300">
                    <div className="text-[11px] text-emerald-800 font-bold uppercase">3. Mois 3 Récolte (30%)</div>
                    <div className="text-base font-black text-emerald-950 mt-1">
                      {data.simulation.harvestPayment30.toLocaleString()} FCFA
                    </div>
                    <div className="text-[10px] text-emerald-700 font-bold mt-1">Autofinancé par récoltes</div>
                  </div>
                </div>
              </div>

              {/* Highly Attractive ROI, Gains & Profitability Simulation Box */}
              <div className="rounded-2xl bg-gradient-to-br from-amber-50/90 via-emerald-50/50 to-teal-50/60 border-2 border-amber-300/80 p-5 sm:p-6 space-y-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/80 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-sm">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                        SIMULATION DE RENTABILITÉ & RETOUR SUR INVESTISSEMENT (ROI)
                      </div>
                      <div className="text-[11px] text-slate-600">
                        Projections économiques basées sur les cours réels des denrées fraîches à Pointe-Noire
                      </div>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-black text-xs uppercase tracking-wider shadow-sm">
                    Rentabilité : +{data.simulation.roiPercentage}% / an
                  </span>
                </div>

                {/* 3 High-Impact KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  <div className="p-3.5 rounded-xl bg-white border border-emerald-200 shadow-sm">
                    <div className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider">
                      Économie / Revenu Mensuel
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-emerald-950 font-['Outfit'] mt-1">
                      ~{data.simulation.monthlySavings.toLocaleString()} <span className="text-xs font-bold text-emerald-700">FCFA</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">Économisé sur vos dépenses ou en revente</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-amber-200 shadow-sm">
                    <div className="text-[10px] font-bold uppercase text-amber-800 tracking-wider">
                      Amortissement Intégral
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-amber-950 font-['Outfit'] mt-1">
                      Dès Mois {data.simulation.roiMonth}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">Remboursement complet du matériel</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-teal-200 shadow-sm">
                    <div className="text-[10px] font-bold uppercase text-teal-800 tracking-wider">
                      Bénéfice Net Estimé (12 mois)
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-teal-950 font-['Outfit'] mt-1">
                      +{data.simulation.annualNetProfit.toLocaleString()} <span className="text-xs font-bold text-teal-700">FCFA</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">Valeur brute An 1 : ~{data.simulation.annualValue.toLocaleString()} FCFA</div>
                  </div>
                </div>

                {/* Breakdown of Valued Harvests */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>Détail des Récoltes & Valorisation Marchande (sur 6 mois) :</span>
                    <span className="text-emerald-800 font-black">Total Produit : ~{data.simulation.estimated6MonthValue.totalValue.toLocaleString()} FCFA</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {data.includePotager && (
                      <div className="p-2.5 rounded-xl bg-white/90 border border-slate-200">
                        <div className="text-slate-500 text-[10px] font-medium">🥬 Légumes frais bio</div>
                        <div className="font-bold text-slate-900 mt-0.5">{data.simulation.estimated6MonthProduction.vegetablesKg} kg</div>
                        <div className="text-[10px] text-emerald-700 font-bold">~{data.simulation.estimated6MonthValue.vegetablesValue.toLocaleString()} FCFA</div>
                      </div>
                    )}
                    {data.includePoules && data.poulesCount > 0 && (
                      <div className="p-2.5 rounded-xl bg-white/90 border border-slate-200">
                        <div className="text-slate-500 text-[10px] font-medium">🥚 Œufs frais de ferme</div>
                        <div className="font-bold text-slate-900 mt-0.5">{data.simulation.estimated6MonthProduction.eggsCount} unités</div>
                        <div className="text-[10px] text-amber-700 font-bold">~{data.simulation.estimated6MonthValue.eggsValue.toLocaleString()} FCFA</div>
                      </div>
                    )}
                    {data.includeLapins && data.lapinesCount > 0 && (
                      <div className="p-2.5 rounded-xl bg-white/90 border border-slate-200">
                        <div className="text-slate-500 text-[10px] font-medium">🐰 Viande blanche saine</div>
                        <div className="font-bold text-slate-900 mt-0.5">{data.simulation.estimated6MonthProduction.meatKg} kg</div>
                        <div className="text-[10px] text-purple-700 font-bold">~{data.simulation.estimated6MonthValue.meatValue.toLocaleString()} FCFA</div>
                      </div>
                    )}
                    {data.includeCompost && (
                      <div className="p-2.5 rounded-xl bg-white/90 border border-slate-200">
                        <div className="text-slate-500 text-[10px] font-medium">🌱 Fertilisant organique</div>
                        <div className="font-bold text-slate-900 mt-0.5">{data.simulation.estimated6MonthProduction.compostBags} sacs</div>
                        <div className="text-[10px] text-teal-700 font-bold">~{data.simulation.estimated6MonthValue.compostValue.toLocaleString()} FCFA</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Decisive Financing Guarantee */}
                <div className="p-3 rounded-xl bg-[#1b5e20]/10 border border-[#1b5e20]/30 flex items-start gap-2.5 text-xs text-emerald-950">
                  <CheckCircle2 className="w-4 h-4 text-[#1b5e20] shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong className="text-[#1b5e20]">Argument Décisif & Autofinancement :</strong> Votre 3ᵉ tranche de règlement (<strong>{data.simulation.harvestPayment30.toLocaleString()} FCFA</strong> due au 3ᵉ mois) est <strong>100% autofinancée</strong> par vos récoltes et pontes déjà produites. Votre investissement initial est sécurisé et devient immédiatement rentable.
                  </div>
                </div>
              </div>

              {/* Footer Section (Exact clone of invoice footer with stamp and department) */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0 aspect-square shadow-xs">
                    <Logo242Agro size="sm" showText={false} withGlow={false} />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs sm:text-sm font-black text-slate-950">
                      242Agro • Direction Technique & Exploitation
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Cachet et validation électronique certifiée • Pointe-Noire (Congo)
                    </div>
                    <div className="text-[11px] italic text-emerald-800 font-medium">
                      « Transformons vos espaces en sources de vie, de revenus et d'autonomie. »
                    </div>
                  </div>
                </div>

                {/* Stamp Emblem */}
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-emerald-700/60 p-2 flex flex-col items-center justify-center text-center rotate-[-6deg] shrink-0 bg-emerald-50/40">
                  <div className="text-[7px] font-black text-emerald-800 uppercase tracking-tight leading-tight">
                    242AGRO
                  </div>
                  <div className="text-[8px] font-black text-emerald-900 border-y border-emerald-700 py-0.5 my-0.5 uppercase tracking-widest">
                    VALIDÉ
                  </div>
                  <div className="text-[6px] text-emerald-700 font-bold uppercase tracking-tight">
                    DIRECTION TECHNIQUE
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Contact Strip */}
            <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 text-center text-[11px] text-slate-600">
              Visite technique sur site sous 48h à Pointe-Noire • Téléphone : <strong className="text-slate-900">{CONTACT_INFO.phone}</strong> • WhatsApp : <strong className="text-slate-900">{CONTACT_INFO.phoneClean}</strong>
            </div>

          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#65a30d]" />
            <span>Devis certifié édité sous les normes agronomiques de la République du Congo</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
            >
              Fermer
            </button>
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-[#84cc16] hover:bg-lime-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md border-2 border-lime-400 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger le PDF Officiel</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
