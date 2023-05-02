import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ TaskConfigRoutingModule} from './TaskConfig.routing'

import { TaskConfigurationComponent } from './task-configuration/task-configuration.component';
import { ViewTaskConfigComponent } from './view-task-config/view-task-config.component';
import { EditTaskConfigComponent } from './edit-task-config/edit-task-config.component';

import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule, MatInputModule, MatIconModule} from '@angular/material';

@NgModule({
  declarations: [
    TaskConfigurationComponent,
    ViewTaskConfigComponent,
    EditTaskConfigComponent
  ],
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    TaskConfigRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule
  ]
})
export class TaskConfigModule { }
