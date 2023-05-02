import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { NgModule } from '@angular/core';

import { CourseMgmtBatchesComponent } from './course-mgmt-batches/course-mgmt-batches.component';
import { CourseMgmtCoursesComponent } from './course-mgmt-courses/course-mgmt-courses.component';
import { CourseMgmtSubCoursesComponent } from './course-mgmt-sub-courses/course-mgmt-sub-courses.component';
import { CourseMgmtSubSubjectsComponent } from './course-mgmt-sub-subjects/course-mgmt-sub-subjects.component';
import { CourseMgmtChapterComponent } from './course-mgmt-chapter/course-mgmt-chapter.component';
import { CourseMgmtTopicComponent } from './course-mgmt-topic/course-mgmt-topic.component';
import { CourseMgmtQuestionsComponent } from './course-mgmt-questions/course-mgmt-questions.component';


export const routes: Routes = [
  // { path: '',redirectTo:'batches',pathMatch:'full' },
  { path : 'batches', component: CourseMgmtBatchesComponent },
  { path : 'courses', component: CourseMgmtCoursesComponent },
  { path : 'subcourses', component: CourseMgmtSubCoursesComponent },
  { path : 'subjects', component: CourseMgmtSubSubjectsComponent },
  { path : 'chapter', component: CourseMgmtChapterComponent },
  { path : 'topic', component: CourseMgmtTopicComponent },
  { path : 'questions', component: CourseMgmtQuestionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseMgmtRoutingModule { }