import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogincardPage } from './logincard.page';

const routes: Routes = [
  {
    path: '',
    component: LogincardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogincardPageRoutingModule {}
