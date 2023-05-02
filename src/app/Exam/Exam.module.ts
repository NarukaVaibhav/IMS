import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ ExamRoutingModule} from './Exam.routing';

import { ViewComponent } from './view/view.component';
import { AddExamComponent } from './add-exam/add-exam.component';
import { ExamFormatComponent } from './exam-format/exam-format.component';
import { ExamRecordComponent } from './exam-record/exam-record.component';
import { EditExamComponent } from './edit-exam/edit-exam.component';
import { QuestionFilter} from './add-exam/questionFilter.pipe'

import { MatMenuModule} from '@angular/material/menu';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertModule, PopoverModule, DatepickerModule, TimepickerModule } from 'ngx-bootstrap';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule, MatInputModule, MatIconModule, MatSortModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
// import {MatGridListModule} from '@angular/material/grid-list';
// import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
// import {MatSidenavModule} from '@angular/material/sidenav';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatListModule} from '@angular/material/list';
import {CKEditorModule } from 'ckeditor4-angular';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTooltipModule} from '@angular/material';


@NgModule({
  declarations: [
    ViewComponent,
    AddExamComponent,
    ExamFormatComponent,
    ExamRecordComponent,
    EditExamComponent,
    QuestionFilter
  ],
  imports: [
    NgbModule,
    AlertModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    PopoverModule,
    DatepickerModule,
    TimepickerModule,
    MatTooltipModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ExamRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDialogModule,
    MatExpansionModule,
    MatDatepickerModule,
    // MatNativeDateModule,
    MatSelectModule,
    // MatGridListModule,
    // MatDividerModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    // MatListModule,
    CKEditorModule,
    MatCheckboxModule,
    // MatCardModule,
    MatIconModule
  ]
})
export class ExamModule { }
