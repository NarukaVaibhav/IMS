import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ AssignmentRoutingModule} from './Assignment.routing';

import { EditAssignmentComponent } from './edit-assignment/edit-assignment.component';
import { AssignmentIndividualSubmissionComponent } from './assignment-individual-submission/assignment-individual-submission.component';
import { AssignmentRecordComponent } from './assignment-record/assignment-record.component';
import { AssignmentViewAllComponent } from './assignment-view-all/assignment-view-all.component';
import { AssignmentComponent } from './assignment/assignment.component';

import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule, MatIconModule, MatTooltipModule} from '@angular/material';
// import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
// import {MatGridListModule} from '@angular/material/grid-list';
// import {MatDividerModule} from '@angular/material/divider';
// import {MatTabsModule} from '@angular/material/tabs';
// import {MatSidenavModule} from '@angular/material/sidenav';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatListModule} from '@angular/material/list';
// import {CKEditorModule } from 'ckeditor4-angular';
// import {MatCheckboxModule} from '@angular/material/checkbox';
// import {MatCardModule} from '@angular/material';

@NgModule({
  declarations: [
    EditAssignmentComponent,
    AssignmentIndividualSubmissionComponent,
    AssignmentRecordComponent,
    AssignmentViewAllComponent,
    AssignmentComponent
  ],
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AssignmentRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    // MatDialogModule,
    // MatExpansionModule,
    MatDatepickerModule,
    // MatNativeDateModule,
    MatTooltipModule,
    MatSelectModule,
    // MatGridListModule,
    // MatDividerModule,
    // MatTabsModule,
    // MatSidenavModule,
    // MatToolbarModule,
    // MatListModule,
    // CKEditorModule,
    // MatCheckboxModule,
    // MatCardModule,
    MatIconModule
  ]
})
export class AssignmentModule { }
