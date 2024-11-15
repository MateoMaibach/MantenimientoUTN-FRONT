import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasOperarioComponent } from './operarios.component';

describe('OperariosComponent', () => {
  let component: TareasOperarioComponent;
  let fixture: ComponentFixture<TareasOperarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TareasOperarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareasOperarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
