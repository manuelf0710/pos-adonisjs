import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProveedorComponent } from './new-proveedor.component';

describe('NewProveedorComponent', () => {
  let component: NewProveedorComponent;
  let fixture: ComponentFixture<NewProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
