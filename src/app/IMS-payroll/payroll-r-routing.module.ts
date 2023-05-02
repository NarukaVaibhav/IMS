import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import{EmployeeComponent} from './employee/employee.component';
import { PayrollAttendanceComponent } from "./payroll-attendance/payroll-attendance.component";
import { PayrollComponent } from "./payroll/payroll.component";
import { LeavesComponent } from "./leaves/leaves.component";
import { HolidaysComponent } from "./holidays/holidays.component";
import { PaySlipComponent } from './pay-slip/pay-slip.component';

const routes: Routes = [
  // // { path: '',redirectTo:'Employee/All_Emp',pathMatch:'full' },
   // { path: '**',redirectTo:'Employee/All_Emp',pathMatch:'full' },
  { path: 'Employee/:id',component:EmployeeComponent},
  { path: 'Attendance',component:PayrollAttendanceComponent},
  { path: 'Payroll-Overview',component:PayrollComponent},
  { path: 'Leaves',component:LeavesComponent},
  { path: 'Holidays',component:HolidaysComponent},
  { path: 'PaySlip',component:PaySlipComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRRoutingModule { }
