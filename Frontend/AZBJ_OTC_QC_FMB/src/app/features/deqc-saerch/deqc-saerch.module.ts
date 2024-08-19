import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeqcSaerchRoutingModule } from './deqc-saerch-routing.module';
import { DeqcSaerchComponent } from './components/deqc-saerch/deqc-saerch.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DeqcSaerchRoutingModule
  ],
  declarations: [
    DeqcSaerchComponent
  ],
  exports: [
    DeqcSaerchComponent
  ]
})
export class DeqcSaerchModule { }
