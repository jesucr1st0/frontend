import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Direccion } from 'src/app/models/direccion';
import { DireccionService } from 'src/app/services/direccion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  direccion: Direccion;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private direccionService: DireccionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
  ) { 
    this.direccion = {id: 0, calle: '', carrera: ''};
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
      this.direccion.id = this.activatedRoute.snapshot.params.id;
      this.getCliente(this.direccion.id)
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      calle:[''],
      carrera:[''],
      municipio_id:[null]
    })
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getCliente(id:number){
    this.direccionService.view(id).subscribe(data => {
      this.direccion = data;
    })
  }
  create(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire('Formulario invalido', 'ingrese correctamente los datos', 'error');
      return;
    }
    const newdireccion = this.theFormGroup.value;
    console.log(JSON.stringify(newdireccion));
    this.direccionService.create(newdireccion).subscribe(data => {
      Swal.fire('Success', 'direccion created successfully', 'success');
      this.router.navigate(["direcciones/list"])
    })
  }

  update() {
    if (this.theFormGroup.invalid) {
      Swal.fire("Formulario incorrecto", "Ingrese correctamente los datos", "error")
      return
    }
    console.log(JSON.stringify(this.direccion));
    this.direccionService.update(this.direccion).subscribe(data => {
      Swal.fire("Actualizado", "Se ha actualizado exitosamente el direccion", "success")
      this.router.navigate(["direcciones/list"])
    })
  }

}
