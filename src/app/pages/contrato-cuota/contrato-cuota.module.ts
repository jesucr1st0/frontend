import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratoCuotaRoutingModule } from './contrato-cuota-routing.module';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ManageComponent
  ],
  imports: [
    CommonModule,
    ContratoCuotaRoutingModule
  ]
})
export class ContratoCuotaModule { }
