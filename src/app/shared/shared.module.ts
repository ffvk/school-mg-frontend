import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalTabsComponent } from './components/vertical-tabs/vertical-tabs.component';

@NgModule({
  declarations: [VerticalTabsComponent],
  imports: [CommonModule],
  exports: [VerticalTabsComponent],
})
export class SharedModule {}
