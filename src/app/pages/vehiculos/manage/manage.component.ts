import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehiculo } from 'src/app/models/vehiculo';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  vehiculo: Vehiculo;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private vehiculoService: VehiculoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
  ) { 
    this.vehiculo = {id: 0, marca: '', modelo: ''};
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
      this.vehiculo.id = this.activatedRoute.snapshot.params.id;
      this.getvehiculo(this.vehiculo.id)
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      marca: ['', [Validators.required, Validators.minLength(2)]],
      modelo: ['', [Validators.required, Validators.minLength(2)]],
    })
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getvehiculo(id:number){
    this.vehiculoService.view(id).subscribe(data => {
      this.vehiculo = data;
      this.theFormGroup.patchValue({
        marca: data.marca,
        modelo: data.modelo,
      });
    })
  }
  create(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire('Formulario invalido', 'ingrese correctamente los datos', 'error');
      return;
    }
    const newVehiculo = this.theFormGroup.value;
    console.log(JSON.stringify(newVehiculo));
    this.vehiculoService.create(newVehiculo).subscribe(data => {
      Swal.fire('Success', 'vehiculo created successfully', 'success');
      this.router.navigate(['/vehiculos/list']);

    })
  }
  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Formulario inválido', 'Ingrese correctamente los datos', 'error');
      return;
    }
  
    // Asignar los datos del formulario
    const updatedVehiculo = this.theFormGroup.value;
  
    // Verificar si el ID del vehículo está disponible
    if (!this.vehiculo.id) {
      Swal.fire('Error', 'No se ha encontrado el vehículo para actualizar', 'error');
      return;
    }
  
    // Incluye el id del vehículo en el objeto que vas a enviar
    updatedVehiculo.id = this.vehiculo.id;
  
    console.log("Datos a actualizar:", updatedVehiculo);
  
    // Llamada al servicio para actualizar el vehículo
    this.vehiculoService.update(updatedVehiculo).subscribe({
      next: (data) => {
        Swal.fire('Éxito', 'Vehículo actualizado exitosamente', 'success');
        this.router.navigate(['/vehiculos/list']);  // Redirige a la lista de vehículos
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo actualizar el vehículo', 'error');
        console.error('Error al actualizar vehículo:', err);
      }
    });
  }

}
