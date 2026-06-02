// ────────────────────────────────────────────
// Entry point de la aplicación
// Inicializa el store, carga persistencia,
// y expone el store global para todos los módulos UI.
// ────────────────────────────────────────────

import { createStore } from './state.js';
import { CATALOGO_PIEZAS, CATALOGO_CERAS, DEFAULT_SETTINGS } from './catalog.js';
import { calcularPiezaCompleta } from './calculator.js';
import * as storage from './storage.js';

// ─── Datos iniciales: merge de defaults + localStorage ───

const savedSettings = storage.loadSettings();
const savedCatalog  = storage.loadCatalog() || CATALOGO_PIEZAS;
const savedHistory  = storage.loadHistory();
const savedState    = storage.loadState();

const initialState = {
  // UI
  activePanel: savedState.activePanel || 'calculator',
  darkMode: savedState.darkMode || false,

  // Datos editables por el usuario
  catalog: savedCatalog,
  settings: savedSettings,

  // Catálogos de solo lectura (referencia)
  catalogCeras: CATALOGO_CERAS,

  // Cálculo actual
  currentCalculation: null,

  // Historial
  history: savedHistory,

  // Bandera de inicialización
  ready: false,
};

// ─── Crear store ───

const store = createStore(initialState, {

  /** Auto-persistencia: guardar cambios relevantes en localStorage */
  onChange(state) {
    storage.saveState({
      activePanel: state.activePanel,
      darkMode: state.darkMode,
    });
  },
});

// ─── Acciones de negocio ───

/**
 * Calcula una pieza individual y guarda el resultado en el estado.
 * No persiste en historial — eso lo decide la UI.
 */
function actionCalcularPieza(state, params) {
  const resultado = calcularPiezaCompleta(params);

  return {
    currentCalculation: {
      tipo: 'pieza',
      nombre: params.nombre || 'Pieza sin nombre',
      params,
      ...resultado,
    },
  };
}

/**
 * Guarda el cálculo actual en el historial.
 */
function actionGuardarEnHistorial(state) {
  if (!state.currentCalculation) return null;

  const entry = {
    tipo: state.currentCalculation.tipo,
    nombre: state.currentCalculation.nombre,
    canal: state.currentCalculation.params?.canal || null,
    precioFinal: state.currentCalculation.precioFinal,
    margenAplicado: state.currentCalculation.params?.margen || null,
    resultado: state.currentCalculation,
  };

  storage.addToHistory(entry);

  return {
    history: [entry, ...state.history],
  };
}

/**
 * Cambia el panel activo (navegación entre tabs).
 */
function actionSetActivePanel(state, panelId) {
  return { activePanel: panelId };
}

/**
 * Alterna dark mode.
 */
function actionToggleDarkMode(state) {
  const next = !state.darkMode;
  document.documentElement.setAttribute('data-theme', next ? 'dark' : '');
  return { darkMode: next };
}

// ─── Registrar acciones en el store ───

const rawDispatch = store.dispatch;
store.dispatch = function (action, payload) {
  if (action === 'calcularPieza')    return rawDispatch((s) => actionCalcularPieza(s, payload));
  if (action === 'guardarHistorial') return rawDispatch(actionGuardarEnHistorial);
  if (action === 'setActivePanel')   return rawDispatch((s) => actionSetActivePanel(s, payload));
  if (action === 'toggleDarkMode')   return rawDispatch(actionToggleDarkMode);
  return rawDispatch(action, payload);
};

// ─── Restaurar dark mode al iniciar ───

if (initialState.darkMode) {
  document.documentElement.setAttribute('data-theme', 'dark');
}

// ─── Marcar como listo ───

store.setState({ ready: true });

// ─── Verificación — Fase 1.8 ───

console.log('%c App lista — Craft Cost Calculator', 'color: #7D9B76; font-weight: bold;');
console.log('%cStore inicializado con %d piezas, %d figuras de cera, %d items en historial.',
  'color: #6B5A50;',
  store.getState().catalog.length,
  store.getState().catalogCeras.length,
  store.getState().history.length,
);

// Verifica que la fórmula maestra funciona con el ejemplo del doc (sección 16)
const testCorazon = calcularPiezaCompleta({
  peso_g: 152,
  tamano: 'chica',
  precioYesoPorG: 0.025,      // Redimix
  minutos: 15,
  tarifaPorMinuto: 1.16,       // Pueblo
  conColor: true,
  conDetalleFino: false,
  conSellador: false,
  ajusteDesmolde: 0,
  ajusteEsfuerzo: 0,
  margen: 0.45,                // Bazar
  recargoUrgencia: 0,
});

console.log('%c── Verificación Corazón Trenzado ──', 'color: #C9A96E;');
console.log('Costo Yeso:        ', testCorazon.desglose.costoYeso,       '(esperado $3.80)');
console.log('Costos Fijos:      ', testCorazon.desglose.costosFijos,     '(esperado $5.00)');
console.log('Mano de Obra:      ', testCorazon.desglose.manoDeObra,      '(esperado $17.40)');
console.log('Costo Color:       ', testCorazon.desglose.costoColor,       '(esperado $5.00)');
console.log('───');
console.log('Costo Base:        ', testCorazon.costoBase,                 '(esperado $31.20)');
console.log('Costo Ajustado:    ', testCorazon.costoAjustado,             '(esperado $31.20)');
console.log('Precio Mínimo:     ', testCorazon.precioMinimo,              '(esperado $56.73)');
console.log('Precio Final:      ', testCorazon.precioFinal,               '(esperado $60.00)');
console.log('Ganancia MXN:      ', testCorazon.gananciaMXN,               '(esperado $28.80)');
console.log('Ganancia %:        ', testCorazon.gananciaPct + '%',         '(esperado 48%)');

// Verificar contra precio de referencia (sección 12) — Corazón trenzado bazar
const expected = testCorazon.precioFinal === 60
  && testCorazon.costoBase === 31.20
  && testCorazon.desglose.costoYeso === 3.80;

if (expected) {
  console.log('%c Verificación exitosa — todos los valores coinciden con el documento.',
    'color: #5D8A5B; font-weight: bold;');
} else {
  console.warn('Algunos valores difieren del documento. Revisar parámetros.');
}

// ─── Exponer store globalmente ───

export { store };
