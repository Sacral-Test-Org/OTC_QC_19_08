import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UwCommentsComponent } from './components/uw-comments/uw-comments.component';

const routes: Routes = [
  { path: '', component: UwCommentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UwCommentsRoutingModule { }
