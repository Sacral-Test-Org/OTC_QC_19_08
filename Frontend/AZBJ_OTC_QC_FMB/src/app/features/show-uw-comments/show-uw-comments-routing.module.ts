import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowUwCommentsComponent } from './components/show-uw-comments/show-uw-comments.component';

const routes: Routes = [
  { path: '', component: ShowUwCommentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowUwCommentsRoutingModule { }