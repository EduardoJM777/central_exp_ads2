import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordTester } from './password-tester';

describe('PasswordTester', () => {
  let component: PasswordTester;
  let fixture: ComponentFixture<PasswordTester>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordTester],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordTester);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
