import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaInmuebleComponent } from './ficha-inmueble.component';

describe('FichaInmuebleComponent', () => {
  let component: FichaInmuebleComponent;
  let fixture: ComponentFixture<FichaInmuebleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaInmuebleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaInmuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
