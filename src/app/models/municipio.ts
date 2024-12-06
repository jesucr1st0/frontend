import { CentroDistribucion } from "./centro-distribucion";
import { Departamento } from "./departamento";
import { Direccion } from "./direccion";
import { Operacion } from "./operacion";

export class Municipio {
    id?: number;
    nombre: string;
    departamento_id?: number;
    departamento?: Departamento;
    direcciones?: Direccion[];
    centros_distribucion?: CentroDistribucion[];
    operaciones?: Operacion[];
}
