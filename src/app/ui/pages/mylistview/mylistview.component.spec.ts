import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MylistviewComponent } from './mylistview.component';

describe('MylistviewComponent', () => {
  let component: MylistviewComponent;
  let fixture: ComponentFixture<MylistviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MylistviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MylistviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
