import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ UserTaskRoutingModule} from './UserTask.routing';

import { UserTasksComponent } from './user-tasks/user-tasks.component';

import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule, MatInputModule, MatIconModule} from '@angular/material';

@NgModule({
  declarations: [
    UserTasksComponent
  ],
  imports: [
    
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    UserTaskRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDialogModule,
    
    MatIconModule
  ]
})
export class UserTaskModule { }
