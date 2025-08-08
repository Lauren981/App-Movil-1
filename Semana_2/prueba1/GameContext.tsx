import React, { createContext, useContext, useReducer } from 'react';

const GameContext = createContext<any>(null);

// hacer las cartas
function hacerCartas() {
  const letras = ['A', 'B', 'C', 'D'];
  const cartas: any = [];
  
  // poner dos de cada letra
  letras.forEach(letra => {
    cartas.push({ id: cartas.length, valor: letra, volteada: false, emparejada: false });
    cartas.push({ id: cartas.length, valor: letra, volteada: false, emparejada: false });
  });
  
  // mezclar random
  for (let i = 0; i < cartas.length; i++) {
    const j = Math.floor(Math.random() * cartas.length);
    const temp: any = cartas[i];
    cartas[i] = cartas[j];
    cartas[j] = temp;
  }

  return cartas;
}

const inicial = {
  cartas: [],
  cartasVolteadas: [],
  juegoIniciado: false,
  juegoTerminado: false,
  partidas: [],
  partidaActual: 0,
};

// esta función maneja todo lo que pasa en el juego
function reducer(estado: any, accion: any) {
  if (accion.type === 'INICIAR_JUEGO') {
    return {
      ...estado,
      cartas: hacerCartas(),
      cartasVolteadas: [],
      juegoIniciado: true,
      juegoTerminado: false,
      partidaActual: estado.partidaActual + 1,
    };
  }

  if (accion.type === 'VOLTEAR_CARTA') {
    if (estado.cartasVolteadas.length >= 2) return estado;

    const nuevasCartas = estado.cartas.map((carta: any) => {
      if (carta.id === accion.carta.id) {
        return { ...carta, volteada: true };
      }
      return carta;
    });

    return {
      ...estado,
      cartas: nuevasCartas,
      cartasVolteadas: [...estado.cartasVolteadas, { ...accion.carta, volteada: true }],
    };
  }

  if (accion.type === 'RESETEAR_CARTAS') {
    const cartasReset = estado.cartas.map((carta: any) => {
      if (carta.emparejada) {
        return carta;
      } else {
        return { ...carta, volteada: false };
      }
    });
    return {
      ...estado,
      cartas: cartasReset,
      cartasVolteadas: [],
    };
  }

  if (accion.type === 'MARCAR_PARES') {
    const cartasEmparejadas = estado.cartas.map((carta: any) => {
      const esUnPar = accion.cartas.find((c: any) => c.id === carta.id);
      if (esUnPar) {
        return { ...carta, emparejada: true, volteada: true };
      }
      return carta;
    });
    return {
      ...estado,
      cartas: cartasEmparejadas,
      cartasVolteadas: [],
    };
  }

  if (accion.type === 'TERMINAR_JUEGO') {
    const nuevaPartida = {
      id: Date.now(),
      fecha: new Date(),
      resultado: accion.resultado,
      tiempo: Date.now(),
    };
    return {
      ...estado,
      juegoTerminado: true,
      partidas: [...estado.partidas, nuevaPartida],
    };
  }

  if (accion.type === 'NUEVO_JUEGO') {
    return {
      ...estado,
      cartas: [],
      cartasVolteadas: [],
      juegoIniciado: false,
      juegoTerminado: false,
    };
  }

  return estado;
}

export function ProveedorJuego({ children }: any) {
  const [estado, dispatch] = useReducer(reducer, inicial);

  return (
    <GameContext.Provider value={{ estado, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useJuego() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useJuego debe usarse dentro de ProveedorJuego');
  }
  return context;
}
