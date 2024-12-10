import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      usuario_id: [null]
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
      Swal.fire("Formulario incorrecto", "Ingrese correctamente los datos", "error")
      return
    }
    console.log(JSON.stringify(this.administrador));
    this.administradorService.update(this.administrador).subscribe(data => {
      Swal.fire("Actualizado", "Se ha actualizado exitosamente el administrador", "success")
      this.router.navigate(["administradores/list"])
    })
  }


}
