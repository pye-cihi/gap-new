import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphTlComponent } from './graph-tl.component';

describe('GraphTlComponent', () => {
  let component: GraphTlComponent;
  let fixture: ComponentFixture<GraphTlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphTlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphTlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
