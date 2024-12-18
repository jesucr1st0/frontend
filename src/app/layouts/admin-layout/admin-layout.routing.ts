import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AuthenticatedGuard } from 'src/app/guards/authenticated.guard';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { 
        path: 'theaters', 
        //canActivate: [AuthenticatedGuard],     
        children:[ 
            {
                path: '',
                loadChildren: () => import('src/app/pages/theaters/theaters.module').then(m => m.TheatersModule)
            } 
        ]
    },
    {
        path: 'seats',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/seats/seats.module').then(m => m.SeatsModule)
            }
        ]
    },
    { path: 'departamentos',
        children: [
        {
          path: '',  
          loadChildren: () => import('src/app/pages/departamentos/departamentos.module').then(m => m.DepartamentosModule)
        }
      ]
    },
    { path: 'conductores',
        children: [
        {
            path: '',
            loadChildren: () => import('src/app/pages/conductores/conductores.module').then(m => m.ConductoresModule)
        }
      ]
    },
    {path: 'vehiculos',
        children: [
        {
            path: '',
            loadChildren: () => import('src/app/pages/vehiculos/vehiculos.module').then(m => m.VehiculosModule)
        }
      ]
    },
    {path: 'rutas',
        children: [
        {
            path: '',
            loadChildren: () => import('src/app/pages/rutas/rutas.module').then(m => m.RutasModule)
        }
      ]
    },
    {path: 'cuotas',
        children: [
        {
            path: '',
            loadChildren: () => import('src/app/pages/cuotas/cuotas.module').then(m => m.CuotasModule)

        }
    ]
    },
    {path: 'contratos',
        children: [
        {
            path: '',
            loadChildren: () => import('src/app/pages/contratos/contratos.module').then(m => m.ContratosModule)

        }
    ]
    },
    {path: 'duenos',
        children: [
        {
            path: '',
            loadChildren: () => import('src/app/pages/duenos/duenos.module').then(m => m.DuenosModule)
        }
    ]
    },
    {path: 'facturas',
        children: [
        {
            path: '',
            loadChildren: () => import('src/app/pages/facturas/facturas.module').then(m => m.FacturasModule)
        }
    ]
    },
    {path: 'gastos',
        children: [
        {
            path: '',
            loadChildren: () => import('src/app/pages/gastos/gastos.module').then(m => m.GastosModule)
        }
    ]
    },
    {path: 'servicios',
        children: [
        {
            path: '',
            loadChildren: () => import('src/app/pages/servicios/servicios.module').then(m => m.ServiciosModule)
        }
    ]
    },
    {path: 'dueno-vehiculo',
        children: [
        {
            path: '',
            loadChildren: () => import('src/app/pages/dueno-vehiculo/dueno-vehiculo.module').then(m => m.DuenoVehiculoModule)
        }
    ]
    },
    {path: 'vehiculo-conductor',
        children: [
        {
            path: '',
            loadChildren: () => import('src/app/pages/vehiculo-conductor/vehiculo-conductor.module').then(m => m.VehiculoConductorModule)
        }
    ]
    },
    {path: 'productos',
        children: [
        {
            path: '',
            loadChildren: () => import('src/app/pages/productos/productos.module').then(m => m.ProductosModule)
        }
    ]
    },
    {path: 'lotes',
        children: [
        {
            path: '',
            loadChildren: () => import('src/app/pages/lotes/lotes.module').then(m => m.LotesModule)
        }
    ]
    },
    {path: 'direcciones',
        children: [
        {
            path: '',
            loadChildren: () => import('src/app/pages/direcciones/direcciones.module').then(m => m.DireccionesModule)
        }
    ]
    },
    {path: 'ordenes',
        children: [
        {
            path: '',
            loadChildren: () => import('src/app/pages/ordenes/ordenes.module').then(m => m.OrdenesModule)
        }
    ]
    },
    {path: 'operaciones',
        children: [
        {
            path: '',
            loadChildren: () => import('src/app/pages/operaciones/operaciones.module').then(m => m.OperacionesModule)
        }
    ]
    },
    {path: 'clientes',
        children: [
        {
            path: '',
            loadChildren: () => import('src/app/pages/clientes/clientes.module').then(m => m.ClientesModule)
        }
    ]
    },
    {path: 'personas-naturales',
        children: [
        {
            path: '',
            loadChildren: () => import('src/app/pages/personas-naturales/personas-naturales.module').then(m => m.PersonasNaturalesModule)
        }
    ]
    },
    {path: 'administradores',
        children: [
        {
            path: '',
            loadChildren: () => import('src/app/pages/administradores/administradores.module').then(m => m.AdministradoresModule)
        }
    ]
    },
    { 
        path: 'clientes/:id/productos', // Ruta dinámica con el ID del cliente
        loadChildren: () => import('src/app/pages/producto-cliente/producto-cliente.module').then(m => m.ProductoClienteModule)
    },
    { 
        path: 'clientes/:id/contratos', // Ruta dinámica con el ID del cliente
        loadChildren: () => import('src/app/pages/contrato-cliente/contrato-cliente.module').then(m => m.ContratoClienteModule)
    },
    { 
        path: 'lotes/:id/productos', // Ruta dinámica con el ID del cliente
        loadChildren: () => import('src/app/pages/producto-lote/producto-lote.module').then(m => m.ProductoLoteModule)
    },
    { 
        path: 'direcciones/:id/ordenes', // Ruta dinámica con el ID del cliente
        loadChildren: () => import('src/app/pages/orden-direccion/orden-direccion.module').then(m => m.OrdenDireccionModule)
    },
    {path: 'chats',
        children: [
        {
            path: '',
            loadChildren: () => import('src/app/pages/chat/chat.module').then(m => m.ChatModule)
        }
    ]
    },
];
