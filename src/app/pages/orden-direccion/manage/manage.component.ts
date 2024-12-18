import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdenService } from 'src/app/services/orden.service';

@Component({
  selector: 'app-orden-direccion',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  ordenes: any[] = [];
  direccionId: number;

  constructor(
    private route: ActivatedRoute,
    private ordenService: OrdenService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del direccion desde la URL
    this.direccionId = +this.route.snapshot.paramMap.get('id');
    this.fetchOrdenes();
  }

  fetchOrdenes() {
    this.ordenService.getOrdenesByDireccionId(this.direccionId).subscribe(
      (data) => {
        this.ordenes = data;
      },
      (error) => {
        console.error('Error al obtener ordenes:', error);
      }
    );
  }
}