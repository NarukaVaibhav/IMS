import { Component, OnInit, ViewChild } from '@angular/core';
import {TaskServiceService} from '../../services/task-service.service'

import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';

import {Router} from '@angular/router'
import { ToastrService } from 'ngx-toastr';

import {ConfirmDialogModel, DialogSHOWComponent } from '../../dialog-show/dialog-show.component';
import { MatDialog } from '@angular/material';

export interface TableEntry {
  type: string;
  config_type: string;
  config_value: string; 
  tenant : string;
  status : string;
  createdAt : string;
  updatedAt : string;
  id : string;

}

@Component({
  selector: 'app-view-task-config',
  templateUrl: './view-task-config.component.html',
  styleUrls: ['./view-task-config.component.css']
})
export class ViewTaskConfigComponent implements OnInit {


  searchKey


  entries=[]

  


 

  displayedColumns: string[]= [
    "type",
    "config_type",
    "config_value",
    "actions"
  ];

  @ViewChild(MatPaginator, {
    static: true
  }) paginator: MatPaginator;
  @ViewChild(MatSort, {
    static: true
  }) sort: MatSort;

  constructor(private taskService : TaskServiceService,
              private router : Router,
              private toastr: ToastrService,
              private dialog : MatDialog) { }

 dataSource : MatTableDataSource < TableEntry > ;
 

  ngOnInit() {

    this.getTable();

    this.taskService.configDetails=[]
  }

  createTableconfig(){
    var data;

    return new Promise((resolve, reject)=> {

      this.taskService.getTaskConfig().subscribe(response=> {
      this.entries=response['results']
      this.dataSource = new MatTableDataSource(this.entries);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      const entries = [];
      for(let i = 0; i < response["results"].length; i++ ){
        entries.push(this.createNewEntry(i));
      }
      resolve(data);
    },err=>{
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });
    });
})
 
  }
  
async getTable(){
  var response = await this.createTableconfig();
}

  createNewEntry(index : number) : TableEntry{
    return{
      type : this.dataSource.filteredData[index]['type'],
      config_type : this.dataSource.filteredData[index]['configType'],
      config_value: this.dataSource.filteredData[index]['configValue'],
      tenant : this.dataSource.filteredData[index]['tenant'],
      status : this.dataSource.filteredData[index]['status'],
      updatedAt : this.dataSource.filteredData[index]['updatedAt'],
      createdAt : this.dataSource.filteredData[index]['createdAt'],
      id : this.dataSource.filteredData[index]['id']

    }
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

onEdit(row){
  
  this.taskService.configDetails.push(row);
  this.router.navigate(['TaskConfig/edit-task-config']);
  
}





onDelete(row){

  const message = `Are you sure you want to delete?`;
 
  const dialogData = new ConfirmDialogModel("Delete Task-Config!", message);

  const dialogRef = this.dialog.open(DialogSHOWComponent, {
    maxWidth: "400px",
    data: dialogData
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
    let result = dialogResult;

    if(result){

      this.taskService.deleteTaskConfig(row).subscribe(
        res=>{ 
          this.toastr.success('Task-Config Deleted Successfully', 'Success', {
            timeOut: 2000
          })
          this.entries=[]
          
          this.getTable()
          
        },err=>{
          this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
            timeOut: 2000
          });
        }
      )
    }
  })
}





}
