import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonasNaturalesRoutingModule } from './personas-naturales-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    PersonasNaturalesRoutingModule
  ]
})
export class PersonasNaturalesModule { }
