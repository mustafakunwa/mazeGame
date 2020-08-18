import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardValueComponent } from './board-value.component';

describe('BoardValueComponent', () => {
  let component: BoardValueComponent;
  let fixture: ComponentFixture<BoardValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
