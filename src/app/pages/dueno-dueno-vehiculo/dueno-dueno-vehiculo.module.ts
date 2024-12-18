import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DuenoDuenoVehiculoRoutingModule } from './dueno-dueno-vehiculo-routing.module';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ManageComponent
  ],
  imports: [
    CommonModule,
    DuenoDuenoVehiculoRoutingModule
  ]
})
export class DuenoDuenoVehiculoModule { }
