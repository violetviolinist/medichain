import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagegenComponent } from './packagegen.component';

describe('PackagegenComponent', () => {
  let component: PackagegenComponent;
  let fixture: ComponentFixture<PackagegenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackagegenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
