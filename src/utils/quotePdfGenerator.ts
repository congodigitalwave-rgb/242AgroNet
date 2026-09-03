import { jsPDF } from "jspdf";
import { SimulationResult } from "../types";
import { CONTACT_INFO } from "../data";

// Full SVG string for the official 242Agro logo
const SVG_LOGO_242AGRO = `<svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="silverRim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="25%" stop-color="#CBD5E1" />
      <stop offset="50%" stop-color="#FFFFFF" />
      <stop offset="75%" stop-color="#94A3B8" />
      <stop offset="100%" stop-color="#E2E8F0" />
    </linearGradient>
    <radialGradient id="innerRimShadow" cx="50%" cy="50%" r="50%">
      <stop offset="90%" stop-color="#000000" stop-opacity="0" />
      <stop offset="97%" stop-color="#000000" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.35" />
    </radialGradient>
    <linearGradient id="woodPlank1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8D5B28" />
      <stop offset="30%" stop-color="#B27B3D" />
      <stop offset="70%" stop-color="#C48B47" />
      <stop offset="100%" stop-color="#8A5826" />
    </linearGradient>
    <linearGradient id="woodPlank2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#784B1D" />
      <stop offset="40%" stop-color="#A46E34" />
      <stop offset="80%" stop-color="#B88040" />
      <stop offset="100%" stop-color="#75471A" />
    </linearGradient>
    <radialGradient id="soilGradient" cx="50%" cy="70%" r="60%">
      <stop offset="0%" stop-color="#633C1D" />
      <stop offset="60%" stop-color="#452711" />
      <stop offset="100%" stop-color="#2E1809" />
    </radialGradient>
    <linearGradient id="leafLeftGrad" x1="20%" y1="100%" x2="70%" y2="0%">
      <stop offset="0%" stop-color="#3B8B23" />
      <stop offset="50%" stop-color="#5BB32C" />
      <stop offset="100%" stop-color="#7FD236" />
    </linearGradient>
    <linearGradient id="leafRightGrad" x1="80%" y1="100%" x2="30%" y2="0%">
      <stop offset="0%" stop-color="#2D7A19" />
      <stop offset="50%" stop-color="#4EAA22" />
      <stop offset="100%" stop-color="#76CE30" />
    </linearGradient>
    <linearGradient id="veinGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#E2FAD0" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.95" />
    </linearGradient>
  </defs>

  <circle cx="200" cy="200" r="192" fill="url(#silverRim)" />
  <circle cx="200" cy="200" r="184" fill="#FFFFFF" />
  <circle cx="200" cy="200" r="184" fill="url(#innerRimShadow)" />

  <path d="M 52 270 A 155 155 0 1 1 348 270" fill="none" stroke="#205B32" stroke-width="7" stroke-linecap="round" />

  <path d="M 135 235 C 135 220, 160 212, 200 212 C 240 212, 265 220, 265 235 Z" fill="url(#soilGradient)" />
  <ellipse cx="170" cy="225" rx="8" ry="4" fill="#452711" />
  <ellipse cx="230" cy="227" rx="10" ry="5" fill="#452711" />
  <ellipse cx="200" cy="223" rx="12" ry="6" fill="#5A3418" />

  <rect x="130" y="234" width="140" height="18" rx="2" fill="url(#woodPlank1)" stroke="#593412" stroke-width="1.5" />
  <line x1="140" y1="243" x2="260" y2="243" stroke="#9A652B" stroke-width="1" stroke-opacity="0.6" />
  <circle cx="137" cy="243" r="2" fill="#3D200A" />
  <circle cx="263" cy="243" r="2" fill="#3D200A" />

  <rect x="130" y="254" width="140" height="18" rx="2" fill="url(#woodPlank2)" stroke="#593412" stroke-width="1.5" />
  <line x1="145" y1="263" x2="255" y2="263" stroke="#875120" stroke-width="1" stroke-opacity="0.6" />
  <circle cx="137" cy="263" r="2" fill="#3D200A" />
  <circle cx="263" cy="263" r="2" fill="#3D200A" />

  <rect x="130" y="234" width="7" height="38" fill="#6B3F15" />
  <rect x="263" y="234" width="7" height="38" fill="#6B3F15" />

  <path d="M 193 230 C 193 185, 196 145, 200 120 C 204 145, 207 185, 207 230 Z" fill="#32881E" />

  <path d="M 200 170 C 175 168, 110 148, 85 85 C 138 68, 185 105, 200 170 Z" fill="url(#leafLeftGrad)" />
  <path d="M 198 165 C 180 140, 145 110, 105 88" fill="none" stroke="url(#veinGrad)" stroke-width="4" stroke-linecap="round" />
  <path d="M 165 135 C 145 138, 125 142, 115 146" fill="none" stroke="#D2F6B8" stroke-width="2" stroke-linecap="round" stroke-opacity="0.7" />
  <path d="M 142 112 C 128 112, 112 114, 102 118" fill="none" stroke="#D2F6B8" stroke-width="2" stroke-linecap="round" stroke-opacity="0.7" />

  <path d="M 200 170 C 225 168, 290 148, 315 85 C 262 68, 215 105, 200 170 Z" fill="url(#leafRightGrad)" />
  <path d="M 202 165 C 220 140, 255 110, 295 88" fill="none" stroke="url(#veinGrad)" stroke-width="4" stroke-linecap="round" />
  <path d="M 235 135 C 255 138, 275 142, 285 146" fill="none" stroke="#D2F6B8" stroke-width="2" stroke-linecap="round" stroke-opacity="0.7" />
  <path d="M 258 112 C 272 112, 288 114, 298 118" fill="none" stroke="#D2F6B8" stroke-width="2" stroke-linecap="round" stroke-opacity="0.7" />

  <!-- Chicken Silhouette -->
  <g fill="#184524">
    <path d="M 60 252 C 58 245, 62 238, 68 234 C 64 230, 60 220, 64 214 C 68 208, 72 208, 76 210 C 78 205, 84 204, 88 206 C 92 201, 98 203, 100 208 C 104 207, 108 210, 109 214 C 114 218, 118 226, 117 236 C 116 244, 112 250, 106 256 C 102 260, 96 264, 90 266 C 88 271, 88 274, 86 276 L 81 276 L 82 267 C 78 266, 74 263, 70 260 C 64 260, 61 257, 60 252 Z" />
    <path d="M 108 211 L 115 213 L 109 217 Z" fill="#184524" />
    <path d="M 94 199 C 97 197, 102 198, 103 203 C 100 202, 97 202, 94 199 Z" fill="#184524" />
    <path d="M 62 230 C 54 220, 56 208, 63 216 Z" fill="#184524" />
    <path d="M 57 240 C 48 232, 50 220, 58 228 Z" fill="#184524" />
  </g>

  <!-- Rabbit Silhouette -->
  <g fill="#184524">
    <path d="M 330 265 C 334 262, 337 258, 335 252 C 333 247, 328 245, 325 247 C 322 238, 316 230, 308 225 C 304 222, 298 220, 294 222 C 293 217, 294 207, 298 198 C 300 193, 297 190, 294 191 C 290 193, 288 202, 287 210 C 285 204, 285 195, 287 188 C 288 183, 284 181, 282 183 C 279 186, 278 196, 280 208 C 276 211, 274 216, 274 222 C 272 227, 276 232, 280 236 C 278 242, 279 250, 284 258 C 290 266, 300 270, 314 270 C 322 270, 327 268, 330 265 Z" />
  </g>

  <!-- Brand Typography -->
  <text x="138" y="336" fill="#144626" font-size="48" font-weight="900" font-family="system-ui, -apple-system, sans-serif" letter-spacing="-1.5">242</text>
  <text x="218" y="336" fill="#66B928" font-size="48" font-weight="900" font-family="system-ui, -apple-system, sans-serif" letter-spacing="-1.5">Agro</text>
</svg>`;

let cachedLogoPng: string | null = null;

/**
 * Converts the 242Agro SVG logo into a clean, high-resolution PNG data URL
 * so jsPDF can embed it crisply in generated quotes.
 */
export async function getLogoPngDataUrl(): Promise<string | null> {
  if (cachedLogoPng) return cachedLogoPng;

  return new Promise((resolve) => {
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = 400;
          canvas.height = 400;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(null);
            return;
          }

          // Render clean white circular background
          ctx.beginPath();
          ctx.arc(200, 200, 196, 0, 2 * Math.PI);
          ctx.fillStyle = "#ffffff";
          ctx.fill();

          // Draw the vector logo
          ctx.drawImage(img, 0, 0, 400, 400);
          const dataUrl = canvas.toDataURL("image/png");
          cachedLogoPng = dataUrl;
          resolve(dataUrl);
        } catch {
          resolve(null);
        }
      };

      img.onerror = () => {
        resolve(null);
      };

      // Load using inline SVG string data URI for 100% offline reliability
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(SVG_LOGO_242AGRO);
    } catch {
      resolve(null);
    }
  });
}

export interface QuotePdfData {
  reference?: string;
  dateStr?: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  clientQuartier: string;
  clientType: "famille" | "ecole_eglise" | "restaurant" | "investisseur";
  surfaceArea: number;
  includePotager: boolean;
  includePoules: boolean;
  poulesCount: number;
  includeLapins: boolean;
  lapinesCount: number;
  includeCompost: boolean;
  irrigationType: "manuelle" | "goutte_a_goutte";
  simulation: SimulationResult;
  notes?: string;
}

const CLIENT_TYPE_LABELS: Record<string, string> = {
  famille: "Particulier / Cour & Toiture Familiale",
  ecole_eglise: "Institution / École & Communauté",
  restaurant: "Professionnel / Restaurant & Hôtel",
  investisseur: "Projet Productif / Investisseur Urbain",
};

/**
 * Generates an official 242Agro quote PDF inspired directly by the
 * official receipt / invoice layout (green header bar, 242Agro logo,
 * slogan, structured client section, green total bar, 3X schedule,
 * and certified seal/stamp footer).
 */
export async function generateOfficialQuotePdf(data: QuotePdfData): Promise<string> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const ref = data.reference || `DEV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const dateStr = data.dateStr || new Date().toISOString().slice(0, 10);
  const logoDataUrl = await getLogoPngDataUrl();

  // 1. TOP OFFICIAL HEADER (Exact replicate of invoice header bar)
  // Deep forest green background
  doc.setFillColor(27, 94, 32); // #1b5e20
  doc.rect(0, 0, 210, 28, "F");

  // Bottom Golden Accent Line
  doc.setFillColor(217, 119, 6); // #d97706
  doc.rect(0, 28, 210, 1.5, "F");

  // Logo badge card (White rounded pill on the left)
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(12, 3.5, 30, 21, 2.5, 2.5, "F");

  if (logoDataUrl) {
    try {
      doc.addImage(logoDataUrl, "PNG", 14, 4.5, 26, 19);
    } catch {
      // Fallback text if image embedding fails
      doc.setTextColor(20, 70, 38);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("242Agro", 18, 16);
    }
  }

  // Header Title next to Logo
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("242Agro", 46, 13);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(220, 252, 231);
  doc.text("Devis d'Installation Clé en Main • Pointe-Noire (Congo)", 46, 20);

  // Slogan on the top right
  doc.setFont("helvetica", "italic");
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text("« Transformons vos espaces en sources de vie, de revenus et d'autonomie. »", 200, 15, { align: "right" });

  // 2. MAIN DOCUMENT CARD
  // Clean card frame with rounded corners and light gray border
  doc.setDrawColor(203, 213, 225); // #cbd5e1
  doc.setLineWidth(0.3);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(12, 34, 186, 250, 3, 3, "FD");

  // Title Box: DEVIS ESTIMATIF N° ... + Date
  doc.setTextColor(21, 128, 61); // #15803d
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(`DEVIS TECHNIQUE ESTIMATIF N° ${ref}`, 18, 43);

  doc.setTextColor(71, 85, 105);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Date : ${dateStr}`, 192, 43, { align: "right" });

  // Subtle separator line under title
  doc.setDrawColor(226, 232, 240);
  doc.line(18, 47, 192, 47);

  // 3. CLIENT & SITE INFORMATIONS (Structured row-by-row layout)
  let y = 54;
  const labelX = 18;
  const valueX = 72;

  const clientInfoRows = [
    { label: "Bénéficiaire / Client :", value: data.clientName || "Client Particulier" },
    { label: "Téléphone & WhatsApp :", value: data.clientPhone || "Non communiqué" },
    { label: "Localisation du site :", value: `${data.clientQuartier || "Pointe-Noire"}, République du Congo` },
    { label: "Profil & Configuration :", value: `${CLIENT_TYPE_LABELS[data.clientType] || "Cour urbaine"} • ${data.surfaceArea} m²` },
    { label: "Formule d'installation :", value: "Clé en main (Fourniture + Pose + Formation + Suivi 3 mois)" },
  ];

  if (data.clientEmail) {
    clientInfoRows.splice(2, 0, { label: "Email de contact :", value: data.clientEmail });
  }

  doc.setFontSize(8.5);
  clientInfoRows.forEach((row) => {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text(row.label, labelX, y);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(row.value, valueX, y);
    y += 5.5;
  });

  // 4. DETAILED MODULES TABLE
  y += 3;
  // Table Header Bar
  doc.setFillColor(241, 245, 249);
  doc.rect(18, y, 174, 6.5, "F");
  doc.setDrawColor(203, 213, 225);
  doc.line(18, y + 6.5, 192, y + 6.5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.text("DÉSIGNATION DES MODULES & ÉQUIPEMENTS 242AGRO", 22, y + 4.5);
  doc.text("ESTIMATION (FCFA)", 190, y + 4.5, { align: "right" });

  y += 10;
  doc.setFontSize(8);

  const modules: { name: string; desc: string; amount: string }[] = [];

  if (data.includePotager) {
    modules.push({
      name: `Potager Maraîcher Hors-Sol (${data.surfaceArea} m²)`,
      desc: "Bacs de culture surélevés traités + Substrat bio enrichi + Semences maraîchères sélectionnées",
      amount: `${(data.surfaceArea * 42000).toLocaleString()} FCFA`,
    });
  }

  if (data.includePoules && data.poulesCount > 0) {
    modules.push({
      name: `Module Avicole Urbain (${data.poulesCount} Poules Pondeuses)`,
      desc: "Poules vaccinées prêtes à pondre + Poulailler aéré surélevé anti-odeur + Mangeoires et abreuvoirs",
      amount: `${(120000 + data.poulesCount * 7000).toLocaleString()} FCFA`,
    });
  }

  if (data.includeLapins && data.lapinesCount > 0) {
    modules.push({
      name: `Module Cunicole Hors-Sol (${data.lapinesCount} Lapines Reproductrices)`,
      desc: "Clapiers métalliques grillagés hygiéniques + Abreuvoirs automatiques à pipette + Mâle reproducteur",
      amount: `${(95000 + data.lapinesCount * 8500).toLocaleString()} FCFA`,
    });
  }

  modules.push({
    name: `Système d'Arrosage Économe (${data.irrigationType === "goutte_a_goutte" ? "Goutte-à-goutte" : "Manuel optimisé"})`,
    desc: data.irrigationType === "goutte_a_goutte" 
      ? "Ligne goutte-à-goutte avec régulateur et vannes sectorisées (économie d'eau de 70%)" 
      : "Tuyauterie renforcée + Raccords rapides et pomme d'arrosage micro-pluie",
    amount: data.irrigationType === "goutte_a_goutte" ? "45 000 FCFA" : "INCLUS",
  });

  if (data.includeCompost) {
    modules.push({
      name: "Unité de Compostage Accéléré 242Agro",
      desc: "Composteur rotatif aéré pour recycler fientes, litières et fanes maraîchères (fertilisant gratuit)",
      amount: "35 000 FCFA",
    });
  }

  modules.push({
    name: "Pack Sérénité : Installation, Formation & Suivi Agronomique",
    desc: "Montage complet sous 3 semaines + Formation pratique de 2 jours + 3 mois de visites techniques incluses",
    amount: "OFFERT (INCLUS)",
  });

  modules.forEach((mod) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(`• ${mod.name}`, 20, y);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(mod.amount.includes("OFFERT") ? 22 : 15, mod.amount.includes("OFFERT") ? 101 : 23, mod.amount.includes("OFFERT") ? 52 : 42);
    doc.text(mod.amount, 190, y, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(7.2);
    doc.text(mod.desc, 24, y + 3.8);

    y += 8.2;
    doc.setFontSize(8);
  });

  // 5. BIG GREEN HIGHLIGHT BAR FOR TOTAL
  // Exact replica of the invoice's "MONTANT ENCAISSÉ : 50 000 FCFA" bar
  y += 2;
  doc.setFillColor(27, 94, 32); // Deep rich green #1b5e20
  doc.roundedRect(18, y, 174, 11, 2, 2, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("MONTANT TOTAL ESTIMÉ :", 24, y + 7.5);

  doc.setFontSize(13);
  doc.text(`${data.simulation.totalPrice.toLocaleString()} FCFA`, 188, y + 7.5, { align: "right" });

  // 6. 3-TIME INSTALLMENT SCHEDULE (30% / 40% / 30%)
  y += 15;
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 41, 59);
  doc.text("ÉCHÉANCIER DE PAIEMENT EN 3 FOIS SANS FRAIS :", 18, y);

  y += 4.5;
  // Three distinct mini-cards for installments
  const colW = 56;
  const colGap = 3;
  const startX = 18;

  const installments = [
    {
      title: "1. À la commande (30%)",
      amount: `${data.simulation.downPayment30.toLocaleString()} FCFA`,
      sub: "Lancement fabrication atelier",
      border: [203, 213, 225],
      bg: [248, 250, 252],
    },
    {
      title: "2. À la livraison & pose (40%)",
      amount: `${data.simulation.deliveryPayment40.toLocaleString()} FCFA`,
      sub: "Livraison, pose & formation",
      border: [203, 213, 225],
      bg: [248, 250, 252],
    },
    {
      title: "3. Mois 3 post-récolte (30%)",
      amount: `${data.simulation.harvestPayment30.toLocaleString()} FCFA`,
      sub: "Autofinancé par récoltes",
      border: [134, 239, 172],
      bg: [240, 253, 244],
    },
  ];

  installments.forEach((inst, idx) => {
    const xPos = startX + idx * (colW + colGap);
    doc.setFillColor(inst.bg[0], inst.bg[1], inst.bg[2]);
    doc.setDrawColor(inst.border[0], inst.border[1], inst.border[2]);
    doc.roundedRect(xPos, y, colW, 13.5, 1.5, 1.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(inst.title, xPos + 3, y + 4.2);

    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(inst.amount, xPos + 3, y + 8.5);

    doc.setFontSize(6.8);
    doc.setTextColor(inst.title.includes("Mois 3") ? 22 : 100, inst.title.includes("Mois 3") ? 101 : 116, inst.title.includes("Mois 3") ? 52 : 139);
    doc.text(inst.sub, xPos + 3, y + 12);
  });

  // 7. PRODUCTION PROJECTIONS & BREAK-EVEN
  y += 18;
  doc.setFillColor(254, 243, 199); // #fef3c7 amber-100
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(18, y, 174, 15, 1.5, 1.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(146, 64, 14); // #92400e
  doc.text("RENDEMENTS ET ESTIMATION DES GAINS SUR 6 MOIS :", 22, y + 4.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.2);
  doc.setTextColor(51, 65, 85);

  const prodParts: string[] = [];
  if (data.includePotager) prodParts.push(`${data.simulation.estimated6MonthProduction.vegetablesKg} kg légumes frais`);
  if (data.includePoules && data.poulesCount > 0) prodParts.push(`${data.simulation.estimated6MonthProduction.eggsCount} œufs de ferme`);
  if (data.includeLapins && data.lapinesCount > 0) prodParts.push(`${data.simulation.estimated6MonthProduction.meatKg} kg viande`);
  if (data.includeCompost) prodParts.push(`${data.simulation.estimated6MonthProduction.compostBags} sacs compost`);

  doc.text(`• Récoltes prévisionnelles : ${prodParts.join(" • ")}`, 22, y + 8.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(21, 128, 61);
  doc.text(
    `• Valeur produite estimée : ~${data.simulation.estimated6MonthValue.totalValue.toLocaleString()} FCFA  |  Remboursement intégral estimé : Dès le Mois ${data.simulation.roiMonth}`,
    22,
    y + 12.5
  );

  // 8. OFFICIAL STAMP & SIGNATURE FOOTER (Exact clone of the attached invoice bottom)
  y += 19;
  doc.setDrawColor(226, 232, 240);
  doc.line(18, y, 192, y);
  y += 3;

  // Left Logo thumbnail in rounded frame
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(18, y, 18, 18, 2, 2, "FD");

  if (logoDataUrl) {
    try {
      doc.addImage(logoDataUrl, "PNG", 19, y + 1, 16, 16);
    } catch {
      // Fallback
    }
  }

  // Legal and Department Details next to bottom logo
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text("242Agro • Direction Technique & Exploitation", 40, y + 5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text("Cachet et validation électronique certifiée • Pointe-Noire (Congo)", 40, y + 9.5);

  doc.setFont("helvetica", "italic");
  doc.setTextColor(21, 128, 61);
  doc.text("« Transformons vos espaces en sources de vie, de revenus et d'autonomie. »", 40, y + 13.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.8);
  doc.setTextColor(100, 116, 139);
  doc.text(`Visite technique sous 48h sur site • Contact : ${CONTACT_INFO.phone} • ${CONTACT_INFO.email}`, 40, y + 17);

  // Right Official Circular Stamp Watermark
  const stampX = 175;
  const stampY = y + 9;
  doc.setDrawColor(21, 128, 61);
  doc.setLineWidth(0.4);
  doc.circle(stampX, stampY, 8);
  doc.circle(stampX, stampY, 7);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(4.5);
  doc.setTextColor(21, 128, 61);
  doc.text("242AGRO POINTE-NOIRE", stampX, stampY - 3, { align: "center" });
  doc.setFontSize(5.5);
  doc.text("VALIDÉ & CONFORME", stampX, stampY + 0.5, { align: "center" });
  doc.setFontSize(4);
  doc.text("DIRECTION TECHNIQUE", stampX, stampY + 4, { align: "center" });

  // Save PDF and return file name
  const fileName = `Devis_242Agro_${ref}.pdf`;
  doc.save(fileName);
  return fileName;
}
