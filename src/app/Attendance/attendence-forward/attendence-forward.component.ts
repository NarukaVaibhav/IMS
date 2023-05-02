import { Component, OnInit , ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TeachersService } from '../../services/teachers.service';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


export class TableEntry {
  studentName : string;
  fatherName : string;
  contact : string ;
  present : string;
  absent : string;
  leave : string;
  id: string;

  
}

@Component({
  selector: 'app-attendence-forward',
  templateUrl: './attendence-forward.component.html',
  styleUrls: ['./attendence-forward.component.css']
})
export class AttendenceForwardComponent implements OnInit {

  constructor(  private route : Router,
    private Activateroute : ActivatedRoute,
    private toastr: ToastrService,
    private service : TeachersService) { }

  ngOnInit() {
    this.Activateroute.paramMap.subscribe((params : ParamMap)=>{
      this.id= params.get('id')
      this.service.batch(this.id).subscribe(
        res=>{
          for(let i in res["results"])
          {
            
            this.data.push({
              id : res["results"][i].id,
              batchName : res["results"][i].officeUseForm.batch[0].name ? res["results"][i].officeUseForm.batch[0].name :'',
              teacherName : res["results"][i].officeUseForm.batch[0].teacher.name,
          })
          this.service.attendence(res["results"][i].id).subscribe(
            attendence=>{
              for(let row in  attendence["results"])
              {
                if(attendence["results"][row].attendance == "A")
                {
                  this.absent++;
                  this.tAbsent++;
                }
                else
                if(attendence["results"][row].attendance == "P")
                {
                  this.present++;
                  this.tPresent++;
                }
                else
                if(attendence["results"][row].attendance == "L")
                {
                  this.leave++
                  this.tLeave++
                }
                
               
              }
              this.attendence.push({
                id : res["results"][i].id,
                studentName:res["results"][i].basicDetails.studentName,
                fatherName:res["results"][i].basicDetails.fatherName,
                contact:res["results"][i].basicDetails.mobileNumber,
                batchName : res["results"][i].officeUseForm.batch[0].name,
                teacherName : res["results"][i].officeUseForm.batch[0].teacher.name,
                absent : this.absent,
                present : this.present,
                leave : this.leave
            })
              this.absent=0;
              this.present=0;
              this.leave=0;
             
            }

            
          )
          }
       
        },
        err=>{   
          this.toastr.error('Network Error', 'Please Check Internet Connection', {
            timeOut: 2000
          });}
      )
    })
  }

  attendence=[]
  present=0;
  absent=0;
  leave=0
  tPresent=0;
  tAbsent=0;
  tLeave=0
  id
  data=[]
  teacherData=[]
 
  attendeceShow(row)
  {
    this.route.navigate(['/Admission/individual-attendance', row.id])
  }
  editInStudent(row){
    this.route.navigate(['/Admission/edit-admissions' , row.id]);
  }
  
}
