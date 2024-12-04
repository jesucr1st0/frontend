import { CentroDistribucion } from "./centro-distribucion";
import { Municipio } from "./municipio";
import { Orden } from "./orden";

export class Direccion {
    id?: number;
    calle: string;
    carrera: string;
    municipio_id?: number;
    municipio?: Municipio;
    centro_distribucion_id?: number;
    centro_distribucion?: CentroDistribucion;
    ordenes?: Orden[]; 
}
