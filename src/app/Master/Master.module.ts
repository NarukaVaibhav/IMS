import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterRoutingModule} from './Master.routing'

import { MasterDesignationComponent } from './master-designation/master-designation.component';
import { MasterFollowUpComponent } from './master-follow-up/master-follow-up.component';
import {AdConstraintComponent} from './ad-constraint/ad-constraint.component';
import{AddReceiptMasterComponent} from './add-receipt-master/add-receipt-master.component';

import {DragDropModule} from '@angular/cdk/drag-drop';
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
      AddReceiptMasterComponent,
    MasterDesignationComponent,
    MasterFollowUpComponent,
    AdConstraintComponent
  ],
  imports: [
    DragDropModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MasterRoutingModule,
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
export class MasterModule { }
