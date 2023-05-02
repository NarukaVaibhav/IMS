import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { NgModule } from '@angular/core';

import { SystemSkillBharatComponent } from './system-skill-bharat/system-skill-bharat.component';
import {SystenTenantConfigComponent} from './systen-tenant-config/systen-tenant-config.component';

export const routes: Routes = [
  // { path: '',redirectTo:'skill-bharat',pathMatch:'full' },
  {path : 'skill-bharat' , component : SystemSkillBharatComponent},
  {path : 'tenant-config' , component : SystenTenantConfigComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }