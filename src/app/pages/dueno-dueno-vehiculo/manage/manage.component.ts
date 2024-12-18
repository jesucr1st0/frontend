import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DuenoVehiculoService } from 'src/app/services/dueno-vehiculo.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  duenosVehiculos: any[] = [];
  duenoId: number;

  constructor(
    private route: ActivatedRoute,
    private duenosVehiculosService: DuenoVehiculoService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del cliente desde la URL
    this.duenoId = +this.route.snapshot.paramMap.get('id');
    this.fetchContratos();
  }

  fetchContratos() {
    this.duenosVehiculosService.findByDuenoId(this.duenoId).subscribe(
      (data) => {
        this.duenosVehiculos = data;
      },
      (error) => {
        console.error('Error al obtener vehiculos:', error);
      }
    );
  }

}
