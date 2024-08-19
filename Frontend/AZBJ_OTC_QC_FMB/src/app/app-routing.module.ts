import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlkReqsRoutingModule } from './features/blk-reqs/blk-reqs-routing.module';
import { DeqcDisplayRoutingModule } from './features/deqc-display/deqc-display-routing.module';
import { DeqcDisplayModule } from './features/deqc-display/deqc-display.module';
import { AzbjPanDetRoutingModule } from './features/azbj-pan-det/azbj-pan-det-routing.module';
import { ShowUwCommentsRoutingModule } from './features/show-uw-comments/show-uw-comments-routing.module';
import { ShowUwCommentsModule } from './features/show-uw-comments/show-uw-comments.module';
import { AddCommentsComponent } from './features/show-uw-comments/components/add-comments/add-comments.component';
import { CpIdRoutingModule } from './features/cp-id/cp-id-routing.module';
import { AccountDetRoutingModule } from './features/account-det/account-det-routing.module';
import { SameBankDetailsComponent } from './features/account-det/components/same-bank-details/same-bank-details.component';
import { ImageDetModule } from './features/image-det/image-det.module';
import { DtlsBlkModule } from './features/dtls-blk/dtls-blk.module';
import { DeqcSaerchComponent } from './features/deqc-saerch/components/deqc-saerch/deqc-saerch.component';
import { DeqcSaerchModule } from './features/deqc-saerch/deqc-saerch.module';
import { ControlRoutingModule } from './features/control/control-routing.module';
import { ControlModule } from './features/control/control.module';

const routes: Routes = [
  { path: 'blk-reqs', loadChildren: () => BlkReqsRoutingModule },
  { path: 'deqc-display', loadChildren: () => DeqcDisplayRoutingModule },
  { path: 'deqc-display-module', loadChildren: () => DeqcDisplayModule },
  { path: 'azbj-pan-det', loadChildren: () => AzbjPanDetRoutingModule },
  { path: 'show-uw-comments', loadChildren: () => ShowUwCommentsRoutingModule },
  { path: 'show-uw-comments-module', loadChildren: () => ShowUwCommentsModule },
  { path: 'add-comments', component: AddCommentsComponent },
  { path: 'cp-id', loadChildren: () => CpIdRoutingModule },
  { path: 'account-det', loadChildren: () => AccountDetRoutingModule },
  { path: 'same-bank-details', component: SameBankDetailsComponent },
  { path: 'image-det', loadChildren: () => ImageDetModule },
  { path: 'dtls-blk', loadChildren: () => DtlsBlkModule },
  { path: 'deqc-saerch', loadChildren: () => DeqcSaerchModule },
  { path: 'control', loadChildren: () => ControlRoutingModule },
  { path: 'control-module', loadChildren: () => ControlModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}