import { Cliente } from "./cliente";
import { Empresa } from "./empresa";

export class PersonaNatural {
    id?: number;
    usuario_id?: number;
    cliente_id?: number;
    cliente?: Cliente;
    empresa_id?: number;
    empresa?: Empresa;
}
