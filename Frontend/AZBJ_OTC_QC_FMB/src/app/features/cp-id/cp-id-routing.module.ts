import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentQualityControlComponent } from './components/document-quality-control/document-quality-control.component';

const routes: Routes = [
  { path: 'document-quality-control', component: DocumentQualityControlComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CpIdRoutingModule { }