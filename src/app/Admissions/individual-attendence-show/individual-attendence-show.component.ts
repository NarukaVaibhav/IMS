import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TeachersService } from '../../services/teachers.service';
import {ToasterService} from '../../Toast/toaster.service';

@Component({
  selector: 'app-individual-attendence-show',
  templateUrl: './individual-attendence-show.component.html',
  styleUrls: ['./individual-attendence-show.component.css']
})
export class IndividualAttendenceShowComponent implements OnInit {

  constructor( private route : Router,
    private Activateroute : ActivatedRoute,
    private toast : ToasterService,
    private service : TeachersService) { }

    id
    batchId
    all
    studentDetail
  ngOnInit() {
    this.Activateroute.paramMap.subscribe((params : ParamMap)=>{
      this.id= params.get('id')
      this.service.attendence(this.id).subscribe(
        res=>{
          this.all=res["results"]
          this.batchId = res["results"][0].batchId

          this.service.studentDetail(this.id).subscribe(
            name=>{
              this.studentDetail = name["results"][0]
            }
          )

        }
      ), err=>{
        this.toast.errorstatus0();
      }
    }, err=>{
      this.toast.errorstatus0();
    })
  }

}
