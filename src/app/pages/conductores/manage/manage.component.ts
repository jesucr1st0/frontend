import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Conductor } from 'src/app/models/conductor';
import { ConductorService } from 'src/app/services/conductor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  conductor: Conductor;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private conductorService: ConductorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
  ) { 
    this.conductor = {id: 0, nombre: '', apellido: '', telefono: '', correo: '', direccion: '', fecha_nacimiento: new(Date), dueno_id: 0};
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
      this.conductor.id = this.activatedRoute.snapshot.params.id;
      this.getConductor(this.conductor.id)
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

  getConductor(id:number){
    this.conductorService.view(id).subscribe(data => {
      this.conductor = data;
    })
  }
  create(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire('Formulario invalido', 'ingrese correctamente los datos', 'error');
      return;
    }
    const newConductor = this.theFormGroup.value;
    console.log(JSON.stringify(newConductor));
    this.conductorService.create(newConductor).subscribe(data => {
      Swal.fire('Success', 'Conductor created successfully', 'success');

    })
  }
  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Formulario inválido', 'Ingrese correctamente los datos', 'error');
      return;
    }
  
    // Asignar los datos del formulario
    const updatedConductor= this.theFormGroup.value;
  
    // Verificar si el ID del Conductor está disponible
    if (!this.conductor.id) {
      Swal.fire('Error', 'No se ha encontrado el Conductor para actualizar', 'error');
      return;
    }
  
    // Incluye el id del Conductor en el objeto que vas a enviar
    updatedConductor.id = this.conductor.id;
  
    console.log("Datos a actualizar:", updatedConductor);
  
    // Llamada al servicio para actualizar el Conductor
    this.conductorService.update(updatedConductor).subscribe({
      next: (data) => {
        Swal.fire('Éxito', 'Conductor actualizado exitosamente', 'success');
        this.router.navigate(['/vehiculos/list']);  // Redirige a la lista de Conductors
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo actualizar el Conductor', 'error');
        console.error('Error al actualizar Conductor:', err);
      }
    });
  }

}
