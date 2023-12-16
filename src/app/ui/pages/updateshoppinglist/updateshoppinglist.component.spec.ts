import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateshoppinglistComponent } from './updateshoppinglist.component';

describe('UpdateshoppinglistComponent', () => {
  let component: UpdateshoppinglistComponent;
  let fixture: ComponentFixture<UpdateshoppinglistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateshoppinglistComponent]
    });
    fixture = TestBed.createComponent(UpdateshoppinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
