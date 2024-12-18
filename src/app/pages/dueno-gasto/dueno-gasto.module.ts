import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DuenoGastoRoutingModule } from './dueno-gasto-routing.module';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ManageComponent
  ],
  imports: [
    CommonModule,
    DuenoGastoRoutingModule
  ]
})
export class DuenoGastoModule { }
