# SnapSweet 🍬

> Guilt-Free Candy, Perfectly Portioned. Pods de bonbons 40-60 calories pré-portionnés, conçus au Québec.

Boutique en ligne transactionnelle pour la marque **SnapSweet** — pods de bonbons individuels (chocolat, gummies, caramel, fruité, éditions limitées) en livraison Canada-wide.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** · **TypeScript** · **Tailwind v4**
- **Zustand** (panier persistant)
- **Stripe Checkout** (paiement) avec fallback simulé
- **Vercel** (hébergement, Fluid Compute par défaut)
- Police : **Fraunces** (display) + **Inter** (sans)

## Démarrer en local

```bash
npm install
cp .env.example .env.local
# remplis STRIPE_SECRET_KEY (optionnel — sinon la commande est simulée)
npm run dev
```

→ [http://localhost:3000](http://localhost:3000)

## Structure

```
app/
├── page.tsx                  # Home — hero, marquee, pillars, featured, story
├── menu/                     # Boutique avec filtres catégories
├── produit/[slug]/           # Fiche produit (SSG via generateStaticParams)
├── panier/                   # Panier client
├── commande/                 # Tunnel de checkout
│   └── success/              # Confirmation post-Stripe
├── notre-histoire/           # Récit de marque
├── livraison/                # Zones & délais
└── api/checkout/route.ts     # POST → Stripe (prix server-side, idempotency)

components/
├── pod.tsx                   # Visuel rond gradient signature
├── header.tsx                # Sticky nav
├── cart-button.tsx           # Badge panier (hydratation-safe)
├── footer.tsx                # 4 colonnes
├── product-card.tsx          # Card boutique
├── add-to-cart.tsx           # Stepper + bouton
├── category-filter.tsx       # Pills + grille
└── clear-cart-on-mount.tsx   # Clear post-checkout

lib/
├── utils.ts                  # cn() + formatPrice()
├── shipping.ts               # Frais et seuils (serveur + client)
├── products.ts               # 10 pods avec specs honnêtes
├── cart.ts                   # Zustand store + persist
└── stripe.ts                 # Client Stripe + URL fallback chain
```

## Variables d'environnement

| Variable | Requis | Description |
|---|---|---|
| `STRIPE_SECRET_KEY` | Optionnel | Clé secrète Stripe. Si absente, l'API renvoie une réponse simulée. |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Optionnel | Clé publique Stripe. |
| `NEXT_PUBLIC_SITE_URL` | Optionnel | URL canonique du site. Fallback automatique via `VERCEL_URL`. |

## Sécurité paiement

- ✅ Prix résolus **serveur-side** dans `app/api/checkout/route.ts` — jamais trust le client
- ✅ Quantité clampée `[1, 50]`
- ✅ `idempotencyKey` Stripe basé sur hash SHA-256 du payload
- ✅ `automatic_payment_methods: { enabled: true }` — Stripe choisit cartes / Apple Pay / Google Pay
- ✅ Locale `fr-CA`, currency `CAD`

## Déploiement Vercel

```bash
vercel link
vercel deploy           # preview
vercel deploy --prod    # production (après validation)
```

Configure ensuite dans **Vercel → Settings → Environment Variables** :
- `STRIPE_SECRET_KEY` (production)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SITE_URL` (ton domaine custom)

## Prochaines étapes

- [ ] Brancher un webhook Stripe (`/api/webhooks/stripe`) pour le fulfillment réel
- [ ] Ajouter Vercel Blob ou Cloudinary pour de vraies photos de pods
- [ ] Brancher Klaviyo ou Resend pour l'email transactionnel
- [ ] Configurer Vercel BotID sur `/api/checkout`
- [ ] Domaine custom snapsweet.ca

---

🍬 Snap into sweetness. Né d'un atelier d'IA chez Talsom, mai 2026.
