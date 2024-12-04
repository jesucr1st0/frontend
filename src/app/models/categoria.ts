import { CategoriaProducto } from "./categoria-producto";
import { Subcategoria } from "./subcategoria";

export class Categoria {
    id?: number;
    tipo: string;
    descripcion: string;
    categorias_producto?: CategoriaProducto[];
    subcategorias?: Subcategoria[];
}
