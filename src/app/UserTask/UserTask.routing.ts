import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { NgModule } from '@angular/core';

import { UserTasksComponent } from './user-tasks/user-tasks.component';

export const routes: Routes = [
  // { path: '',redirectTo:'userTasks-viewall',pathMatch:'full' },
  { path : 'userTasks-viewall', component: UserTasksComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserTaskRoutingModule { }