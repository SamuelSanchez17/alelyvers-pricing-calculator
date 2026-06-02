// ────────────────────────────────────────────
// Utilidades de formato
// Moneda, fechas, porcentajes, helpers de texto.
// ────────────────────────────────────────────

const FORMATO_MXN = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const FORMATO_MXN_SHORT = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const FORMATO_FECHA = new Intl.DateTimeFormat('es-MX', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const FORMATO_FECHA_COMPLETA = new Intl.DateTimeFormat('es-MX', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

/**
 * Formatea un número como moneda MXN.
 *   formatMXN(123.456) → "$123.46"
 */
export function formatMXN(n) {
  if (n == null || isNaN(n)) return '$0.00';
  return FORMATO_MXN.format(n);
}

/**
 * Formatea como MXN sin decimales.
 *   formatMXNShort(123) → "$123"
 */
export function formatMXNShort(n) {
  if (n == null || isNaN(n)) return '$0';
  return FORMATO_MXN_SHORT.format(n);
}

/**
 * Redondea a 2 decimales.
 */
export function redondear2(n) {
  return Math.round(n * 100) / 100;
}

/**
 * Redondea hacia arriba al siguiente múltiplo de 5.
 *   redondearA5(56.73) → 60
 */
export function redondearA5(n) {
  return Math.ceil(n / 5) * 5;
}

/**
 * Formatea fecha ISO a "01 jun. 2026".
 */
export function formatDate(isoString) {
  if (!isoString) return '—';
  return FORMATO_FECHA.format(new Date(isoString));
}

/**
 * Formatea fecha ISO a "01 jun. 2026, 14:30".
 */
export function formatDateTime(isoString) {
  if (!isoString) return '—';
  return FORMATO_FECHA_COMPLETA.format(new Date(isoString));
}

/**
 * Formatea un porcentaje.
 *   formatPercent(0.45) → "45%"
 *   formatPercent(0.4567, 1) → "45.7%"
 */
export function formatPercent(n, decimals = 0) {
  if (n == null || isNaN(n)) return '0%';
  return (n * 100).toFixed(decimals) + '%';
}

/**
 * Formatea gramos.
 *   formatGramos(150) → "150 g"
 */
export function formatGramos(g) {
  if (g == null) return '—';
  return g.toLocaleString('es-MX') + ' g';
}

/**
 * Formatea minutos.
 *   formatMinutos(15) → "15 min"
 *   formatMinutos(90) → "1 h 30 min"
 */
export function formatMinutos(m) {
  if (m == null) return '—';
  if (m < 60) return m + ' min';
  const h = Math.floor(m / 60);
  const min = m % 60;
  return min > 0 ? `${h} h ${min} min` : `${h} h`;
}

/**
 * Formatea un número con separadores de miles.
 *   formatNumero(1540.5) → "1,540.50"
 */
export function formatNumero(n, decimals = 2) {
  if (n == null || isNaN(n)) return '0';
  return n.toLocaleString('es-MX', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Capitaliza la primera letra.
 *   capitalize('chica') → 'Chica'
 */
export function capitalize(s) {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Trunca texto con puntos suspensivos.
 *   truncate('Corazón trenzado con...', 20) → 'Corazón trenzado co...'
 */
export function truncate(s, max = 30) {
  if (!s || s.length <= max) return s;
  return s.slice(0, max - 3) + '...';
}

/**
 * Genera un id único simple.
 */
export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
