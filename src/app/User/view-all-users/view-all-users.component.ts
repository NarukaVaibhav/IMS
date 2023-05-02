import { Component, OnInit, ViewChild } from '@angular/core';

import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';

import { ViewUsersService } from '../../services/view-users.service';
import {DatePipe} from '@angular/common'

import {Router} from '@angular/router'

import { ToastrService } from 'ngx-toastr';

import {ConfirmDialogModel, DialogSHOWComponent } from '../../dialog-show/dialog-show.component';
import { MatDialog } from '@angular/material';

export interface TableEntry {
  name: string;
  designation: string;
  emailId: string;
  contactNumber: string;
  browserSupport : string;
  updatedAt: string;
  status: string;

}



@Component({
  selector: 'app-view-all-users',
  templateUrl: './view-all-users.component.html',
  styleUrls: ['./view-all-users.component.css'],

})



export class ViewAllUsersComponent implements OnInit{


  searchKey: string;





  entries=[]

  displayedColumns: string[]= [
    "name",
    "designation",
    "emailId",
    "contactNumber",
    "browserSupport",
    "updatedAt",
    "status",
    "actions"
  ];



  constructor(public user: ViewUsersService,
              public datePipe : DatePipe,
              private dialog : MatDialog,
              private router : Router,
              private toastr: ToastrService) {
              }


 dataSource : MatTableDataSource < TableEntry > ;

 tableData =[];


  @ViewChild(MatPaginator, {static:true})

  paginator: MatPaginator;

  @ViewChild(MatSort, {
    static: true
  })
  sort: MatSort;




  ngOnInit() {




    if(this.user.AllUsersData.length==0) {
      this.dataSource = new MatTableDataSource([]);
      this.getAllUsers(this.pno, this.psize);

      this.user.row_obj233 = []
    }else{
      this.pno=this.user.pagesize;
      this.tempdata=this.user.AllUsersData;
      this.dataSource = new MatTableDataSource(this.user.AllUsersData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // this.loading=false;
      this.dataSource.paginator.pageIndex=this.pageIndex;
      // this.dataSource.paginator.=this.previousPageIndex;
    }

  }
  pno=1;
  psize=20;
  loading=false;
  previousPageIndex;
  pageIndex;
  PageEvent(e:any){
    // console.log(e);
    // console.log(e.length/e.pageSize);
    // console.log(e.pageIndex);
    // console.log(this.pno,this.loading);
    if(!this.searchenable) {
      this.pageIndex = e.pageIndex;
      // this.previousPageIndex=e.previousPageIndex;
      if ((e.pageIndex)==(Math.floor(e.length/e.pageSize)) ||(e.pageIndex + 1) == (Math.floor(e.length / e.pageSize)) || [Math.floor((e.length / e.pageSize)) - 1] == (e.pageIndex + 1)) {
        if (!this.loading) {
          // this.psize=this.psize+20;

          this.loading = true;
          this.getAllUsers(this.pno, this.psize);
        }

      }
    }
  }
  tempdata:any=[];
  getAllUsers(pno,size){
    this.user.getTableData(pno,size).subscribe(response=> {

      for(let key of response['results']){
        if(typeof key['browserSupport'] === 'undefined'){
          key['browserSupport']=""
        }
      }
      this.pno=this.pno+1;
      this.user.pagesize=this.pno;
      if(this.tempdata.length==0){
        this.tempdata=response['results'];
        this.user.AllUsersData=this.tempdata;
        this.dataSource = new MatTableDataSource(response['results']);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading=false;
      }else{
        // console.log(this.tempdata);
        let temp:any=response['results'];
        for(let i=0;i<temp.length;i++){
          this.tempdata.push(temp[i]);

        }
        // console.log(this.tempdata);
        this.user.AllUsersData=this.tempdata;
        this.dataSource = new MatTableDataSource(this.tempdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading=false;
      }



    },(err)=>{this.loading=false;
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });
    });


  }

  searchenable=false;
       searchUser(){
      this.user.SeacrhUser(this.searchKey).subscribe((res)=>{
          console.log(res);
          this.searchenable=true;
        this.dataSource = new MatTableDataSource(res['results']);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      });
       }




  onSearchClear(){
  this.searchenable=false;
  if(this.tempdata.length>0){
    this.dataSource = new MatTableDataSource(this.tempdata);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
    this.searchKey = "";
    this.applyFilter();
  }




  applyFilter() {
         if(this.searchenable){
           this.searchenable=false;
           if(this.tempdata.length>0){
             this.dataSource = new MatTableDataSource(this.tempdata);
             this.dataSource.paginator = this.paginator;
             this.dataSource.sort = this.sort;
           }
         }else{
           this.dataSource.filter = this.searchKey.trim().toLowerCase();

           if (this.dataSource.paginator) {
             this.dataSource.paginator.firstPage();
           }
         }


  }





 onEdit(row){

   this.user.row_obj233[0]=row;

   this.router.navigate(['User/edit-user'])


 }







onActive(row){

  const active_user={
    "id" : row['id'],
    "status" : "Active"
  }
  this.user.updateUser(active_user).subscribe(res=> {
    this.toastr.success('User Activated Successfully', 'Success', {
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
  const inactive_user={
    "id" : row['id'],
    "status" : "Inactive"
  }
  this.user.updateUser(inactive_user).subscribe(res=>{
    this.toastr.success('User Deactivated Successfully', 'Success', {
      timeOut: 2000
    })
    row['status']="Inactive"},
    err=>{
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });
    })
}




onDelete(row){

  const message = `Are you sure you want to delete?`;

  const dialogData = new ConfirmDialogModel("Delete User!", message);

  const dialogRef = this.dialog.open(DialogSHOWComponent, {
    maxWidth: "400px",
    data: dialogData
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
    let result = dialogResult;

  if(result) {
    // console.log(row);
  this.user.deleteUser(row).subscribe(res=>{
    // this.dataSource = new MatTableDataSource([]);
  // this.getAllUsers();
    let temp:any=[];
    let delprocess=new Promise((resolve,reject)=>{
      for(let i=0;i<this.tempdata.length;i++){
        if(row.id!=this.tempdata[i].id){
          temp.push(this.tempdata[i]);
        }
      }
      resolve();
    });
    delprocess.then(()=>{
      this.tempdata=temp;
      this.user.AllUsersData=this.tempdata;
      this.dataSource = new MatTableDataSource(this.tempdata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.toastr.success('User Deleted Successfully', 'Success', {
        timeOut: 2000
      })
    });

  },
  err=>{
    this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
      timeOut: 2000
    });
  })

}
  })
}





  }




















