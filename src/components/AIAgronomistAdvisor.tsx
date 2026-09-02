import React, { useState } from "react";
import { Sparkles, Bot, ArrowRight, CheckCircle2, AlertCircle, X, Send, Leaf, Sun, MapPin, Layers } from "lucide-react";
import { QUARTIERS_POINTE_NOIRE } from "../data";
import { DiagnosticResult } from "../types";
import { Logo242Agro } from "./Logo242Agro";

interface AIAgronomistAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPackRecommendation?: (packName: string) => void;
}

export const AIAgronomistAdvisor: React.FC<AIAgronomistAdvisorProps> = ({ isOpen, onClose, onSelectPackRecommendation }) => {
  const [spaceType, setSpaceType] = useState("Cour bétonnée");
  const [surfaceArea, setSurfaceArea] = useState(8);
  const [location, setLocation] = useState(QUARTIERS_POINTE_NOIRE[0]);
  const [sunExposure, setSunExposure] = useState("Plein soleil (6h+ par jour)");
  const [goals, setGoals] = useState("Autonomie alimentaire familiale & réduction des dépenses");
  const [question, setQuestion] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRunAdvisor = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/agronomist-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spaceType,
          surfaceArea,
          location,
          sunExposure,
          goals,
          question: question || "Quelle est la meilleure configuration circulaire pour cet espace à Pointe-Noire ?"
        })
      });

      if (!response.ok) {
        throw new Error("Impossible de générer le diagnostic agronomique.");
      }

      const data: DiagnosticResult = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erreur de connexion au conseiller agronomique.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div className="bg-white text-slate-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative border border-slate-200">
        
        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xl z-10">
          <div className="flex items-center gap-3">
            <Logo242Agro size="md" showText={false} withGlow={false} />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black font-['Outfit'] text-slate-950">
                  Conseiller Agronome IA 242Agro
                </h3>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 px-2.5 py-0.5 rounded-full">
                  Gemini 3.7 Flash
                </span>
              </div>
              <p className="text-xs text-slate-600">Diagnostic agronomique sur mesure adapté au climat de Pointe-Noire</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-950 hover:bg-slate-200 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {!result ? (
            <form onSubmit={handleRunAdvisor} className="space-y-5">
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Type de votre espace
                  </label>
                  <select
                    value={spaceType}
                    onChange={(e) => setSpaceType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white transition-colors"
                  >
                    <option value="Cour bétonnée / Dalles">Cour bétonnée / Dalles</option>
                    <option value="Toit-terrasse / Balcon">Toit-terrasse / Balcon</option>
                    <option value="Cour en terre / Jardin">Cour en terre / Jardin</option>
                    <option value="Espace École / Église">Espace École / Église</option>
                    <option value="Restaurant / Commerce">Restaurant / Commerce</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Superficie disponible : <span className="text-[#65a30d] font-black">{surfaceArea} m²</span>
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="50"
                    value={surfaceArea}
                    onChange={(e) => setSurfaceArea(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#84cc16] mt-3"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>2 m²</span>
                    <span>25 m²</span>
                    <span>50+ m²</span>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Quartier à Pointe-Noire
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white transition-colors"
                  >
                    {QUARTIERS_POINTE_NOIRE.map((q) => (
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Ensoleillement de l'espace
                  </label>
                  <select
                    value={sunExposure}
                    onChange={(e) => setSunExposure(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-lime-500 focus:bg-white transition-colors"
                  >
                    <option value="Plein soleil (6h+ par jour)">Plein soleil (6h+ par jour)</option>
                    <option value="Mi-ombre (3h à 5h de soleil)">Mi-ombre (3h à 5h de soleil)</option>
                    <option value="Ombre prédominante">Ombre prédominante</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Objectif prioritaire
                </label>
                <input
                  type="text"
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  placeholder="Ex: Réduire mes courses au marché et produire des œufs frais tous les matins"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-lime-500 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Question ou contrainte particulière (optionnel)
                </label>
                <textarea
                  rows={2}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ex: J'ai un point d'eau à 10 mètres, quelle est la meilleure variété de légumes pour la saison sèche ?"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-lime-500 focus:bg-white transition-colors resize-none"
                />
              </div>

              {error && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-2xl bg-[#84cc16] hover:bg-lime-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-lime-500/20 transition-all disabled:opacity-50 border-2 border-lime-400 active:scale-95"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Analyse agronomique en cours...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Générer mon Plan & Diagnostic Agronomique</span>
                  </>
                )}
              </button>

            </form>
          ) : (
            /* Result View */
            <div className="space-y-6 animate-in fade-in">
              
              {/* Summary Card */}
              <div className="p-6 rounded-3xl bg-lime-50 border border-lime-300 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#65a30d]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Diagnostic pour {location} ({surfaceArea} m²)</span>
                </div>
                <p className="text-sm text-slate-900 leading-relaxed font-semibold">
                  {result.summary}
                </p>
              </div>

              {/* Recommended Setup */}
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-600" />
                  <span>Configuration Idéale Recommandée</span>
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {result.recommendedSetup}
                </p>
              </div>

              {/* Production Estimates */}
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#65a30d] flex items-center gap-2">
                  <Leaf className="w-4 h-4" />
                  <span>Potentiel de Récolte sur 6 Mois</span>
                </h4>
                <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                  {result.productionEstimate6Months}
                </p>
              </div>

              {/* Action Steps */}
              {result.actionSteps && result.actionSteps.length > 0 && (
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Plan d'Action Recommandé :
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {result.actionSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-lime-100 text-[#65a30d] border border-lime-300 flex items-center justify-center shrink-0 text-[10px] font-bold">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Climate Advice */}
              {result.climateAdvicePointeNoire && (
                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-900">
                  <strong className="text-amber-950">Conseil Climat Pointe-Noire :</strong> {result.climateAdvicePointeNoire}
                </div>
              )}

              {/* Suggested Pack Button */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    onClose();
                    const el = document.getElementById("simulateur");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex-1 py-3.5 px-4 rounded-2xl bg-[#84cc16] hover:bg-lime-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-lime-500/20 border-2 border-lime-400 transition-all active:scale-95"
                >
                  <span>Passer au Simulateur de Devis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setResult(null)}
                  className="py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-all cursor-pointer"
                >
                  Refaire un diagnostic
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
