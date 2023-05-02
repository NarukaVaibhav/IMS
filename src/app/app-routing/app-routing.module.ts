import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ImsDashboardComponent } from '../ims-dashboard/ims-dashboard.component';
import { LoginComponent } from '../login/login.component';
const routes: Routes = [
  { path : '', redirectTo:'dashboard',pathMatch:'full'},  
  { path : 'dashboard', component: ImsDashboardComponent ,
  children: [
    {
      path: 'category',
      loadChildren: () => import('../app-routing.module').then(m => m.AppRoutingModule)
    }]},
  { path : 'login', component: LoginComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
