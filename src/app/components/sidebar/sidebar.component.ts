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
    { path: '/conductores', title: 'Conductores',  icon:'ni-single-02 text-green', class: '',type:1 },
    { path: '/vehiculos', title: 'Vehiculos',  icon:'ni-bus-front-12 text-red', class: '',type:1 },
    { path: '/duenos', title: 'Duenos',  icon:'ni-single-02 text-blue', class: '',type:1 },
    { path: '/contratos', title: 'Contratos', icon: 'ni-paper-diploma text-black', class: '', type: 1 },
    { path: '/rutas', title: 'Rutas', icon: 'ni-square-pin text-orange', class: '', type: 1 },
    { path: '/gastos', title: 'Gastos', icon: 'ni-money-coins text-red', class: '', type: 1 },
    { path: '/cuotas', title: 'Cuotas', icon: 'ni-credit-card text-green', class: '', type: 1 },
    { path: '/servicios', title: 'Servicios', icon: 'ni-diamond text-purple', class: '', type: 1 },
    { path: '/vehiculo-conductor', title: 'Vehículo-Conductor', icon: 'ni-delivery-fast text-orange', class: '', type: 1 },
    { path: '/dueno-vehiculo', title: 'Dueño-Vehículo', icon: 'ni-badge text-green', class: '', type: 1 },




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
