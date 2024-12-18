import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoClienteRoutingModule } from './producto-cliente-routing.module';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ManageComponent
  ],
  imports: [
    CommonModule,
    ProductoClienteRoutingModule
  ]
})
export class ProductoClienteModule { }
