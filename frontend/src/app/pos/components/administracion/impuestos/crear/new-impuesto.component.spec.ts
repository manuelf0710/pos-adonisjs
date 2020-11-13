import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewImpuestoComponent } from './new-impuesto.component';

describe('NewImpuestoComponent', () => {
  let component: NewImpuestoComponent;
  let fixture: ComponentFixture<NewImpuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewImpuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewImpuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
