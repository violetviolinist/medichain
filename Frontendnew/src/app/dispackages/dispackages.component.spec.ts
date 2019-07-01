import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispackagesComponent } from './dispackages.component';

describe('DispackagesComponent', () => {
  let component: DispackagesComponent;
  let fixture: ComponentFixture<DispackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
