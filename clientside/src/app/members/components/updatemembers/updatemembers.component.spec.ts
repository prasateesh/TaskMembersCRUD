import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatemembersComponent } from './updatemembers.component';

describe('UpdatemembersComponent', () => {
  let component: UpdatemembersComponent;
  let fixture: ComponentFixture<UpdatemembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatemembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatemembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
