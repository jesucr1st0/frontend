import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoLoteRoutingModule } from './producto-lote-routing.module';
import { ManageComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ManageComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ProductoLoteRoutingModule
  ]
})
export class ProductoLoteModule { }
