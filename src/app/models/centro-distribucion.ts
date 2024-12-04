import { Direccion } from "./direccion";
import { Municipio } from "./municipio";

export class CentroDistribucion {
    id?: number;
    municipio_id?: number;
    municipio?: Municipio;
    direccion_id?: number;
    direccion?: Direccion;
}
