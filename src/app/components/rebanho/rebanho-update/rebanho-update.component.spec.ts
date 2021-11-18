import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RebanhoUpdateComponent } from './rebanho-update.component';

describe('RebanhoUpdateComponent', () => {
  let component: RebanhoUpdateComponent;
  let fixture: ComponentFixture<RebanhoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RebanhoUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RebanhoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
