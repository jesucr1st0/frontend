import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Lote } from 'src/app/models/lote';
import { LoteService } from 'src/app/services/lote.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  lote: Lote;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private loteService: LoteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
  ) { 
    this.lote = {id: 0, peso_total: 0, cantidad: 0, estado: ''};
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
      this.lote.id = this.activatedRoute.snapshot.params.id;
      this.getCliente(this.lote.id)
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      peso_total:[0],
      cantidad:[0],
      estado:[''],
      ruta_id:[null]
    })
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getCliente(id:number){
    this.loteService.view(id).subscribe(data => {
      this.lote = data;
    })
  }
  create(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire('Formulario invalido', 'ingrese correctamente los datos', 'error');
      return;
    }
    const newLote = this.theFormGroup.value;
    console.log(JSON.stringify(newLote));
    this.loteService.create(newLote).subscribe(data => {
      Swal.fire('Success', 'Lote created successfully', 'success');
      this.router.navigate(["lotes/list"])
    })
  }

  update() {
    if (this.theFormGroup.invalid) {
      Swal.fire("Formulario incorrecto", "Ingrese correctamente los datos", "error")
      return
    }
    console.log(JSON.stringify(this.lote));
    this.loteService.update(this.lote).subscribe(data => {
      Swal.fire("Actualizado", "Se ha actualizado exitosamente el lote", "success")
      this.router.navigate(["lotes/list"])
    })
  }

}
