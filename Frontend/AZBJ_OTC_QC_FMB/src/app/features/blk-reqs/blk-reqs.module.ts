import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestNumberComponent } from './components/test-number/test-number.component';

@NgModule({
  declarations: [
    TestNumberComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TestNumberComponent
  ]
})
export class BlkReqsModule { }
