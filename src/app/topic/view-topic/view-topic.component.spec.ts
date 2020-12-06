import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtopicComponent } from './view-topic.component';

describe('ViewtopicComponent', () => {
  let component: ViewtopicComponent;
  let fixture: ComponentFixture<ViewtopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewtopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
