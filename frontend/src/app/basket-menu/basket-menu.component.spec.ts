import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketMenuComponent } from './basket-menu.component';

describe('BasketMenuComponent', () => {
  let component: BasketMenuComponent;
  let fixture: ComponentFixture<BasketMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
