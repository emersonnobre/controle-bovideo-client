import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropriedadeCreateComponent } from './propriedade-create.component';

describe('PropriedadeCreateComponent', () => {
  let component: PropriedadeCreateComponent;
  let fixture: ComponentFixture<PropriedadeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropriedadeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropriedadeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
