import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GastoService } from 'src/app/services/gasto.service';
import Swal from 'sweetalert2';
import { ManageComponent } from '../manage/manage.component';
import { Gasto } from 'src/app/models/gasto';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  gastos :Gasto[]

  constructor(private service: GastoService, private router: Router) {
    this.gastos = []
   }

  ngOnInit(): void {
    this.list()
  }
  list() {
    this.service.list().subscribe(data => {
      this.gastos = data;
      console.log(JSON.stringify(this.gastos));
    })
  }

  delete(id:number) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Simular eliminación del elemento
          this.service.delete(id).
          subscribe(data =>{
            Swal.fire(
              'Eliminado',
              'El elemento ha sido eliminado exitosamente.',
              'success'
            );
            this.ngOnInit()
          })
        }
    })
  }
  create(){
    this.router.navigate(["gastos/create"])
  }
  update(id:number){
    this.router.navigate([`gastos/update/${id}`])
  }

}
