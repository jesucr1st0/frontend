import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculoOperacionRoutingModule } from './vehiculo-operacion-routing.module';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ManageComponent
  ],
  imports: [
    CommonModule,
    VehiculoOperacionRoutingModule
  ]
})
export class VehiculoOperacionModule { }
