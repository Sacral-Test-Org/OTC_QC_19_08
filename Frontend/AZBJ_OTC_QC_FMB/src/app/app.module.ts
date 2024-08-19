import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlkReqsModule } from './features/blk-reqs/blk-reqs.module';
import { DeqcDisplayModule } from './features/deqc-display/deqc-display.module';
import { AzbjPanDetModule } from './features/azbj-pan-det/azbj-pan-det.module';
import { ShowUwCommentsModule } from './features/show-uw-comments/show-uw-comments.module';
import { AddCommentsModule } from './features/show-uw-comments/components/add-comments/add-comments.module';
import { CpIdModule } from './features/cp-id/cp-id.module';
import { AccountDetModule } from './features/account-det/account-det.module';
import { SameBankDetailsComponent } from './features/account-det/components/same-bank-details/same-bank-details.component';
import { ImageDetModule } from './features/image-det/image-det.module';
import { DtlsBlkModule } from './features/dtls-blk/dtls-blk.module';
import { DeqcSaerchComponent } from './features/deqc-saerch/components/deqc-saerch/deqc-saerch.component';
import { DeqcSaerchModule } from './features/deqc-saerch/deqc-saerch.module';
import { ControlModule } from './features/control/control.module';

@NgModule({
  declarations: [
    AppComponent,
    SameBankDetailsComponent,
    DeqcSaerchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BlkReqsModule,
    DeqcDisplayModule,
    AzbjPanDetModule,
    ShowUwCommentsModule,
    AddCommentsModule,
    CpIdModule,
    AccountDetModule,
    ImageDetModule,
    DtlsBlkModule,
    DeqcSaerchModule,
    ControlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }