import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphDevComponent } from './graph-dev.component';

describe('GraphDevComponent', () => {
  let component: GraphDevComponent;
  let fixture: ComponentFixture<GraphDevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphDevComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
