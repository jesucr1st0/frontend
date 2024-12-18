import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratoRutaRoutingModule } from './contrato-ruta-routing.module';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ManageComponent
  ],
  imports: [
    CommonModule,
    ContratoRutaRoutingModule
  ]
})
export class ContratoRutaModule { }
