import React from 'react';

export interface Carta {
  valor: string;
  estaVolteada: boolean;
  emparejada: boolean;
}

interface Partida {
  resultado: string;
}

interface JuegoContextType {
  cartas: Carta[];
  partidas: Partida[];
  mensaje: string;
  iniciarJuego: () => void;
  voltearCarta: (indice: number) => void;
}

const valoresBase = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];

function mezclar(array: any[]) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

class JuegoManager {
  cartas: Carta[] = [];
  partidas: Partida[] = [];
  mensaje: string = '';
  cartasVolteadas: number[] = [];
  juegoActivo: boolean = false;
  actualizar: (() => void)[] = [];

  iniciarJuego = () => {
    this.cartas = mezclar(valoresBase).map(valor => ({
      valor,
      estaVolteada: false,
      emparejada: false,
    }));
    this.cartasVolteadas = [];
    this.mensaje = '';
    this.juegoActivo = true;
    this.notificar();
  };

  voltearCarta = (indice: number) => {
    if (!this.juegoActivo) return;
    if (this.cartas[indice].estaVolteada || this.cartas[indice].emparejada) return;
    if (this.cartasVolteadas.length === 2) return;

    this.cartas[indice].estaVolteada = true;
    this.cartasVolteadas.push(indice);

    if (this.cartasVolteadas.length === 2) {
      setTimeout(() => this.verificarPareja(), 800);
    }
    this.notificar();
  };

  verificarPareja = () => {
    const [i, j] = this.cartasVolteadas;
    if (this.cartas[i].valor === this.cartas[j].valor) {
      this.cartas[i].emparejada = true;
      this.cartas[j].emparejada = true;
      this.mensaje = '¡Ganaste! Encontraste el par.';
      this.partidas.push({ resultado: 'Ganó' });
      this.juegoActivo = false;
    } else {
      this.cartas[i].estaVolteada = false;
      this.cartas[j].estaVolteada = false;
      this.mensaje = 'No son iguales. Fin del juego.';
      this.partidas.push({ resultado: 'Perdió' });
      this.juegoActivo = false;
    }
    this.cartasVolteadas = [];
    this.notificar();
  };

  notificar = () => {
    this.actualizar.forEach(fn => fn());
  };

  subscribe = (fn: () => void) => {
    this.actualizar.push(fn);
  };

  unsubscribe = (fn: () => void) => {
    this.actualizar = this.actualizar.filter(f => f !== fn);
  };
}

const juegoManager = new JuegoManager();

export const JuegoContext = React.createContext<JuegoContextType>({
  get cartas() { return juegoManager.cartas; },
  get partidas() { return juegoManager.partidas; },
  get mensaje() { return juegoManager.mensaje; },
  iniciarJuego: juegoManager.iniciarJuego,
  voltearCarta: juegoManager.voltearCarta,
});

export class ProveedorJuego extends React.Component<{ children: React.ReactNode }, { version: number }> {
  state = { version: 0 };
  actualizar = () => this.setState(({ version }) => ({ version: version + 1 }));

  componentDidMount() {
    juegoManager.subscribe(this.actualizar);
  }
  componentWillUnmount() {
    juegoManager.unsubscribe(this.actualizar);
  }

  render() {
    return (
      <JuegoContext.Provider value={{
        cartas: juegoManager.cartas,
        partidas: juegoManager.partidas,
        mensaje: juegoManager.mensaje,
        iniciarJuego: juegoManager.iniciarJuego,
        voltearCarta: juegoManager.voltearCarta,
      }}>
        {this.props.children}
      </JuegoContext.Provider>
    );
  }
}

export const useJuego = () => React.useContext(JuegoContext);