import { Servicio } from "./servicio";
import { User } from "./user";

export class Administrador {
    id?: number;
    usuario_id?: string;
    usuario?: User;
    servicio_id?: number;
    servicio?: Servicio;
}
