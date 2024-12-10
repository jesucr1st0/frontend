import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicio } from 'src/app/models/servicio';
import { ServicioService } from 'src/app/services/servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  servicio: Servicio;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private servicioService: ServicioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
  ) { 
    this.servicio = {id: 0, nombre: '', direccion: '', telefono: '' ,horarioApertura: '', horarioCierre: '', calificacion: 0, administrador_id: 0};
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
      this.servicio.id = this.activatedRoute.snapshot.params.id;
      this.getservicio(this.servicio.id)
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      direccion: ['', [Validators.required, Validators.minLength(2)]],
      telefono: ['', [Validators.required, Validators.minLength(2)]],
      horarioApertura: ['', [Validators.required, Validators.minLength(2)]],
      horarioCierre: ['', [Validators.required, Validators.minLength(2)]],
      calificacion: [0, [Validators.required, Validators.minLength(1)]],
      administrador_id: [0, [Validators.required, Validators.minLength(1)]],

    })
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getservicio(id:number){
    this.servicioService.view(id).subscribe(data => {
      this.servicio = data;
      this.theFormGroup.patchValue({
        nombre: data.nombre,
        direccion: data.direccion,
        telefono: data.telefono,
        horarioApertura: data.horarioApertura,
        horarioCierre: data.horarioCierre,
        calificacion: data.calificacion,
        administrador_id: data.administrador_id,
      });
    })
  }
  create(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire('Formulario invalido', 'ingrese correctamente los datos', 'error');
      return;
    }
    const newServicio = this.theFormGroup.value;
    console.log(JSON.stringify(newServicio));
    this.servicioService.create(newServicio).subscribe(data => {
      Swal.fire('Success', 'servicio created successfully', 'success');
      this.router.navigate(['/servicios/list']);

    })
  }
  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Formulario inválido', 'Ingrese correctamente los datos', 'error');
      return;
    }
  
    // Asignar los datos del formulario
    const updatedservicio = this.theFormGroup.value;
  
    // Verificar si el ID del vehículo está disponible
    if (!this.servicio.id) {
      Swal.fire('Error', 'No se ha encontrado el vehículo para actualizar', 'error');
      return;
    }
  
    // Incluye el id del vehículo en el objeto que vas a enviar
    updatedservicio.id = this.servicio.id;
  
    console.log("Datos a actualizar:", updatedservicio);
  
    // Llamada al servicio para actualizar el vehículo
    this.servicioService.update(updatedservicio).subscribe({
      next: (data) => {
        Swal.fire('Éxito', 'Servicio actualizado exitosamente', 'success');
        this.router.navigate(['/servicios/list']);  // Redirige a la lista de vehículos
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo actualizar el vehículo', 'error');
        console.error('Error al actualizar vehículo:', err);
      }
    });
  }

}
