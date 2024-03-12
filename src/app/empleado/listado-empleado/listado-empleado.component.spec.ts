import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEmpleadoComponent } from './listado-empleado.component';

describe('ListadoEmpleadoComponent', () => {
  let component: ListadoEmpleadoComponent;
  let fixture: ComponentFixture<ListadoEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoEmpleadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
