import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ ReceiptRoutingModule} from './Receipt.routing';

import { ReceiptAllComponent } from './receipt-all/receipt-all.component';
import { PrintReceiptComponent } from './print-receipt/print-receipt.component';
import { ReceiptComponent } from './receipt/receipt.component';

import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule, MatIconModule} from '@angular/material';
// import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MatNativeDateModule } from '@angular/material/core';
// import {MatSelectModule} from '@angular/material/select';
// import {MatGridListModule} from '@angular/material/grid-list';
// import {MatDividerModule} from '@angular/material/divider';
// import {MatTabsModule} from '@angular/material/tabs';
// import {MatSidenavModule} from '@angular/material/sidenav';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatListModule} from '@angular/material/list';
// import {CKEditorModule } from 'ckeditor4-angular';
// import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTooltipModule} from '@angular/material';
import {NgxPrintModule} from 'ngx-print';
@NgModule({
  declarations: [
    ReceiptAllComponent,
    PrintReceiptComponent,
    ReceiptComponent
  ],
  imports: [
    NgxPrintModule,
    MatTooltipModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ReceiptRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    // MatDialogModule,
    // MatExpansionModule,
    MatDatepickerModule,
    // MatNativeDateModule,
    // MatSelectModule,
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
export class ReceiptModule { }
