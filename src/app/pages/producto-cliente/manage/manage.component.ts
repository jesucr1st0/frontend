import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto-cliente',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  productos: any[] = [];
  clienteId: number;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del cliente desde la URL
    this.clienteId = +this.route.snapshot.paramMap.get('id');
    this.fetchProductos();
  }

  fetchProductos() {
    this.productoService.getProductosByClienteId(this.clienteId).subscribe(
      (data) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }
}