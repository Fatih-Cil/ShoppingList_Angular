import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutuiComponent } from './layoutui.component';

describe('LayoutuiComponent', () => {
  let component: LayoutuiComponent;
  let fixture: ComponentFixture<LayoutuiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutuiComponent]
    });
    fixture = TestBed.createComponent(LayoutuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
