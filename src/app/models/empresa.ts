import { Cliente } from "./cliente";
import { PersonaNatural } from "./persona-natural";

export class Empresa {
    id?: number;
    cliente_id?: number;
    cliente: Cliente;
    persona_natural_id?: number;
    persona_natural?: PersonaNatural;
}
