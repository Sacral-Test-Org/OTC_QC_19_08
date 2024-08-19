import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeqcSaerchComponent } from './components/deqc-saerch/deqc-saerch.component';

const routes: Routes = [
  { path: '', component: DeqcSaerchComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeqcSaerchRoutingModule { }