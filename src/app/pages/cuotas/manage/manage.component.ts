import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cuota } from 'src/app/models/cuota';
import { CuotaService } from 'src/app/services/cuota.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  cuota: Cuota;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private cuotaService: CuotaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
  ) { 
    this.cuota = {id: 0, contrato_id: 0, monto: 0, fechaPago: new(Date), fechaVencimiento: new(Date), estado: '', descripcion: '', tipoPago: '', numeroCuota: 0, factura_id: 0};
    this.mode = 0;
    this.trySend = false;
  }

  ngOnInit(): void {
    this.configFormGroup();// llamar el metodo
    const currentUrl = this.activatedRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }

    if(this.activatedRoute.snapshot.params.id){
      this.cuota.id = this.activatedRoute.snapshot.params.id;
      this.getcuota(this.cuota.id)
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      contrato_id: [0, [Validators.required, Validators.minLength(1)]],
      monto: [0, [Validators.required, Validators.minLength(1)]],
      fechaPago: [new(Date), [Validators.required, Validators.minLength(1)]],
      fechaVencimiento: [new(Date), [Validators.required, Validators.minLength(1)]],
      estado: ['', [Validators.required, Validators.minLength(1)]],
      descripcion: ['', [Validators.required, Validators.minLength(1)]],
      tipoPago: ['', [Validators.required, Validators.minLength(1)]],
      numeroCuota: [0, [Validators.required, Validators.minLength(1)]],
      factura_id: [0, [Validators.required, Validators.minLength(1)]]
    })
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getcuota(id:number){
    this.cuotaService.view(id).subscribe(data => {
      this.cuota = data;
      this.theFormGroup.patchValue({
        contrato_id: data.contrato_id,
        monto: data.monto,
        fechaPago: data.fechaPago,
        fechaVencimiento: data.fechaVencimiento,
        estado: data.estado,
        descripcion: data.descripcion,
        tipoPago: data.tipoPago,
        numeroCuota: data.numeroCuota,
        factura_id: data.factura_id
      });
    })
  }
  create(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire('Formulario invalido', 'ingrese correctamente los datos', 'error');
      return;
    }
    const newCuota = this.theFormGroup.value;
    console.log(JSON.stringify(newCuota));
    this.cuotaService.create(newCuota).subscribe(data => {
      Swal.fire('Success', 'cuota created successfully', 'success');
      this.router.navigate(['/cuotas/list']);

    })
  }
  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Formulario inválido', 'Ingrese correctamente los datos', 'error');
      return;
    }
  
    // Asignar los datos del formulario
    const updatedCuota = this.theFormGroup.value;
  
    // Verificar si el ID del vehículo está disponible
    if (!this.cuota.id) {
      Swal.fire('Error', 'No se ha encontrado la cuota para actualizar', 'error');
      return;
    }
  
    // Incluye el id del vehículo en el objeto que vas a enviar
    updatedCuota.id = this.cuota.id;
  
    console.log("Datos a actualizar:", updatedCuota);
  
    // Llamada al servicio para actualizar el vehículo
    this.cuotaService.update(updatedCuota).subscribe({
      next: (data) => {
        Swal.fire('Éxito', 'cuota actualizado exitosamente', 'success');
        this.router.navigate(['/vehiculos/list']);  // Redirige a la lista de vehículos
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo actualizar la cuota', 'error');
        console.error('Error al actualizar cuota:', err);
      }
    });
  }

}
