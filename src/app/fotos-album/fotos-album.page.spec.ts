import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FotosAlbumPage } from './fotos-album.page';

describe('FotosAlbumPage', () => {
  let component: FotosAlbumPage;
  let fixture: ComponentFixture<FotosAlbumPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FotosAlbumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
