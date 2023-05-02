import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../../services/api-data.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ConfirmDialogModel, DialogSHOWComponent } from '../../dialog-show/dialog-show.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { ToastrService } from 'ngx-toastr';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent  {


  modalTableRecord = [];
  
  public results = [];
  student_id = [];
  array = [];
  day1 ;
  day2;
  month1;
  month2;
  year1;
  year2;
  public studentId = 0;
  date = '';
  public total_attend = 0;
  public present = 0;
  public absent = 0;
  public leave = 0;
  object = {"student_Id": this.studentId, "totalAttendance":this.total_attend, "Absent": this.absent, "Present": this.present,"Leave": this.leave};
  student_attendance = {};
  
  
  public table_data = [];
  attendance_data = [];
  public batch_result = [];
  date1;
  date2;
  selected_val: string = '';
  selected_val_batch: string = '';
  public course_id = String;
  url_batch: string = '';
  url_table: string = '';
  public base_attendance_url = "";
  base_url_admission: string = '';
  url_admission: string = '';
  base_url_batch: string = '';
  display_data = false;
  localDate;
  


  
  httpOptions = {

    headers: new HttpHeaders(
      {
        'Content-Type':  'application/json, charset=utf-8, text/plain, */*',
        'x-app-version': '12',
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'Accept': 'application/json, text/plain, */*' 
      }
      )
  };
  attendanceRecordTable: any;
  startDate: any;
  endDate: any;


  constructor(public dialog: MatDialog, private modalService: NgbModal,public service: ApiDataService,    private toastr: ToastrService ,public http : HttpClient, public datepipe :DatePipe , private URLService : UrlService, private route: Router) { 

     
     

    this.service.getCourseData().subscribe((data) => {
      
       
      for(let key in data["results"])
      {
        this.results.push(data["results"][key])
      }
  
      },
      err=>{   
        this.toastr.error('Network Error', 'Please Check Internet Connection', {
          timeOut: 2000
        });}
    )

  }  

  
  placeholder
  batch
  getbatch()
  {
    this.display=[];
    this.httpOptions.headers.set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get(this.url_batch,this.httpOptions);
  }


  selectDate1(event: any ){
    this.startDate = event.target.value;
    this.date1 = new Date(event.target.value).getDate();
    this.month1 = new Date(event.target.value).getMonth();    
    this.year1 = new Date(event.target.value).getFullYear();  
    this.day1 = this.date1 + "-" + this.month1 + "-" + this.year1;  
    if(this.date1 >= new Date().getDate &&  this.month1 >= new Date().getMonth && this.year1 >= new Date().getFullYear ){
      this.startDate = undefined;
      this.toastr.error('Incorrect Date', 'Select Correct Date', {
        timeOut: 2000
      })
    }
    
  } 
  
  selectDate2(event: any ){
    this.endDate = event.target.value;
    this.date2 = new Date(event.target.value).getDate();
    this.month2 = new Date(event.target.value).getMonth();    
    this.year2 = new Date(event.target.value).getFullYear();  
    this.day2 = this.date2 + "-" + this.month2 + "-" + this.year2;        
  } 

  selectChangeHandler (event: any) {   
    this.batch_result = [];    
    this.display=[];
    this.batch = this.placeholder
    this.selected_val = event.target.value;



    this.base_url_batch = this.service.base_url + this.service.tenan + "/batch";  
    this.url_batch = `${this.URLService.getURL()}/batch?course=${this.selected_val}`;
    
        
    
    this.getbatch().subscribe((data) => {
     
      if(data["results"].length == 0)
      {

        this.toastr.warning('No Batch Found', 'No Batch Available', {
          timeOut: 2000
        });
      }
      for(let key in data["results"])
      {        
        this.batch_result.push(data["results"][key])
      }

    }, 
    
    (err)=>
    {
         
      this.toastr.error('Network Error', 'Please Check Internet Connection', {
        timeOut: 2000
      });
    }
    )     
  }


  

  selectChangeBatch (event: any) {   
    this.display=[];
    this.table_data = [];        
    this.student_id = [];
    this.selected_val_batch = event.target.value;
    this.service.selected = this.selected_val_batch;
    this.base_attendance_url = `${this.URLService.getURL()}/attendance?batch=${this.selected_val_batch}&studentIds=`;

    this.service.getAdmission().subscribe((data) => {
      for(let key in data["results"]){        
        this.table_data.push(data["results"][key]['basicDetails']);        
        this.student_id.push(data['results'][key].id);                    
      }
      

      for (let id in this.student_id ){
        if(Number(id) < this.student_id.length-1){
          this.base_attendance_url = this.base_attendance_url +  this.student_id[id] + ','; 
          
        }
        else{
          this.base_attendance_url = this.base_attendance_url +  this.student_id[id]; 
          
        }
           
      }
            

      }
    )
   
        
  }

  getAllAttendance()
  {
    this.httpOptions.headers.set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get(this.base_attendance_url,this.httpOptions);
  } 

       
  
  showData(){    
    this.display=[];
    this.temp=[];
    this.array=[];
    if(this.selected_val_batch == '')
    {
      this.display_data = false;
      this.toastr.error('No Course/Batch Selected', 'Please Select Course/Batch', {
        timeOut: 2000
      })      

    }

    else
    {
      this.display_data = true;
      this.getAllAttendance().subscribe((data1)=>{
        this.attendanceRecordTable = data1['results'];

        for (let id in this.student_id )
        {

          for (let key in data1["results"])
          {
            this.attendance_data.push(data1["results"][key]);

            if( this.attendance_data[key].studentId == this.student_id[id] )            
            {
                            
              if(this.day1 == undefined && this.day2 == undefined )
              {
                if(this.attendance_data[key].attendance == 'P')
                {
                  this.present +=1;
                }

                if(this.attendance_data[key].attendance == 'A')
                {
                  this.absent +=1;
                }
            
                if(this.attendance_data[key].attendance == 'L')
                {
                  this.leave +=1;
                }

              }

              else{
                
                this.localDate = (this.attendance_data[key].date).split("-");
                const date = Number(this.localDate[0]);
                const month = Number(this.localDate[1]);
                const year = Number(this.localDate[2]);
                if( (date >= this.date1  &&
                month >= this.month1  &&
                year >= this.year1 ) )

                {
                  if((month<this.month2 && year<=this.year2 ) || (month==this.month2 && date <= this.date2 && year<=this.year2)){
                    
                  
                  if(this.attendance_data[key].attendance == 'P')
                  {
                    this.present +=1;
                  }

                  if(this.attendance_data[key].attendance == 'A')
                  {
                    this.absent +=1;
                  }
            
                  if(this.attendance_data[key].attendance == 'L')
                  {
                    this.leave +=1;
                  }
                }
                
                }
              } 
                                  
              
              
              // this.date = this.attendance_data[key].date
              this.total_attend = this.leave + this.absent + this.present;

            }         
            

          }
        this.object = {"student_Id": this.student_id[id],"totalAttendance": this.total_attend , "Absent": this.absent, "Present": this.present,"Leave": this.leave};          
        this.array.push(this.object);
        this.present = 0;
        this.absent = 0;
        this.leave = 0; 
        this.total_attend = 0;

        }
        
   
        for(let i=0 ;i<this.table_data.length ;i++)
        {
          this.temp.push({
            studentName:this.table_data[i].studentName,
            fatherName:this.table_data[i].fatherName,
            mobileNumber:this.table_data[i].mobileNumber,
            student_Id:this.array[i].student_Id,
            totalAttendance:this.array[i].totalAttendance,
            Absent:this.array[i].Absent,
            Present:this.array[i].Present,
            Leave:this.array[i].Leave
          })
        }
                
      }      
      ,err=>{   
        this.toastr.error('Network Error', 'Please Check Internet Connection', {
          timeOut: 2000
        });}
      ); 
      
    } 
    this.display=[];
    this.display=this.temp
    
    
  }

 display=[]
 temp=[]


  routeToEdit(id){
   
   this.route.navigate(["/Admission/edit-admissions", id]);
  }



  showPresent(content, s_id){
    this.modalTableRecord = [];

    for(let i = 0; i<this.attendanceRecordTable.length; i++){
      var dateStr = new Date(this.attendanceRecordTable[i]['date'].split('-').reverse());
      
      if(this.attendanceRecordTable[i]['studentId'] == s_id && this.attendanceRecordTable[i]['attendance'] == "P" && dateStr>=new Date(this.startDate) && dateStr<=new Date(this.endDate)){
        
        this.modalTableRecord.push({
          'date': this.attendanceRecordTable[i]['date'],
          'attendance': "Present",
        })
      }
    }

    this.modalService.open(content, {ariaLabelledBy: 'modal-attendance'}).result.then((result) => {
    }, (reason) => {
    });
  }



  showAbsent(content, s_id){

    this.modalTableRecord = [];

    for(let i = 0; i<this.attendanceRecordTable.length; i++){
      var dateStr = new Date(this.attendanceRecordTable[i]['date'].split('-').reverse());
      
      if(this.attendanceRecordTable[i]['studentId'] == s_id && 
      this.attendanceRecordTable[i]['attendance'] == "A" &&
      dateStr>=new Date(this.startDate) &&
      dateStr<=new Date(this.endDate)){
        this.modalTableRecord.push({
          'date': this.attendanceRecordTable[i]['date'],
          'attendance': "Absent",
        })
      }
    }

    this.modalService.open(content, {ariaLabelledBy: 'modal-attendance'}).result.then((result) => {
    }, (reason) => {
    });
  }



  showLeave(content, s_id){
    this.modalTableRecord = [];


    for(let i = 0; i<this.attendanceRecordTable.length; i++){
      var dateStr = new Date(this.attendanceRecordTable[i]['date'].split('-').reverse());
      
      if(this.attendanceRecordTable[i]['studentId'] == s_id && 
      this.attendanceRecordTable[i]['attendance'] == "L" &&
      dateStr>=new Date(this.startDate) &&
      dateStr<=new Date(this.endDate)){
        this.modalTableRecord.push({
          'date': this.attendanceRecordTable[i]['date'],
          'attendance': "Leave",
        })
      }
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-attendance'}).result.then((result) => {
    }, (reason) => {
    });
  }

}
  


