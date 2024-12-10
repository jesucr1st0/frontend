import { DuenoVehiculo } from "./dueno-vehiculo"
import { Operacion } from "./operacion"
import { Ruta } from "./ruta"
import { VehiculoConductor } from "./vehiculo-conductor"

export class Vehiculo {
     id?: number
     marca: string
     modelo: string
     rutas?: Ruta[]
     operaciones?: Operacion[] 
     vehiculosConductores?: VehiculoConductor[]
     duenosVehiculos?: DuenoVehiculo[]
}
