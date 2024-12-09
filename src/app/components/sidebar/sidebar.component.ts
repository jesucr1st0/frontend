import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    type: number;//0--> puede ver si no esta logueado
                 //1--> puede ver si esta logueado
                 //2--> puede ver sin importar
}
export const ROUTES: RouteInfo[] = [
    //{ path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '', type: 1 },
    //{ path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '', type:1 },
    //{ path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '',type:1 },
    //{ path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '', type:1 },
    //{ path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '',type:1 },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '',type:1 },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '',type:1 },
    { path: '/conductores/list', title: 'Conductores',  icon:'ni-single-02 text-green', class: '',type:1 },
    { path: '/vehiculos/list', title: 'Vehiculos',  icon:'ni-bus-front-12 text-red', class: '',type:1 },
    { path: '/duenos/list', title: 'Duenos',  icon:'ni-single-02 text-blue', class: '',type:1 },
    { path: '/contratos/list', title: 'Contratos', icon: 'ni-paper-diploma text-black', class: '', type: 1 },
    { path: '/rutas/list', title: 'Rutas', icon: 'ni-square-pin text-orange', class: '', type: 1 },
    { path: '/gastos/list', title: 'Gastos', icon: 'ni-money-coins text-red', class: '', type: 1 },
    { path: '/cuotas/list', title: 'Cuotas', icon: 'ni-credit-card text-green', class: '', type: 1 },
    { path: '/servicios/list', title: 'Servicios', icon: 'ni-diamond text-purple', class: '', type: 1 },
    { path: '/vehiculo-conductor/list', title: 'Vehículo-Conductor', icon: 'ni-delivery-fast text-orange', class: '', type: 1 },
    { path: '/dueno-vehiculo/list', title: 'Dueño-Vehículo', icon: 'ni-badge text-green', class: '', type: 1 },
    { path: '/administradores/list', title: 'Administradores', icon: 'ni-badge text-green', class: '', type: 1 },
    { path: '/clientes/list', title: 'Clientes', icon: 'ni-badge text-green', class: '', type: 1 },
    { path: '/direcciones/list', title: 'Direcciones', icon: 'ni-badge text-green', class: '', type: 1 },
    { path: '/lotes/list', title: 'Lotes', icon: 'ni-badge text-green', class: '', type: 1 },
    { path: '/operaciones/list', title: 'Operaciones', icon: 'ni-badge text-green', class: '', type: 1 },
    { path: '/ordenes/list', title: 'Ordenes', icon: 'ni-badge text-green', class: '', type: 1 },
    { path: '/personas-naturales/list', title: 'Personas Naturales', icon: 'ni-badge text-green', class: '', type: 1 },
    { path: '/productos/list', title: 'Productos', icon: 'ni-badge text-green', class: '', type: 1 },
    { path: '/theaters/list', title: 'Teatros', icon: 'ni-badge text-green', class: '', type: 2 }


];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
