import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { NgModule } from '@angular/core'

import { TeachersComponent } from './teachers/teachers.component';
import { TeachersShowAllComponent } from './teachers-show-all/teachers-show-all.component';

export const routes: Routes = [
  // { path: '',redirectTo:'coursemgmtbatches',pathMatch:'full' },
  { path : 'teachers' , component : TeachersComponent},
  { path : 'show-all/:id' , component : TeachersShowAllComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class teacherRoutingModule { }