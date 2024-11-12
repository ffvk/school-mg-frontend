import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogincardPageRoutingModule } from './logincard-routing.module';

import { LogincardPage } from './logincard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogincardPageRoutingModule
  ],
  declarations: [LogincardPage]
})
export class LogincardPageModule {}
