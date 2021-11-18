import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RebanhoCreateComponent } from './rebanho-create.component';

describe('RebanhoCreateComponent', () => {
  let component: RebanhoCreateComponent;
  let fixture: ComponentFixture<RebanhoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RebanhoCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RebanhoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
