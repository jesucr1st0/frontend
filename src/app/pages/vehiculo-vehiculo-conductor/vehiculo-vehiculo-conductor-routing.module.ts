import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from '../theaters/manage/manage.component';

const routes: Routes = [
  { path: '', component: ManageComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculoVehiculoConductorRoutingModule { }
