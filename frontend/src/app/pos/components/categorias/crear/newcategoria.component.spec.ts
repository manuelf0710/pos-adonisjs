import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcategoriaComponent } from './newcategoria.component';

describe('NewcategoriaComponent', () => {
  let component: NewcategoriaComponent;
  let fixture: ComponentFixture<NewcategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewcategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
