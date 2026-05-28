import type { Locale, Localized } from "./i18n/config";

export type Product = {
  slug: string;
  name: Localized;
  tagline: Localized;
  description: Localized;
  longDescription: Localized;
  price: number;
  unit: Localized;
  category: "chocolat" | "gummies" | "caramel" | "fruite" | "edition-limitee";
  origin: Localized;
  allergens: Array<"lait" | "soya" | "gluten" | "noix">;
  calories: string;
  isVegan?: boolean;
  isNew?: boolean;
  emoji: string;
  gradient: string;
  accentColor: string;
  pairs: Localized<string[]>;
};

export const products: Product[] = [
  {
    slug: "chocolate-caramel",
    name: { fr: "Chocolate Caramel", en: "Chocolate Caramel" },
    tagline: {
      fr: "Le pod fondant signature",
      en: "Our signature melting pod",
    },
    description: {
      fr: "Chocolat noir 58% et caramel salé fleur de sel.",
      en: "58% dark chocolate and fleur-de-sel salted caramel.",
    },
    longDescription: {
      fr: "Notre pod fondateur. Chocolat noir 58% de cacao d'Équateur enrobant un coeur de caramel salé à la fleur de sel de l'Île aux Coudres. Cuit lentement à 118°C pour une texture qui reste tendre du premier au dernier morceau.",
      en: "Our founding pod. 58% dark chocolate from Ecuadorian cacao wrapping a fleur-de-sel salted caramel heart from Île aux Coudres. Slow-cooked at 118°C for a texture that stays tender from first to last piece.",
    },
    price: 2.99,
    unit: {
      fr: "pod 12g · 8 morceaux",
      en: "12g pod · 8 pieces",
    },
    category: "chocolat",
    origin: {
      fr: "Chocolaterie partenaire, Sherbrooke (QC)",
      en: "Partner chocolatier, Sherbrooke (QC)",
    },
    allergens: ["lait", "soya"],
    calories: "55 cal",
    isNew: true,
    emoji: "🍫",
    gradient:
      "radial-gradient(circle at 30% 30%, #ff8a4c 0%, #d946ef 45%, #6d28d9 100%)",
    accentColor: "#d946ef",
    pairs: {
      fr: ["Café espresso", "Lait d'avoine froid", "Whisky tourbé"],
      en: ["Espresso", "Cold oat milk", "Peated whisky"],
    },
  },
  {
    slug: "berry-burst",
    name: { fr: "Berry Burst", en: "Berry Burst" },
    tagline: {
      fr: "Gummies tri-baies acidulés",
      en: "Tart triple-berry gummies",
    },
    description: {
      fr: "Framboise, mûre et bleuet du Lac-Saint-Jean.",
      en: "Raspberry, blackberry and Lac-Saint-Jean blueberry.",
    },
    longDescription: {
      fr: "Gummies à la pectine de pomme (sans gélatine) infusés à trois purées de baies pressées à froid au Lac-Saint-Jean. Acidité naturelle, sans colorants artificiels. La couleur vient des baies, point.",
      en: "Apple-pectin gummies (no gelatin) infused with three berry purées cold-pressed in Lac-Saint-Jean. Natural tang, no artificial colors. The color comes from the berries, end of story.",
    },
    price: 2.99,
    unit: {
      fr: "pod 14g · 6 gummies",
      en: "14g pod · 6 gummies",
    },
    category: "gummies",
    origin: {
      fr: "Producteur fruitier, Saint-Félicien (QC)",
      en: "Fruit grower, Saint-Félicien (QC)",
    },
    allergens: [],
    calories: "48 cal",
    isVegan: true,
    isNew: true,
    emoji: "🫐",
    gradient:
      "radial-gradient(circle at 30% 30%, #ec4899 0%, #f43f5e 50%, #7c3aed 100%)",
    accentColor: "#ec4899",
    pairs: {
      fr: ["Yogourt nature", "Thé glacé hibiscus", "Eau pétillante citron"],
      en: ["Plain yogurt", "Iced hibiscus tea", "Lemon sparkling water"],
    },
  },
  {
    slug: "salted-toffee",
    name: { fr: "Salted Toffee", en: "Salted Toffee" },
    tagline: {
      fr: "Toffee beurre noisette croquant",
      en: "Crunchy brown-butter toffee",
    },
    description: {
      fr: "Toffee croquant beurre noisette et fleur de sel.",
      en: "Crunchy toffee with brown butter and fleur de sel.",
    },
    longDescription: {
      fr: "Toffee cuit jusqu'à la note de noisette grillée, brisé en éclats irréguliers, finition fleur de sel. Le pod garde sa texture craquante grâce à un sachet aluminium métallisé scellé individuellement.",
      en: "Toffee cooked to a toasted-hazelnut note, broken into irregular shards, finished with fleur de sel. The pod keeps its crunch thanks to an individually sealed metallized aluminum pouch.",
    },
    price: 2.99,
    unit: {
      fr: "pod 13g · 5 éclats",
      en: "13g pod · 5 shards",
    },
    category: "caramel",
    origin: {
      fr: "Confiserie partenaire, Lévis (QC)",
      en: "Partner confectioner, Lévis (QC)",
    },
    allergens: ["lait"],
    calories: "60 cal",
    isNew: true,
    emoji: "🍯",
    gradient:
      "radial-gradient(circle at 30% 30%, #fbbf24 0%, #f97316 50%, #be123c 100%)",
    accentColor: "#f97316",
    pairs: {
      fr: ["Café filtre éthiopien", "Bourbon vieilli", "Pomme verte croquante"],
      en: ["Ethiopian filter coffee", "Aged bourbon", "Crisp green apple"],
    },
  },
  {
    slug: "matcha-mochi",
    name: { fr: "Matcha Mochi", en: "Matcha Mochi" },
    tagline: {
      fr: "Mochi mini-format matcha cérémonial",
      en: "Mini-mochi with ceremonial matcha",
    },
    description: {
      fr: "Mochi tendre au matcha grade cérémonial d'Uji.",
      en: "Tender mochi with ceremonial-grade matcha from Uji.",
    },
    longDescription: {
      fr: "Mini-mochis enrobés de poudre de matcha cérémonial importée directement d'Uji, Japon. Pâte de riz gluant pressé à la vapeur, garniture pâte de haricot blanc adoucie. Vegan, sans gluten ajouté.",
      en: "Mini-mochi coated with ceremonial matcha powder imported directly from Uji, Japan. Steam-pressed glutinous rice dough, sweetened white bean paste filling. Vegan, no added gluten.",
    },
    price: 3.49,
    unit: {
      fr: "pod 12g · 4 mochis",
      en: "12g pod · 4 mochi",
    },
    category: "edition-limitee",
    origin: {
      fr: "Atelier mochi, Mile End Montréal (QC)",
      en: "Mochi studio, Mile End Montreal (QC)",
    },
    allergens: [],
    calories: "52 cal",
    isVegan: true,
    emoji: "🍵",
    gradient:
      "radial-gradient(circle at 30% 30%, #4ade80 0%, #06b6d4 55%, #6366f1 100%)",
    accentColor: "#10b981",
    pairs: {
      fr: ["Thé sencha", "Lait de soya tiède", "Sake nigori"],
      en: ["Sencha tea", "Warm soy milk", "Nigori sake"],
    },
  },
  {
    slug: "citrus-pop",
    name: { fr: "Citrus Pop", en: "Citrus Pop" },
    tagline: {
      fr: "Bonbons durs agrumes pétillants",
      en: "Hard candies, fizzing citrus",
    },
    description: {
      fr: "Bonbons durs citron, yuzu et clémentine.",
      en: "Hard candies with lemon, yuzu and clementine.",
    },
    longDescription: {
      fr: "Bonbons durs coulés à la main avec zestes confits. Triple agrume : citron Meyer, yuzu japonais et clémentine corse. Fini effervescent grâce à une touche de bicarbonate végétal — ça pétille délicatement sur la langue.",
      en: "Hand-cast hard candies with candied zest. Triple citrus: Meyer lemon, Japanese yuzu and Corsican clementine. Effervescent finish from a touch of plant-based baking soda — gentle fizz on the tongue.",
    },
    price: 2.79,
    unit: {
      fr: "pod 11g · 5 bonbons",
      en: "11g pod · 5 candies",
    },
    category: "fruite",
    origin: {
      fr: "Confiserie artisanale, Québec (QC)",
      en: "Artisanal confectioner, Quebec City (QC)",
    },
    allergens: [],
    calories: "42 cal",
    isVegan: true,
    emoji: "🍋",
    gradient:
      "radial-gradient(circle at 30% 30%, #fde047 0%, #fb923c 50%, #ef4444 100%)",
    accentColor: "#facc15",
    pairs: {
      fr: ["Eau gazeuse nature", "Gin tonic", "Salade de fruits"],
      en: ["Plain sparkling water", "Gin & tonic", "Fruit salad"],
    },
  },
  {
    slug: "double-cacao",
    name: { fr: "Double Cacao", en: "Double Cacao" },
    tagline: {
      fr: "Pépites chocolat noir 72%",
      en: "72% dark chocolate nibs",
    },
    description: {
      fr: "Pépites chocolat noir 72% intense.",
      en: "Intense 72% dark chocolate nibs.",
    },
    longDescription: {
      fr: "Pour les amateurs de chocolat sérieux. Pépites torréfiées à partir de fèves de cacao du Pérou (Piura) tempérées trois fois pour un éclat satiné. Très peu de sucre — laisse le cacao prendre toute la place.",
      en: "For serious chocolate lovers. Nibs from Peruvian (Piura) cacao beans, triple-tempered for a satin sheen. Very little sugar — letting cacao take the whole stage.",
    },
    price: 2.99,
    unit: {
      fr: "pod 12g · 10 pépites",
      en: "12g pod · 10 nibs",
    },
    category: "chocolat",
    origin: {
      fr: "Chocolaterie partenaire, Sherbrooke (QC)",
      en: "Partner chocolatier, Sherbrooke (QC)",
    },
    allergens: ["lait", "soya"],
    calories: "58 cal",
    emoji: "🍪",
    gradient:
      "radial-gradient(circle at 30% 30%, #a855f7 0%, #6366f1 50%, #1e1b4b 100%)",
    accentColor: "#7c3aed",
    pairs: {
      fr: ["Espresso doppio", "Vin rouge corsé", "Framboises fraîches"],
      en: ["Espresso doppio", "Full-bodied red wine", "Fresh raspberries"],
    },
  },
  {
    slug: "watermelon-wave",
    name: { fr: "Watermelon Wave", en: "Watermelon Wave" },
    tagline: {
      fr: "Gummies pastèque-menthe rafraîchissants",
      en: "Refreshing watermelon-mint gummies",
    },
    description: {
      fr: "Gummies pastèque infusés menthe poivrée.",
      en: "Watermelon gummies with peppermint infusion.",
    },
    longDescription: {
      fr: "Gummies vegan à la pectine, jus de pastèque concentré et infusion légère de menthe poivrée biologique cultivée à Cap-Saint-Ignace. La menthe arrive en fin de bouche — fraîcheur sans agression.",
      en: "Vegan pectin gummies with concentrated watermelon juice and a light infusion of organic peppermint grown in Cap-Saint-Ignace. The mint arrives at the finish — fresh without aggression.",
    },
    price: 2.99,
    unit: {
      fr: "pod 14g · 6 gummies",
      en: "14g pod · 6 gummies",
    },
    category: "gummies",
    origin: {
      fr: "Producteur menthe, Cap-Saint-Ignace (QC)",
      en: "Mint grower, Cap-Saint-Ignace (QC)",
    },
    allergens: [],
    calories: "46 cal",
    isVegan: true,
    emoji: "🍉",
    gradient:
      "radial-gradient(circle at 30% 30%, #fb7185 0%, #f472b6 40%, #22d3ee 100%)",
    accentColor: "#f472b6",
    pairs: {
      fr: ["Thé glacé menthe", "Mojito sans alcool", "Salade de concombre"],
      en: ["Mint iced tea", "Virgin mojito", "Cucumber salad"],
    },
  },
  {
    slug: "maple-pearl",
    name: { fr: "Maple Pearl", en: "Maple Pearl" },
    tagline: {
      fr: "Perles érable québécois grade A",
      en: "Quebec grade-A maple pearls",
    },
    description: {
      fr: "Perles d'érable grade A cristallisées à froid.",
      en: "Cold-crystallized grade-A maple pearls.",
    },
    longDescription: {
      fr: "Perles de sirop d'érable grade A ambré cristallisées par lyophilisation à froid. Texture qui craque puis fond — l'érable libère son arôme intact, sans sucre ajouté. Cabane à sucre à Saint-Tite-des-Caps, récolte 2026.",
      en: "Grade-A amber maple syrup pearls, cold-freeze-dried. They crack then melt — the maple releases its aroma intact, no added sugar. Sugar shack in Saint-Tite-des-Caps, 2026 harvest.",
    },
    price: 3.29,
    unit: {
      fr: "pod 12g · 8 perles",
      en: "12g pod · 8 pearls",
    },
    category: "caramel",
    origin: {
      fr: "Érablière, Saint-Tite-des-Caps (QC)",
      en: "Sugar shack, Saint-Tite-des-Caps (QC)",
    },
    allergens: [],
    calories: "50 cal",
    isVegan: true,
    emoji: "🍁",
    gradient:
      "radial-gradient(circle at 30% 30%, #fbbf24 0%, #f59e0b 50%, #b45309 100%)",
    accentColor: "#f59e0b",
    pairs: {
      fr: ["Café noir corsé", "Whisky canadien", "Yogourt grec"],
      en: ["Bold black coffee", "Canadian whisky", "Greek yogurt"],
    },
  },
  {
    slug: "rose-lychee",
    name: { fr: "Rose Lychee", en: "Rose Lychee" },
    tagline: {
      fr: "Bonbons floraux rose-litchi",
      en: "Floral rose-lychee candies",
    },
    description: {
      fr: "Bonbons mous parfumés à la rose et au litchi.",
      en: "Soft candies infused with rose and lychee.",
    },
    longDescription: {
      fr: "Bonbons mous parfumés à l'eau de rose de Damas (sans alcool) et purée de litchi frais. Texture entre nougat et guimauve. Édition limitée pour la Saint-Valentin et la fête des Mères — production de février à mai uniquement.",
      en: "Soft candies infused with Damascus rose water (alcohol-free) and fresh lychee purée. Texture between nougat and marshmallow. Limited edition for Valentine's Day and Mother's Day — produced February through May only.",
    },
    price: 3.49,
    unit: {
      fr: "pod 13g · 5 bonbons",
      en: "13g pod · 5 candies",
    },
    category: "edition-limitee",
    origin: {
      fr: "Confiserie partenaire, Lévis (QC)",
      en: "Partner confectioner, Lévis (QC)",
    },
    allergens: ["lait"],
    calories: "54 cal",
    emoji: "🌹",
    gradient:
      "radial-gradient(circle at 30% 30%, #f9a8d4 0%, #e879f9 50%, #c026d3 100%)",
    accentColor: "#e879f9",
    pairs: {
      fr: ["Thé blanc", "Champagne rosé", "Macaron à la framboise"],
      en: ["White tea", "Rosé champagne", "Raspberry macaron"],
    },
  },
  {
    slug: "tropic-mango",
    name: { fr: "Tropic Mango", en: "Tropic Mango" },
    tagline: {
      fr: "Gummies mangue alphonso tropicale",
      en: "Tropical alphonso mango gummies",
    },
    description: {
      fr: "Gummies vegan mangue alphonso et fruit de la passion.",
      en: "Vegan gummies with alphonso mango and passion fruit.",
    },
    longDescription: {
      fr: "Gummies à la pectine infusés à la mangue alphonso (Inde) et au fruit de la passion. Note finale légèrement piquante — clin d'oeil aux confiseries de plage. Sans gélatine, sans colorant ajouté, la couleur vient des purées.",
      en: "Pectin gummies infused with alphonso mango (India) and passion fruit. A subtle spicy finish — a nod to beachside confections. No gelatin, no added color, the color comes from the purées.",
    },
    price: 2.99,
    unit: {
      fr: "pod 14g · 6 gummies",
      en: "14g pod · 6 gummies",
    },
    category: "gummies",
    origin: {
      fr: "Mise en pod, Sherbrooke (QC)",
      en: "Pod-filled in Sherbrooke (QC)",
    },
    allergens: [],
    calories: "49 cal",
    isVegan: true,
    emoji: "🥭",
    gradient:
      "radial-gradient(circle at 30% 30%, #fde047 0%, #fb7185 50%, #d946ef 100%)",
    accentColor: "#fb923c",
    pairs: {
      fr: ["Thé glacé pêche", "Rhum vieux", "Riz au lait coco"],
      en: ["Peach iced tea", "Aged rum", "Coconut rice pudding"],
    },
  },
];

export function productBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function relatedProducts(slug: string, limit = 3): Product[] {
  const current = productBySlug(slug);
  if (!current) return products.slice(0, limit);
  const same = products.filter(
    (p) => p.slug !== slug && p.category === current.category
  );
  const others = products.filter(
    (p) => p.slug !== slug && p.category !== current.category
  );
  return [...same, ...others].slice(0, limit);
}

// Loc utility — pick a Localized<T> for the active locale.
export function loc<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}
