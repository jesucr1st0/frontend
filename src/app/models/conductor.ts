import { Dueno } from './dueno';
import { User } from './user';
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
  usuario_id?: number;
  usuario?: User;
  vehiculosConductores?: VehiculoConductor[];
  gastos?: Gasto[];
}
