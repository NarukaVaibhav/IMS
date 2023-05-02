import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ ProjectRoutingModule} from './Project.routing';

import { ProjectComponent } from './project/project.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';

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
    ProjectComponent,
    ViewProjectComponent,
    EditProjectComponent
  ],
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ProjectRoutingModule,
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
export class ProjectModule { }
