import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Operacion } from 'src/app/models/operacion';
import { Vehiculo } from 'src/app/models/vehiculo';
import { OperacionService } from 'src/app/services/operacion.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  operacion: Operacion;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  vehiculos: Vehiculo[];

  constructor(
    private operacionService: OperacionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
    private vehiculoService: VehiculoService
  ) { 
    this.vehiculos = [];
    this.operacion = {vehiculo_id: null};
    this.mode = 0;
    this.trySend = false;
  }

  vehiculosList() {
    this.vehiculoService.list().subscribe(data => {
      this.vehiculos = data;
    })
  }

  ngOnInit(): void {
    this.vehiculosList()
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
      this.operacion.id = this.activatedRoute.snapshot.params.id;
      this.getCliente(this.operacion.id)
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      municipio_id:[1],
      vehiculo_id:[null, [Validators.required, Validators.pattern(/^\d+$/)]],
    })
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getCliente(id:number){
    this.operacionService.view(id).subscribe(data => {
      this.operacion = data;
    })
  }
  create(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire('Formulario invalido', 'ingrese correctamente los datos', 'error');
      return;
    }
    const newOperacion = this.theFormGroup.value;
    console.log(JSON.stringify(newOperacion));
    this.operacionService.create(newOperacion).subscribe(data => {
      Swal.fire('Success', 'Operacion created successfully', 'success');
      this.router.navigate(["operaciones/list"])
    })
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Formulario inválido', 'Ingrese correctamente los datos', 'error');
      return;
    }
  
    const updatedOperacion = this.theFormGroup.value;
  
    if (!this.operacion.id) {
      Swal.fire('Error', 'No se ha encontrado el operación para actualizar', 'error');
      return;
    }
  
    updatedOperacion.id = this.operacion.id;
  
    console.log("Datos a actualizar:", updatedOperacion);
   
    this.operacionService.update(updatedOperacion).subscribe({
      next: (data) => {
        Swal.fire('Éxito', 'Vehículo actualizado exitosamente', 'success');
        this.router.navigate(['/operaciones/list']);  
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo actualizar el operación', 'error');
        console.error('Error al actualizar operación:', err);
      }
    });
  }

}
