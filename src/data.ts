import { AgroPack } from "./types";
import heroImg from "./assets/images/hero_urban_farm_1788211765004.jpg";
import circularImg from "./assets/images/circular_ecosystem_1788211778747.jpg";
import harvestImg from "./assets/images/fresh_harvest_1788211795414.jpg";
import schoolFarmImg from "./assets/images/urban_school_farming_1788214797112.jpg";
import rabbitHutchImg from "./assets/images/cuniculture_clapier_1788214814197.jpg";
import courtyardHarvestImg from "./assets/images/courtyard_harvest_1788214830244.jpg";

export const IMAGES = {
  hero: heroImg,
  circular: circularImg,
  harvest: harvestImg,
  schoolFarm: schoolFarmImg,
  rabbitHutch: rabbitHutchImg,
  courtyardHarvest: courtyardHarvestImg,
};

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: "emerald" | "amber" | "teal" | "cyan";
  statLabel: string;
  statValue: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "school-farm",
    image: schoolFarmImg,
    title: "École d'Agriculture Urbaine & Gouttières PVC",
    subtitle: "Formation pratique et maraîchage hors-sol intensif à Pointe-Noire",
    badge: "Formation & Savoir-Faire",
    badgeColor: "emerald",
    statLabel: "Capacité Maraîchère",
    statValue: "180+ plants / module"
  },
  {
    id: "rabbit-hutch",
    image: rabbitHutchImg,
    title: "Élevage Intégré & Cuniculture Urbaine",
    subtitle: "Clapiers écologiques en bois & grillage adaptés aux cours et concessions",
    badge: "Élevage Clé en Main",
    badgeColor: "amber",
    statLabel: "Apport Protéiné & Engrais",
    statValue: "100% Circulaire"
  },
  {
    id: "courtyard-harvest",
    image: courtyardHarvestImg,
    title: "Récoltes Fraîches & Légumes Bio",
    subtitle: "Tomates savoureuses, piment, basilic et feuilles maraîchères locales",
    badge: "Zéro Engrais Chimique",
    badgeColor: "teal",
    statLabel: "Première Récolte",
    statValue: "Dès 3 semaines"
  },
  {
    id: "hero-farm",
    image: heroImg,
    title: "Micro-Fermes Hors-Sol Urbaines",
    subtitle: "Installation modulaire complète sur terrasse, balcon ou cour cimentée",
    badge: "Production Continue",
    badgeColor: "cyan",
    statLabel: "Retour Investissement",
    statValue: "665 000 FCFA / 6 mois"
  },
  {
    id: "circular-system",
    image: circularImg,
    title: "Boucle Bio-Économique 242Agro",
    subtitle: "Valorisation des déjections animales en lombricompost ultra-fertile",
    badge: "0 FCFA d'Engrais",
    badgeColor: "emerald",
    statLabel: "Économie Annuelle",
    statValue: "100% Autonome"
  }
];

export const CONTACT_INFO = {
  brandName: "242Agro",
  tagline: "L'agriculture urbaine hors-sol, clé en main à Pointe-Noire",
  websiteUrl: "https://242agropn.netlify.app/",
  phone: "+242 06 874 22 77",
  phoneClean: "+242068742277",
  whatsappUrl: "https://wa.me/242068742277?text=Bonjour%20242Agro,%20je%20souhaite%20un%20devis%20ou%20une%20visite%20technique%20pour%20mon%20espace.",
  location: "Pointe-Noire, République du Congo",
  email: "contact@242agro.cg",
  quoteDelay: "Devis gratuit en 48h",
  installDelay: "Installation en 3 semaines",
  guarantee: "Formation + suivi 3 mois inclus dans tous les packs"
};

export const QUARTIERS_POINTE_NOIRE = [
  "Tié-Tié",
  "Lumumba (Centre-Ville)",
  "Loandjili",
  "Mongo-Poukou",
  "Ngoyo",
  "Mpita",
  "Côte Sauvage",
  "Vindoulou",
  "Siafoumou",
  "Songolo",
  "Nkayi / Banlieue",
  "Autre quartier de Pointe-Noire"
];

export const PACKS_DATA: AgroPack[] = [
  {
    id: "starter",
    name: "Pack Starter",
    subtitle: "Idéal pour débuter dans un espace réduit ou balcon",
    price: 225000,
    priceFormatted: "225 000 FCFA",
    surface: "2 à 5 m²",
    vegetablesYield: "110 kg de légumes frais / 6 mois",
    description: "Conçu pour les cours urbaines compactes et les particuliers souhaitant réduire leur dépendance aux marchés.",
    savingsOrRevenue: "110 kg de légumes frais récoltés",
    features: [
      "Bacs potagers hors-sol écologiques surélevés (2 à 5 m²)",
      "Substrat enrichi 100% organique pré-activé",
      "Semences sélectionnées (amarante, folon, ciboule, tomates, piments)",
      "Kit d'arrosage économe en eau adapté au climat côtier",
      "Installation complète clé en main sous 3 semaines",
      "Formation pratique aux techniques maraîchères hors-sol",
      "Accompagnement et suivi agronomique régulier pendant 3 mois"
    ],
    recommendedFor: "Familles de 2-4 personnes, cours bétonnées, toits-terrasses"
  },
  {
    id: "familial",
    name: "Pack Familial",
    subtitle: "L'autonomie alimentaire équilibrée pour votre foyer",
    price: 380000,
    priceFormatted: "380 000 FCFA",
    surface: "5 m² + 10 Poules",
    vegetablesYield: "110 kg de légumes frais",
    hens: 10,
    compostYield: "25 sacs d'engrais organique",
    badge: "Le Plus Populaire",
    isPopular: true,
    description: "Le combo gagnant potager + élevage avicole. Protéines quotidiennes d'œufs frais et légumes à volonté.",
    savingsOrRevenue: "305 000 FCFA d'économies estimées sur 6 mois",
    features: [
      "Bacs maraîchers hors-sol de 5 m² haut rendement",
      "Poulailler urbain compact, aéré et anti-odeurs (10 poules pondeuses)",
      "Lot de 10 poules pondeuses vigoureuses vaccinées",
      "Production de plus de 1 300 œufs frais sur 6 mois",
      "Boucle circulaire : les fientes nourrissent le potager (0 FCFA d'engrais)",
      "Installation clé en main et formation complète de la famille",
      "Suivi agronomique et zootechnique personnalisé de 3 mois"
    ],
    recommendedFor: "Familles de 4 à 8 personnes cherchant autonomie & économies"
  },
  {
    id: "productif",
    name: "Pack Productif",
    subtitle: "Production maraîchère et avicole à visée commerciale",
    price: 720000,
    priceFormatted: "720 000 FCFA",
    surface: "11 à 20 m²",
    vegetablesYield: "350+ kg de légumes variés",
    hens: 20,
    rabbits: 4,
    compostYield: "60 sacs de compost haut de gamme",
    badge: "Haute Rentabilité",
    description: "Une véritable micro-ferme urbaine rentable générant un surplus commercialisable aux restaurants et marchés.",
    savingsOrRevenue: "Génération de revenus réguliers et retour rapide",
    features: [
      "Grande surface de culture hors-sol étagée (11 à 20 m²)",
      "Module d'élevage combiné poulailler + clapiers à lapines intégrés",
      "Système d'irrigation goutte-à-goutte optimisé",
      "Unité de compostage rapide 242Agro à haute efficacité",
      "Plan de rotation des cultures pour récoltes hebdomadaires ininterrompues",
      "Formation avancée à la gestion de micro-ferme rentable",
      "Suivi technique premium avec visites bi-hebdomadaires pendant 3 mois"
    ],
    recommendedFor: "Propriétaires de cours spacieuses, restaurants, micro-entrepreneurs agricoles"
  },
  {
    id: "site_pilote",
    name: "Pack Site Pilote",
    subtitle: "Offre spéciale Écoles, Églises et Institutions",
    price: 444000,
    priceFormatted: "444 000 FCFA",
    surface: "Configuration Institutionnelle Complète",
    vegetablesYield: "Production massive pour cantine",
    hens: 10,
    rabbits: 4,
    compostYield: "50 sacs valorisables",
    badge: "Remise Spéciale 40%",
    discountNotice: "40% de remise spéciale partenaire communautaire incluse",
    description: "Permet de nourrir les cantines scolaires, former les jeunes et générer 665 000 FCFA de valeur sur 6 mois.",
    savingsOrRevenue: "665 000 FCFA de valeur produite sur 6 mois (ROI net 221 000 FCFA)",
    features: [
      "Potager hors-sol + Poulailler 10 poules + Clapiers 4 lapines",
      "Production estimée : 22kg/m² de légumes + 1 300 œufs + 60kg de viande blanche",
      "50 sacs de compost organique valorisables",
      "Remboursement complet de l'investissement dès le mois 6",
      "Ateliers pédagogiques d'initiation pour élèves ou membres de l'église",
      "Installation complète sous 3 semaines et formation de 2 référents",
      "Suivi vétérinaire et agronomique rigoureux de 3 mois"
    ],
    recommendedFor: "Écoles privées/publiques, Églises, Congrégations, ONG, Centres d'accueil"
  }
];

export const STANDARD_MODULE_YIELD_6_MONTHS = [
  { category: "Légumes frais", metric: "1 m² potager", yieldNumber: 22, unit: "kg de légumes frais", valueFcfa: 110000, icon: "Leaf" },
  { category: "Protéines œufs", metric: "10 poules pondeuses", yieldNumber: 1300, unit: "œufs frais récoltés", valueFcfa: 195000, icon: "Egg" },
  { category: "Viande blanche saine", metric: "4 lapines reproductrices", yieldNumber: 60, unit: "kg de viande blanche", valueFcfa: 210000, icon: "Beef" },
  { category: "Fertilisant bio", metric: "Compostage circulaire", yieldNumber: 50, unit: "sacs d'engrais organique", valueFcfa: 150000, icon: "Sprout" },
];

export const WATERFALL_ROI_DATA = [
  { name: "Investissement", value: -444000, display: "-444 000 FCFA", type: "cost", fill: "#ef4444" },
  { name: "Légumes", value: 110000, display: "+110 000 FCFA", type: "revenue", fill: "#10b981" },
  { name: "Œufs", value: 195000, display: "+195 000 FCFA", type: "revenue", fill: "#f59e0b" },
  { name: "Viande", value: 210000, display: "+210 000 FCFA", type: "revenue", fill: "#8b5cf6" },
  { name: "Compost", value: 150000, display: "+150 000 FCFA", type: "revenue", fill: "#059669" },
  { name: "Bénéfice Net (Mois 6)", value: 221000, display: "+221 000 FCFA", type: "net", fill: "#047857" },
];

export const MONTHLY_BREAKEVEN_DATA = [
  { month: "Mois 0", cumulDepense: 444000, cumulRevenu: 0, balance: -444000 },
  { month: "Mois 1", cumulDepense: 444000, cumulRevenu: 45000, balance: -399000 },
  { month: "Mois 2", cumulDepense: 444000, cumulRevenu: 130000, balance: -314000 },
  { month: "Mois 3", cumulDepense: 444000, cumulRevenu: 260000, balance: -184000 },
  { month: "Mois 4", cumulDepense: 444000, cumulRevenu: 395000, balance: -49000 },
  { month: "Mois 5", cumulDepense: 444000, cumulRevenu: 530000, balance: 86000 },
  { month: "Mois 6", cumulDepense: 444000, cumulRevenu: 665000, balance: 221000 },
];

export const FAQ_ITEMS = [
  {
    question: "Comment fonctionne le paiement flexible en 3 fois sans frais ?",
    answer: "Vous versez 30% à la commande pour lancer l'assemblage de vos bacs et abris, 40% à la livraison et installation chez vous, et les derniers 30% seulement au 3ème mois, c'est-à-dire après votre première récolte lorsque votre système commence déjà à s'autofinancer !"
  },
  {
    question: "Est-ce adapté pour une cour bétonnée ou une toiture à Pointe-Noire ?",
    answer: "Absolument ! Notre concept repose à 100% sur le hors-sol. Vos bacs maraîchers et abris d'élevage sont isolés du sol, n'abîment ni les carrelages ni les dalles en béton, et s'intègrent esthétiquement dans n'importe quel espace urbain."
  },
  {
    question: "Y a-t-il des mauvaises odeurs avec l'élevage des poules et lapins ?",
    answer: "Non. Grâce à notre protocole de litière absorbante naturelle traitée et au ramassage guidé pour le compostage accéléré, les odeurs sont neutralisées tout en produisant un engrais de haute valeur."
  },
  {
    question: "Que se passe-t-il après les 3 mois de suivi inclus ?",
    answer: "Vous êtes déjà autonome grâce à nos formations ! Toutefois, nous proposons des formules de suivi mensuel (de 35 000 à 75 000 FCFA/mois) comprenant visites de contrôle, approvisionnement en intrants bio et assistance vétérinaire."
  },
  {
    question: "Quels sont les délais d'installation à Pointe-Noire ?",
    answer: "Après validation de votre devis et visite technique sous 48h, votre installation complète est livrée, posée et prête à produire en moins de 3 semaines."
  }
];
