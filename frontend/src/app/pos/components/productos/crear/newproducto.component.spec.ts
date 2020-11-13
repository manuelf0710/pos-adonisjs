import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewproductoComponent } from './newproducto.component';

describe('NewproductoComponent', () => {
  let component: NewproductoComponent;
  let fixture: ComponentFixture<NewproductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewproductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
