import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareButtonComponent } from './square-button.component';

describe('SquareButtonComponent', () => {
  let component: SquareButtonComponent;
  let fixture: ComponentFixture<SquareButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquareButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SquareButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
