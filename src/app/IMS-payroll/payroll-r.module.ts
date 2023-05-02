import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule} from '@angular/material/table';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule, MatButtonToggle} from '@angular/material';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatSelectModule} from '@angular/material/select';
import { MatInputModule,MatButtonModule,MatButtonToggleModule,MatTooltipModule} from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatNativeDateModule  } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';



import{EmployeeComponent} from './employee/employee.component';
import { PayrollAttendanceComponent } from "./payroll-attendance/payroll-attendance.component";
import { PayrollComponent } from "./payroll/payroll.component";
import { LeavesComponent } from "./leaves/leaves.component";
import { HolidaysComponent } from "./holidays/holidays.component";
import { PaySlipComponent } from './pay-slip/pay-slip.component';

import { PayrollRRoutingModule } from './payroll-r-routing.module';



@NgModule({
  declarations: [
    EmployeeComponent,
    PayrollAttendanceComponent,
    PayrollComponent,
    LeavesComponent,
    HolidaysComponent,
    PaySlipComponent
  ],
  imports: [
    CommonModule,
    PayrollRRoutingModule,
    MatInputModule,
    MatExpansionModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatGridListModule,
    MatDividerModule,
    MatTabsModule,
    FormsModule,ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ]
})
export class PayrollRModule { }
