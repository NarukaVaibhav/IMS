import { Component, OnInit, ViewChild } from '@angular/core';

import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {TaskServiceService} from '../../services/task-service.service'



import {Router} from '@angular/router'
import { ToastrService } from 'ngx-toastr';

import {ConfirmDialogModel, DialogSHOWComponent } from '../../dialog-show/dialog-show.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})

export class ViewProjectComponent implements OnInit {

 dataSource;

  

  searchKey;

  entries = []

  

  displayedColumns: string[]= [
    "name",
    "key",
    "desc",
    "type",
    "lead",
    "categ",
    "proj_status", 
    "status",
    "actions"
  ];

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
    this.taskService.projDetails=[]
    
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



  createTableconfig(){
    

      this.taskService.getProject().subscribe(response=> {
      this.entries=response['results']
      this.dataSource = new MatTableDataSource(this.entries);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;


      
},err=>{
  this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
    timeOut: 2000
  });
})
 
  }


  
async getTable(){
  var response = await this.createTableconfig();
}




onEdit(row){

  

  this.taskService.projDetails.push(row)
  this.router.navigate(['Project/edit-project'])

  

}





onActive(row){
  let req_pay={
    "id" : row['id'],
    "status" : "Active"
  }

  this.taskService.activateProject(req_pay).subscribe(res=>{ 
    this.toastr.success('Project Activated Successfully', 'Success', {
      timeOut: 2000
    })
    row['status']="Active"},
    err=>{
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });
    })
}

onInactive(row){
  let req_payload={
    "id" : row['id'],
    "status" : "Inactive"
  }

  this.taskService.deactivateProject(req_payload).subscribe(res=> {
    this.toastr.success('Project Deactivated Successfully', 'Success', {
      timeOut: 2000
    })
    row['status']="Inactive"},
    err=>{
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });
    }
    )
}


onDelete(row){

  const message = `Are you sure you want to delete?`;
 
  const dialogData = new ConfirmDialogModel("Delete Poject!", message);

  const dialogRef = this.dialog.open(DialogSHOWComponent, {
    maxWidth: "400px",
    data: dialogData
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
    let result = dialogResult;

  if(result){
  this.taskService.deleteProject(row).subscribe((res)=>
    { 
      this.toastr.success('Project Deleted Successfully', 'Success', {
        timeOut: 2000
      })

      this.entries=[]
       this.getTable();
    
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
