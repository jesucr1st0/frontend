import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  cliente: Cliente;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
  ) { 
    this.cliente = {id: 0, nombre: '', telefono: ''};
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
      this.cliente.id = this.activatedRoute.snapshot.params.id;
      this.getCliente(this.cliente.id)
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      nombre:[''],
      telefono:[0]
    })
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getCliente(id:number){
    this.clienteService.view(id).subscribe(data => {
      this.cliente = data;
    })
  }
  create(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire('Formulario invalido', 'ingrese correctamente los datos', 'error');
      return;
    }
    const newcliente = this.theFormGroup.value;
    console.log(JSON.stringify(newcliente));
    this.clienteService.create(newcliente).subscribe(data => {
      Swal.fire('Success', 'Cliente created successfully', 'success');
      this.router.navigate(["clientes/list"])
    })
  }

  update() {
    if (this.theFormGroup.invalid) {
      Swal.fire("Formulario incorrecto", "Ingrese correctamente los datos", "error")
      return
    }
    console.log(JSON.stringify(this.cliente));
    this.clienteService.update(this.cliente).subscribe(data => {
      Swal.fire("Actualizado", "Se ha actualizado exitosamente el cliente", "success")
      this.router.navigate(["clientes/list"])
    })
  }

}
