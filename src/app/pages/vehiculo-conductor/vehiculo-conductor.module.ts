import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculoConductorRoutingModule } from './vehiculo-conductor-routing.module';
import { ManageComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManageComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    VehiculoConductorRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VehiculoConductorModule { }
