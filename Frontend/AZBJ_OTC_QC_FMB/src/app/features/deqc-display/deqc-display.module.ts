import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeqcDisplayComponent } from './components/deqc-display/deqc-display.component';

@NgModule({
  declarations: [DeqcDisplayComponent],
  imports: [CommonModule],
  exports: [DeqcDisplayComponent]
})
export class DeqcDisplayModule { }
