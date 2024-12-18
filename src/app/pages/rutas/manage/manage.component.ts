import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contrato } from 'src/app/models/contrato';
import { Orden } from 'src/app/models/orden';
import { Ruta } from 'src/app/models/ruta';
import { Vehiculo } from 'src/app/models/vehiculo';
import { ContratoService } from 'src/app/services/contrato.service';
import { OrdenService } from 'src/app/services/orden.service';
import { RutaService } from 'src/app/services/ruta.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  ruta: Ruta;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  contratos: Contrato[];
  vehiculos: Vehiculo[]


  constructor(
    private rutaService: RutaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
    private contratoService: ContratoService,
    private vehiculoService: VehiculoService,
    private ordenService: OrdenService
  ) { 
    this.ruta = {id: 0, contrato_id: null, vehiculo_id: null, fecha_asignacion: new(Date), origen: '', destino: ''};
    this.mode = 0;
    this.trySend = false;
    this.contratos=[]
    this.vehiculos=[]
  }
  contratosList(){
    this.contratoService.list().subscribe(data=>{
      this.contratos= data
    })
  }
  vehiculosList(){
    this.vehiculoService.list().subscribe(data=>{
      this.vehiculos=data
    })
  }

  ngOnInit(): void {
    this.vehiculosList()
    this.contratosList()
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
      this.ruta.id = this.activatedRoute.snapshot.params.id;
      this.getruta(this.ruta.id)
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      contrato_id: [null, [Validators.required, Validators.minLength(1)]],
      vehiculo_id: [null, [Validators.required, Validators.minLength(1)]],
      fecha_asignacion: [new(Date), [Validators.required, Validators.minLength(1)]],
      origen: ['', [Validators.required, Validators.minLength(1)]],
      destino: ['', [Validators.required, Validators.minLength(1)]],
    })
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getruta(id:number){
    this.rutaService.view(id).subscribe(data => {
      this.ruta = data;
      this.theFormGroup.patchValue({
        contrato_id: data.contrato_id,
        vehiculo_id: data.vehiculo_id,
        fecha_asignacion: data.fecha_asignacion,
        origen: data.origen,
        destino: data.destino,
      });
    })
  }
  create(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire('Formulario invalido', 'ingrese correctamente los datos', 'error');
      return;
    }
    const newRuta = this.theFormGroup.value;
    console.log(JSON.stringify(newRuta));
    this.rutaService.create(newRuta).subscribe(data => {
      Swal.fire('Success', 'ruta created successfully', 'success');
      this.router.navigate(['/rutas/list']);

    })
  }
  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Formulario inválido', 'Ingrese correctamente los datos', 'error');
      return;
    }
  
    // Asignar los datos del formulario
    const updatedruta = this.theFormGroup.value;
  
    // Verificar si el ID del vehículo está disponible
    if (!this.ruta.id) {
      Swal.fire('Error', 'No se ha encontrado el vehículo para actualizar', 'error');
      return;
    }
  
    // Incluye el id del vehículo en el objeto que vas a enviar
    updatedruta.id = this.ruta.id;
  
    console.log("Datos a actualizar:", updatedruta);
  
    // Llamada al servicio para actualizar el vehículo
    this.rutaService.update(updatedruta).subscribe({
      next: (data) => {
        Swal.fire('Éxito', 'Vehículo actualizado exitosamente', 'success');
        this.router.navigate(['/rutas/list']);  // Redirige a la lista de vehículos
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo actualizar el vehículo', 'error');
        console.error('Error al actualizar vehículo:', err);
      }
    });
  }

}