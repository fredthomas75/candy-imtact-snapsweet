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
| `STRIPE_SECRET_KEY` | Optionnel | Clé secrète Stripe (`sk_test_...` ou `sk_live_...`). Si absente, l'API renvoie une réponse simulée. |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Optionnel | Clé publique Stripe (`pk_test_...` ou `pk_live_...`). |
| `STRIPE_WEBHOOK_SECRET` | Pour webhook | Secret de signature webhook (`whsec_...`). Fourni par `stripe listen` ou le dashboard. |
| `NEXT_PUBLIC_SITE_URL` | Optionnel | URL canonique du site. Fallback automatique via `VERCEL_URL`. |

## Sécurité paiement

- ✅ Prix résolus **serveur-side** dans `app/api/checkout/route.ts` — jamais trust le client
- ✅ Quantité clampée `[1, 50]`
- ✅ `idempotencyKey` Stripe basé sur hash SHA-256 du payload
- ✅ `payment_method_types` auto — Stripe choisit cartes / Apple Pay / Google Pay selon le dashboard
- ✅ Webhook signature vérifiée via `constructEventAsync()` avant tout traitement
- ✅ Locale `fr-CA`, currency `CAD`

## Tester le paiement Stripe en local

1. Mets tes clés de test dans `.env.local` (voir `.env.example`).
2. Dans un terminal séparé, forward les webhooks vers ton dev server :

   ```bash
   stripe login
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

   Le CLI affiche un `whsec_...` — colle-le dans `STRIPE_WEBHOOK_SECRET` de `.env.local`.

3. Relance `npm run dev` et passe une commande avec une carte de test :

   | Carte | Numéro | Résultat |
   |---|---|---|
   | Visa OK | `4242 4242 4242 4242` | Paiement réussi |
   | Visa refus | `4000 0000 0000 0002` | Refusée |
   | 3DS obligatoire | `4000 0027 6000 3184` | Demande authentification |

   N'importe quelle date future · CVC à 3 chiffres · code postal `H2X 1Y4`.

4. Tu verras dans les logs `[stripe-webhook] ✅ checkout.session.completed`.

## Déploiement Vercel

```bash
vercel link
vercel deploy           # preview
vercel deploy --prod    # production (après validation)
```

Pour configurer les variables :

```bash
vercel env add STRIPE_SECRET_KEY preview
vercel env add STRIPE_SECRET_KEY production
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY preview production
vercel env add STRIPE_WEBHOOK_SECRET production
```

Puis dashboard.stripe.com → Developers → Webhooks → **Add endpoint** sur
`https://<ton-domaine>/api/webhooks/stripe`, sélectionner les événements :
`checkout.session.completed`, `checkout.session.async_payment_succeeded`,
`checkout.session.async_payment_failed`, `checkout.session.expired`,
`payment_intent.payment_failed`.

## Prochaines étapes

- [x] ~~Brancher un webhook Stripe~~ ✅ Fait
- [ ] Persister les commandes (DB) au lieu de juste logger
- [ ] Brancher Resend ou Klaviyo pour l'email de confirmation
- [ ] Ajouter Vercel Blob ou Cloudinary pour de vraies photos de pods
- [ ] Configurer Vercel BotID sur `/api/checkout`
- [ ] Domaine custom snapsweet.ca

---

🍬 Snap into sweetness. Né d'un atelier d'IA chez Talsom, mai 2026.
