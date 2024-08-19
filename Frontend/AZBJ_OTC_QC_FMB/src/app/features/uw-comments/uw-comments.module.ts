import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UwCommentsRoutingModule } from './uw-comments-routing.module';
import { UwCommentsComponent } from './components/uw-comments/uw-comments.component';

@NgModule({
  declarations: [UwCommentsComponent],
  imports: [
    CommonModule,
    UwCommentsRoutingModule
  ]
})
export class UwCommentsModule { }