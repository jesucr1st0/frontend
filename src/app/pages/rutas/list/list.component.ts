import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ruta } from 'src/app/models/ruta';
import { RutaService } from 'src/app/services/ruta.service';
import Swal from 'sweetalert2';
import { ManageComponent } from '../manage/manage.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  rutas :Ruta[]

  constructor(private service: RutaService, private router: Router) {
    this.rutas = []
   }

  ngOnInit(): void {
    this.list()
  }
  list() {
    this.service.list().subscribe(data => {
      this.rutas = data;
      console.log(JSON.stringify(this.rutas));
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
    this.router.navigate(["rutas/create"])
  }
  update(id:number){
    this.router.navigate([`rutas/update/${id}`])
  }

}
