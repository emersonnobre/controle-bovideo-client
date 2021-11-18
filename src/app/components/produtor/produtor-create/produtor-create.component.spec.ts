import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutorCreateComponent } from './produtor-create.component';

describe('ProdutorCreateComponent', () => {
  let component: ProdutorCreateComponent;
  let fixture: ComponentFixture<ProdutorCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutorCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
