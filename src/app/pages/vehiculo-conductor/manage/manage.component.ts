import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoConductor } from 'src/app/models/vehiculo-conductor';
import { VehiculoConductorService } from 'src/app/services/vehiculo-conductor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  vehiculoconductor: VehiculoConductor;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private vehiculoconductorService: VehiculoConductorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
  ) { 
    this.vehiculoconductor = {id: 0, conductor_id: 0, vehiculo_id: 0};
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
      this.vehiculoconductor.id = this.activatedRoute.snapshot.params.id;
      this.getvehiculoconductor(this.vehiculoconductor.id)
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

  getvehiculoconductor(id:number){
    this.vehiculoconductorService.view(id).subscribe(data => {
      this.vehiculoconductor = data;
    })
  }
  create(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire('Formulario invalido', 'ingrese correctamente los datos', 'error');
      return;
    }
    const newVehiculoConductor = this.theFormGroup.value;
    console.log(JSON.stringify(newVehiculoConductor));
    this.vehiculoconductorService.create(newVehiculoConductor).subscribe(data => {
      Swal.fire('Success', 'vehiculoconductor created successfully', 'success');

    })
  }

}


