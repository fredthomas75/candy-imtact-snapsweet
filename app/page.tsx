import Link from "next/link";
import { Pod } from "@/components/pod";
import ProductCard from "@/components/product-card";
import { products } from "@/lib/products";
import { ArrowRight, Sparkles, Zap, HeartHandshake } from "lucide-react";

export default function Home() {
  const featured = [
    products.find((p) => p.slug === "chocolate-caramel")!,
    products.find((p) => p.slug === "berry-burst")!,
    products.find((p) => p.slug === "salted-toffee")!,
    products.find((p) => p.slug === "matcha-mochi")!,
  ];

  const marqueeItems = [
    "Snap into sweetness",
    "40-60 cal par pod",
    "Pré-portionné, jamais regretté",
    "Conçu au Québec",
    "Sans culpabilité",
    "#SnapIntoSweetness",
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Decorative blobs */}
        <div
          aria-hidden
          className="absolute -top-32 -left-32 h-[520px] w-[520px] opacity-50 animate-morph blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #ec4899 0%, #f9a8d4 40%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="absolute -top-20 -right-32 h-[480px] w-[480px] opacity-50 animate-morph blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #facc15 0%, #fb923c 40%, transparent 70%)",
            animationDelay: "3s",
          }}
        />
        <div
          aria-hidden
          className="absolute top-60 left-1/3 h-[420px] w-[420px] opacity-40 animate-morph blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #06b6d4 0%, #a855f7 40%, transparent 70%)",
            animationDelay: "6s",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-12 pb-20 sm:pt-20 sm:pb-32">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink/70 mb-6 border border-ink/5">
                <Sparkles className="h-3.5 w-3.5 text-pink" />
                Nouveau · Pilote Québec Q3 2026
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[0.95] tracking-tight">
                Snap into{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(120deg, #ec4899 0%, #fb923c 30%, #a855f7 65%, #06b6d4 100%)",
                  }}
                >
                  sweetness.
                </span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-ink/70 max-w-xl leading-relaxed">
                Des pods de bonbons <strong className="text-ink">40 à 60 calories</strong>, pré-portionnés à la main. Indulgence assumée — la portion s'arrête avant la culpabilité.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/menu"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ink text-cream px-7 py-3.5 text-base font-semibold hover:bg-pink transition-all hover:-translate-y-0.5 shadow-lg shadow-ink/20"
                >
                  Explorer la boutique
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/notre-histoire"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-ink/10 px-7 py-3.5 text-base font-semibold hover:border-pink hover:text-pink transition-colors"
                >
                  Notre histoire
                </Link>
              </div>

              <dl className="mt-12 grid grid-cols-3 gap-4 max-w-md">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-ink/50 font-semibold mb-1">Par pod</dt>
                  <dd className="font-display text-2xl font-semibold">40-60<span className="text-sm text-ink/50">cal</span></dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-ink/50 font-semibold mb-1">Saveurs</dt>
                  <dd className="font-display text-2xl font-semibold">{products.length}<span className="text-sm text-ink/50">pods</span></dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-ink/50 font-semibold mb-1">Origine</dt>
                  <dd className="font-display text-2xl font-semibold">QC<span className="text-sm text-ink/50">🍁</span></dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-5 relative h-[500px] hidden lg:block">
              <div className="absolute top-0 right-20">
                <Pod
                  emoji="🍫"
                  gradient="radial-gradient(circle at 30% 30%, #ff8a4c 0%, #d946ef 45%, #6d28d9 100%)"
                  size="xl"
                  floating
                  rotate={-8}
                />
              </div>
              <div className="absolute top-40 right-0">
                <Pod
                  emoji="🫐"
                  gradient="radial-gradient(circle at 30% 30%, #ec4899 0%, #f43f5e 50%, #7c3aed 100%)"
                  size="lg"
                  floating
                  rotate={12}
                />
              </div>
              <div className="absolute bottom-20 right-32">
                <Pod
                  emoji="🍯"
                  gradient="radial-gradient(circle at 30% 30%, #fbbf24 0%, #f97316 50%, #be123c 100%)"
                  size="lg"
                  floating
                  rotate={-15}
                />
              </div>
              <div className="absolute bottom-0 right-8">
                <Pod
                  emoji="🍵"
                  gradient="radial-gradient(circle at 30% 30%, #4ade80 0%, #06b6d4 55%, #6366f1 100%)"
                  size="md"
                  floating
                  rotate={6}
                />
              </div>
              <div className="absolute top-20 right-0">
                <Pod
                  emoji="🍋"
                  gradient="radial-gradient(circle at 30% 30%, #fde047 0%, #fb923c 50%, #ef4444 100%)"
                  size="sm"
                  floating
                  rotate={20}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="border-y border-ink/10 bg-ink text-cream overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap py-4">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="font-display text-2xl mx-8 inline-flex items-center gap-8">
                {item}
                <span className="text-pink">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3 PILLARS */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="h-6 w-6" />,
              title: "Smart portions",
              text: "Chaque pod livre exactement 40 à 60 calories. La portion est décidée pour toi — plus de moment où le sachet glisse.",
              color: "#ec4899",
            },
            {
              icon: <Sparkles className="h-6 w-6" />,
              title: "Zéro friction",
              text: "Format poche, sac, tiroir de bureau. Calories affichées en grand. Tu décides en deux secondes, sans calcul mental.",
              color: "#fb923c",
            },
            {
              icon: <HeartHandshake className="h-6 w-6" />,
              title: "Producteurs québécois",
              text: "Caramel à Lévis, chocolat à Sherbrooke, mochi au Mile End. Chaîne courte, chaque pod scellé fraîcheur.",
              color: "#a855f7",
            },
          ].map((pillar) => (
            <div key={pillar.title} className="rounded-3xl bg-white p-8 border border-ink/5 hover:shadow-xl transition-shadow">
              <div
                className="h-12 w-12 grid place-items-center rounded-2xl text-white mb-5"
                style={{ background: pillar.color }}
              >
                {pillar.icon}
              </div>
              <h3 className="font-display text-2xl font-semibold mb-3">{pillar.title}</h3>
              <p className="text-ink/65 leading-relaxed">{pillar.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-24">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-pink font-semibold mb-2">
              Pods vedettes
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
              Les quatre à goûter en premier.
            </h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:text-pink transition-colors"
          >
            Voir tous les pods <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* STORY BAND */}
      <section className="relative overflow-hidden bg-ink text-cream py-24">
        <div
          aria-hidden
          className="absolute top-0 right-0 h-[400px] w-[400px] opacity-30 animate-morph blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #ec4899 0%, #a855f7 40%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8 text-center">
          <p className="text-xs uppercase tracking-wider text-pink-light font-semibold mb-4">
            Snapsweet origin story
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
            Né d'un atelier d'IA chez Talsom, en mai 2026.
          </h2>
          <p className="text-lg text-cream/75 leading-relaxed max-w-2xl mx-auto">
            Le constat : 72 % des gens achètent des bonbons chaque mois, et presque tous ressentent de la culpabilité au moment d'ouvrir le sachet. Le coupable n'est pas le sucre — c'est la portion qu'on ne contrôle plus. SnapSweet décide à ta place : un pod, une bouchée bien dosée, point.
          </p>
          <div className="mt-10">
            <Link
              href="/notre-histoire"
              className="inline-flex items-center gap-2 rounded-full bg-cream text-ink px-7 py-3.5 text-base font-semibold hover:bg-pink hover:text-cream transition-colors"
            >
              Lire l'histoire complète <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
