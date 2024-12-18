import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OperacionService } from 'src/app/services/operacion.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  operaciones: any[] = [];
  vehiculoId: number;

  constructor(
    private route: ActivatedRoute,
    private operacionService: OperacionService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del cliente desde la URL
    this.vehiculoId = +this.route.snapshot.paramMap.get('id');
    this.fetchContratos();
  }

  fetchContratos() {
    this.operacionService.findByVehiculoId(this.vehiculoId).subscribe(
      (data) => {
        this.operaciones = data;
      },
      (error) => {
        console.error('Error al obtener operaciones:', error);
      }
    );
  }

}
