import { Direccion } from "./direccion";
import { Lote } from "./lote";

export class Orden {
    ruta_id?: number;
    //ruta?: Ruta;
    direccion_id?: number;
    direccion?: Direccion;
    lote_id?: number;
    lote?: Lote;
}
