import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { NgModule } from '@angular/core';

import { TaskConfigurationComponent } from './task-configuration/task-configuration.component';
import { ViewTaskConfigComponent } from './view-task-config/view-task-config.component';
import { EditTaskConfigComponent } from './edit-task-config/edit-task-config.component';

export const routes: Routes = [
  // { path: '',redirectTo:'coursemgmtbatches',pathMatch:'full' },
  { path : 'addtaskconfig', component: TaskConfigurationComponent},
  { path : 'viewtaskconfig', component: ViewTaskConfigComponent},
  { path : 'edit-task-config', component: EditTaskConfigComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskConfigRoutingModule { }