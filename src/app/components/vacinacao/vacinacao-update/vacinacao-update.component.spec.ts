import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacinacaoUpdateComponent } from './vacinacao-update.component';

describe('VacinacaoUpdateComponent', () => {
  let component: VacinacaoUpdateComponent;
  let fixture: ComponentFixture<VacinacaoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacinacaoUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacinacaoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
