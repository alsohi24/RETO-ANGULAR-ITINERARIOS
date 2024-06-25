export interface Itinerario {
  _id: string;
  ciudad_origen: string;
  ciudad_destino: string;
  horario_salida: Date;
  horario_llegada: Date;
  estado: number;
  precio: number;
  bus: any;
}

export interface ItinerarioModel {
  errormessage: string;
  list: Itinerario[];
  itinerarioobj: Itinerario;
}
