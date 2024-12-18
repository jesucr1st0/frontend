import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConductorVehiculoConductorRoutingModule } from './conductor-vehiculo-conductor-routing.module';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ManageComponent
  ],
  imports: [
    CommonModule,
    ConductorVehiculoConductorRoutingModule
  ]
})
export class ConductorVehiculoConductorModule { }
