import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { NgModule } from '@angular/core';

import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ViewAllTaskComponent } from './view-all-task/view-all-task.component';

export const routes: Routes = [
  // { path: '',redirectTo:'viewtask',pathMatch:'full' },
  { path : 'addtask', component: AddTaskComponent},
  { path : 'viewtask', component: ViewAllTaskComponent},
  { path : 'edit-task', component: EditTaskComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }