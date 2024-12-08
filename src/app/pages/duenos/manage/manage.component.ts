import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dueno } from 'src/app/models/dueno';
import { DuenoService } from 'src/app/services/dueno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  dueno: Dueno;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private duenoService: DuenoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
  ) { 
    this.dueno = {id: 0, nombre: '', apellido: '', telefono: '', correo: '', direccion: '', fecha_nacimiento: new(Date)};
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
      this.dueno.id = this.activatedRoute.snapshot.params.id;
      this.getdueno(this.dueno.id)
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

  getdueno(id:number){
    this.duenoService.view(id).subscribe(data => {
      this.dueno = data;
    })
  }
  create(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire('Formulario invalido', 'ingrese correctamente los datos', 'error');
      return;
    }
    const newDueno = this.theFormGroup.value;
    console.log(JSON.stringify(newDueno));
    this.duenoService.create(newDueno).subscribe(data => {
      Swal.fire('Success', 'dueno created successfully', 'success');

    })
  }

}
