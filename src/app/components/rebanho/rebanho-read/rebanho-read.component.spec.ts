import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RebanhoReadComponent } from './rebanho-read.component';

describe('RebanhoReadComponent', () => {
  let component: RebanhoReadComponent;
  let fixture: ComponentFixture<RebanhoReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RebanhoReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RebanhoReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
