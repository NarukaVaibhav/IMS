import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { NgModule } from '@angular/core';

import { AddUserComponent } from './add-user/add-user.component';
import { ViewAllUsersComponent } from './view-all-users/view-all-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';

export const routes: Routes = [
  // { path: '',redirectTo:'coursemgmtbatches',pathMatch:'full' },
  { path : 'add-user', component: AddUserComponent },
  { path : 'view-all-users', component: ViewAllUsersComponent },
  { path : 'edit-user', component : EditUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }