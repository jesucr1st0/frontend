import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradoresRoutingModule } from './administradores-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    AdministradoresRoutingModule
  ]
})
export class AdministradoresModule { }
