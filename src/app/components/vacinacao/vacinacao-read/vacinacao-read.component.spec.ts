import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacinacaoReadComponent } from './vacinacao-read.component';

describe('VacinacaoReadComponent', () => {
  let component: VacinacaoReadComponent;
  let fixture: ComponentFixture<VacinacaoReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacinacaoReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacinacaoReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
