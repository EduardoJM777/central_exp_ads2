import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperienciasMenu } from './experiencias-menu';

describe('ExperienciasMenu', () => {
  let component: ExperienciasMenu;
  let fixture: ComponentFixture<ExperienciasMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienciasMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienciasMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
