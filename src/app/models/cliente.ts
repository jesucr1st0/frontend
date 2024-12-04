import { Empresa } from "./empresa";
import { PersonaNatural } from "./persona-natural";
import { Producto } from "./producto";

export class Cliente {
    id?: number;
    nombre: string;
    telefono: number;
    productos?: Producto[];
    //contratos?: Contrato[];
    empresa_id?: number;
    empresa?: Empresa;
    persona_natural_id?: number;
    persona_natural?: PersonaNatural;  
}
