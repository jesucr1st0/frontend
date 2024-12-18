import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicioGastoRoutingModule } from './servicio-gasto-routing.module';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ManageComponent
  ],
  imports: [
    CommonModule,
    ServicioGastoRoutingModule
  ]
})
export class ServicioGastoModule { }
