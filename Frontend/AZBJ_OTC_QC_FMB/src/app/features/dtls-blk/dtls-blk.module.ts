import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DtlsBlkRoutingModule } from './dtls-blk-routing.module';
import { ProposalDetailsComponent } from './components/proposal-details/proposal-details.component';

@NgModule({
  declarations: [
    ProposalDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DtlsBlkRoutingModule
  ]
})
export class DtlsBlkModule { }
