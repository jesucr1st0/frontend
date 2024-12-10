import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DuenoVehiculo } from 'src/app/models/dueno-vehiculo';
import { DuenoVehiculoService } from 'src/app/services/dueno-vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  duenoVehiculo: DuenoVehiculo;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private duenoVehiculoService: DuenoVehiculoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
  ) { 
    this.duenoVehiculo = {id: 0, dueno_id: 0, vehiculo_id: 0};
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
      this.duenoVehiculo.id = this.activatedRoute.snapshot.params.id;
      this.getduenoduenoVehiculo(this.duenoVehiculo.id)
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      //capacity:[0,[Validators.required,Validators.min(1),Validators.max(100)]],
      //location:['',[Validators.required,Validators.minLength(2)]],
    })
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getduenoduenoVehiculo(id:number){
    this.duenoVehiculoService.view(id).subscribe(data => {
      this.duenoVehiculo = data;
    })
  }
  create(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire('Formulario invalido', 'ingrese correctamente los datos', 'error');
      return;
    }
    const newDuenoVehiculo = this.theFormGroup.value;
    console.log(JSON.stringify(newDuenoVehiculo));
    this.duenoVehiculoService.create(newDuenoVehiculo).subscribe(data => {
      Swal.fire('Success', 'Dueño Vehiculo created successfully', 'success');

    })
  }
  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Formulario inválido', 'Ingrese correctamente los datos', 'error');
      return;
    }
  
    // Asignar los datos del formulario
    const updatedDuenoVehiculo = this.theFormGroup.value;
  
    // Verificar si el ID del vehículo está disponible
    if (!this.duenoVehiculo.id) {
      Swal.fire('Error', 'No se ha encontrado el vehículo para actualizar', 'error');
      return;
    }
  
    // Incluye el id del vehículo en el objeto que vas a enviar
    updatedDuenoVehiculo.id = this.duenoVehiculo.id;
  
    console.log("Datos a actualizar:", updatedDuenoVehiculo);
  
    // Llamada al servicio para actualizar el vehículo
    this.duenoVehiculoService.update(updatedDuenoVehiculo).subscribe({
      next: (data) => {
        Swal.fire('Éxito', 'Vehículo actualizado exitosamente', 'success');
        this.router.navigate(['/duenoVehiculos/list']);  // Redirige a la lista de vehículos
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo actualizar el vehículo', 'error');
        console.error('Error al actualizar vehículo:', err);
      }
    });
  }

}

