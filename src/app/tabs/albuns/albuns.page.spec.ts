import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbunsPage } from './albuns.page';

describe('AlbunsPage', () => {
  let component: AlbunsPage;
  let fixture: ComponentFixture<AlbunsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbunsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
