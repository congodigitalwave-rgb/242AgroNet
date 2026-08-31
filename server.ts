import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client with required User-Agent
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "242Agro Backend",
    timestamp: new Date().toISOString(),
    aiConfigured: Boolean(process.env.GEMINI_API_KEY)
  });
});

// AI Urban Agronomist Advisor (242Agro Intelligence)
app.post("/api/ai/agronomist-advisor", async (req, res) => {
  try {
    const { spaceType, surfaceArea, location, sunExposure, budget, goals, question } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      // Graceful fallback if no key is provided
      return res.json({
        advice: `Pour votre espace de ${surfaceArea || 10} m² situé à ${location || "Pointe-Noire"}, notre recommandation 242Agro est de démarrer avec un système combiné : 3 bacs hors-sol surélevés pour légumes-feuilles (amarante, oseille, épinard local) et un module d'élevage de 10 poules pondeuses. La boucle circulaire permettra d'utiliser les fientes compostées comme fertilisant 100% bio.`,
        suggestedPack: surfaceArea > 15 ? "Pack Productif (720 000 FCFA)" : (surfaceArea > 5 ? "Pack Familial (380 000 FCFA)" : "Pack Starter (225 000 FCFA)"),
        keyTips: [
          "Privilégiez les bacs surélevés en bois traité naturel pour éviter la surchauffe du béton en saison sèche.",
          "Mettez en place un ombrage partiel (filet 30%) pour les heures de forte intensité solaire à Pointe-Noire.",
          "Le compostage accéléré en sac ou bac fermé réduit les odeurs et produit un engrais riche en 3 semaines."
        ]
      });
    }

    const prompt = `
Vous êtes le Maître Agronome et Expert Technique de "242Agro", la référence de l'agriculture urbaine hors-sol et de l'élevage intégré à Pointe-Noire (République du Congo).
Le client vous consulte pour un diagnostic technique et un plan d'aménagement agronomique.

Données du client :
- Type d'espace : ${spaceType || "Cour / Terrasse"}
- Superficie disponible : ${surfaceArea || "10"} m²
- Quartier / Ville : ${location || "Pointe-Noire"}
- Exposition au soleil : ${sunExposure || "Plein soleil / Mi-ombre"}
- Budget approximatif : ${budget || "Non précisé"}
- Objectif prioritaire : ${goals || "Autosuffisance alimentaire & rentabilité"}
- Question ou précision du client : ${question || "Comment optimiser cet espace ?"}

Fournissez une réponse structurée en français, chaleureuse, concrète et adaptée au climat tropical côtier de Pointe-Noire (saison des pluies et saison sèche, approvisionnement local, cultures adaptées comme amarante, folon, ciboule, piments bec d'oiseau, choux, poules pondeuses, lapins).

Répondez au format JSON strict avec les champs suivants :
{
  "summary": "Résumé percutant du potentiel de l'espace",
  "recommendedSetup": "Description de la configuration optimale (bacs hors-sol, nombre d'animaux, rotation)",
  "productionEstimate6Months": "Estimation concrète de ce qu'il peut récolter en 6 mois (kg légumes, œufs, etc.)",
  "suggestedPack": "Nom du Pack le plus adapté parmi: Pack Starter (225k FCFA), Pack Familial (380k FCFA), Pack Productif (720k FCFA), ou Pack Institutionnel / Site Pilote (444k FCFA)",
  "actionSteps": ["Étape 1...", "Étape 2...", "Étape 3..."],
  "climateAdvicePointeNoire": "Conseil spécifique pour la météo et la saison à Pointe-Noire"
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "Vous êtes l'ingénieur agronome expert de 242Agro à Pointe-Noire, Congo. Vous donnez des conseils pratiques, réalistes, rentables et 100% écologiques."
      }
    });

    const text = response.text || "{}";
    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error: any) {
    console.error("Gemini advisor error:", error);
    return res.status(500).json({
      error: "Erreur lors de la génération du diagnostic agronomique",
      details: error.message
    });
  }
});

// Quote Request Storage & Confirmation
const quotesDatabase: any[] = [];

app.post("/api/quotes/submit", (req, res) => {
  try {
    const quoteData = req.body;
    const quoteReference = `242AGRO-${Date.now().toString().slice(-6)}`;
    
    const record = {
      reference: quoteReference,
      createdAt: new Date().toISOString(),
      ...quoteData,
      status: "pending_visit"
    };

    quotesDatabase.push(record);

    res.json({
      success: true,
      reference: quoteReference,
      message: "Votre demande de devis et visite technique a été enregistrée avec succès. Notre équipe agronomique de Pointe-Noire vous contactera sous 48h.",
      quote: record
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get quotes count & stats
app.get("/api/quotes/stats", (req, res) => {
  res.json({
    totalProjectsConfigured: quotesDatabase.length + 148,
    activeInstallations: 86,
    totalSquareMetersCultivated: 1250,
    averageRoiMonths: 5.8
  });
});

// Vite Middleware for Dev / Static Serving for Prod
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`242Agro server running on http://0.0.0.0:${PORT}`);
  });
}

start();
