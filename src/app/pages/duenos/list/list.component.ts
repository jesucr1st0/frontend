import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DuenoService } from 'src/app/services/dueno.service';
import Swal from 'sweetalert2';
import { ManageComponent } from '../manage/manage.component';
import { Dueno } from 'src/app/models/dueno';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  duenos :Dueno[]

  constructor(private service: DuenoService, private router: Router) {
    this.duenos = []
   }

  ngOnInit(): void {
    this.list()
  }
  list() {
    this.service.list().subscribe(data => {
      this.duenos = data;
      console.log(JSON.stringify(this.duenos));
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
    this.router.navigate(["duenos/create"])
  }
  update(id:number){
    this.router.navigate([`duenos/update/${id}`])
  }

}

