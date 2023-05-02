import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ SystemRoutingModule} from './System.routing';

import { SystemSkillBharatComponent } from './system-skill-bharat/system-skill-bharat.component';
import {SystenTenantConfigComponent} from './systen-tenant-config/systen-tenant-config.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

@NgModule({
  declarations: [
    SystemSkillBharatComponent,
    SystenTenantConfigComponent
  ],
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SystemRoutingModule,
     ]
})
export class SystemModule { }
