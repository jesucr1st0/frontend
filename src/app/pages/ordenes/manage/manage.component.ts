import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Direccion } from 'src/app/models/direccion';
import { Lote } from 'src/app/models/lote';
import { Orden } from 'src/app/models/orden';
import { Ruta } from 'src/app/models/ruta';
import { DireccionService } from 'src/app/services/direccion.service';
import { LoteService } from 'src/app/services/lote.service';
import { OrdenService } from 'src/app/services/orden.service';
import { RutaService } from 'src/app/services/ruta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  orden: Orden;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  lotes: Lote[];
  direcciones: Direccion[];
  rutas: Ruta[];

  constructor(
    private ordenService: OrdenService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
    private loteService: LoteService,
    private direccionService: DireccionService,
    private rutaService: RutaService
  ) { 
    this.rutas= [];
    this.direcciones = [];
    this.lotes = [];
    this.orden = {lote_id: null, direccion_id: null, ruta_id: null};
    this.mode = 0;
    this.trySend = false;
  }

  direccionesList() {
    this.direccionService.list().subscribe(data => {
      this.direcciones = data;
    })
  }

  lotesList() {
    this.loteService.list().subscribe(data => {
      this.lotes = data;
    })
  }

  rutasList() {
    this.rutaService.list().subscribe(data => {
      this.rutas= data;
    })
  }

  ngOnInit(): void {
    this.rutasList()
    this.direccionesList()
    this.lotesList()
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
      this.orden.id = this.activatedRoute.snapshot.params.id;
      this.getCliente(this.orden.id)
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      ruta_id:[null, [Validators.required, Validators.pattern(/^\d+$/)]],
      direccion_id:[null, [Validators.required, Validators.pattern(/^\d+$/)]],
      lote_id:[null, [Validators.required, Validators.pattern(/^\d+$/)]],
    })
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getCliente(id:number){
    this.ordenService.view(id).subscribe(data => {
      this.orden = data;
    })
  }
  create(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire('Formulario invalido', 'ingrese correctamente los datos', 'error');
      return;
    }
    const newOrden = this.theFormGroup.value;
    console.log(JSON.stringify(newOrden));
    this.ordenService.create(newOrden).subscribe(data => {
      Swal.fire('Success', 'Orden created successfully', 'success');
      this.router.navigate(["ordenes/list"])
    })
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Formulario inválido', 'Ingrese correctamente los datos', 'error');
      return;
    }
  
    // Asignar los datos del formulario
    const updatedOrden = this.theFormGroup.value;
  
    // Verificar si el ID del vehículo está disponible
    if (!this.orden.id) {
      Swal.fire('Error', 'No se ha encontrado el vehículo para actualizar', 'error');
      return;
    }
  
    // Incluye el id del vehículo en el objeto que vas a enviar
    updatedOrden.id = this.orden.id;
  
    console.log("Datos a actualizar:", updatedOrden);
  
    // Llamada al servicio para actualizar el vehículo
    this.ordenService.update(updatedOrden).subscribe({
      next: (data) => {
        Swal.fire('Éxito', 'Vehículo actualizado exitosamente', 'success');
        this.router.navigate(['/ordenes/list']);  // Redirige a la lista de vehículos
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo actualizar el vehículo', 'error');
        console.error('Error al actualizar vehículo:', err);
      }
    });
  }

}
