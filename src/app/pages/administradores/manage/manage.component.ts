import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Administrador } from 'src/app/models/administrador';
import { AdministradorService } from 'src/app/services/administrador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  administrador: Administrador;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private administradorService: AdministradorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
  ) { 
    this.administrador = {id: 0};
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
      this.administrador.id = this.activatedRoute.snapshot.params.id;
      this.getAdministrador(this.administrador.id)
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      usuario_id: [null, [Validators.required, Validators.min(1)]]
    })
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getAdministrador(id:number){
    this.administradorService.view(id).subscribe(data => {
      this.administrador = data;
    })
  }
  create(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire('Formulario invalido', 'ingrese correctamente los datos', 'error');
      return;
    }
    const newAdministrador = this.theFormGroup.value;
    console.log(JSON.stringify(newAdministrador));
    this.administradorService.create(newAdministrador).subscribe(data => {
      Swal.fire('Success', 'Administrador created successfully', 'success');
      this.router.navigate(["administradores/list"])
    })
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Formulario inválido', 'Ingrese correctamente los datos', 'error');
      return;
    }
  
    const updatedAdministrador = this.theFormGroup.value;
  
    if (!this.administrador.id) {
      Swal.fire('Error', 'No se ha encontrado el administrador para actualizar', 'error');
      return;
    }
  
    updatedAdministrador.id = this.administrador.id;
  
    console.log("Datos a actualizar:", updatedAdministrador);
   
    this.administradorService.update(updatedAdministrador).subscribe({
      next: (data) => {
        Swal.fire('Éxito', 'Administrador actualizado exitosamente', 'success');
        this.router.navigate(['/administradors/list']);  
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo actualizar el administrador', 'error');
        console.error('Error al actualizar administrador:', err);
      }
    });
  }


}
