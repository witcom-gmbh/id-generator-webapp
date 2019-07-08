import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ISServiceIdGeneratorComponent } from './isservice-id-generator.component';

describe('ISServiceIdGeneratorComponent', () => {
  let component: ISServiceIdGeneratorComponent;
  let fixture: ComponentFixture<ISServiceIdGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ISServiceIdGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ISServiceIdGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
