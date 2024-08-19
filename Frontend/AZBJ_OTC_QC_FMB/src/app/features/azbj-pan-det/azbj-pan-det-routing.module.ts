import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanDetailsComponent } from './components/pan-details/pan-details.component';

const routes: Routes = [
  { path: 'pan-details', component: PanDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AzbjPanDetRoutingModule { }