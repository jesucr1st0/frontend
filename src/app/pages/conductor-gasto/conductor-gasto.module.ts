import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConductorGastoRoutingModule } from './conductor-gasto-routing.module';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ManageComponent
  ],
  imports: [
    CommonModule,
    ConductorGastoRoutingModule
  ]
})
export class ConductorGastoModule { }
