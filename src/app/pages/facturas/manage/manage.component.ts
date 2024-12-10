import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Factura } from 'src/app/models/factura';
import { FacturaService } from 'src/app/services/factura.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  factura: Factura;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private facturaService: FacturaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
  ) { 
    this.factura = {id: 0, card_number: '', exp_year: '', exp_month: '',
                    cvc: '', name: '', last_name: '', email: '', phone: '',
                    doc_number: '', city: '', address: '', cell_phone: '',
                    bill: '', value: ''
    };
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
      this.factura.id = this.activatedRoute.snapshot.params.id;
      this.getCliente(this.factura.id)
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      card_number:[''],
      exp_year:[''],
      exp_month:[''],
      cvc:[''],
      name:[''],
      last_name:[''],
      email:[''],
      phone:[''],
      doc_number:[''],
      city:[''],
      address:[''],
      cell_phone:[''],
      bill:[''],
      value:[''],
    })
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getCliente(id:number){
    this.facturaService.view(id).subscribe(data => {
      this.factura = data;
    })
  }
  create(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire('Formulario invalido', 'ingrese correctamente los datos', 'error');
      return;
    }
    const newFactura = this.theFormGroup.value;
    console.log(JSON.stringify(newFactura));
    this.facturaService.create(newFactura).subscribe(data => {
      Swal.fire('Success', 'Factura created successfully', 'success');
      this.router.navigate(["facturas/list"])
    })
  }

  update() {
    if (this.theFormGroup.invalid) {
      Swal.fire("Formulario incorrecto", "Ingrese correctamente los datos", "error")
      return
    }
    console.log(JSON.stringify(this.factura));
    this.facturaService.update(this.factura).subscribe(data => {
      Swal.fire("Actualizado", "Se ha actualizado exitosamente el factura", "success")
      this.router.navigate(["facturas/list"])
    })
  }

}
