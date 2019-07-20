import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoquePage } from './estoque.page';

describe('EstoquePage', () => {
  let component: EstoquePage;
  let fixture: ComponentFixture<EstoquePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstoquePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstoquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
