import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ AttendanceRoutingModule} from './Attendance.routing';

import { AttendanceComponent } from './attendance/attendance.component';
import { AttendanceTableComponent } from './attendance-table/attendance-table.component';
import {AttendanceSheetComponent } from './attendance-sheet/attendance-sheet.component';
import { AttendenceForwardComponent } from './attendence-forward/attendence-forward.component';


import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule, MatInputModule, MatIconModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {CKEditorModule } from 'ckeditor4-angular';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material';

@NgModule({
  declarations: [
    AttendanceComponent,
    AttendanceTableComponent,
    AttendenceForwardComponent,
    AttendanceSheetComponent,

  ],
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AttendanceRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDialogModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatGridListModule,
    MatDividerModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    CKEditorModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule
  ]
})
export class AttendanceModule { }
