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
    }
];
