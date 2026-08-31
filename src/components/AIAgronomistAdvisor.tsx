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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/20 text-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/80 flex flex-col relative ring-1 ring-white/10">
        
        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-white/10 flex items-center justify-between sticky top-0 bg-slate-900/80 backdrop-blur-xl z-10">
          <div className="flex items-center gap-3">
            <Logo242Agro size="md" showText={false} withGlow={true} />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold font-['Outfit'] text-white">
                  Conseiller Agronome IA 242Agro
                </h3>
                <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                  Gemini 3.7 Flash
                </span>
              </div>
              <p className="text-xs text-slate-300">Diagnostic agronomique sur mesure adapté au climat de Pointe-Noire</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Type de votre espace
                  </label>
                  <select
                    value={spaceType}
                    onChange={(e) => setSpaceType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors"
                  >
                    <option value="Cour bétonnée / Dalles" className="bg-slate-900 text-white">Cour bétonnée / Dalles</option>
                    <option value="Toit-terrasse / Balcon" className="bg-slate-900 text-white">Toit-terrasse / Balcon</option>
                    <option value="Cour en terre / Jardin" className="bg-slate-900 text-white">Cour en terre / Jardin</option>
                    <option value="Espace École / Église" className="bg-slate-900 text-white">Espace École / Église</option>
                    <option value="Restaurant / Commerce" className="bg-slate-900 text-white">Restaurant / Commerce</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Superficie disponible : <span className="text-amber-300 font-bold">{surfaceArea} m²</span>
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="50"
                    value={surfaceArea}
                    onChange={(e) => setSurfaceArea(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400 mt-3"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>2 m²</span>
                    <span>25 m²</span>
                    <span>50+ m²</span>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Quartier à Pointe-Noire
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors"
                  >
                    {QUARTIERS_POINTE_NOIRE.map((q) => (
                      <option key={q} value={q} className="bg-slate-900 text-white">{q}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Ensoleillement de l'espace
                  </label>
                  <select
                    value={sunExposure}
                    onChange={(e) => setSunExposure(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors"
                  >
                    <option value="Plein soleil (6h+ par jour)" className="bg-slate-900 text-white">Plein soleil (6h+ par jour)</option>
                    <option value="Mi-ombre (3h à 5h de soleil)" className="bg-slate-900 text-white">Mi-ombre (3h à 5h de soleil)</option>
                    <option value="Ombre prédominante" className="bg-slate-900 text-white">Ombre prédominante</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Objectif prioritaire
                </label>
                <input
                  type="text"
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  placeholder="Ex: Réduire mes courses au marché et produire des œufs frais tous les matins"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Question ou contrainte particulière (optionnel)
                </label>
                <textarea
                  rows={2}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ex: J'ai un point d'eau à 10 mètres, quelle est la meilleure variété de légumes pour la saison sèche ?"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                />
              </div>

              {error && (
                <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-amber-950/40 transition-all disabled:opacity-50 border border-amber-400/40"
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
              <div className="p-6 rounded-3xl bg-emerald-950/40 border border-emerald-400/40 space-y-2 backdrop-blur-xl shadow-xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Diagnostic pour {location} ({surfaceArea} m²)</span>
                </div>
                <p className="text-sm text-slate-100 leading-relaxed font-medium">
                  {result.summary}
                </p>
              </div>

              {/* Recommended Setup */}
              <div className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>Configuration Idéale Recommandée</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {result.recommendedSetup}
                </p>
              </div>

              {/* Production Estimates */}
              <div className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-2">
                  <Leaf className="w-4 h-4" />
                  <span>Potentiel de Récolte sur 6 Mois</span>
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                  {result.productionEstimate6Months}
                </p>
              </div>

              {/* Action Steps */}
              {result.actionSteps && result.actionSteps.length > 0 && (
                <div className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Plan d'Action Recommandé :
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {result.actionSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center shrink-0 text-[10px] font-bold">
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
                <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-400/30 text-xs text-amber-200 backdrop-blur-xl">
                  <strong>Conseil Climat Pointe-Noire :</strong> {result.climateAdvicePointeNoire}
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
                  className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-emerald-950/40 border border-emerald-400/30 transition-all"
                >
                  <span>Passer au Simulateur de Devis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setResult(null)}
                  className="py-3.5 px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 backdrop-blur-xl transition-all"
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
