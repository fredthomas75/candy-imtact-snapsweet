import Link from "next/link";
import { Pod } from "@/components/pod";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Notre histoire — SnapSweet",
  description: "Comment un atelier d'IA chez Talsom a donné naissance à SnapSweet.",
};

export default function HistoirePage() {
  return (
    <article className="mx-auto max-w-3xl px-5 sm:px-8 py-16">
      <p className="text-xs uppercase tracking-wider text-pink font-semibold mb-3">
        Notre histoire
      </p>
      <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[0.95] tracking-tight mb-10">
        Tout a commencé par une question gênante.
      </h1>

      <div className="relative my-16 grid place-items-center">
        <div className="absolute inset-0 grid place-items-center">
          <div
            aria-hidden
            className="h-80 w-80 animate-morph blur-3xl opacity-50"
            style={{
              background:
                "radial-gradient(circle, #ec4899 0%, #a855f7 50%, transparent 70%)",
            }}
          />
        </div>
        <div className="relative flex items-center gap-6">
          <Pod
            emoji="🍫"
            gradient="radial-gradient(circle at 30% 30%, #ff8a4c 0%, #d946ef 45%, #6d28d9 100%)"
            size="lg"
            floating
            rotate={-10}
          />
          <Pod
            emoji="🫐"
            gradient="radial-gradient(circle at 30% 30%, #ec4899 0%, #f43f5e 50%, #7c3aed 100%)"
            size="xl"
            floating
            rotate={5}
          />
          <Pod
            emoji="🍯"
            gradient="radial-gradient(circle at 30% 30%, #fbbf24 0%, #f97316 50%, #be123c 100%)"
            size="lg"
            floating
            rotate={15}
          />
        </div>
      </div>

      <div className="space-y-7 text-lg text-ink/75 leading-relaxed">
        <p>
          <strong className="text-ink">Mai 2026, atelier d'IA chez Talsom.</strong> L'exercice est simple : trouvez un produit pour lequel le marché crie, mais que personne n'offre vraiment. On feuillette des rapports McKinsey, on lit des études Georgetown. Une statistique nous arrête net : <strong className="text-ink">72 % des gens achètent des bonbons chaque mois, et 50 % d'entre eux voudraient pouvoir manger moins gros, sans renoncer.</strong>
        </p>
        <p>
          Le problème, ce n'est pas le sucre. C'est le sachet de 250 g qui s'ouvre sur le canapé du dimanche soir. La portion qu'on ne décide plus. La main qui revient toute seule. McKinsey appelle ça le mindless snacking — Georgetown identifie le portion control comme l'intervention numéro un pour rééquilibrer plaisir et bien-être.
        </p>

        <h2 className="font-display text-3xl font-semibold tracking-tight pt-8">
          Snap. Une décision. Pas une crise existentielle.
        </h2>
        <p>
          SnapSweet, c'est l'idée toute simple : <strong className="text-ink">décider la portion avant de l'ouvrir.</strong> Chaque pod contient 40 à 60 calories. Tu n'as plus à arbitrer entre « un de plus » et « j'arrête ». Le pod fait le travail. Tu fais l'expérience.
        </p>
        <p>
          On a passé deux mois à visiter des chocolateries, gummeries et confiseries au Québec. Lévis, Sherbrooke, le Mile End. On a sélectionné dix producteurs partenaires capables de livrer la qualité d'un atelier à l'échelle d'une boutique en ligne.
        </p>

        <h2 className="font-display text-3xl font-semibold tracking-tight pt-8">
          Pourquoi le Québec en premier?
        </h2>
        <p>
          Parce que c'est chez nous, et parce que le marché québécois consomme en moyenne <strong className="text-ink">73 $ de chocolat par foyer par année</strong> — le plus haut taux au Canada. Parce que les bonbons en format impulsion représentent 37 % des ventes en dépanneur. Parce qu'un pod conçu, fabriqué et expédié dans un rayon de 300 km laisse une empreinte carbone qu'on assume.
        </p>

        <h2 className="font-display text-3xl font-semibold tracking-tight pt-8">
          Et après?
        </h2>
        <p>
          Q3 2026 : lancement Quebec (10 saveurs, livraison D2C, 50 dépanneurs partenaires). Q1 2027 : Montréal, Toronto, Vancouver. Q3 2027 : New York, Vermont, Maine. 2028 : éditions fonctionnelles (protéine, probiotique, sans sucre). On va vite mais on garde l'obsession originale : <strong className="text-ink">une portion bien dosée, un goût qui justifie le pod.</strong>
        </p>
      </div>

      <div className="mt-16 rounded-3xl bg-ink text-cream p-10 text-center">
        <p className="font-display text-3xl sm:text-4xl font-semibold leading-tight mb-6">
          Prête, prêt à snapper?
        </p>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 rounded-full bg-cream text-ink px-7 py-3.5 text-base font-semibold hover:bg-pink hover:text-cream transition-colors"
        >
          Explorer les pods <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
