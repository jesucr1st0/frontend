import { Cliente } from "./cliente";
import { User } from "./user";

export class PersonaNatural {
    id?: number;
    usuario_id?: string;
    usuario?: User;
    cliente_id?: number;
    cliente?: Cliente;
}
