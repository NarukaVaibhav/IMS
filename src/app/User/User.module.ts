import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './User.routing';

import { AddUserComponent } from './add-user/add-user.component';
import { ViewAllUsersComponent } from './view-all-users/view-all-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';

import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule, MatInputModule, MatIconModule} from '@angular/material';
import {MatCardModule, MatTooltipModule} from '@angular/material';

@NgModule({
  declarations: [
    AddUserComponent, 
    ViewAllUsersComponent,
    EditUserComponent
  ],
  imports: [
    MatTooltipModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    UserRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule
  ]
})
export class UserModule { }
