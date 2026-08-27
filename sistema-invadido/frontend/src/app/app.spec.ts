import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App, HttpClientTestingModule] }).compileComponents();
  });

  it('cria a experiência Sistema Invadido', () => {
    expect(TestBed.createComponent(App).componentInstance).toBeTruthy();
  });
});
