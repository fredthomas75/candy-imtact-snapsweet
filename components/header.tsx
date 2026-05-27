import Link from "next/link";
import CartButton from "./cart-button";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-cream/85 backdrop-blur-md border-b border-ink/5">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span
            aria-hidden
            className="grid place-items-center h-9 w-9 rounded-full text-xl shadow-md transition-transform group-hover:scale-110 group-hover:rotate-12"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, #fde047 0%, #ec4899 50%, #7c3aed 100%)",
            }}
          >
            🍬
          </span>
          <span className="font-display text-2xl font-semibold tracking-tight">
            SnapSweet
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/menu" className="hover:text-pink transition-colors">
            Boutique
          </Link>
          <Link href="/notre-histoire" className="hover:text-pink transition-colors">
            Notre histoire
          </Link>
          <Link href="/livraison" className="hover:text-pink transition-colors">
            Livraison
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/menu"
            className="md:hidden text-sm font-medium hover:text-pink"
          >
            Boutique
          </Link>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
