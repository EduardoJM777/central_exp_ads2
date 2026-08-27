import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogicChallenge } from './logic-challenge';

describe('LogicChallenge', () => {
  let component: LogicChallenge;
  let fixture: ComponentFixture<LogicChallenge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogicChallenge],
    }).compileComponents();

    fixture = TestBed.createComponent(LogicChallenge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
