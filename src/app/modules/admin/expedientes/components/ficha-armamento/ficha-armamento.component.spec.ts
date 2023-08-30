import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaArmamentoComponent } from './ficha-armamento.component';

describe('FichaArmamentoComponent', () => {
  let component: FichaArmamentoComponent;
  let fixture: ComponentFixture<FichaArmamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaArmamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaArmamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
