import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirUsersComponent } from './excluir-users.component';

describe('ExcluirUsersComponent', () => {
  let component: ExcluirUsersComponent;
  let fixture: ComponentFixture<ExcluirUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcluirUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcluirUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
