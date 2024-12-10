import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cuota } from 'src/app/models/cuota';
import { CuotaService } from 'src/app/services/cuota.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  cuota: Cuota;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private cuotaService: CuotaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
  ) { 
    this.cuota = {id: 0, contrato_id: 0, monto: 0, fechaPago: new(Date), fechaVencimiento: new(Date), estado: '', descripcion: '', tipoPago: '', numeroCuota: 0, factura_id: 0};
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
      this.cuota.id = this.activatedRoute.snapshot.params.id;
      this.getcuota(this.cuota.id)
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

  getcuota(id:number){
    this.cuotaService.view(id).subscribe(data => {
      this.cuota = data;
    })
  }
  create(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire('Formulario invalido', 'ingrese correctamente los datos', 'error');
      return;
    }
    const newCuota = this.theFormGroup.value;
    console.log(JSON.stringify(newCuota));
    this.cuotaService.create(newCuota).subscribe(data => {
      Swal.fire('Success', 'cuota created successfully', 'success');

    })
  }

}
