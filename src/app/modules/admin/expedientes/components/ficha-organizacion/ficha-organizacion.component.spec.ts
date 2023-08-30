import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaOrganizacionComponent } from './ficha-organizacion.component';

describe('FichaOrganizacionComponent', () => {
  let component: FichaOrganizacionComponent;
  let fixture: ComponentFixture<FichaOrganizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaOrganizacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaOrganizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
