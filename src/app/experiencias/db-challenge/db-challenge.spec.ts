import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DbChallenge } from './db-challenge';

describe('DbChallenge', () => {
  let component: DbChallenge;
  let fixture: ComponentFixture<DbChallenge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DbChallenge],
    }).compileComponents();

    fixture = TestBed.createComponent(DbChallenge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
