import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanDetailsComponent } from './components/pan-details/pan-details.component';
import { PanDetailsModel } from './models/pan-details.model';

@NgModule({
  declarations: [
    PanDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    PanDetailsComponent
  ]
})
export class AzbjPanDetModule { }
