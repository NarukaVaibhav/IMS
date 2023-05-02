import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ TaskRoutingModule} from './Task.routing';

import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ViewAllTaskComponent } from './view-all-task/view-all-task.component';


import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule, MatInputModule, MatIconModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    AddTaskComponent,
    EditTaskComponent,
    ViewAllTaskComponent
  ],
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    TaskRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDialogModule,
    MatExpansionModule,
    
    MatIconModule
  ]
})
export class TaskModule { }
