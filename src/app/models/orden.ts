import { Direccion } from "./direccion";
import { Lote } from "./lote";
import { Ruta } from "./ruta";

export class Orden {
    id?: number;
    ruta_id?: number;
    ruta?: Ruta;
    direccion_id?: number;
    direccion?: Direccion;
    lote_id?: number;
    lote?: Lote;
}
