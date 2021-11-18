import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropriedadeUpdateComponent } from './propriedade-update.component';

describe('PropriedadeUpdateComponent', () => {
  let component: PropriedadeUpdateComponent;
  let fixture: ComponentFixture<PropriedadeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropriedadeUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropriedadeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
