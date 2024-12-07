import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DuenoVehiculoRoutingModule } from './dueno-vehiculo-routing.module';
import { ManageComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ManageComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    DuenoVehiculoRoutingModule
  ]
})
export class DuenoVehiculoModule { }
