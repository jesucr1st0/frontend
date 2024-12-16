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
      cliente_id: [0, [Validators.required, Validators.minLength(1)]],
      fecha_inicio: [new(Date), [Validators.required, Validators.minLength(2)]],
      fecha_fin: [new(Date), [Validators.required, Validators.minLength(2)]],
      tipo_contrato: ['', [Validators.required, Validators.minLength(1)]],
      monto: [0, [Validators.required, Validators.minLength(1)]],
      estado: ['', [Validators.required, Validators.minLength(1)]],
      descripcion: ['', [Validators.required, Validators.minLength(1)]],
      terminos_y_condiciones: ['', [Validators.required, Validators.minLength(1)]],

    })
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getcontrato(id:number){
    this.contratoService.view(id).subscribe(data => {
      this.contrato = data;
      this.theFormGroup.patchValue({
        cliente_id: data.cliente_id,
        fecha_inicio: data.fecha_inicio, 
        fecha_fin: data.fecha_fin, 
        tipo_contrato: data.tipo_contrato,
        monto: data.monto,
        estado: data.estado, 
        descripcion: data.descripcion, 
        terminos_y_condiciones: data.terminos_y_condiciones,
      });
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
      this.router.navigate(['/contratos/list']); 

    },
    error => {
        Swal.fire('Error', 'Hubo un error al crear el contrato', 'error');
        console.error('Error al crear contrato:', error);
      }
    );
  }
  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Formulario inválido', 'Ingrese correctamente los datos', 'error');
      return;
    }
  
    // Asignar los datos del formulario
    const updatedContrato = this.theFormGroup.value;
  
    // Verificar si el ID del Contrato está disponible
    if (!this.contrato.id) {
      Swal.fire('Error', 'No se ha encontrado el Contrato para actualizar', 'error');
      return;
    }
  
    // Incluye el id del Contrato en el objeto que vas a enviar
    updatedContrato.id = this.contrato.id;
  
    console.log("Datos a actualizar:", updatedContrato);
  
    // Llamada al servicio para actualizar el Contrato
    this.contratoService.update(updatedContrato).subscribe({
      next: (data) => {
        Swal.fire('Éxito', 'Contrato actualizado exitosamente', 'success');
        this.router.navigate(['/contratos/list']);  // Redirige a la lista de Contratos
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo actualizar el Contrato', 'error');
        console.error('Error al actualizar Contrato:', err);
      }
    });
  }

}
