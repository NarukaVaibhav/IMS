import { Component, OnInit } from '@angular/core';
import{ PlacementdataService } from '../../services/placementdata.service';




@Component({
  selector: 'app-placmentdrive',
  templateUrl: './placementdrive.component.html',
  styleUrls: ['./placementdrive.component.css']
})
export class PlacmentdriveComponent implements OnInit {

Body=[];
willingbody=[];
trackbody=[];

dumy=[1,2,3,4,5,6,7,8]

  constructor(public service:PlacementdataService) { 


  }




  ngOnInit() {

  }


}


