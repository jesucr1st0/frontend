import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Operacion } from 'src/app/models/operacion';
import { OperacionService } from 'src/app/services/operacion.service';
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

  constructor(
    private operacionService: OperacionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
  ) { 
    this.operacion = {};
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
      this.operacion.id = this.activatedRoute.snapshot.params.id;
      this.getCliente(this.operacion.id)
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      municipio_id:[null],
      vehiculo_id:[null],
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
      Swal.fire("Formulario incorrecto", "Ingrese correctamente los datos", "error")
      return
    }
    console.log(JSON.stringify(this.operacion));
    this.operacionService.update(this.operacion).subscribe(data => {
      Swal.fire("Actualizado", "Se ha actualizado exitosamente el operacion", "success")
      this.router.navigate(["operaciones/list"])
    })
  }

}
