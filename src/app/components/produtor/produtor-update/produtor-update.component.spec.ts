import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutorUpdateComponent } from './produtor-update.component';

describe('ProdutorUpdateComponent', () => {
  let component: ProdutorUpdateComponent;
  let fixture: ComponentFixture<ProdutorUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutorUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
