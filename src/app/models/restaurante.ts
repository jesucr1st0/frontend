import { Servicio } from './servicio';
export class Restaurante {
     id?: number
     id_servicio?: number;
     servicio?: Servicio;
     tipoCocina: string;
     menu: string;
     delivery: boolean;
}

