import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratoClienteRoutingModule } from './contrato-cliente-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    ContratoClienteRoutingModule
  ]
})
export class ContratoClienteModule { }
