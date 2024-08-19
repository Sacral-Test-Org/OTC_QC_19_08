import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountDetRoutingModule } from './account-det-routing.module';
import { AccountDetailsComponent } from './components/account-details/account-details.component';

@NgModule({
  declarations: [
    AccountDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountDetRoutingModule
  ]
})
export class AccountDetModule { }
