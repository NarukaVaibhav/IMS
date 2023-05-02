import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ CourseMgmtRoutingModule} from './CourseMgmt.routing';

import { CourseMgmtBatchesComponent } from './course-mgmt-batches/course-mgmt-batches.component';
import { CourseMgmtCoursesComponent } from './course-mgmt-courses/course-mgmt-courses.component';
import { CourseMgmtSubCoursesComponent } from './course-mgmt-sub-courses/course-mgmt-sub-courses.component';
import { CourseMgmtSubSubjectsComponent } from './course-mgmt-sub-subjects/course-mgmt-sub-subjects.component';
import { CourseMgmtChapterComponent } from './course-mgmt-chapter/course-mgmt-chapter.component';
import { CourseMgmtTopicComponent } from './course-mgmt-topic/course-mgmt-topic.component';
import { CourseMgmtQuestionsComponent } from './course-mgmt-questions/course-mgmt-questions.component';


import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material';
import {FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material';
import {CKEditorModule } from 'ckeditor4-angular';
import {MatCardModule} from '@angular/material';

@NgModule({
  declarations: [
    CourseMgmtBatchesComponent,
    CourseMgmtCoursesComponent,
    CourseMgmtSubCoursesComponent,
    CourseMgmtSubSubjectsComponent,
    CourseMgmtChapterComponent,
    CourseMgmtTopicComponent,
    CourseMgmtQuestionsComponent
  ],
  imports: [
    MatTooltipModule,
    MatCheckboxModule,
    FormsModule,
    CommonModule,
    CourseMgmtRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    CKEditorModule,
    MatCardModule,
    MatIconModule
  ]
})
export class CourseMgmtModule { }
