import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { ImsDashboardComponent } from './ims-dashboard/ims-dashboard.component';
import { ResetLoginsComponent } from './reset-logins/reset-logins.component';
import { BlankpageComponent } from './blankpage/blankpage.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';


// Guards
import{ActivateHomeGuard} from './guard/activate-home.guard';
import {ActivateLoginGuard} from './guard/activate-login.guard';


const routes: Routes = [
  
  { path : '', redirectTo:'dashboard',pathMatch:'full'},
  // { path : '', redirectTo:'main',pathMatch:'full'},
  { path : 'login', canActivate:[ActivateLoginGuard], component: LoginComponent },

  {path:'',component:DefaultLayoutComponent, canActivate:[ActivateHomeGuard],children:[
  { path : 'dashboard', component: ImsDashboardComponent },

  { path : 'main' , component : BlankpageComponent},
  
  
  
  { path : 'reset-login', component: ResetLoginsComponent},
  
  { path : 'edit-profile', component : EditProfileComponent},
  
  { path: 'Payroll', loadChildren: () => import('./IMS-payroll/payroll-r.module').then(m => m.PayrollRModule) },

  { path: 'Enquiry', loadChildren: () => import('./Enquiries/Enquiries.module').then(m => m.EnquiriesModule) },
  
  { path: 'Feedback', loadChildren: () => import('./Feedback/Feedback.module').then(m => m.FeedbackModule) },
  
  { path: 'Exam', loadChildren: () => import('./Exam/Exam.module').then(m => m.ExamModule) },
  
  { path: 'Master', loadChildren: () => import('./Master/Master.module').then(m => m.MasterModule) },
  
  { path: 'Placement', loadChildren: () => import('./Placement/Placement.module').then(m => m.PlacementModule) },
  
  { path: 'Project', loadChildren: () => import('./Project/Project.module').then(m => m.ProjectModule) },
  
  { path: 'Receipt', loadChildren: () => import('./Receipt/Receipt.module').then(m => m.ReceiptModule) },
  
  { path: 'System', loadChildren: () => import('./System/System.module').then(m => m.SystemModule) },
  
  { path: 'Task', loadChildren: () => import('./Task/Task.module').then(m => m.TaskModule) },
  
  { path:'Admission',loadChildren: () => import('./Admissions/Admissions.module').then(m => m.AdmissionsModule)},
  
  { path:'TaskConfig',loadChildren: () => import('./TaskConfig/TaskConfig.module').then(m => m.TaskConfigModule)},
  
  { path:'teacher',loadChildren: () => import('./teacher/teacher.module').then(m => m.teacherModule)},
  
  { path:'User',loadChildren: () => import('./User/User.module').then(m => m.UserModule)},
  
  { path:'CourseMgmt',loadChildren: () => import('./CourseMgmt/CourseMgmt.module').then(m => m.CourseMgmtModule)},
  
  { path:'UserTask',loadChildren: () => import('./UserTask/UserTask.module').then(m => m.UserTaskModule)},
  
  { path: 'Assignment', loadChildren: () => import('./Assignment/Assignment.module').then(m => m.AssignmentModule) },
  
  { path: 'Attendance', loadChildren: () => import('./Attendance/Attendance.module').then(m => m.AttendanceModule) },
  
  { path: 'FeeDetails', loadChildren: () => import('./FeeDetails/FeeDetails.module').then(m => m.FeeDetailsModule) },
  
   ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
  enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
