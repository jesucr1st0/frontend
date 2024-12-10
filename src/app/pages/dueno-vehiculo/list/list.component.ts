import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Conductor } from 'src/app/models/conductor';
import { ConductorService } from 'src/app/services/conductor.service';
import Swal from 'sweetalert2';
import { ManageComponent } from '../manage/manage.component';
import { DuenoVehiculo } from 'src/app/models/dueno-vehiculo';
import { DuenoVehiculoService } from 'src/app/services/dueno-vehiculo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  duenoVehiculos :DuenoVehiculo[]

  constructor(private service: DuenoVehiculoService, private router: Router) {
    this.duenoVehiculos = []
   }

  ngOnInit(): void {
    this.list()
  }
  list() {
    this.service.list().subscribe(data => {
      this.duenoVehiculos = data;
      console.log(JSON.stringify(this.duenoVehiculos));
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
    this.router.navigate(["duenoVehiculos/create"])
  }
  update(id:number){
    this.router.navigate([`duenoVehiculos/update/${id}`])
  }

}
