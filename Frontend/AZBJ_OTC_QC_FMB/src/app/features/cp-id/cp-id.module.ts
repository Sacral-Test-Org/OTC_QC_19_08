import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CpIdRoutingModule } from './cp-id-routing.module';
import { DocumentQualityControlComponent } from './components/document-quality-control/document-quality-control.component';

@NgModule({
  declarations: [
    DocumentQualityControlComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CpIdRoutingModule
  ]
})
export class CpIdModule { }
