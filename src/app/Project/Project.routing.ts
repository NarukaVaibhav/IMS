import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { NgModule } from '@angular/core';

import { ProjectComponent } from './project/project.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';

export const routes: Routes = [
  // { path: '',redirectTo:'viewproject',pathMatch:'full' },
  { path : 'addproject', component: ProjectComponent},
  { path : 'edit-project', component: EditProjectComponent},
  { path : 'viewproject', component: ViewProjectComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }