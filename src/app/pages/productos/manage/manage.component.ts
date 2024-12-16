import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  producto: Producto;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
  ) { 
    this.producto = {nombre: "", peso: 0, cantidad_disponible: 0, precio: 0};
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
      this.producto.id = this.activatedRoute.snapshot.params.id;
      this.getCliente(this.producto.id)
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      nombre:["",  [Validators.pattern(/^[a-zA-Z0-9 ]+$/)]],
      peso:[0, [Validators.min(0.5), Validators.max(10)]],
      cantidad_disponible:[0, [Validators.min(1), Validators.max(500)]],
      precio:[0, [Validators.min(1000), Validators.max(50000)]],
      cliente_id:[1, [Validators.required, Validators.pattern(/^\d+$/)]],
      lote_id:[1, [Validators.required, Validators.pattern(/^\d+$/)]]
    })
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getCliente(id:number){
    this.productoService.view(id).subscribe(data => {
      this.producto = data;
    })
  }
  create(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire('Formulario invalido', 'ingrese correctamente los datos', 'error');
      return;
    }
    const newProducto = this.theFormGroup.value;
    console.log(JSON.stringify(newProducto));
    this.productoService.create(newProducto).subscribe(data => {
      Swal.fire('Success', 'Persona natural created successfully', 'success');
      this.router.navigate(["productos/list"])
    })
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Formulario inválido', 'Ingrese correctamente los datos', 'error');
      return;
    }
  
    // Asignar los datos del formulario
    const updatedProducto = this.theFormGroup.value;
  
    // Verificar si el ID del vehículo está disponible
    if (!this.producto.id) {
      Swal.fire('Error', 'No se ha encontrado el vehículo para actualizar', 'error');
      return;
    }
  
    // Incluye el id del vehículo en el objeto que vas a enviar
    updatedProducto.id = this.producto.id;
  
    console.log("Datos a actualizar:", updatedProducto);
  
    // Llamada al servicio para actualizar el vehículo
    this.productoService.update(updatedProducto).subscribe({
      next: (data) => {
        Swal.fire('Éxito', 'Vehículo actualizado exitosamente', 'success');
        this.router.navigate(['/productos/list']);  // Redirige a la lista de vehículos
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo actualizar el vehículo', 'error');
        console.error('Error al actualizar vehículo:', err);
      }
    });
  }

}
