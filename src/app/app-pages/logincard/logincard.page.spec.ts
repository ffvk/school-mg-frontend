import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogincardPage } from './logincard.page';

describe('LogincardPage', () => {
  let component: LogincardPage;
  let fixture: ComponentFixture<LogincardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LogincardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
