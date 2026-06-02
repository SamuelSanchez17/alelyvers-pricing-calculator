// ────────────────────────────────────────────
// Store reactivo — Patrón observer
// Única fuente de verdad del estado de la app.
// Cada setState() notifica a todos los suscriptores.
// dispatch() ejecuta acciones de negocio y persiste.
// ────────────────────────────────────────────

/**
 * Crea un store con patrón observer.
 *
 * @param {Object} initialState — estado inicial
 * @param {Object} [options]
 * @param {Function} [options.onChange] — llamado tras cada setState(state)
 * @returns {{ getState, setState, subscribe, dispatch, reset }}
 */
export function createStore(initialState, options = {}) {
  let state = deepClone(initialState);
  const listeners = new Set();

  /** Retorna una copia shallow del estado actual. */
  function getState() {
    return { ...state };
  }

  /**
   * Fusiona partial en el estado y notifica suscriptores.
   * Soporta actualizaciones anidadas con notación de punto:
   *   setState({ 'settings.yesos': [...] })
   */
  function setState(partial) {
    const next = { ...state };

    for (const [key, value] of Object.entries(partial)) {
      if (key.includes('.')) {
        setNested(next, key, value);
      } else {
        next[key] = value;
      }
    }

    state = next;

    if (options.onChange) {
      options.onChange(state);
    }

    listeners.forEach((fn) => {
      try { fn(state); } catch (e) { console.error('[Store] subscriber error:', e); }
    });
  }

  /**
   * Suscribe una función que se llama cada vez que el estado cambia.
   * Retorna función para cancelar suscripción.
   */
  function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  /**
   * Despacha una acción. Las acciones son funciones puras:
   *   dispatch((state) => ({ count: state.count + 1 }))
   * o acciones nombradas:
   *   dispatch('INCREMENT')
   *
   * Para acciones nombradas, se buscan en el mapa de acciones registrado.
   */
  function dispatch(action, payload) {
    if (typeof action === 'function') {
      const partial = action(getState());
      if (partial != null) setState(partial);
    } else if (typeof action === 'string' && _actions[action]) {
      const partial = _actions[action](getState(), payload);
      if (partial != null) setState(partial);
    } else {
      console.warn('[Store] dispatch: acción no reconocida:', action);
    }
  }

  /** Restaura el estado al valor inicial. */
  function reset() {
    state = deepClone(initialState);
    listeners.forEach((fn) => {
      try { fn(state); } catch (e) { console.error('[Store] subscriber error:', e); }
    });
  }

  const _actions = {};

  return { getState, setState, subscribe, dispatch, reset };
}

// ─── Helpers internos ───

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function setNested(obj, path, value) {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!(keys[i] in current) || typeof current[keys[i]] !== 'object') {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}
