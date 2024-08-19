import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProposalDetailsComponent } from './components/proposal-details/proposal-details.component';

const routes: Routes = [
  { path: 'proposal-details', component: ProposalDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DtlsBlkRoutingModule { }