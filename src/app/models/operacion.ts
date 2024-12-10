import { Municipio } from "./municipio";
import { Vehiculo } from "./vehiculo";

export class Operacion {
    id?: number;
    municipio_id?: number;
    municipio?: Municipio;
    vehiculo_id?: number;
    vehiculo?: Vehiculo;
}
