import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DuenoVehiculoService } from 'src/app/services/dueno-vehiculo.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  duenoVehiculos: any[] = [];
  vehiculoId: number;

  constructor(
    private route: ActivatedRoute,
    private contratoService: DuenoVehiculoService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del cliente desde la URL
    this.vehiculoId = +this.route.snapshot.paramMap.get('id');
    this.fetchContratos();
  }

  fetchContratos() {
    this.contratoService.findByVehiculoId(this.vehiculoId).subscribe(
      (data) => {
        this.duenoVehiculos = data;
      },
      (error) => {
        console.error('Error al obtener dueño vehiculo:', error);
      }
    );
  }

}
