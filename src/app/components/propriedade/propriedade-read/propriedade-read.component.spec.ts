import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropriedadeReadComponent } from './propriedade-read.component';

describe('PropriedadeReadComponent', () => {
  let component: PropriedadeReadComponent;
  let fixture: ComponentFixture<PropriedadeReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropriedadeReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropriedadeReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
