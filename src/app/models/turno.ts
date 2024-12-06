import { Conductor } from "./conductor"

export class Turno {
     id?: number
     conductor_id?: number
     conductor?: Conductor
     fecha_inicio: Date
     fecha_fin: Date
     estado: string
     tipo_turno: string
     descripcion: string
  
}
