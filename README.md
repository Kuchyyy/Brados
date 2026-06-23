# Brados - strona hurtowni elektrycznej

> Kod źródłowy udostępniony w celach rekrutacyjnych.  
> Prezentuje moje podejście do budowy nowoczesnych, responsywnych interfejsów w React.

**Podgląd na żywo:** [brados.pl](https://brados.pl/)

---

## O projekcie

Strona internetowa hurtowni materiałów elektrycznych i teletechnicznych **Brados** we Wrocławiu. Projekt obejmuje landing page, 10 podstron ofertowych, sekcję FAQ oraz interaktywną mapę lokalizacji.

Aplikacja jest w pełni **frontendowa** - bez backendu, bazy danych ani zewnętrznych API wymagających kluczy dostępu. Cała treść jest statyczna i trzymana w kodzie źródłowym.

---

## Stack technologiczny

| Warstwa | Technologie |
|---------|-------------|
| Framework | React 19, TypeScript |
| Build | Vite 7 |
| Routing | React Router 7 |
| Stylowanie | Tailwind CSS 4 |
| Animacje | GSAP (+ ScrollTrigger), Framer Motion / Motion |
| UI | Radix UI, shadcn-style components |
| Karuzele | Embla Carousel |
| Mapa | MapLibre GL + Carto basemaps |
| Ikony | Lucide React |

---

## Struktura projektu

```
my-project/
├── public/
│   ├── photos/          # Zdjęcia hurtowni, producentów, hero
│   ├── fonts/           # Fonty lokalne (Robert)
│   └── brados.webp      # Favicon
├── src/
│   ├── components/
│   │   ├── nav/         # Nawigacja desktop + mobile
│   │   ├── ui/          # Komponenty UI (button, carousel, map, animacje)
│   │   ├── Hero.tsx     # Sekcja powitalna
│   │   ├── Photo.tsx    # Karuzela zdjęć z efektem parallax
│   │   ├── Team1.tsx    # Zespół - handlowcy i magazyn
│   │   ├── About.tsx    # O firmie + statystyki
│   │   ├── LocationMap.tsx
│   │   ├── Trusted.tsx  # Loga partnerów (infinite scroll)
│   │   ├── Faq.tsx
│   │   ├── Subpages.tsx # Routing podstron ofertowych
│   │   └── ...
│   ├── data/
│   │   ├── page.ts      # Treści 10 kategorii oferty
│   │   ├── oferta-nav.ts
│   │   └── parallax-slides.ts
│   ├── hooks/
│   │   ├── useParallaxCarousel.ts
│   │   ├── useHomeScroll.ts
│   │   └── useCenteredHorizontalScroll.ts
│   ├── App.tsx          # Definicja tras
│   └── index.css        # Design tokens, utility classes
└── convert-to-webp/     # Skrypt pomocniczy do konwersji obrazów (poza główną appką)
```

---

## Co zostało zaimplementowane

### Strona główna (`/`)

- **Hero** - nagłówek z animacją słów (`TextAnimate`), CTA (kontakt, mapa, zespół), responsywne zdjęcie (osobne wersje desktop / mobile)
- **Trusted** - automatycznie przewijana taśma log partnerów (Embla Auto Scroll)
- **Zespół** - karty handlowców i magazynu z filtrowaniem, kopiowaniem e-maila, linkami `tel:` i `mailto:`
- **Karuzela zdjęć** - efekt parallax na scroll (GSAP ScrollTrigger), auto-play z obsługą `prefers-reduced-motion`, nawigacja strzałkami i kropkami
- **O nas** - trzy kafelki (partner El-Sigma, misja, statystyki z animowanym diagramem)
- **Mapa** - interaktywna mapa MapLibre z markerem, przełącznik stylu (jasny / ciemny), link do Google Maps
- **CTA + Footer** - wezwanie do działania, nawigacja oferty, dane firmy

### Podstrony ofertowe (`/:slug`)

10 kategorii produktowych (aparatura modułowa, kable, oświetlenie itd.) z opisem, listą produktów i logotypami producentów. Routing dynamiczny na podstawie `slug`.

### FAQ (`/faq`)

Rozwijane pytania i odpowiedzi (accordion) dotyczące zamówień, płatności, dostaw i współpracy B2B.

### Nawigacja i UX

- Responsywna nawigacja: desktop (mega menu oferty) + mobile (sheet)
- **Scroll loader** - animacja powrotu na stronę główną (GSAP timeline)
- **ScrollToTop** przy zmianie trasy
- SEO: meta tagi, Open Graph, Twitter Cards, JSON-LD (`LocalBusiness`) w `index.html`
- Dostępność: `aria-label`, obsługa klawiatury w karuzelach, `prefers-reduced-motion`

### Optymalizacja

- Obrazy w formacie **WebP**
- Lazy loading zdjęć poza hero


## Autor

**Kuchy** - frontend / UI

Strona zaprojektowana i zaimplementowana jako projekt komercyjny dla Brados sp. z o.o.
