import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacinacaoCreateComponent } from './vacinacao-create.component';

describe('VacinacaoCreateComponent', () => {
  let component: VacinacaoCreateComponent;
  let fixture: ComponentFixture<VacinacaoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacinacaoCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacinacaoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
