import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContratoService } from 'src/app/services/contrato.service';

@Component({
  selector: 'app-contrato-cliente',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  contratos: any[] = [];
  clienteId: number;

  constructor(
    private route: ActivatedRoute,
    private contratoService: ContratoService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del cliente desde la URL
    this.clienteId = +this.route.snapshot.paramMap.get('id');
    this.fetchContratos();
  }

  fetchContratos() {
    this.contratoService.getContratosByClienteId(this.clienteId).subscribe(
      (data) => {
        this.contratos = data;
      },
      (error) => {
        console.error('Error al obtener contratos:', error);
      }
    );
  }
}