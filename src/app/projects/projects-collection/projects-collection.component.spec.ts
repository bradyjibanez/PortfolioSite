import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsCollectionComponent } from './projects-collection.component';

describe('ProjectsCollectionComponent', () => {
  let component: ProjectsCollectionComponent;
  let fixture: ComponentFixture<ProjectsCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
