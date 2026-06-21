# Alelyvers - Calculadora de Costos Artesanales

<div align="center">

| [🇬🇧 English](README.md) | [🇪🇸 Español](README_ES.md) |
|:---:|:---:|

</div>

---

![Logo](assets/images/logo%20Alelyvers.png)

---

> Calculadora profesional de precios para artesanías en yeso, diseñada para artesanos mexicanos. Construida con HTML, CSS y JavaScript vanilla — sin frameworks, sin pasos de build, sin dependencias.

---

## 🎯 Descripción del Proyecto

Alelyvers es una herramienta completa de precios creada para una artesana mexicana especializada en piezas de yeso artesanal (yeso artesanal), arreglos florales y velas decorativas. La aplicación calcula precios de venta precisos considerando:

- **Costos de materiales** — Peso del yeso, tipo de cera, sellador y pintura
- **Mano de obra** — Tarifas por minuto diferenciadas por zona de venta (pueblo vs ciudad)
- **Márgenes de ganancia** — Márgenes específicos por canal (venta directa, bazar, mayoreo)
- **Recargos por urgencia** — Precios para entregas express
- **Precio de combos** — Paquetes con figuras de cera y tarifa de armado
- **Costo de velas** — Modelo separado para cera, aroma, pabilo y capas

La app funciona completamente en el navegador, guarda datos en localStorage, y puede instalarse como PWA en dispositivos móviles.

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                  CAPA DE PRESENTACIÓN (Frontend)        │
│         HTML5 + CSS3 vanilla (ES Modules)               │
│     Mobile-first | Dark Mode | PWA | Lista para         │
│                    imprimir                             │
└─────────────────────────┬───────────────────────────────┘
                          │
         ┌────────────────┼────────────────┐
         ▼                ▼                ▼
   ┌───────────┐    ┌─────────────┐  ┌──────────────┐
   │Secciones  │    │ Módulos UI  │  │    Store     │
   │(calculator│    │  (por tab)  │  │  (state.js)  │
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

## 🛠️ Tecnologías Usadas

### Core
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Infraestructura
![Vercel](https://img.shields.io/badge/Vercel-Deployment-black?style=for-the-badge&logo=vercel)
![PWA](https://img.shields.io/badge/PWA-Progressive%20Web%20App-5A0FC8?style=for-the-badge&logo=pwa)
![Git](https://img.shields.io/badge/Git-Version%20Control-F05032?style=for-the-badge&logo=git)

---

## ✨ Características Principales

### Calculadora de Precios
- **Selector de Piezas** — Dropdown con búsqueda de 17 piezas base, autocompleta peso/tamaño/tiempo
- **Tipos de Yeso** — Yeso del Tigre, Yeso Redimix, Yeso AKSi con precio por gramo
- **Zona de Venta** — Local ($1.16/min) vs Ciudad ($1.33/min)
- **Canal de Venta** — Venta directa (55%), Bazar (45%), Mayoreo varias (15-20%)
- **Extras** — Color, detalle fino, sellador con costos por tamaño
- **Ajustes** — Dificultad de desmolde y esfuerzo extra
- **Recargos por Urgencia** — 5+ días (0%), 3 días (+20%), 1-2 días (+30%)
- **Redondeo de Precio** — Siempre redondea hacia arriba al siguiente $5 MXN

### Constructor de Combos
- **Combinaciones de Piezas + Cera** — Mezcla piezas de yeso con figuras de cera floral
- **Totales en Tiempo Real** — Suma automática de costos con tarifa de armado de $3
- **Precios de Referencia** — Combos pre-calculados de la documentación original

### Calculadora de Velas
- **Cera y Aroma** — Precio por gramo para parafina y aroma
- **Sistema de Capas** — Velas multicapas con multiplicador de costo
- **Extras Decorativos** — Color, pabilo y mano de obra de decoración

### Generador de Cotizaciones
- **Integración con Historial** — Agrega items directamente desde el historial de cálculos
- **Cotizaciones Multi-item** — Combina piezas, combos y velas
- **Exportación WhatsApp** — Texto formateado listo para enviar
- **Copiar al Portapapeles** — Un clic para copiar
- **Diseño para Imprimir** — Tarjeta profesional optimizada para impresión

### Gestión de Catálogo
- **17 Piezas Base** — Pre-cargadas con peso, tamaño y tiempo
- **Operaciones CRUD** — Crear, editar, eliminar piezas personalizadas
- **Búsqueda y Filtro** — Búsqueda rápida por nombre

### Configuración
- **Precios del Yeso** — Actualizar costos por gramo
- **Tarifas de Mano de Obra** — Tarifas por minuto por zona
- **Precios de Extras** — Color, sellador, detalle por tamaño
- **Restablecer Defaults** — Un clic para reiniciar a valores de fábrica

### Experiencia de Usuario
- **Modo Oscuro** — Amigable para taller con poca luz
- **Mobile-first** — Optimizado para touch, funciona en cualquier celular
- **PWA Instalable** — Agregar a pantalla de inicio, funciona offline
- **Datos Persistentes** — Toda configuración e historial se guardan localmente

---

## 📊 Estructura del Proyecto

```
craft-cost-calculator/
├── index.html                 # Punto de entrada principal
├── manifest.json              # Manifiesto PWA
├── sw.js                      # Service worker para offline
├── assets/
│   └── images/
│       ├── logo Alelyvers.png # Logo de la marca
│       ├── favicon.svg        # Favicon SVG
│       ├── icon-192.png       # Ícono PWA 192x192
│       └── icon-512.png       # Ícono PWA 512x512
├── css/
│   ├── reset.css              # Reset CSS
│   ├── variables.css          # Design tokens (colores, fuentes, espaciado)
│   ├── main.css               # Layout base y utilidades
│   └── components/            # Estilos por sección
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
    ├── app.js                 # Entry point, store, navegación
    ├── state.js               # Gestión de estado reactivo
    ├── storage.js             # Capa de persistencia localStorage
    ├── calculator.js          # Motor de cálculo puro
    ├── catalog.js             # Datos maestros (piezas, ceras, precios)
    ├── utils/
    │   ├── format.js          # Formato MXN, fechas, porcentajes
    │   ├── export.js          # Utilidades de exportación CSV y texto
    │   └── debounce.js        # Debounce para inputs
    └── ui/
        ├── renderer.js        # Utilidades DOM (el, clear, qs, on)
        ├── calculator-ui.js   # Interfaz calculadora de piezas
        ├── catalog-ui.js      # CRUD del catálogo de piezas
        ├── combo-ui.js        # Interfaz constructor de combos
        ├── candles-ui.js      # Interfaz calculadora de velas
        ├── quote-ui.js        # Interfaz generador de cotizaciones
        ├── history-ui.js      # Historial de cálculos
        ├── settings-ui.js     # Configuración de la app
        └── icons.js           # Componentes de íconos SVG

```

---

## 🎨 Interfaz y UX

### Secciones Principales

**Calcular**
- Selector de pieza con búsqueda en tiempo real
- Tarjetas radiales para tipo de yeso con precio por gramo
- Dropdowns de zona y canal
- Toggles para color, detalle, sellador
- Grupo radial de dificultad de desmolde
- Slider de esfuerzo ($0-$10 extra)
- Selector de urgencia de entrega
- Tarjeta de resultado animada con precio y desglose colapsable
- Botón guardar en historial

**Catálogo**
- Grid de 2 columnas en móvil, 3-4 en desktop
- Badges de tamaño con colores (chica=azul, mediana=ámbar, grande=rosa)
- Edición y eliminación en línea con confirmación
- Botón flotante "+" para nuevas piezas
- Barra de búsqueda con filtrado en tiempo real

**Combos**
- Panel dividido: navegador de catálogo + constructor de combos
- Agregar/quitar piezas y figuras de cera
- Ajustar cantidades por item
- Subtotales y total general en tiempo real
- Guardar con nombre personalizado

**Velas**
- Inputs de peso para cera y aroma
- Minutos base y cantidad de capas
- Toggles de color y pabilo
- Desglose de costos por item
- Dropdown de figura de cera de referencia

**Cotizar**
- Selector de historial con badges de tipo
- Agregador de cálculo actual
- Tabla de cantidades editables
- Tarjeta de preview con encabezado de negocio
- Acciones de Copiar / WhatsApp / Imprimir
- Funcionalidad de guardar cotización

**Historial**
- Lista cronológica con filtro por tipo
- Badges de canal, fecha, precio
- Botón Reutilizar (carga parámetros en calculadora)
- Botón Cotización (envía al constructor de cotizaciones)
- Eliminar con swipe o botón
- Exportación CSV
- Limpiar todo con confirmación

**Configuración**
- Tarjetas de precio de yeso (precio por gramo editable)
- Tarifas de mano de obra por zona
- Precios de extras por tamaño
- Restablecer a defaults con confirmación

---

## 🔐 Detalles Técnicos

### Arquitectura y Patrones
- **Patrón de Módulos** — ES6 modules, sin bundler requerido
- **Patrón Observer** — Estado reactivo simple con subscribe/dispatch
- **Delegación de Eventos** — Manejo eficiente de clicks en contenido dinámico
- **Abstracción localStorage** — Almacenamiento robusto con manejo de cuota

### Motor de Cálculo
- **Funciones Puras** — Sin efectos secundarios, fácil de probar
- **Precios por Tamaño** — Clasificación Chica/Mediana/Grande determina costos
- **Margen sobre Precio** — Fórmula: `precio = costo / (1 - margen)`
- **Redondeo a $5** — `Math.ceil(precio / 5) * 5`

### Persistencia de Datos
- **Catálogo** — Base de datos de piezas personalizable por el usuario
- **Configuración** — Precios del yeso, tarifas de mano de obra, extras
- **Historial** — Últimos 50 cálculos con parámetros completos
- **Cotizaciones** — Documentos de cotización guardados

### Funcionalidades PWA
- **Service Worker** — Estrategia de cache para offline
- **Manifest** — Instalable en iOS/Android
- **Theme Color** — Chrome del navegador con la marca

---

## 💡 Lógica de Negocio

### Fórmula de Costo (Pieza)
```
Costo_Base = (peso_g × precio_yeso_g)
           + 5.00 (costos fijos: guantes, desgaste molde, agua, luz)
           + (minutos × tarifa_zona)
           + (conColor ? color[tamano] : 0)
           + (conDetalle ? detalle[tamano] : 0)
           + (conSellador ? sellador[tamano] : 0)
           + ajuste_desmolde
           + ajuste_esfuerzo

Costo_Ajustado = Costo_Base × (1 + recargo_urgencia)
Precio_Final = Math.ceil(Costo_Ajustado / (1 - margen) / 5) * 5
```

### Fórmula de Combo
```
Costo_Combo = Σ(costo_piezas) + Σ(costo_ceras) + 3.00 (armado)
Precio_Combo = Costo_Combo / (1 - margen)
```

### Fórmula de Vela
```
Costo_Vela = (peso_cera × precio_g) + (peso_aroma × precio_g)
           + 0.50 (color) + (minutos × tarifa) + 5.00 (fijo)
           + 1.00 (pabilo)

Si múltiples capas: Costo_Vela × capas
```

---

## 📸 Capturas de Pantalla

> Capturascoming soon — la app en acción en móvil y desktop

---

## 👨‍💻 Acerca del Proyecto

**Desarrollador**: Samuel Sánchez Guzmán  
**Cliente**: Alelyvers — México  
**Tipo**: Aplicación Web (PWA)  
**Estado**: Producción  
**Versión**: 1.0.0  
**Última Actualización**: Junio 2026  

---

**© 2026 Alelyvers - Calculadora de Costos Artesanales. Todos los derechos reservados.**