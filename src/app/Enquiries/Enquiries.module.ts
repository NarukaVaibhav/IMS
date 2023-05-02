import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ EnquiriesRoutingModule} from './Enquiries.routing';

import { SummaryEnquiryComponent } from './summary-enquiry/summary-enquiry.component';
import { EditEnquiryComponent } from './edit-enquiry/edit-enquiry.component';
import { AddEnquiryComponent } from './add-enquiry/add-enquiry.component';
import { ViewAllEnquiryComponent } from './view-all-enquiry/view-all-enquiry.component';

import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule, MatInputModule, MatIconModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material';

@NgModule({
  declarations: [
    SummaryEnquiryComponent,
    EditEnquiryComponent,
    AddEnquiryComponent,
    ViewAllEnquiryComponent
  ],
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    EnquiriesRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDialogModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
   
    MatCardModule,
    MatIconModule
  ]
})
export class EnquiriesModule { }
