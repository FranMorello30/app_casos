import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaVehiculosComponent } from './ficha-vehiculos.component';

describe('FichaVehiculosComponent', () => {
  let component: FichaVehiculosComponent;
  let fixture: ComponentFixture<FichaVehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaVehiculosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
