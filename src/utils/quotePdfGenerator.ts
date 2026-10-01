import { jsPDF } from "jspdf";
import { SimulationResult } from "../types";
import { CONTACT_INFO, formatSurfaceDisplay, calculatePotagerCost } from "../data";

// High-fidelity vector SVG matching the official 242Agro circular medallion logo
const SVG_LOGO_242AGRO = `<svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="silverRim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="20%" stop-color="#CBD5E1" />
      <stop offset="50%" stop-color="#FFFFFF" />
      <stop offset="80%" stop-color="#94A3B8" />
      <stop offset="100%" stop-color="#E2E8F0" />
    </linearGradient>
    <radialGradient id="innerRimShadow" cx="50%" cy="50%" r="50%">
      <stop offset="88%" stop-color="#000000" stop-opacity="0" />
      <stop offset="96%" stop-color="#000000" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.38" />
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

  <!-- 1. Metallic 3D Outer Ring & White Interior -->
  <circle cx="200" cy="200" r="192" fill="url(#silverRim)" />
  <circle cx="200" cy="200" r="184" fill="#FFFFFF" />
  <circle cx="200" cy="200" r="184" fill="url(#innerRimShadow)" />

  <!-- 2. Inner Green Circular Arc -->
  <path d="M 52 270 A 155 155 0 1 1 348 270" fill="none" stroke="#205B32" stroke-width="6.5" stroke-linecap="round" />

  <!-- 3. Ground line -->
  <line x1="50" y1="274" x2="350" y2="274" stroke="#205B32" stroke-width="3" stroke-linecap="round" />

  <!-- 4. Soil Mound -->
  <path d="M 135 235 C 135 220, 160 212, 200 212 C 240 212, 265 220, 265 235 Z" fill="url(#soilGradient)" />
  <ellipse cx="170" cy="225" rx="8" ry="4" fill="#452711" />
  <ellipse cx="230" cy="227" rx="10" ry="5" fill="#452711" />
  <ellipse cx="200" cy="223" rx="12" ry="6" fill="#5A3418" />

  <!-- 5. Wooden Planter Box (Bac Maraîcher) -->
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

  <!-- 6. Plant Stem -->
  <path d="M 193 230 C 193 185, 196 145, 200 120 C 204 145, 207 185, 207 230 Z" fill="#32881E" />

  <!-- 7. Two Curved Leaves -->
  <path d="M 200 170 C 175 168, 110 148, 85 85 C 138 68, 185 105, 200 170 Z" fill="url(#leafLeftGrad)" />
  <path d="M 198 165 C 180 140, 145 110, 105 88" fill="none" stroke="url(#veinGrad)" stroke-width="4" stroke-linecap="round" />
  <path d="M 165 135 C 145 138, 125 142, 115 146" fill="none" stroke="#D2F6B8" stroke-width="2" stroke-linecap="round" stroke-opacity="0.7" />
  <path d="M 142 112 C 128 112, 112 114, 102 118" fill="none" stroke="#D2F6B8" stroke-width="2" stroke-linecap="round" stroke-opacity="0.7" />

  <path d="M 200 170 C 225 168, 290 148, 315 85 C 262 68, 215 105, 200 170 Z" fill="url(#leafRightGrad)" />
  <path d="M 202 165 C 220 140, 255 110, 295 88" fill="none" stroke="url(#veinGrad)" stroke-width="4" stroke-linecap="round" />
  <path d="M 235 135 C 255 138, 275 142, 285 146" fill="none" stroke="#D2F6B8" stroke-width="2" stroke-linecap="round" stroke-opacity="0.7" />
  <path d="M 258 112 C 272 112, 288 114, 298 118" fill="none" stroke="#D2F6B8" stroke-width="2" stroke-linecap="round" stroke-opacity="0.7" />

  <!-- 8. Chicken Silhouette (Left) -->
  <g fill="#184524">
    <path d="M 60 252 C 58 245, 62 238, 68 234 C 64 230, 60 220, 64 214 C 68 208, 72 208, 76 210 C 78 205, 84 204, 88 206 C 92 201, 98 203, 100 208 C 104 207, 108 210, 109 214 C 114 218, 118 226, 117 236 C 116 244, 112 250, 106 256 C 102 260, 96 264, 90 266 C 88 271, 88 274, 86 276 L 81 276 L 82 267 C 78 266, 74 263, 70 260 C 64 260, 61 257, 60 252 Z" />
    <path d="M 108 211 L 115 213 L 109 217 Z" fill="#184524" />
    <path d="M 94 199 C 97 197, 102 198, 103 203 C 100 202, 97 202, 94 199 Z" fill="#184524" />
    <path d="M 62 230 C 54 220, 56 208, 63 216 Z" fill="#184524" />
    <path d="M 57 240 C 48 232, 50 220, 58 228 Z" fill="#184524" />
  </g>

  <!-- 9. Rabbit Silhouette (Right) -->
  <g fill="#184524">
    <path d="M 330 265 C 334 262, 337 258, 335 252 C 333 247, 328 245, 325 247 C 322 238, 316 230, 308 225 C 304 222, 298 220, 294 222 C 293 217, 294 207, 298 198 C 300 193, 297 190, 294 191 C 290 193, 288 202, 287 210 C 285 204, 285 195, 287 188 C 288 183, 284 181, 282 183 C 279 186, 278 196, 280 208 C 276 211, 274 216, 274 222 C 272 227, 276 232, 280 236 C 278 242, 279 250, 284 258 C 290 266, 300 270, 314 270 C 322 270, 327 268, 330 265 Z" />
  </g>

  <!-- 10. Brand Typography 242Agro Centered -->
  <text x="200" y="336" text-anchor="middle" font-size="48" font-weight="900" font-family="'Outfit', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" letter-spacing="-1">
    <tspan fill="#144626">242</tspan>
    <tspan fill="#66B928">Agro</tspan>
  </text>
</svg>`;

let cachedLogoPng: string | null = null;

/**
 * Converts the 242Agro SVG logo into a crisp, square PNG data URL
 * preserving an exact 1:1 aspect ratio without any deformation.
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
          canvas.width = 600;
          canvas.height = 600;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(null);
            return;
          }

          // Render clean white circular background
          ctx.beginPath();
          ctx.arc(300, 300, 294, 0, 2 * Math.PI);
          ctx.fillStyle = "#ffffff";
          ctx.fill();

          // Draw the vector logo strictly square
          ctx.drawImage(img, 0, 0, 600, 600);
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

      // Inline SVG data URI for 100% offline availability
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
 * Generates an executive, certified 242Agro quote PDF.
 * Formatted cleanly for A4 single-page presentation with balanced margins,
 * strictly 1:1 non-deformed official logo, professional table grid,
 * and high-impact ROI simulation.
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

  // Page constants (A4 is 210 x 297 mm)
  const leftX = 14;
  const rightX = 196;
  const contentW = rightX - leftX; // 182 mm

  // ==========================================
  // 1. TOP OFFICIAL HEADER (Forest Green + Gold)
  // ==========================================
  doc.setFillColor(27, 94, 32); // #1b5e20 deep rich forest green
  doc.rect(0, 0, 210, 27, "F");

  // Golden accent bottom border
  doc.setFillColor(217, 119, 6); // #d97706 warm gold
  doc.rect(0, 27, 210, 1.4, "F");

  // White circular badge container for the logo
  doc.setFillColor(255, 255, 255);
  doc.circle(24, 13.5, 10.5, "F");

  // Logo: STRICTLY 1:1 SQUARE (width === height === 19mm) - ZERO DEFORMATION
  if (logoDataUrl) {
    try {
      const logoSize = 19;
      doc.addImage(logoDataUrl, "PNG", 24 - logoSize / 2, 13.5 - logoSize / 2, logoSize, logoSize);
    } catch {
      doc.setTextColor(20, 70, 38);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text("242Agro", 24, 14, { align: "center" });
    }
  }

  // Company Brand Name & Department
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.text("242Agro", 38, 11);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(220, 252, 231); // light lime
  doc.text("Solutions Agro-Pastorales Urbaines Hors-Sol Clé en Main", 38, 16.5);

  doc.setFontSize(6.8);
  doc.setTextColor(209, 250, 229);
  doc.text("Pointe-Noire • République du Congo • Tél / WhatsApp : +242 06 941 23 45", 38, 21.5);

  // Official Quote Pill on the Header Right
  doc.setFillColor(34, 112, 40);
  doc.roundedRect(144, 5.5, 52, 16, 2, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.8);
  doc.setTextColor(253, 224, 71); // yellow gold
  doc.text("DEVIS TECHNIQUE ESTIMATIF", 170, 11.2, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.8);
  doc.setTextColor(255, 255, 255);
  doc.text("Validité : 30 jours • Clé en Main", 170, 16.2, { align: "center" });

  // ==========================================
  // 2. DOCUMENT REFERENCE & DATE TITLE BAR
  // ==========================================
  let y = 34;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11.5);
  doc.setTextColor(21, 128, 61); // #15803d
  doc.text(`DEVIS N° ${ref}`, leftX, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(`Date d'émission : ${dateStr}  |  Lieu : Pointe-Noire (Congo)`, rightX, y, { align: "right" });

  y += 2.5;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(leftX, y, rightX, y);

  // ==========================================
  // 3. STRUCTURED CLIENT & SITE SPECIFICATIONS BOX
  // ==========================================
  y += 3.5;
  const clientBoxH = 24.5;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.roundedRect(leftX, y, contentW, clientBoxH, 1.5, 1.5, "FD");

  // Box title badge
  doc.setFillColor(220, 252, 231);
  doc.rect(leftX, y, contentW, 5.2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.8);
  doc.setTextColor(21, 128, 61);
  doc.text("INFORMATIONS DU CLIENT & SPÉCIFICATIONS DU SITE", leftX + 4, y + 3.8);

  // Left column in client box
  const cLeftX = leftX + 4;
  const cRightX = leftX + 96;
  const rowY1 = y + 9.5;
  const rowY2 = y + 14.5;
  const rowY3 = y + 19.5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text("Client / Demandeur :", cLeftX, rowY1);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(data.clientName || "Client Particulier", cLeftX + 30, rowY1);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text("Téléphone & WhatsApp :", cLeftX, rowY2);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(data.clientPhone || "Non communiqué", cLeftX + 30, rowY2);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text("Email de contact :", cLeftX, rowY3);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);
  doc.text(data.clientEmail || "contact@client.cg", cLeftX + 30, rowY3);

  // Right column in client box
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text("Localisation site :", cRightX, rowY1);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(`${data.clientQuartier || "Pointe-Noire"}, R. Congo`, cRightX + 26, rowY1);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text("Type d'espace :", cRightX, rowY2);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(CLIENT_TYPE_LABELS[data.clientType] || "Cour urbaine", cRightX + 26, rowY2);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text("Surface allouée :", cRightX, rowY3);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(21, 128, 61);
  doc.text(`${formatSurfaceDisplay(data.surfaceArea)} (Installation Clé en Main)`, cRightX + 26, rowY3);

  // ==========================================
  // 4. DETAILED QUOTATION TABLE (Professional Grid)
  // ==========================================
  y += clientBoxH + 4;

  // Table Header
  doc.setFillColor(30, 41, 59); // slate-800
  doc.rect(leftX, y, contentW, 6.2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.2);
  doc.setTextColor(255, 255, 255);
  doc.text("DÉSIGNATION DES MODULES & TRAVAUX 242AGRO", leftX + 4, y + 4.2);
  doc.text("SPÉCIFICATIONS TECHNIQUES & FOURNITURES", leftX + 70, y + 4.2);
  doc.text("TOTAL (FCFA)", rightX - 4, y + 4.2, { align: "right" });

  y += 6.2;

  // Build module items
  const modules: { name: string; specs: string; amount: string; isOffered?: boolean }[] = [];

  if (data.includePotager) {
    modules.push({
      name: `Potager Maraîcher Hors-Sol (${formatSurfaceDisplay(data.surfaceArea)})`,
      specs: "Bacs surélevés traités + Substrat bio enrichi + Semences (épinards, poivrons, concombres, matabélé, tomates...)",
      amount: `${calculatePotagerCost(data.surfaceArea).toLocaleString()} FCFA`,
    });
  }

  if (data.includePoules && data.poulesCount > 0) {
    modules.push({
      name: `Module Avicole Urbain (${data.poulesCount} Poules Pondeuses)`,
      specs: "Poules vaccinées prêtes à pondre + Poulailler surélevé aéré anti-odeur + Équipements complets",
      amount: `${(120000 + data.poulesCount * 7000).toLocaleString()} FCFA`,
    });
  }

  if (data.includeLapins && data.lapinesCount > 0) {
    modules.push({
      name: `Module Cunicole (${data.lapinesCount} Lapines Reproductrices)`,
      specs: "Clapiers métalliques grillagés hygiéniques + Abreuvoirs automatiques à pipette + Mâle reproducteur",
      amount: `${(95000 + data.lapinesCount * 8500).toLocaleString()} FCFA`,
    });
  }

  modules.push({
    name: `Système d'Arrosage (${data.irrigationType === "goutte_a_goutte" ? "Goutte-à-Goutte" : "Manuel Optimisé"})`,
    specs: data.irrigationType === "goutte_a_goutte"
      ? "Ligne goutte-à-goutte avec régulateur et vannes sectorisées (économie d'eau de 70%)"
      : "Tuyauterie renforcée spéciale climat équatorial + Raccords rapides et pomme micro-pluie",
    amount: data.irrigationType === "goutte_a_goutte" ? "45 000 FCFA" : "INCLUS",
    isOffered: data.irrigationType !== "goutte_a_goutte",
  });

  if (data.includeCompost) {
    modules.push({
      name: "Unité de Compostage Accéléré 242Agro",
      specs: "Composteur rotatif hermétique anti-odeur pour valoriser litières et fanes maraîchères",
      amount: "35 000 FCFA",
    });
  }

  modules.push({
    name: "Pack Sérénité : Pose, Formation & Suivi Agronomique",
    specs: "Montage complet sous 3 semaines + Formation pratique 2 jours + 3 mois de visites techniques",
    amount: "OFFERT (INCLUS)",
    isOffered: true,
  });

  // Render Table Rows with Alternating Shading
  const rowH = 8.5;
  modules.forEach((mod, idx) => {
    const isEven = idx % 2 === 0;
    doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
    doc.rect(leftX, y, contentW, rowH, "F");

    // Divider line
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.25);
    doc.line(leftX, y + rowH, rightX, y + rowH);

    // Module name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text(mod.name, leftX + 4, y + 4);

    // Module specs
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.2);
    doc.setTextColor(100, 116, 139);
    doc.text(mod.specs, leftX + 70, y + 5.2);

    // Amount
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.8);
    if (mod.isOffered) {
      doc.setTextColor(21, 128, 61); // emerald green
    } else {
      doc.setTextColor(15, 23, 42); // dark slate
    }
    doc.text(mod.amount, rightX - 4, y + 5, { align: "right" });

    y += rowH;
  });

  // ==========================================
  // 5. HIGH-IMPACT GRAND TOTAL BAR
  // ==========================================
  y += 2.5;
  const totalH = 10.5;
  doc.setFillColor(27, 94, 32); // #1b5e20
  doc.roundedRect(leftX, y, contentW, totalH, 1.5, 1.5, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("MONTANT TOTAL CLÉ EN MAIN (FOURNITURE + POSE + FORMATION + SUIVI 3 MOIS) :", leftX + 4, y + 6.8);

  doc.setFontSize(12);
  doc.setTextColor(254, 240, 138); // warm golden yellow
  doc.text(`${data.simulation.totalPrice.toLocaleString()} FCFA`, rightX - 4, y + 7, { align: "right" });

  // ==========================================
  // 6. PAYMENT SCHEDULE 3X SANS FRAIS
  // ==========================================
  y += totalH + 4;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(30, 41, 59);
  doc.text("ÉCHÉANCIER DE PAIEMENT EN 3 FOIS SANS FRAIS (FACILITÉ 242AGRO) :", leftX, y);

  y += 3.5;
  const colW = (contentW - 6) / 3; // ~58.6 mm each
  const cardH = 13.5;

  const installments = [
    {
      title: "1. Acompte Commande (30%)",
      amount: `${data.simulation.downPayment30.toLocaleString()} FCFA`,
      desc: "Validation & fabrication atelier",
      bg: [248, 250, 252],
      border: [203, 213, 225],
    },
    {
      title: "2. À la Livraison & Pose (40%)",
      amount: `${data.simulation.deliveryPayment40.toLocaleString()} FCFA`,
      desc: "Installation & formation pratique",
      bg: [248, 250, 252],
      border: [203, 213, 225],
    },
    {
      title: "3. Au 3ᵉ Mois Post-Pose (30%)",
      amount: `${data.simulation.harvestPayment30.toLocaleString()} FCFA`,
      desc: "100% autofinancé par récoltes",
      bg: [240, 253, 244],
      border: [134, 239, 172],
    },
  ];

  installments.forEach((inst, idx) => {
    const xPos = leftX + idx * (colW + 3);
    doc.setFillColor(inst.bg[0], inst.bg[1], inst.bg[2]);
    doc.setDrawColor(inst.border[0], inst.border[1], inst.border[2]);
    doc.setLineWidth(0.3);
    doc.roundedRect(xPos, y, colW, cardH, 1.2, 1.2, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.8);
    doc.setTextColor(71, 85, 105);
    doc.text(inst.title, xPos + 3, y + 3.8);

    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(inst.amount, xPos + 3, y + 8);

    doc.setFontSize(6);
    doc.setTextColor(idx === 2 ? 21 : 100, idx === 2 ? 128 : 116, idx === 2 ? 61 : 139);
    doc.text(inst.desc, xPos + 3, y + 11.5);
  });

  // ==========================================
  // 7. FINANCIAL ROI & REVENUE SIMULATION BOX
  // ==========================================
  y += cardH + 4;
  const roiBoxH = 31.5;
  doc.setFillColor(240, 253, 244); // #f0fdf4 emerald-50
  doc.setDrawColor(34, 197, 94); // #22c55e emerald-500
  doc.setLineWidth(0.35);
  doc.roundedRect(leftX, y, contentW, roiBoxH, 1.5, 1.5, "FD");

  // ROI Header bar
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(21, 128, 61);
  doc.text("SIMULATION DE RENTABILITÉ & RETOUR SUR INVESTISSEMENT (COURS RÉELS POINTE-NOIRE) :", leftX + 3.5, y + 4.2);

  doc.setFontSize(7.5);
  doc.setTextColor(180, 83, 9);
  doc.text(`Taux de Rendement Estimé : +${data.simulation.roiPercentage}% / an`, rightX - 3.5, y + 4.2, { align: "right" });

  // 3 Mini KPI Boxes inside ROI
  const kpiW = (contentW - 8) / 3;
  const kpiH = 9.5;
  const kpiY = y + 6.5;

  // KPI 1: Monthly Savings
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(leftX + 2, kpiY, kpiW, kpiH, 1, 1, "FD");
  doc.setFontSize(5.8);
  doc.setTextColor(100, 116, 139);
  doc.text("ÉCONOMIE / REVENU MENSUEL", leftX + 4, kpiY + 3.5);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.8);
  doc.setTextColor(21, 128, 61);
  doc.text(`~${data.simulation.monthlySavings.toLocaleString()} FCFA / mois`, leftX + 4, kpiY + 7.5);

  // KPI 2: Full Amortization
  const kpi2X = leftX + 2 + kpiW + 2;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(254, 215, 170);
  doc.roundedRect(kpi2X, kpiY, kpiW, kpiH, 1, 1, "FD");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(5.8);
  doc.setTextColor(100, 116, 139);
  doc.text("AMORTISSEMENT INTÉGRAL", kpi2X + 2, kpiY + 3.5);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.8);
  doc.setTextColor(180, 83, 9);
  doc.text(`Dès Mois ${data.simulation.roiMonth}`, kpi2X + 2, kpiY + 7.5);

  // KPI 3: Net Annual Profit
  const kpi3X = kpi2X + kpiW + 2;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(153, 246, 228);
  doc.roundedRect(kpi3X, kpiY, kpiW, kpiH, 1, 1, "FD");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(5.8);
  doc.setTextColor(100, 116, 139);
  doc.text("BÉNÉFICE NET AN 1", kpi3X + 2, kpiY + 3.5);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.8);
  doc.setTextColor(15, 118, 110);
  doc.text(`+${data.simulation.annualNetProfit.toLocaleString()} FCFA`, kpi3X + 2, kpiY + 7.5);

  // Production Summary line
  const prodParts: string[] = [];
  if (data.includePotager) prodParts.push(`${data.simulation.estimated6MonthProduction.vegetablesKg} kg légumes (~${data.simulation.estimated6MonthValue.vegetablesValue.toLocaleString()} F)`);
  if (data.includePoules && data.poulesCount > 0) prodParts.push(`${data.simulation.estimated6MonthProduction.eggsCount} œufs (~${data.simulation.estimated6MonthValue.eggsValue.toLocaleString()} F)`);
  if (data.includeLapins && data.lapinesCount > 0) prodParts.push(`${data.simulation.estimated6MonthProduction.meatKg} kg viande (~${data.simulation.estimated6MonthValue.meatValue.toLocaleString()} F)`);
  if (data.includeCompost) prodParts.push(`${data.simulation.estimated6MonthProduction.compostBags} sacs compost (~${data.simulation.estimated6MonthValue.compostValue.toLocaleString()} F)`);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.2);
  doc.setTextColor(51, 65, 85);
  doc.text(`• Récoltes valorisées sur 6 mois (Valeur brute ~${data.simulation.estimated6MonthValue.totalValue.toLocaleString()} FCFA) : ${prodParts.join(" • ")}`, leftX + 3.5, y + 20.5);

  // Autofinancing guarantee callout
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(21, 128, 61);
  doc.text(
    `• Autofinancement Garanti : Votre 3ᵉ tranche (${data.simulation.harvestPayment30.toLocaleString()} FCFA au Mois 3) est 100% couverte par vos récoltes sans apport supplémentaire.`,
    leftX + 3.5,
    y + 26
  );

  // ==========================================
  // 8. OFFICIAL FOOTER WITH LOGO THUMBNAIL & STAMP
  // ==========================================
  y += roiBoxH + 4.5;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(leftX, y, rightX, y);

  y += 2.5;

  // Bottom Logo: STRICTLY 1:1 SQUARE (width === height === 14mm)
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(leftX, y, 16, 16, 1.5, 1.5, "FD");

  if (logoDataUrl) {
    try {
      doc.addImage(logoDataUrl, "PNG", leftX + 1, y + 1, 14, 14);
    } catch {
      // Fallback
    }
  }

  // Legal and Department Details next to bottom logo
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.8);
  doc.setTextColor(15, 23, 42);
  doc.text("242Agro SARL • Direction Technique & Exploitation", leftX + 20, y + 4.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.8);
  doc.setTextColor(71, 85, 105);
  doc.text("Solutions agro-pastorales durables • Pointe-Noire, République du Congo", leftX + 20, y + 8.5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(21, 128, 61);
  doc.text("Visite technique préalable sous 48h • Accompagnement agronomique continu", leftX + 20, y + 12.2);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6);
  doc.setTextColor(100, 116, 139);
  doc.text(`Contact direct & WhatsApp : ${CONTACT_INFO.phone}  |  Email : ${CONTACT_INFO.email}`, leftX + 20, y + 15.5);

  // Right Official Circular Certified Stamp
  const stampX = 178;
  const stampY = y + 8;
  doc.setDrawColor(21, 128, 61);
  doc.setLineWidth(0.4);
  doc.circle(stampX, stampY, 7.5);
  doc.circle(stampX, stampY, 6.5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(4.2);
  doc.setTextColor(21, 128, 61);
  doc.text("242AGRO POINTE-NOIRE", stampX, stampY - 2.8, { align: "center" });
  doc.setFontSize(5);
  doc.text("VALIDÉ & CERTIFIÉ", stampX, stampY + 0.4, { align: "center" });
  doc.setFontSize(3.8);
  doc.text("DIRECTION TECHNIQUE", stampX, stampY + 3.4, { align: "center" });

  // Save and download PDF
  const fileName = `Devis_242Agro_${ref}.pdf`;
  doc.save(fileName);
  return fileName;
}
