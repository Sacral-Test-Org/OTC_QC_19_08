import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeqcDisplayComponent } from './components/deqc-display/deqc-display.component';

const routes: Routes = [
  { path: '', component: DeqcDisplayComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeqcDisplayRoutingModule { }
