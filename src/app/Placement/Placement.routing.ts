import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { NgModule } from '@angular/core';


import { PlacementeditComponent} from './placementedit/placementedit.component';
import { PlacmentdriveComponent } from './placementdrive/placementdrive.component';
import { AddcompanyComponent } from './addcompany/addcompany.component';
import { ViewplacementComponent } from './viewplacement/viewplacement.component';


export const routes: Routes = [

  { path : 'placementdrive', component: PlacmentdriveComponent},
  { path : 'addcompany', component: AddcompanyComponent},
  { path : 'viewplacement', component: ViewplacementComponent},
  { path : 'placementedit/:id' ,component: PlacementeditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlacementRoutingModule { }