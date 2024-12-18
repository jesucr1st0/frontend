import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculoVehiculoConductorRoutingModule } from './vehiculo-vehiculo-conductor-routing.module';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ManageComponent
  ],
  imports: [
    CommonModule,
    VehiculoVehiculoConductorRoutingModule
  ]
})
export class VehiculoVehiculoConductorModule { }
