import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetMarginComponent } from './set-margin.component';

describe('SetMarginComponent', () => {
  let component: SetMarginComponent;
  let fixture: ComponentFixture<SetMarginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetMarginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetMarginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
