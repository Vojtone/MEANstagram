import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPostsGridComponent } from './user-posts-grid.component';

describe('UserPostsGridComponent', () => {
  let component: UserPostsGridComponent;
  let fixture: ComponentFixture<UserPostsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPostsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPostsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
