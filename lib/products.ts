export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  price: number;
  unit: string;
  category: "chocolat" | "gummies" | "caramel" | "fruite" | "edition-limitee";
  origin: string;
  allergens: string[];
  calories: string;
  isVegan?: boolean;
  isNew?: boolean;
  emoji: string;
  gradient: string;
  accentColor: string;
  pairs: string[];
};

export const categoryLabels: Record<Product["category"], string> = {
  chocolat: "Chocolat",
  gummies: "Gummies",
  caramel: "Caramel",
  fruite: "Fruité",
  "edition-limitee": "Édition limitée",
};

export const products: Product[] = [
  {
    slug: "chocolate-caramel",
    name: "Chocolate Caramel",
    tagline: "Le pod fondant signature",
    description: "Chocolat noir 58% et caramel salé fleur de sel.",
    longDescription:
      "Notre pod fondateur. Chocolat noir 58% de cacao d'Équateur enrobant un coeur de caramel salé à la fleur de sel de l'Île aux Coudres. Cuit lentement à 118°C pour une texture qui reste tendre du premier au dernier morceau.",
    price: 2.99,
    unit: "pod 12g · 8 morceaux",
    category: "chocolat",
    origin: "Chocolaterie partenaire, Sherbrooke (QC)",
    allergens: ["lait", "soya"],
    calories: "55 cal",
    isNew: true,
    emoji: "🍫",
    gradient: "radial-gradient(circle at 30% 30%, #ff8a4c 0%, #d946ef 45%, #6d28d9 100%)",
    accentColor: "#d946ef",
    pairs: ["Café espresso", "Lait d'avoine froid", "Whisky tourbé"],
  },
  {
    slug: "berry-burst",
    name: "Berry Burst",
    tagline: "Gummies tri-baies acidulés",
    description: "Framboise, mûre et bleuet du Lac-Saint-Jean.",
    longDescription:
      "Gummies à la pectine de pomme (sans gélatine) infusés à trois purées de baies pressées à froid au Lac-Saint-Jean. Acidité naturelle, sans colorants artificiels. La couleur vient des baies, point.",
    price: 2.99,
    unit: "pod 14g · 6 gummies",
    category: "gummies",
    origin: "Producteur fruitier, Saint-Félicien (QC)",
    allergens: [],
    calories: "48 cal",
    isVegan: true,
    isNew: true,
    emoji: "🫐",
    gradient: "radial-gradient(circle at 30% 30%, #ec4899 0%, #f43f5e 50%, #7c3aed 100%)",
    accentColor: "#ec4899",
    pairs: ["Yogourt nature", "Thé glacé hibiscus", "Eau pétillante citron"],
  },
  {
    slug: "salted-toffee",
    name: "Salted Toffee",
    tagline: "Toffee beurre noisette croquant",
    description: "Toffee croquant beurre noisette et fleur de sel.",
    longDescription:
      "Toffee cuit jusqu'à la note de noisette grillée, brisé en éclats irréguliers, finition fleur de sel. Le pod garde sa texture craquante grâce à un sachet aluminium métallisé scellé individuellement.",
    price: 2.99,
    unit: "pod 13g · 5 éclats",
    category: "caramel",
    origin: "Confiserie partenaire, Lévis (QC)",
    allergens: ["lait"],
    calories: "60 cal",
    isNew: true,
    emoji: "🍯",
    gradient: "radial-gradient(circle at 30% 30%, #fbbf24 0%, #f97316 50%, #be123c 100%)",
    accentColor: "#f97316",
    pairs: ["Café filtre éthiopien", "Bourbon vieilli", "Pomme verte croquante"],
  },
  {
    slug: "matcha-mochi",
    name: "Matcha Mochi",
    tagline: "Mochi mini-format matcha cérémonial",
    description: "Mochi tendre au matcha grade cérémonial d'Uji.",
    longDescription:
      "Mini-mochis enrobés de poudre de matcha cérémonial importée directement d'Uji, Japon. Pâte de riz gluant pressé à la vapeur, garniture pâte de haricot blanc adoucie. Vegan, sans gluten ajouté.",
    price: 3.49,
    unit: "pod 12g · 4 mochis",
    category: "edition-limitee",
    origin: "Atelier mochi, Mile End Montréal (QC)",
    allergens: [],
    calories: "52 cal",
    isVegan: true,
    emoji: "🍵",
    gradient: "radial-gradient(circle at 30% 30%, #4ade80 0%, #06b6d4 55%, #6366f1 100%)",
    accentColor: "#10b981",
    pairs: ["Thé sencha", "Lait de soya tiède", "Sake nigori"],
  },
  {
    slug: "citrus-pop",
    name: "Citrus Pop",
    tagline: "Bonbons durs agrumes pétillants",
    description: "Bonbons durs citron, yuzu et clémentine.",
    longDescription:
      "Bonbons durs coulés à la main avec zestes confits. Triple agrume : citron Meyer, yuzu japonais et clémentine corse. Fini effervescent grâce à une touche de bicarbonate végétal — ça pétille délicatement sur la langue.",
    price: 2.79,
    unit: "pod 11g · 5 bonbons",
    category: "fruite",
    origin: "Confiserie artisanale, Québec (QC)",
    allergens: [],
    calories: "42 cal",
    isVegan: true,
    emoji: "🍋",
    gradient: "radial-gradient(circle at 30% 30%, #fde047 0%, #fb923c 50%, #ef4444 100%)",
    accentColor: "#facc15",
    pairs: ["Eau gazeuse nature", "Gin tonic", "Salade de fruits"],
  },
  {
    slug: "double-cacao",
    name: "Double Cacao",
    tagline: "Pépites chocolat noir 72%",
    description: "Pépites chocolat noir 72% intense.",
    longDescription:
      "Pour les amateurs de chocolat sérieux. Pépites torréfiées à partir de fèves de cacao du Pérou (Piura) tempérées trois fois pour un éclat satiné. Très peu de sucre — laisse le cacao prendre toute la place.",
    price: 2.99,
    unit: "pod 12g · 10 pépites",
    category: "chocolat",
    origin: "Chocolaterie partenaire, Sherbrooke (QC)",
    allergens: ["lait", "soya"],
    calories: "58 cal",
    emoji: "🍪",
    gradient: "radial-gradient(circle at 30% 30%, #a855f7 0%, #6366f1 50%, #1e1b4b 100%)",
    accentColor: "#7c3aed",
    pairs: ["Espresso doppio", "Vin rouge corsé", "Framboises fraîches"],
  },
  {
    slug: "watermelon-wave",
    name: "Watermelon Wave",
    tagline: "Gummies pastèque-menthe rafraîchissants",
    description: "Gummies pastèque infusés menthe poivrée.",
    longDescription:
      "Gummies vegan à la pectine, jus de pastèque concentré et infusion légère de menthe poivrée biologique cultivée à Cap-Saint-Ignace. La menthe arrive en fin de bouche — fraîcheur sans agression.",
    price: 2.99,
    unit: "pod 14g · 6 gummies",
    category: "gummies",
    origin: "Producteur menthe, Cap-Saint-Ignace (QC)",
    allergens: [],
    calories: "46 cal",
    isVegan: true,
    emoji: "🍉",
    gradient: "radial-gradient(circle at 30% 30%, #fb7185 0%, #f472b6 40%, #22d3ee 100%)",
    accentColor: "#f472b6",
    pairs: ["Thé glacé menthe", "Mojito sans alcool", "Salade de concombre"],
  },
  {
    slug: "maple-pearl",
    name: "Maple Pearl",
    tagline: "Perles érable québécois grade A",
    description: "Perles d'érable grade A cristallisées à froid.",
    longDescription:
      "Perles de sirop d'érable grade A ambré cristallisées par lyophilisation à froid. Texture qui craque puis fond — l'érable libère son arôme intact, sans sucre ajouté. Cabane à sucre à Saint-Tite-des-Caps, récolte 2026.",
    price: 3.29,
    unit: "pod 12g · 8 perles",
    category: "caramel",
    origin: "Érablière, Saint-Tite-des-Caps (QC)",
    allergens: [],
    calories: "50 cal",
    isVegan: true,
    emoji: "🍁",
    gradient: "radial-gradient(circle at 30% 30%, #fbbf24 0%, #f59e0b 50%, #b45309 100%)",
    accentColor: "#f59e0b",
    pairs: ["Café noir corsé", "Whisky canadien", "Yogourt grec"],
  },
  {
    slug: "rose-lychee",
    name: "Rose Lychee",
    tagline: "Bonbons floraux rose-litchi",
    description: "Bonbons mous parfumés à la rose et au litchi.",
    longDescription:
      "Bonbons mous parfumés à l'eau de rose de Damas (sans alcool) et purée de litchi frais. Texture entre nougat et guimauve. Édition limitée pour la Saint-Valentin et la fête des Mères — production de février à mai uniquement.",
    price: 3.49,
    unit: "pod 13g · 5 bonbons",
    category: "edition-limitee",
    origin: "Confiserie partenaire, Lévis (QC)",
    allergens: ["lait"],
    calories: "54 cal",
    emoji: "🌹",
    gradient: "radial-gradient(circle at 30% 30%, #f9a8d4 0%, #e879f9 50%, #c026d3 100%)",
    accentColor: "#e879f9",
    pairs: ["Thé blanc", "Champagne rosé", "Macaron à la framboise"],
  },
  {
    slug: "tropic-mango",
    name: "Tropic Mango",
    tagline: "Gummies mangue alphonso tropicale",
    description: "Gummies vegan mangue alphonso et fruit de la passion.",
    longDescription:
      "Gummies à la pectine infusés à la mangue alphonso (Inde) et au fruit de la passion. Note finale légèrement piquante — clin d'oeil aux confiseries de plage. Sans gélatine, sans colorant ajouté, la couleur vient des purées.",
    price: 2.99,
    unit: "pod 14g · 6 gummies",
    category: "gummies",
    origin: "Mise en pod, Sherbrooke (QC)",
    allergens: [],
    calories: "49 cal",
    isVegan: true,
    emoji: "🥭",
    gradient: "radial-gradient(circle at 30% 30%, #fde047 0%, #fb7185 50%, #d946ef 100%)",
    accentColor: "#fb923c",
    pairs: ["Thé glacé pêche", "Rhum vieux", "Riz au lait coco"],
  },
];

export function productBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function relatedProducts(slug: string, limit = 3): Product[] {
  const current = productBySlug(slug);
  if (!current) return products.slice(0, limit);
  const same = products.filter((p) => p.slug !== slug && p.category === current.category);
  const others = products.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...same, ...others].slice(0, limit);
}
