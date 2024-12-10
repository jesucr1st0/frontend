import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaNatural } from 'src/app/models/persona-natural';
import { PersonaNaturalService } from 'src/app/services/persona-natural.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  personas_naturales: PersonaNatural[]

  constructor(private service: PersonaNaturalService, private router: Router) {
    this.personas_naturales = []
   }

  ngOnInit(): void {
    this.list()
  }
  list() {
    this.service.list().subscribe(data => {
      this.personas_naturales = data;
      console.log(JSON.stringify(this.personas_naturales));
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
    this.router.navigate(["personas-naturales/create"])
  }
  update(id:number){
    this.router.navigate([`personas-naturales/update/${id}`])
  }

}
