import { Dueno } from './dueno';
import { Gasto } from './gasto';
import { VehiculoConductor } from './vehiculo-conductor';
export class Conductor {
  id?: number;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  direccion: string;
  fecha_nacimiento: Date;
  dueno_id?: number;
  dueno?: Dueno;
  usuario_id?: number;
  vehiculosConductores?: VehiculoConductor[];
  gastos?: Gasto[];
}
