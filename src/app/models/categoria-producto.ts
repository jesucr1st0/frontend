import { Categoria } from "./categoria";
import { Producto } from "./producto";

export class CategoriaProducto {
    id?: number;
    categoria_id?: number;
    categoria?: Categoria;
    producto_id?: number;
    producto?: Producto;
}
