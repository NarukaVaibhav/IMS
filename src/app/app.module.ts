import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSortModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from "./interceptors/auth.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnquiryServiceService } from './services/enquiry-service.service';
import { TaskServiceService} from './services/task-service.service'
import { HashLocationStrategy ,LocationStrategy } from '@angular/common'
import { SidebarModule } from 'ng-sidebar';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AlertModule, PopoverModule, DatepickerModule, TimepickerModule } from 'ngx-bootstrap';
import { DatePipe,CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgVerticalTimelineModule  } from 'ng-vertical-timeline';


import { LoginComponent } from './login/login.component';

import { ImsDashboardComponent } from './ims-dashboard/ims-dashboard.component';

import { ResetLoginsComponent } from './reset-logins/reset-logins.component';
import { BlankpageComponent } from './blankpage/blankpage.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


import { DemoMaterialModule } from './User/view-all-users/material.module';

import { MasterServiceService } from './services/master-service.service';
import { AddUserService } from './services/add-user.service';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';


import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule,MatDialogModule, MatInputModule, MatIconModule} from '@angular/material';




import{PayrollRModule} from './IMS-payroll/payroll-r.module';
import{AdmissionsModule} from './Admissions/Admissions.module';
import{AssignmentModule} from './Assignment/Assignment.module';
import{AttendanceModule} from './Attendance/Attendance.module';
import{EnquiriesModule} from './Enquiries/Enquiries.module';
import{ExamModule} from './Exam/Exam.module';

//// laoding all the modules causes long rendering time
// import{CourseMgmtModule} from './CourseMgmt/CourseMgmt.module';
// import{FeedbackModule} from './Feedback/Feedback.module';
// import{FeeDetailsModule} from './FeeDetails/FeeDetails.module';
// import{MasterModule} from './Master/Master.module';
// import{PlacementModule} from './Placement/Placement.module';
// import{ProjectModule} from './Project/Project.module';
// import{ReceiptModule} from './Receipt/Receipt.module';
// import{SystemModule} from './System/System.module';
// import{TaskModule} from './Task/Task.module';
// import{TaskConfigModule} from './TaskConfig/TaskConfig.module';
// import{teacherModule} from './teacher/teacher.module';
// import{UserModule} from './User/User.module';
// import{UserTaskModule} from './UserTask/UserTask.module';
import { DialogSHOWComponent } from './dialog-show/dialog-show.component';
import {NgxPrintModule} from 'ngx-print';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    ResetLoginsComponent,
    ImsDashboardComponent,
    BlankpageComponent,
    EditProfileComponent,
    DefaultLayoutComponent,
    DialogSHOWComponent

  ],
  imports: [
    CommonModule,
    NgxPrintModule,
    AdmissionsModule,
    AssignmentModule,
    PayrollRModule,
    AttendanceModule,
    EnquiriesModule,
    ExamModule,
    // CourseMgmtModule,
    // FeedbackModule,
    // FeeDetailsModule,
    // MasterModule,
    // PlacementModule,
    // ProjectModule,
    // ReceiptModule,
    // SystemModule,
    // TaskModule,
    // TaskConfigModule,
    // teacherModule,
    // UserModule,
    // UserTaskModule,

    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSortModule,
    DemoMaterialModule,
    NgbModule,
    FullCalendarModule,
    NgVerticalTimelineModule,
    AlertModule.forRoot(),
    PopoverModule.forRoot(),
    DatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ToastrModule.forRoot(),
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    SidebarModule.forRoot(),
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDialogModule,
	MatButtonModule,
    MatInputModule,
    MatIconModule


  ],
  providers: [AddUserService, MasterServiceService, EnquiryServiceService, TaskServiceService, DatePipe,
    {
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,

    multi : true
  },
{
  provide : LocationStrategy,
  useClass : HashLocationStrategy,

}],
entryComponents:[DialogSHOWComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
