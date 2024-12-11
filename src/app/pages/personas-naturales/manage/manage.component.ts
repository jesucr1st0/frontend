import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaNatural } from 'src/app/models/persona-natural';
import { PersonaNaturalService } from 'src/app/services/persona-natural.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  persona_natural: PersonaNatural;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private personaNaturalService: PersonaNaturalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
  ) { 
    this.persona_natural = {};
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
      this.persona_natural.id = this.activatedRoute.snapshot.params.id;
      this.getCliente(this.persona_natural.id)
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      cliente_id:[null],
      usuario_id:[null]
    })
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getCliente(id:number){
    this.personaNaturalService.view(id).subscribe(data => {
      this.persona_natural = data;
    })
  }
  create(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire('Formulario invalido', 'ingrese correctamente los datos', 'error');
      return;
    }
    const newPersonaNatural = this.theFormGroup.value;
    console.log(JSON.stringify(newPersonaNatural));
    this.personaNaturalService.create(newPersonaNatural).subscribe(data => {
      Swal.fire('Success', 'Persona natural created successfully', 'success');
      this.router.navigate(["personas-naturales/list"])
    })
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Formulario inválido', 'Ingrese correctamente los datos', 'error');
      return;
    }
  
    // Asignar los datos del formulario
    const updatedPersonaNatural = this.theFormGroup.value;
  
    // Verificar si el ID del vehículo está disponible
    if (!this.persona_natural.id) {
      Swal.fire('Error', 'No se ha encontrado el vehículo para actualizar', 'error');
      return;
    }
  
    // Incluye el id del vehículo en el objeto que vas a enviar
    updatedPersonaNatural.id = this.persona_natural.id;
  
    console.log("Datos a actualizar:", updatedPersonaNatural);
  
    // Llamada al servicio para actualizar el vehículo
    this.personaNaturalService.update(updatedPersonaNatural).subscribe({
      next: (data) => {
        Swal.fire('Éxito', 'Vehículo actualizado exitosamente', 'success');
        this.router.navigate(['/personas-naturales/list']);  // Redirige a la lista de vehículos
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo actualizar el vehículo', 'error');
        console.error('Error al actualizar vehículo:', err);
      }
    });
  }

}
