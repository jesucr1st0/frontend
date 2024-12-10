import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Conductor } from 'src/app/models/conductor';
import { ConductorService } from 'src/app/services/conductor.service';
import Swal from 'sweetalert2';
import { ManageComponent } from '../manage/manage.component';
import { VehiculoConductor } from 'src/app/models/vehiculo-conductor';
import { VehiculoConductorService } from 'src/app/services/vehiculo-conductor.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  vehiculoconductor :VehiculoConductor[]

  constructor(private service: VehiculoConductorService, private router: Router) {
    this.vehiculoconductor = []
   }

  ngOnInit(): void {
    this.list()
  }
  list() {
    this.service.list().subscribe(data => {
      this.vehiculoconductor = data;
      console.log(JSON.stringify(this.vehiculoconductor));
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
    this.router.navigate(["vehiculo-conductor/create"])
  }
  update(id:number){
    this.router.navigate([`vehiculo-conductor/update/${id}`])
  }

}

