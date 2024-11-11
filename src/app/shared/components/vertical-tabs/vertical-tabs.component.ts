import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  Input,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-vertical-tabs',
  templateUrl: './vertical-tabs.component.html',
  styleUrls: ['./vertical-tabs.component.scss'],
})
export class VerticalTabsComponent implements AfterViewInit, OnDestroy {
  @Input() tabs: { title: string; component: any }[] = [];
  @ViewChild('tabContent', { read: ViewContainerRef })
  tabContent!: ViewContainerRef;
  public activeTabIndex: number = 0; // Default to the first tab

  public componentRef!: ComponentRef<any>;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    if (this.tabs.length > 0) {
      this.selectTab(0, this.tabs[0]);
    }
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  selectTab(index: number, tab: { title: string; component: any }) {
    this.activeTabIndex = index; // Set the active tab index
    this.tabContent.clear();
    this.componentRef = this.tabContent.createComponent(tab.component);
    this.changeDetectorRef.detectChanges();
  }
}
