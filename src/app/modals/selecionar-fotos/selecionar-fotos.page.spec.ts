import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelecionarFotosPage } from './selecionar-fotos.page';

describe('SelecionarFotosPage', () => {
  let component: SelecionarFotosPage;
  let fixture: ComponentFixture<SelecionarFotosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecionarFotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
