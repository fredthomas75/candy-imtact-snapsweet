import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span
              aria-hidden
              className="grid place-items-center h-10 w-10 rounded-full text-2xl"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, #fde047 0%, #ec4899 50%, #7c3aed 100%)",
              }}
            >
              🍬
            </span>
            <span className="font-display text-2xl">SnapSweet</span>
          </div>
          <p className="text-cream/70 text-sm leading-relaxed">
            Pods de bonbons 40-60 calories pré-portionnés. Snap into sweetness — indulgence sans culpabilité, conçue au Québec.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg mb-4">Boutique</h3>
          <ul className="space-y-2 text-sm text-cream/70">
            <li><Link href="/menu" className="hover:text-pink-light">Tous les pods</Link></li>
            <li><Link href="/menu?cat=chocolat" className="hover:text-pink-light">Chocolat</Link></li>
            <li><Link href="/menu?cat=gummies" className="hover:text-pink-light">Gummies</Link></li>
            <li><Link href="/menu?cat=edition-limitee" className="hover:text-pink-light">Éditions limitées</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg mb-4">Maison</h3>
          <ul className="space-y-2 text-sm text-cream/70">
            <li><Link href="/notre-histoire" className="hover:text-pink-light">Notre histoire</Link></li>
            <li><Link href="/livraison" className="hover:text-pink-light">Livraison</Link></li>
            <li><a href="mailto:bonjour@snapsweet.ca" className="hover:text-pink-light">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg mb-4">Atelier</h3>
          <p className="text-sm text-cream/70 leading-relaxed">
            5520 rue Saint-Patrick<br />
            Sud-Ouest, Montréal<br />
            Du lundi au vendredi<br />
            10h — 18h
          </p>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/50">
          <p>© 2026 SnapSweet — Tous droits réservés.</p>
          <p>#SnapIntoSweetness · Né d'un atelier d'IA chez Talsom.</p>
        </div>
      </div>
    </footer>
  );
}
