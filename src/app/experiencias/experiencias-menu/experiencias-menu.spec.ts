import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperienciasMenuComponent } from './experiencias-menu';
import { provideRouter } from '@angular/router';

describe('ExperienciasMenu', () => {
  let component: ExperienciasMenuComponent;
  let fixture: ComponentFixture<ExperienciasMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienciasMenuComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienciasMenuComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
