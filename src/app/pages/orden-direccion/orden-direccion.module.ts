import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdenDireccionRoutingModule } from './orden-direccion-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    OrdenDireccionRoutingModule
  ]
})
export class OrdenDireccionModule { }
