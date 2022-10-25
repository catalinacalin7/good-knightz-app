import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureForFreeComponent } from './secure-for-free.component';

describe('SecureForFreeComponent', () => {
  let component: SecureForFreeComponent;
  let fixture: ComponentFixture<SecureForFreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecureForFreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecureForFreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
