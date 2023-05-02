import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { NgModule } from '@angular/core';

import { AddExamComponent } from './add-exam/add-exam.component';
import { ViewComponent } from './view/view.component';
import { ExamFormatComponent } from './exam-format/exam-format.component';
import { ExamRecordComponent } from './exam-record/exam-record.component';
import { EditExamComponent } from './edit-exam/edit-exam.component';


export const routes: Routes = [
  // { path: '',redirectTo:'view',pathMatch:'full' },
  { path : 'add-exam', component: AddExamComponent },
  { path : 'view', component: ViewComponent },
  { path : 'format-Exam' , component : ExamFormatComponent},
  { path : 'edit-exam/:id' ,component: EditExamComponent},
  { path : 'record-exam/:id' , component : ExamRecordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule { }