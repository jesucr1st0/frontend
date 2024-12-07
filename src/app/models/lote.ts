import { Orden } from "./orden";
import { Producto } from "./producto";

export class Lote {
    id?: number;
    peso_total: number;
    cantidad: number;
    estado: string;
    ruta_id?: number;
    //ruta: Ruta;
    orden_id?: number;
    orden?: Orden;
    productos?: Producto[];
}