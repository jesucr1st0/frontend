import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehiculoConductorService } from 'src/app/services/vehiculo-conductor.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

    vehiculoConductores: any[] = [];
    conductorId: number;
  
    constructor(
      private router: ActivatedRoute,
      private vehiculoConductorService: VehiculoConductorService
    ) {}
  
    ngOnInit(): void {
      // Obtener el ID del cliente desde la URL
      this.conductorId = +this.router.snapshot.paramMap.get('id');
      this.fetchGastos();
    }
  
    fetchGastos() {
      this.vehiculoConductorService.findByConductorId(this.conductorId).subscribe(
        (data) => {
          this.vehiculoConductores = data;
        },
        (error) => {
          console.error('Error al obtener vehiculos conductor:', error);
        }
      );
    }

}
