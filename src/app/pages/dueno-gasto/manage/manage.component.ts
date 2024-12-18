import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GastoService } from 'src/app/services/gasto.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

   gastos: any[] = [];
   duenoId: number;
 
   constructor(
     private route: ActivatedRoute,
     private gastoService: GastoService
   ) {}
 
   ngOnInit(): void {
     // Obtener el ID del cliente desde la URL
     this.duenoId = +this.route.snapshot.paramMap.get('id');
     this.fetchContratos();
   }
 
   fetchContratos() {
     this.gastoService.findByDuenoId(this.duenoId).subscribe(
       (data) => {
         this.gastos = data;
       },
       (error) => {
         console.error('Error al obtener gastos:', error);
       }
     );
   }

}
