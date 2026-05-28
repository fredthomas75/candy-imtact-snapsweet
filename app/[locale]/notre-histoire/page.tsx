import Link from "next/link";
import { notFound } from "next/navigation";
import { Pod } from "@/components/pod";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale } from "@/lib/i18n/config";
import { parseInlineBold } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: `${dict.story.title} — SnapSweet`,
    description: dict.home.story.desc,
  };
}

function Paragraph({ text }: { text: string }) {
  const parts = parseInlineBold(text);
  return (
    <p>
      {parts.map((p, i) =>
        p.bold ? (
          <strong key={i} className="text-ink">
            {p.text}
          </strong>
        ) : (
          <span key={i}>{p.text}</span>
        )
      )}
    </p>
  );
}

export default async function HistoirePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <article className="mx-auto max-w-3xl px-5 sm:px-8 py-16">
      <p className="text-xs uppercase tracking-wider text-pink font-semibold mb-3">
        {dict.story.eyebrow}
      </p>
      <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[0.95] tracking-tight mb-10">
        {dict.story.title}
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
          <Pod emoji="🍫" gradient="radial-gradient(circle at 30% 30%, #ff8a4c 0%, #d946ef 45%, #6d28d9 100%)" size="lg" floating rotate={-10} />
          <Pod emoji="🫐" gradient="radial-gradient(circle at 30% 30%, #ec4899 0%, #f43f5e 50%, #7c3aed 100%)" size="xl" floating rotate={5} />
          <Pod emoji="🍯" gradient="radial-gradient(circle at 30% 30%, #fbbf24 0%, #f97316 50%, #be123c 100%)" size="lg" floating rotate={15} />
        </div>
      </div>

      <div className="space-y-7 text-lg text-ink/75 leading-relaxed">
        {dict.story.paragraphs.map((t, i) => (
          <Paragraph key={i} text={t} />
        ))}

        <h2 className="font-display text-3xl font-semibold tracking-tight pt-8">
          {dict.story.h2a}
        </h2>
        {dict.story.paragraphsA.map((t, i) => (
          <Paragraph key={i} text={t} />
        ))}

        <h2 className="font-display text-3xl font-semibold tracking-tight pt-8">
          {dict.story.h2b}
        </h2>
        {dict.story.paragraphsB.map((t, i) => (
          <Paragraph key={i} text={t} />
        ))}

        <h2 className="font-display text-3xl font-semibold tracking-tight pt-8">
          {dict.story.h2c}
        </h2>
        {dict.story.paragraphsC.map((t, i) => (
          <Paragraph key={i} text={t} />
        ))}
      </div>

      <div className="mt-16 rounded-3xl bg-ink text-cream p-10 text-center">
        <p className="font-display text-3xl sm:text-4xl font-semibold leading-tight mb-6">
          {dict.story.ctaTitle}
        </p>
        <Link
          href={`/${locale}/menu`}
          className="inline-flex items-center gap-2 rounded-full bg-cream text-ink px-7 py-3.5 text-base font-semibold hover:bg-pink hover:text-cream transition-colors"
        >
          {dict.story.ctaButton} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
