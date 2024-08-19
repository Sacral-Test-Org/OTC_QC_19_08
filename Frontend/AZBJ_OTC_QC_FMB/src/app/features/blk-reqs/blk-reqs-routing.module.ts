import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestNumberComponent } from './components/test-number/test-number.component';

const routes: Routes = [
  { path: 'test-number', component: TestNumberComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlkReqsRoutingModule { }
