export interface Carta {
  id: number; 
  valor: string; 
  emparejada: boolean;
  visible: boolean; 
}


export interface EstadoJuego {
  cartas: Carta[]; 
  partidasJugadas: number; 
  juegoActivo: boolean; 
  cartaSeleccionada: Carta | null; 
}