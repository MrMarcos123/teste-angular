import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComantelaComponent } from './comantela.component';

describe('ComantelaComponent', () => {
  let component: ComantelaComponent;
  let fixture: ComponentFixture<ComantelaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComantelaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComantelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
