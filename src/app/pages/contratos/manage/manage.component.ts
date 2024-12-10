import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contrato } from 'src/app/models/contrato';
import { ContratoService } from 'src/app/services/contrato.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  contrato: Contrato;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private contratoService: ContratoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
  ) { 
    this.contrato = {id: 0, cliente_id: 0, fecha_inicio: new(Date), fecha_fin: new(Date), tipo_contrato: '', monto: 0, estado: '', descripcion: '', terminos_y_condiciones: ''};
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
      this.contrato.id = this.activatedRoute.snapshot.params.id;
      this.getcontrato(this.contrato.id)
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

  getcontrato(id:number){
    this.contratoService.view(id).subscribe(data => {
      this.contrato = data;
    })
  }
  create(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire('Formulario invalido', 'ingrese correctamente los datos', 'error');
      return;
    }
    const newContrato = this.theFormGroup.value;
    console.log(JSON.stringify(newContrato));
    this.contratoService.create(newContrato).subscribe(data => {
      Swal.fire('Success', 'contrato created successfully', 'success');

    })
  }

}
