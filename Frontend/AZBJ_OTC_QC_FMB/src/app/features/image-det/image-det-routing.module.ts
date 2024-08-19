import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageDetailsComponent } from './components/image-details/image-details.component';

const routes: Routes = [
  { path: 'image-details', component: ImageDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageDetRoutingModule { }
