import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphBsaComponent } from './graph-bsa.component';

describe('GraphBsaComponent', () => {
  let component: GraphBsaComponent;
  let fixture: ComponentFixture<GraphBsaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphBsaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphBsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
