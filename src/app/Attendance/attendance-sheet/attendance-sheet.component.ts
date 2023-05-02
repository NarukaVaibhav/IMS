import { Component, OnInit, ViewChild } from '@angular/core';
import { AttendanceSheetService} from '../../services/attendance-sheet.service';
import { Router } from '@angular/router';
import {
  MatPaginator
} from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import {MatSort} from '@angular/material/sort';
import {
  MatTableDataSource
} from '@angular/material/table';


export interface TableEntry {
  batchName : string;
  teacherName : string;
  batchTime : string ;
  update : string;
  status : string;
  timmingTo:string
  id:string;
  
}
@Component({
  selector: 'app-attendance-sheet',
  templateUrl: './attendance-sheet.component.html',
  styleUrls: ['./attendance-sheet.component.css']
})
export class AttendanceSheetComponent implements OnInit {

  attendancedata=[];
  card=[];
  name:'  ';
  timmingTo = [];
  timmingFrom = [];
  batchid;
  d;
  str:"";
  batchName;
  teacherName;
  batchTime;
  update;
  search="";
  aa:boolean=false;
 

  
temp=[]
  constructor(public service:AttendanceSheetService,private route : Router) {
    this.onCall();
  }

  onCall()
  {
    
    this.service.getting().subscribe((res)=>{

      this.attendancedata = res["results"]
  
      for(let i=0; i< res["results"].length ;i++){
        this.service.attendance(res["results"][i]["id"]).subscribe((attendance)=>{
          
          this.temp.push({
            batchName :res["results"][i].name ? res["results"][i].name : 'N/A',
            teacherName:res["results"][i].teacher ? (res["results"][i].teacher.name) : 'N/A',
            batchTime:res["results"][i].name ? res["results"][i].timmingFrom : 'N/A',
            timmingTo:res["results"][i].name ? res["results"][i].timmingTo : 'N/A',
            update:attendance["results"] == 0 ?"" : attendance["results"][0].updatedAt,
            status:res["results"][i].name? res["results"][i].status : 'N/A',
            id:res["results"][i].name? res["results"][i].id : 'N/A'
            
          })
          this.dataSource = new MatTableDataSource(this.temp);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;  
          
      
         
        })

      }
     
            
    })
   }

  

  attendance(row)
  {
   
    if(row.date!=""){
     this.route.navigate(['/Attendance/attendenceAll' , row.id])
    }
  }

  ngOnInit() {
   
  }

  displayedColumns: string[] = [
    'batchName',
    'teacherName',
    'batchTime',
    'update',
    'status',
    
    
  ];
  dataSource: MatTableDataSource < TableEntry > ;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  searchKey
  onSearchClear(){

    this.searchKey = "";
    this.applyFilter();
  }
  



  // function for search bar functionality
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
