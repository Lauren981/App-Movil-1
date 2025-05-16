import React from 'react';

export interface Carta {
  valor: string;
  estaVolteada: boolean;
  emparejada: boolean;
}

interface JuegoContextType {
  cartas: Carta[];
  cartasVolteadas: number[];
  iniciarJuego: () => void;
  voltearCarta: (indice: number) => void;
  verificarPareja: () => void;
  subscribe: (callback: () => void) => void;
  unsubscribe: (callback: () => void) => void;
  partidas: { resultado: string }[]; // Ajusta el tipo según la estructura real de 'partida'
}

// Clase singleton para manejar el estado
class JuegoManager {
  cartas: Carta[] = [];
  cartasVolteadas: number[] = [];
  listeners: Array<() => void> = [];

  iniciarJuego = () => {
    const valores = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
    const mezcladas = valores
      .sort(() => Math.random() - 0.5)
      .map(valor => ({ valor, estaVolteada: false, emparejada: false }));
    this.cartas = mezcladas;
    this.cartasVolteadas = [];
    this.notify();
  };

  voltearCarta = (indice: number) => {
    if (
      this.cartasVolteadas.length < 2 &&
      !this.cartas[indice].emparejada &&
      !this.cartas[indice].estaVolteada
    ) {
      this.cartas[indice].estaVolteada = true;
      this.cartasVolteadas.push(indice);
      this.notify();
    }
  };

  verificarPareja = () => {
    if (this.cartasVolteadas.length === 2) {
      const [i1, i2] = this.cartasVolteadas;
      if (this.cartas[i1].valor === this.cartas[i2].valor) {
        this.cartas[i1].emparejada = true;
        this.cartas[i2].emparejada = true;
        this.notify();
      } else {
        setTimeout(() => {
          this.cartas[i1].estaVolteada = false;
          this.cartas[i2].estaVolteada = false;
          this.notify();
        }, 800);
      }
      setTimeout(() => {
        this.cartasVolteadas = [];
        this.notify();
      }, 800);
    }
  };

  subscribe = (callback: () => void) => {
    this.listeners.push(callback);
  };

  unsubscribe = (callback: () => void) => {
    this.listeners = this.listeners.filter(fn => fn !== callback);
  };

  notify = () => {
    this.listeners.forEach(fn => fn());
  };
}

const juegoManager = new JuegoManager();

export const JuegoContext = React.createContext<JuegoContextType>({
  get cartas() { return juegoManager.cartas; },
  get cartasVolteadas() { return juegoManager.cartasVolteadas; },
  iniciarJuego: juegoManager.iniciarJuego,
  voltearCarta: juegoManager.voltearCarta,
  verificarPareja: juegoManager.verificarPareja,
  subscribe: juegoManager.subscribe,
  unsubscribe: juegoManager.unsubscribe,
  partidas: [], // Ajusta el valor inicial según sea necesario
});

export class ProveedorJuego extends React.Component<{ children: React.ReactNode }, { version: number }> {
  state = { version: 0 };

  componentDidMount() {
    juegoManager.subscribe(this.handleChange);
  }
  componentWillUnmount() {
    juegoManager.unsubscribe(this.handleChange);
  }
  handleChange = () => {
    this.setState(({ version }) => ({ version: version + 1 }));
  };

  render() {
    return (
      <JuegoContext.Provider value={{
        cartas: juegoManager.cartas,
        cartasVolteadas: juegoManager.cartasVolteadas,
        iniciarJuego: juegoManager.iniciarJuego,
        voltearCarta: juegoManager.voltearCarta,
        verificarPareja: juegoManager.verificarPareja,
        subscribe: juegoManager.subscribe,
        unsubscribe: juegoManager.unsubscribe,
        partidas: [], 
      }}>
        {this.props.children}
      </JuegoContext.Provider>
    );
  }
}

export const useJuego = () => React.useContext(JuegoContext);