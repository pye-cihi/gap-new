import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphBranchComponent } from './graph-branch.component';

describe('GraphBranchComponent', () => {
  let component: GraphBranchComponent;
  let fixture: ComponentFixture<GraphBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
