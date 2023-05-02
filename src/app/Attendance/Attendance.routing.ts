import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { NgModule } from '@angular/core';

import { AttendanceComponent } from './attendance/attendance.component';
import { AttendanceTableComponent } from './attendance-table/attendance-table.component';
import {AttendanceSheetComponent } from './attendance-sheet/attendance-sheet.component';
import { AttendenceForwardComponent } from './attendence-forward/attendence-forward.component';

export const routes: Routes = [
  // { path: '',redirectTo:'attendance',pathMatch:'full' },
  { path : 'attendance', component: AttendanceComponent },
  { path : 'attendance-table', component: AttendanceTableComponent },
  { path : 'attendance-sheet', component: AttendanceSheetComponent},
  { path : 'attendenceAll/:id' , component : AttendenceForwardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
