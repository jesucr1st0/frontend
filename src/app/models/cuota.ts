import { Contrato } from './contrato';
import { Factura } from './factura';
export class Cuota {
   id?: number
   contrato_id?: number
   contrato?: Contrato
   monto: number
   fechaPago: Date
   fechaVencimiento: Date
   estado: string
   descripcion: string
   tipoPago: string
   numeroCuota: number
   factura_id?: number
   factura?: Factura    
}
