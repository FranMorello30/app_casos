import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaExpedienteComponent } from './ficha-expediente.component';

describe('FichaExpedienteComponent', () => {
  let component: FichaExpedienteComponent;
  let fixture: ComponentFixture<FichaExpedienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaExpedienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
