import { Routes } from '@angular/router';
import { ProjectTaskPageComponent } from '../pages/project-task-page/project-task-page.component';

const SHARED_CONTEXT_ROUTES: Routes = [];

export const TAG_CHILD_ROUTES: Routes = [...SHARED_CONTEXT_ROUTES];

export const PROJECT_CHILD_ROUTES: Routes = [
  {
    path: 'tasks',
    component: ProjectTaskPageComponent,
    data: { page: 'project-tasks' },
  },
  ...SHARED_CONTEXT_ROUTES,
];
