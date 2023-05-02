import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx'; 

import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {TaskServiceService} from '../../services/task-service.service'

import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css']
})
export class UserTasksComponent implements OnInit {

  dataSource;
  searchKey;

  displayedColumns: string[]= [
    "name",
    "email",
    "designation",
    "updated_at",
    "status"
  ]

  @ViewChild(MatPaginator, {static:true}) 
  
  paginator: MatPaginator;

  @ViewChild(MatSort, {
    static: true
  }) 
  sort: MatSort;

  constructor(private taskService : TaskServiceService,
              private toastr : ToastrService) { }

  ngOnInit() {

    this.getTable();
  }

  showTasks(){
    var data;

    return new Promise((resolve, reject)=> {

      this.taskService.getTeamMember().subscribe(response=> {
      
      this.dataSource = new MatTableDataSource(response["results"]);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      resolve(data);
    },err=>{
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });
    });
})

  }


  async getTable(){
    var response = await this.showTasks();
  }



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
 



  /*name of the excel-file which will be downloaded. */ 
fileName= 'UsersTask.xlsx';  

exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('user-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }

}
