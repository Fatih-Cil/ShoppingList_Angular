import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproducttolistComponent } from './addproducttolist.component';

describe('AddproducttolistComponent', () => {
  let component: AddproducttolistComponent;
  let fixture: ComponentFixture<AddproducttolistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddproducttolistComponent]
    });
    fixture = TestBed.createComponent(AddproducttolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
