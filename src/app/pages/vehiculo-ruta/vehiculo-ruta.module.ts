import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculoRutaRoutingModule } from './vehiculo-ruta-routing.module';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ManageComponent
  ],
  imports: [
    CommonModule,
    VehiculoRutaRoutingModule
  ]
})
export class VehiculoRutaModule { }
