// tipos para el juego
export interface Carta {
  id: number;
  valor: string;
  volteada: boolean;
  emparejada: boolean;
}

export interface Partida {
  id: number;
  fecha: Date;
  resultado: string;
  tiempo: number;
}

export interface EstadoJuego {
  cartas: any[];
  cartasVolteadas: any[];
  juegoIniciado: boolean;
  juegoTerminado: boolean;
  partidas: any[];
  partidaActual: number;
}
