import { Administrador } from "./administrador";
import { Gasto } from "./gasto";

export class Servicio {
     id?: number
     nombre: string;
     direccion: string;
     telefono: string;
     horarioApertura: string;
     horarioCierre: string;
     calificacion: number;
     administrador_id?:number
     administrador?: Administrador;
     gastos?: Gasto[];
}
