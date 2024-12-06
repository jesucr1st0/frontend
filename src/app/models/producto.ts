import { CategoriaProducto } from "./categoria-producto";
import { Cliente } from "./cliente";
import { Lote } from "./lote";

export class Producto {
    id?: number;
    nombre: string;
    peso: number;
    cantidad_disponible: number;
    precio: number;
    cliente_id?: number;
    cliente?: Cliente;
    lote_id?: number;
    lote?: Lote;
    categorias_producto?: CategoriaProducto[];
}
