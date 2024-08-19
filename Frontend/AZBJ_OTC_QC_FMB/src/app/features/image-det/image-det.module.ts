import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageDetRoutingModule } from './image-det-routing.module';
import { ImageDetailsComponent } from './components/image-details/image-details.component';

@NgModule({
  declarations: [
    ImageDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ImageDetRoutingModule
  ]
})
export class ImageDetModule { }
