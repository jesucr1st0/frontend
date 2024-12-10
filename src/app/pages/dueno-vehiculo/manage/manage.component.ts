import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DuenoVehiculo } from 'src/app/models/dueno-vehiculo';
import { DuenoVehiculoService } from 'src/app/services/dueno-vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  duenovehiculo: DuenoVehiculo;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private duenovehiculoService: DuenoVehiculoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
  ) { 
    this.duenovehiculo = {id: 0, dueno_id: 0, vehiculo_id: 0};
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
      this.duenovehiculo.id = this.activatedRoute.snapshot.params.id;
      this.getduenovehiculo(this.duenovehiculo.id)
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

  getduenovehiculo(id:number){
    this.duenovehiculoService.view(id).subscribe(data => {
      this.duenovehiculo = data;
    })
  }
  create(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire('Formulario invalido', 'ingrese correctamente los datos', 'error');
      return;
    }
    const newDuenoVehiculo = this.theFormGroup.value;
    console.log(JSON.stringify(newDuenoVehiculo));
    this.duenovehiculoService.create(newDuenoVehiculo).subscribe(data => {
      Swal.fire('Success', 'duenovehiculo created successfully', 'success');

    })
  }

}

