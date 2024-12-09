import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Gasto } from 'src/app/models/gasto';
import { GastoService } from 'src/app/services/gasto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  gasto: Gasto;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private gastoService: GastoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
  ) { 
    this.gasto = {id: 0, monto: 0, fecha: new(Date), descripcion: '', tipo: '', factura_id: 0};
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
      this.gasto.id = this.activatedRoute.snapshot.params.id;
      this.getgasto(this.gasto.id)
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      monto: [0, [Validators.required, Validators.minLength(1)]],
      fecha: [new(Date), [Validators.required, Validators.minLength(1)]],
      descripcion: ['', [Validators.required, Validators.minLength(1)]],
      tipo: ['', [Validators.required, Validators.minLength(1)]],
      factura_id: [0, [Validators.required, Validators.minLength(1)]]
    })
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getgasto(id:number){
    this.gastoService.view(id).subscribe(data => {
      this.gasto = data;
      this.theFormGroup.patchValue({
        monto: data.monto,
        fecha: data.fecha,
        descripcion: data.descripcion,
        tipo: data.tipo,
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
    const newGato = this.theFormGroup.value;
    console.log(JSON.stringify(newGato));
    this.gastoService.create(newGato).subscribe(data => {
      Swal.fire('Success', 'gasto created successfully', 'success');
      this.router.navigate(['/gastos/list']);

    })
  }
  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Formulario inválido', 'Ingrese correctamente los datos', 'error');
      return;
    }
  
    // Asignar los datos del formulario
    const updatedgasto = this.theFormGroup.value;
  
    // Verificar si el ID del vehículo está disponible
    if (!this.gasto.id) {
      Swal.fire('Error', 'No se ha encontrado el gasto para actualizar', 'error');
      return;
    }
  
    // Incluye el id del vehículo en el objeto que vas a enviar
    updatedgasto.id = this.gasto.id;
  
    console.log("Datos a actualizar:", updatedgasto);
  
    // Llamada al servicio para actualizar el vehículo
    this.gastoService.update(updatedgasto).subscribe({
      next: (data) => {
        Swal.fire('Éxito', 'gasto actualizado exitosamente', 'success');
        this.router.navigate(['/gastos/list']);  // Redirige a la lista de vehículos
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo actualizar el gasto', 'error');
        console.error('Error al actualizar gasto:', err);
      }
    });
  }

}
