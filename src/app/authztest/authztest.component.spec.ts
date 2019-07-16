import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthztestComponent } from './authztest.component';

describe('AuthztestComponent', () => {
  let component: AuthztestComponent;
  let fixture: ComponentFixture<AuthztestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthztestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthztestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
