import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Conductor } from 'src/app/models/conductor';
import { Dueno } from 'src/app/models/dueno';
import { ConductorService } from 'src/app/services/conductor.service';
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
  conductores: Conductor[]

  constructor(
    private duenoService: DuenoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
    private conductorService: ConductorService
  ) { 
    this.dueno = {id: 0, nombre: '', apellido: '', telefono: '', correo: '', direccion: '', fecha_nacimiento: new(Date), usuario_id: 0, conductor_id: null};
    this.mode = 0;
    this.trySend = false;
    this.conductores=[]
  }
  conductoresList(){
    this.conductorService.list().subscribe(data=>{
      this.conductores=data
    })
  }
  

  ngOnInit(): void {
    this.conductoresList()
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
      this.getDueno(this.dueno.id)
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      telefono: ['', [Validators.required, Validators.minLength(2)]],
      correo: ['', [Validators.required, Validators.minLength(2)]],
      direccion: ['', [Validators.required, Validators.minLength(2)]],
      fecha_nacimiento: ['', [Validators.required, Validators.minLength(2)]],
      usuario_id: [0, [Validators.required, Validators.minLength(1)]],
      conductor_id: [null, [Validators.required, Validators.minLength(1)]]
    })
  }
    get getTheFormGroup(){
      return this.theFormGroup.controls
    }
  
    getDueno(id:number){
      this.duenoService.view(id).subscribe(data => {
        this.dueno = data;
        
      })
    }
    create() {
      if (this.theFormGroup.invalid) {
        this.trySend = true;
        Swal.fire('Formulario invalido', 'ingrese correctamente los datos', 'error');
        return;
      }

      console.log(JSON.stringify(this.dueno));  // Verifica los datos antes de enviarlos
      this.duenoService.create(this.dueno).subscribe( data => {
          Swal.fire('Success', 'Dueño created successfully', 'success');
          this.router.navigate(['/duenos/list']); 
        },
        error => {
          Swal.fire('Error', 'Hubo un error al crear el Dueño', 'error');
          console.error('Error al crear Dueño:', error);
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
      const updatedDueno= this.theFormGroup.value;
    
      if (!this.dueno.id) {
        Swal.fire('Error', 'No se ha encontrado el Conductor para actualizar', 'error');
        return;
      }
    
      updatedDueno.id = this.dueno.id;
    
      console.log("Datos a actualizar:", updatedDueno);
    
      this.duenoService.update(updatedDueno).subscribe({
        next: (data) => {
          Swal.fire('Éxito', 'Dueño actualizado exitosamente', 'success');
          this.router.navigate(['/duenos/list']);  
        },
        error: (err) => {
          Swal.fire('Error', 'No se pudo actualizar el Dueño', 'error');
          console.error('Error al actualizar Dueño:', err);
        }
      });
    }
  }