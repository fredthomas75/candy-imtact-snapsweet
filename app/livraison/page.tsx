import Link from "next/link";
import { Truck, MapPin, Clock, Shield, Mail, Phone } from "lucide-react";
import { FREE_DELIVERY_THRESHOLD, DELIVERY_FEE } from "@/lib/shipping";
import { formatPrice } from "@/lib/utils";

export const metadata = {
  title: "Livraison — SnapSweet",
  description: "Zones desservies, délais et frais de livraison SnapSweet.",
};

export default function LivraisonPage() {
  const features = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "24 à 48h au Québec",
      text: "Commandes passées avant 14h expédiées le jour même via Postes Canada Xpresspost.",
      color: "#ec4899",
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Gratuite dès " + formatPrice(FREE_DELIVERY_THRESHOLD),
      text: `Sinon ${formatPrice(DELIVERY_FEE)} forfaitaire. Pas de frais cachés à la caisse, jamais.`,
      color: "#fb923c",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Pods scellés fraîcheur",
      text: "Sachet aluminium métallisé individuel. Conserve la texture intacte jusqu'à 8 mois.",
      color: "#a855f7",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Origine Québec",
      text: "Expédié de Saint-Hyacinthe. Tu peux récupérer ta commande gratuitement à l'atelier de Montréal.",
      color: "#06b6d4",
    },
  ];

  const zones = [
    { name: "Montréal & Laval", time: "24h", price: "Gratuit dès 35 $" },
    { name: "Québec & Lévis", time: "24-48h", price: formatPrice(DELIVERY_FEE) },
    { name: "Estrie · Outaouais · Mauricie", time: "48h", price: formatPrice(DELIVERY_FEE) },
    { name: "Reste du Québec", time: "48-72h", price: formatPrice(DELIVERY_FEE) },
    { name: "Ontario · Maritimes", time: "3-5 jours", price: formatPrice(DELIVERY_FEE + 4) },
    { name: "Reste du Canada", time: "5-7 jours", price: formatPrice(DELIVERY_FEE + 8) },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
      <div className="max-w-3xl mb-14">
        <p className="text-xs uppercase tracking-wider text-pink font-semibold mb-3">
          Livraison & logistique
        </p>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight mb-5">
          Pods chez toi, sans détour.
        </h1>
        <p className="text-lg text-ink/65 leading-relaxed">
          Préparés à Saint-Hyacinthe, expédiés via Postes Canada, livrés où tu veux au Canada. Cueillette gratuite à l'atelier de Montréal.
        </p>
      </div>

      {/* Features */}
      <div className="grid sm:grid-cols-2 gap-6 mb-20">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-3xl bg-white p-7 border border-ink/5 hover:shadow-xl transition-shadow"
          >
            <div
              className="h-12 w-12 grid place-items-center rounded-2xl text-white mb-4"
              style={{ background: f.color }}
            >
              {f.icon}
            </div>
            <h2 className="font-display text-2xl font-semibold mb-2">{f.title}</h2>
            <p className="text-ink/65 leading-relaxed">{f.text}</p>
          </div>
        ))}
      </div>

      {/* Zones table */}
      <div className="rounded-3xl bg-white border border-ink/5 overflow-hidden mb-20">
        <div className="px-7 py-6 border-b border-ink/5 bg-cream-soft">
          <h2 className="font-display text-2xl font-semibold">Zones et délais</h2>
        </div>
        <div className="divide-y divide-ink/5">
          {zones.map((z) => (
            <div
              key={z.name}
              className="px-7 py-5 grid grid-cols-3 gap-4 items-center"
            >
              <p className="font-medium">{z.name}</p>
              <p className="text-ink/65 text-sm">{z.time}</p>
              <p className="text-right font-semibold tabular-nums">{z.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="rounded-3xl bg-ink text-cream p-10 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight mb-3">
          Une question sur ta commande?
        </h2>
        <p className="text-cream/70 mb-8">
          Le service client te répond en moins de quatre heures ouvrables.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="mailto:bonjour@snapsweet.ca"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-cream text-ink px-6 py-3 text-sm font-semibold hover:bg-pink hover:text-cream transition-colors"
          >
            <Mail className="h-4 w-4" /> bonjour@snapsweet.ca
          </a>
          <a
            href="tel:+15145550199"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/20 px-6 py-3 text-sm font-semibold hover:bg-cream hover:text-ink transition-colors"
          >
            <Phone className="h-4 w-4" /> 514 555-0199
          </a>
        </div>
        <Link
          href="/menu"
          className="inline-block mt-8 text-sm text-cream/70 hover:text-pink-light transition-colors"
        >
          ← Retour à la boutique
        </Link>
      </div>
    </div>
  );
}
