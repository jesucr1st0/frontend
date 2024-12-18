import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculoDuenoVehiculoRoutingModule } from './vehiculo-dueno-vehiculo-routing.module';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ManageComponent
  ],
  imports: [
    CommonModule,
    VehiculoDuenoVehiculoRoutingModule
  ]
})
export class VehiculoDuenoVehiculoModule { }
