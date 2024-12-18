import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuotaService } from 'src/app/services/cuota.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  cuotas: any[] = [];
  contratoId: number;

  constructor(
    private route: ActivatedRoute,
    private cuotaService: CuotaService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del cliente desde la URL
    this.contratoId = +this.route.snapshot.paramMap.get('id');
    this.fetchContratos();
  }

  fetchContratos() {
    this.cuotaService.findByContratoId(this.contratoId).subscribe(
      (data) => {
        this.cuotas = data;
      },
      (error) => {
        console.error('Error al obtener contratos:', error);
      }
    );
  }

}
