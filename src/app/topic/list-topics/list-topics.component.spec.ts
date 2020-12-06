import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtopicsComponent } from './list-topics.component';

describe('ListtopicsComponent', () => {
  let component: ListtopicsComponent;
  let fixture: ComponentFixture<ListtopicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListtopicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListtopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
