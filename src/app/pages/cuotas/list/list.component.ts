import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CuotaService } from 'src/app/services/cuota.service';
import Swal from 'sweetalert2';
import { ManageComponent } from '../manage/manage.component';
import { Cuota } from 'src/app/models/cuota';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  cuotas :Cuota[]

  constructor(private service: CuotaService, private router: Router) {
    this.cuotas = []
   }

  ngOnInit(): void {
    this.list()
  }
  list() {
    this.service.list().subscribe(data => {
      this.cuotas = data;
      console.log(JSON.stringify(this.cuotas));
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
    this.router.navigate(["cuotas/create"])
  }
  update(id:number){
    this.router.navigate([`cuotas/update/${id}`])
  }

}

