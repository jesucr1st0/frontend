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
    conductorId: number;
  
    constructor(
      private router: ActivatedRoute,
      private gastoService: GastoService
    ) {}
  
    ngOnInit(): void {
      // Obtener el ID del cliente desde la URL
      this.conductorId = +this.router.snapshot.paramMap.get('id');
      this.fetchGastos();
    }
  
    fetchGastos() {
      this.gastoService.findByConductorId(this.conductorId).subscribe(
        (data) => {
          this.gastos = data;
        },
        (error) => {
          console.error('Error al obtener gastos:', error);
        }
      );
    }

}
