import { Component, OnInit, ViewChild } from '@angular/core';

import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {TaskServiceService} from '../../services/task-service.service'

import {Router} from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import {ConfirmDialogModel, DialogSHOWComponent } from '../../dialog-show/dialog-show.component';
import { MatDialog } from '@angular/material';


export interface TableEntry{
  label : string;
  priority : string;
  key_id : string;
  project : string;
  status : string;
  assigned_to : string;
  end_date : string;
  created_by : string;
}
@Component({
  selector: 'app-view-all-task',
  templateUrl: './view-all-task.component.html',
  styleUrls: ['./view-all-task.component.css']
})
export class ViewAllTaskComponent implements OnInit {



  entries=[]

  table : boolean = true;
  editTask : boolean = false;
  searchKey;

  dataSource : MatTableDataSource <TableEntry>


  displayedColumns: string[]= [
    "label",
    "priority",
    "key_id",
    "project",
    "status",
    "assigned_to",
    "progress",
    "end_date",
    "created_by",
    "actions"
  ]

  @ViewChild(MatPaginator, {static:true}) 
  
  paginator: MatPaginator;

  @ViewChild(MatSort, {
    static: true
  }) 
  sort: MatSort;


  constructor(private taskService : TaskServiceService,
              private router : Router,
              private toastr: ToastrService,
              private dialog : MatDialog) { }



  ngOnInit() {
    this.getTable();
    this.taskService.taskDetails=[]
    
  }

  showTasks(){
    var data;
    return new Promise((resolve, reject)=> {

      this.taskService.getTasks().subscribe(response=> {
      if(JSON.parse(localStorage.getItem('loginData'))['designation']=="Teacher"){
        for(let key of response['results']){
          if(key['userMember']['id']==JSON.parse(localStorage.getItem('loginData'))['id']){
            this.entries.push(key)
          }
        }
        this.dataSource = new MatTableDataSource(this.entries);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      for(let i = 0; i < this.entries.length; i++ ){
        this.entries.push(this.createNewEntry(i));
      }

      }
      else{
      this.dataSource = new MatTableDataSource(response["results"]);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      for(let i = 0; i < response["results"].length; i++ ){
        this.entries.push(this.createNewEntry(i));
      }
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
    var response = await this.showTasks();
  }
  


  createNewEntry(index : number) : TableEntry{
    return{
      label : this.dataSource.filteredData[index]['taskLabel'],
      priority : this.dataSource.filteredData[index]['taskPriority'],
      key_id : this.dataSource.filteredData[index]['key_Id'],
      project : this.dataSource.filteredData[index]['projectName'],
      status : this.dataSource.filteredData[index]['taskStatus'],
      assigned_to : this.dataSource.filteredData[index]['userMember']['name'],
      end_date : this.dataSource.filteredData[index]['date']['endDate'],
      created_by : this.dataSource.filteredData[index]['project']['userMember']['name']
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

    
    this.taskService.taskDetails.push(row)
    this.router.navigate(['Task/edit-task'])
    
    
  }




  


onDelete(row){

  const message = `Are you sure you want to delete?`;
 
  const dialogData = new ConfirmDialogModel("Delete Task!", message);

  const dialogRef = this.dialog.open(DialogSHOWComponent, {
    maxWidth: "400px",
    data: dialogData
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
    let result = dialogResult;


  if(result){
    this.taskService.deleteTask(row).subscribe(
      res=>{ 
    this.dataSource = new MatTableDataSource([]);
    this.entries=[]


        this.getTable()
        this.toastr.success('Task Deleted Successfully', 'Success', {
          timeOut: 2000
        })
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
