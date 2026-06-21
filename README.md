# Alelyvers - Craft Cost Calculator

<div align="center">

![Logo](assets/images/logo%20Alelyvers.png)

</div>

---

> A professional pricing calculator for artisan plaster crafts, designed for Mexican artisans. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step, no dependencies.

---

## 🎯 Project Overview

Alelyvers is a comprehensive pricing tool created for a Mexican artisan who specializes in handcrafted plaster pieces (yeso artesanal), floral arrangements, and decorative candles. The application calculates accurate selling prices by considering:

- **Material costs** — Plaster weight, wax type, sealing, and paint
- **Labor overhead** — Time-based rates differentiated by sales zone (pueblo vs ciudad)
- **Profit margins** — Channel-specific margins (direct sale, bazar, wholesale)
- **Urgency surcharges** — Express delivery pricing
- **Combo pricing** — Bundle deals with wax figures and assembly fees
- **Candle costing** — Separate model for wax, scent, wick, and layers

The app runs entirely in the browser, persists data to localStorage, and can be installed as a PWA on mobile devices.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                  PRESENTATION LAYER (Frontend)          │
│         Vanilla HTML5 + CSS3 (ES Modules)               │
│     Mobile-first | Dark Mode | PWA | Print-ready        │
└─────────────────────────┬───────────────────────────────┘
                          │
         ┌────────────────┼────────────────┐
         ▼                ▼                ▼
   ┌───────────┐    ┌─────────────┐  ┌──────────────┐
   │ Sections  │    │  UI Modules │  │   Store      │
   │(calculator│    │  (per tab)  │  │  (state.js)  │
   │ catalog..)│    │             │  │              │
   └───────────┘    └─────────────┘  └──────────────┘
         │                │                │
         └────────────────┼────────────────┘
                          │
            ┌─────────────▼──────────────┐
            │      localStorage          │
            │  (catalog, settings,       │
            │   history, quotes)         │
            └────────────────────────────┘
```

---

## 🛠️ Technologies Used

### Core
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Infrastructure
![Vercel](https://img.shields.io/badge/Vercel-Deployment-black?style=for-the-badge&logo=vercel)
![PWA](https://img.shields.io/badge/PWA-Progressive%20Web%20App-5A0FC8?style=for-the-badge&logo=pwa)
![Git](https://img.shields.io/badge/Git-Version%20Control-F05032?style=for-the-badge&logo=git)

---

## ✨ Key Features

### Pricing Calculator
- **Piece Selector** — Searchable dropdown with 17 base pieces, auto-fills weight/size/time
- **Plaster Types** — Yeso del Tigre, Yeso Redimix, Yeso AKSi with per-gram pricing
- **Sales Zone** — Local ($1.16/min) vs City ($1.33/min) labor rates
- **Sales Channel** — Direct sale (55%), Bazar (45%), Wholesale various (15-20%)
- **Extras** — Color, fine detail, sealant with size-based costs
- **Adjustments** — Demolding difficulty and effort extra fees
- **Urgency Surcharges** — 5+ days (0%), 3 days (+20%), 1-2 days (+30%)
- **Price Rounding** — Always rounds up to nearest $5 MXN

### Combo Builder
- **Piece + Wax Combinations** — Mix plaster pieces with wax flower figures
- **Real-time Totals** — Automatic cost summation with $3 assembly fee
- **Reference Pricing** — Pre-calculated combos from original documentation

### Candle Calculator
- **Wax & Scent Costs** — Per-gram pricing for paraffin and aroma
- **Layer System** — Multi-layer candles with cost multiplier
- **Decorative Extras** — Color, wick, and decoration labor

### Quote Generator
- **History Integration** — Add items directly from calculation history
- **Multi-item Quotes** — Combine pieces, combos, and candles
- **WhatsApp Export** — Formatted text ready to send
- **Copy to Clipboard** — One-click text copying
- **Print Layout** — Professional print-optimized card design

### Catalog Management
- **17 Base Pieces** — Pre-loaded with weight, size, and time data
- **CRUD Operations** — Create, edit, delete custom pieces
- **Search & Filter** — Fast fuzzy search by name

### Settings & Configuration
- **Plaster Prices** — Update per-gram costs
- **Labor Rates** — Zone-based minute rates
- **Extras Pricing** — Color, sealant, detail by size
- **Reset to Defaults** — One-click factory reset

### User Experience
- **Dark Mode** — Workshop-friendly low-light theme
- **Mobile-first** — Touch-optimized, works on any phone
- **PWA Install** — Add to home screen, works offline
- **Persistent Data** — All settings and history saved locally

---

## 📊 Project Structure

```
craft-cost-calculator/
├── index.html                 # Main entry point
├── manifest.json              # PWA manifest
├── sw.js                      # Service worker for offline
├── assets/
│   └── images/
│       ├── logo Alelyvers.png # Brand logo
│       ├── favicon.svg        # SVG favicon
│       ├── icon-192.png       # PWA icon 192x192
│       └── icon-512.png       # PWA icon 512x512
├── css/
│   ├── reset.css              # CSS reset
│   ├── variables.css          # Design tokens (colors, fonts, spacing)
│   ├── main.css               # Base layout and utilities
│   └── components/            # Section-specific styles
│       ├── header.css
│       ├── calculator.css
│       ├── catalog.css
│       ├── combo-builder.css
│       ├── candles.css
│       ├── quote.css
│       ├── settings.css
│       ├── history.css
│       └── footer.css
└── js/
    ├── app.js                 # Entry point, store, navigation
    ├── state.js               # Reactive state management
    ├── storage.js             # localStorage persistence layer
    ├── calculator.js          # Pure calculation engine
    ├── catalog.js             # Master data (pieces, wax, prices)
    ├── utils/
    │   ├── format.js          # MXN currency, dates, percentages
    │   ├── export.js          # CSV and text export utilities
    │   └── debounce.js        # Input debouncing
    └── ui/
        ├── renderer.js        # DOM utilities (el, clear, qs, on)
        ├── calculator-ui.js   # Piece calculator interface
        ├── catalog-ui.js      # Piece catalog CRUD
        ├── combo-ui.js        # Combo builder interface
        ├── candles-ui.js      # Candle calculator interface
        ├── quote-ui.js        # Quote generator interface
        ├── history-ui.js      # Calculation history
        ├── settings-ui.js     # App configuration
        └── icons.js           # SVG icon components


```

---

## 🎨 Interface & UX

### Main Sections

**Calculate (Calcular)**
- Piece selector with live search
- Plaster type radio cards with price per gram
- Zone and channel dropdowns
- Toggle switches for color, detail, sealant
- Demolding difficulty radio group
- Effort slider ($0-$10 extra)
- Delivery urgency selector
- Animated result card with price, breakdown toggle
- Save to history button

**Catalog**
- 2-column grid on mobile, 3-4 on desktop
- Color-coded size badges (chica=blue, mediana=amber, grande=pink)
- Inline edit and delete with confirmation
- Floating "+" button for new pieces
- Search bar with real-time filtering

**Combos**
- Split panel: catalog browser + current combo builder
- Add/remove pieces and wax figures
- Adjust quantities per item
- Real-time subtotals and grand total
- Save with custom name

**Candles**
- Weight inputs for wax and scent
- Base minutes and layer count
- Color and wick toggles
- Itemized cost breakdown
- Reference wax figure dropdown

**Quote (Cotizar)**
- History picker with type badges
- Current calculation adder
- Editable quantity table
- Preview card with business header
- Copy / WhatsApp / Print actions
- Save quote functionality

**History**
- Chronological list with type filtering
- Channel badges, date, price display
- Reuse button (loads params into calculator)
- Quote button (sends to quote builder)
- Delete with swipe or button
- CSV export
- Clear all with confirmation

**Settings**
- Plaster price cards (editable per-gram)
- Zone labor rates
- Extras pricing by size
- Reset to defaults with confirmation

---

## 🔐 Technical Highlights

### Architecture & Patterns
- **Module Pattern** — ES6 modules, no bundler required
- **Observer Pattern** — Simple reactive state with subscribe/dispatch
- **Event Delegation** — Efficient click handling on dynamic content
- **localStorage Abstraction** — Robust storage with quota handling

### Calculation Engine
- **Pure Functions** — No side effects, easy to test
- **Size-based Pricing** — Chica/Mediana/Grande classification drives costs
- **Margin on Price** — Formula: `price = cost / (1 - margin)`
- **$5 Rounding** — `Math.ceil(price / 5) * 5`

### Data Persistence
- **Catalog** — User-customizable piece database
- **Settings** — Plaster prices, labor rates, extras
- **History** — Last 50 calculations with full params
- **Quotes** — Saved quote documents

### PWA Features
- **Service Worker** — Offline cache strategy
- **Manifest** — Installable on iOS/Android
- **Theme Color** — Branded browser chrome

---

## 💡 Business Logic

### Cost Formula (Piece)
```
Costo_Base = (peso_g × precio_yeso_g)
           + 5.00 (fixed costs: gloves, mold wear, water, electricity)
           + (minutos × tarifa_zona)
           + (conColor ? color[tamano] : 0)
           + (conDetalle ? detalle[tamano] : 0)
           + (conSellador ? sellador[tamano] : 0)
           + ajuste_desmolde
           + ajuste_esfuerzo

Costo_Ajustado = Costo_Base × (1 + recargo_urgencia)
Precio_Final = Math.ceil(Costo_Ajustado / (1 - margen) / 5) * 5
```

### Combo Formula
```
Costo_Combo = Σ(costo_piezas) + Σ(costo_ceras) + 3.00 (assembly)
Precio_Combo = Costo_Combo / (1 - margen)
```

### Candle Formula
```
Costo_Vela = (peso_cera × precio_g) + (peso_aroma × precio_g)
           + 0.50 (color) + (minutos × tarifa) + 5.00 (fixed)
           + 1.00 (wick)

Si múltiples capas: Costo_Vela × capas
```

---

## 📸 Screenshots

> Screenshots coming soon — the app in action on mobile and desktop

---

## 👨‍💻 About This Project

**Developer**: Samuel Sánchez Guzmán  
**Client**: Alelyvers — Mexico  
**Type**: Web Application (PWA)  
**Status**: Production  
**Version**: 1.0.0  
**Last Updated**: June 2026  

---

**© 2026 Alelyvers - Craft Cost Calculator. All rights reserved.**