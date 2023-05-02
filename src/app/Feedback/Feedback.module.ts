import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ FeedbackRoutingModule} from './Feedback.routing';

import { AddFeedbackComponent } from './add-feedback/add-feedback.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { EditFeedbackComponent } from './edit-feedback/edit-feedback.component';
import { SummaryFeedbackComponent } from './summary-feedback/summary-feedback.component';
import { AddEmployeeFeedbackComponent } from './add-employee-feedback/add-employee-feedback.component';


import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule, MatInputModule, MatIconModule} from '@angular/material';

import {MatTooltipModule} from '@angular/material';
import { ViewEmployeeFeedbackComponent } from './view-employee-feedback/view-employee-feedback.component';

@NgModule({
  declarations: [
    AddFeedbackComponent,
    ViewAllComponent,
    EditFeedbackComponent,
    SummaryFeedbackComponent,
    AddEmployeeFeedbackComponent,
    ViewEmployeeFeedbackComponent
  ],
  imports: [
    MatTooltipModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    FeedbackRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDialogModule,
    
    MatIconModule
  ]
})
export class FeedbackModule { }
