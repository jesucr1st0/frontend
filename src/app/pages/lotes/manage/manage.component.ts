import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Lote } from 'src/app/models/lote';
import { Ruta } from 'src/app/models/ruta';
import { LoteService } from 'src/app/services/lote.service';
import { RutaService } from 'src/app/services/ruta.service';
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
  rutas: Ruta[]

  constructor(
    private loteService: LoteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
    private rutaService: RutaService
  ) {
    this.rutas = [] 
    this.lote = {id: 0, peso_total: 0, cantidad: 0, estado: '', ruta_id: null};
    this.mode = 0;
    this.trySend = false;
  }

  rutasList() {
    this.rutaService.list(). subscribe(data => {
      this.rutas = data;
    })
  }

  ngOnInit(): void {
    this.rutasList()
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
      peso_total:[0, [Validators.pattern(/^\d+$/), Validators.min(200), Validators.max(1000)]],
      cantidad:[0, [Validators.pattern(/^\d+$/), Validators.min(1), Validators.max(20)]],
      estado:[''],
      ruta_id:[null, [Validators.required, Validators.pattern(/^\d+$/)]]
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
      this.trySend = true;
      Swal.fire('Formulario inválido', 'Ingrese correctamente los datos', 'error');
      return;
    }
  
    const updatedLote = this.theFormGroup.value;
  
    if (!this.lote.id) {
      Swal.fire('Error', 'No se ha encontrado el lote para actualizar', 'error');
      return;
    }
  
    updatedLote.id = this.lote.id;
  
    console.log("Datos a actualizar:", updatedLote);
   
    this.loteService.update(updatedLote).subscribe({
      next: (data) => {
        Swal.fire('Éxito', 'Lote actualizado exitosamente', 'success');
        this.router.navigate(['/lotes/list']);  
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo actualizar el lote', 'error');
        console.error('Error al actualizar lote:', err);
      }
    });
  }

}
