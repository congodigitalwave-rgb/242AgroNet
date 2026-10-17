export interface AgroPack {
  id: string;
  name: string;
  subtitle: string;
  price: number; // in FCFA
  priceFormatted: string;
  surface: string;
  vegetablesYield: string;
  hens?: number;
  rabbits?: number;
  compostYield?: string;
  badge?: string;
  description: string;
  savingsOrRevenue: string;
  discountNotice?: string;
  features: string[];
  recommendedFor: string;
  isPopular?: boolean;
}

export interface QuoteConfig {
  clientType: "famille" | "ecole_eglise" | "restaurant" | "investisseur";
  surfaceArea: number; // in m2 (2 to 50+)
  includePotager: boolean;
  includePoules: boolean;
  poulesCount: number; // 0, 10, 20, 30
  includeLapins: boolean;
  lapinesCount: number; // 0, 4, 8, 12
  includeCompost: boolean;
  includeSuiviMaintenance: boolean;
  monthsMaintenance: number; // 3 included, 6 or 12
  irrigationType: "manuelle" | "goutte_a_goutte";
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  clientQuartier: string;
  notes: string;
}

export interface SimulationResult {
  totalPrice: number;
  downPayment40: number; // 40% à la commande
  deliveryPayment35: number; // 35% à la livraison
  harvestPayment25: number; // 25% au mois 3 (après récolte)
  // Backward compatibility aliases
  downPayment30: number;
  deliveryPayment40: number;
  harvestPayment30: number;
  monthlySavings: number; // Économie / revenu mensuel moyen estimé
  annualValue: number; // Valeur brute générée sur 1 an
  annualNetProfit: number; // Bénéfice net cumulé sur 12 mois
  roiPercentage: number; // Taux de retour sur investissement annuel (%)
  harvestCoversTranche3: boolean; // La récolte autofinance la 3ème tranche (25%)
  estimated6MonthProduction: {
    vegetablesKg: number;
    eggsCount: number;
    meatKg: number;
    compostBags: number;
  };
  estimated6MonthValue: {
    vegetablesValue: number;
    eggsValue: number;
    meatValue: number;
    compostValue: number;
    totalValue: number;
  };
  netProfit6Months: number;
  roiMonth: number;
  breakEvenPercent: number;
}

export interface DiagnosticResult {
  summary: string;
  recommendedSetup: string;
  productionEstimate6Months: string;
  suggestedPack: string;
  actionSteps: string[];
  climateAdvicePointeNoire: string;
}
