import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmissionsRoutingModule} from './admissions.routing';

 
import { AddNewComponent } from './add-new/add-new.component';
import { TableViewComponent } from './table-view/table-view.component';
import { IndividualAttendenceShowComponent } from './individual-attendence-show/individual-attendence-show.component';
import { EditAdmissionComponent } from './edit-admission/edit-admission.component';
import { IndividualResultsComponent } from './individual-results/individual-results.component';
import { IndividualSubmissionComponent } from './individual-submission/individual-submission.component';
import { IndividualFeedbackComponent } from './individual-feedback/individual-feedback.component';

import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material';

@NgModule({
  declarations: [
    AddNewComponent,
    TableViewComponent,
    IndividualAttendenceShowComponent,
    EditAdmissionComponent,
    IndividualResultsComponent,
    IndividualSubmissionComponent,
    IndividualFeedbackComponent
  ],
  imports: [
    CommonModule,
    AdmissionsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    FormsModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule
  ]
})
export class AdmissionsModule { }
