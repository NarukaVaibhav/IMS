import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ PlacementRoutingModule} from './Placement.routing';


import { PlacementeditComponent} from './placementedit/placementedit.component';
import { PlacmentdriveComponent } from './placementdrive/placementdrive.component';
import { AddcompanyComponent } from './addcompany/addcompany.component';
import { ViewplacementComponent } from './viewplacement/viewplacement.component';

import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule, MatInputModule, MatIconModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';

import {MatTabsModule} from '@angular/material/tabs';

import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [
    PlacementeditComponent,
    PlacmentdriveComponent,
    AddcompanyComponent,
    ViewplacementComponent
  ],
  imports: [
    
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    PlacementRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatTabsModule,
    MatListModule,
  ]
})
export class PlacementModule { }
