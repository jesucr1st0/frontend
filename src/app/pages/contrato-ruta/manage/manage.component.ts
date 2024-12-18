import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RutaService } from 'src/app/services/ruta.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  rutas: any[] = [];
  contratoId: number;

  constructor(
    private route: ActivatedRoute,
    private rutaService: RutaService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del cliente desde la URL
    this.contratoId = +this.route.snapshot.paramMap.get('id');
    this.fetchContratos();
  }

  fetchContratos() {
    this.rutaService.findByContratoId(this.contratoId).subscribe(
      (data) => {
        this.rutas = data;
      },
      (error) => {
        console.error('Error al obtener contratos:', error);
      }
    );
  }

}
