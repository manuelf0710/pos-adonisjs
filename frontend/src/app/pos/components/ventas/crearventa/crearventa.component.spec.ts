import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearventaComponent } from './crearventa.component';

describe('CrearventaComponent', () => {
  let component: CrearventaComponent;
  let fixture: ComponentFixture<CrearventaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearventaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
