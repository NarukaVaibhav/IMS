import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {EnquiryServiceService} from '../../services/enquiry-service.service'
import {Router} from "@angular/router";
import {ConfirmDialogModel, DialogSHOWComponent } from '../../dialog-show/dialog-show.component';
import { MatDialog } from '@angular/material';

import { ToastrService } from 'ngx-toastr';


export interface TableEntry {

  followUps : [];
  enquiredFor : string;
  name: string;
  emailId: string;
  contactNumber: string;
  collegeName: string;
  referenceName : string;
  updatedAt: string;
  enquirydate: string;
  description: string;
  status: string;
  row_status: boolean;
  createdAt: string;
  enquiryMode : string;
  qualification: string;
  enquireddate : string;
  tenant : string;
  id : string;
}


@Component({
  selector: 'app-view-all-enquiry',
  templateUrl: './view-all-enquiry.component.html',
  styleUrls: ['./view-all-enquiry.component.css']
})




export class ViewAllEnquiryComponent implements OnInit {

  dataSource :  MatTableDataSource <TableEntry> ;

 entries=[];
 tableData =[]
  
 
  searchKey: string;
  

  

  EnquiryDetails =[]

  



  displayedColumns: string[]= [
    "name",
    "emailId",
    "contactNumber",
    "collegeName",
    "referenceName" ,
    "updatedAt",
    "enquirydate",
    "description",
    "status",
    "actions"

  ];

  
 

 @ViewChild(MatPaginator, {static:true}) 
  
  paginator: MatPaginator;

  @ViewChild(MatSort, {
    static: true
  }) 
  sort: MatSort;

  constructor(private enqService : EnquiryServiceService,
              private dialog: MatDialog,
              private router : Router,
              private toastr: ToastrService) { }

 

  ngOnInit() {
    this.entries=[]
    this.tableData=[]
    this.getAllEnquiry();
    
    this.enqService.EnquiryDetails =[]
    this.enqService.EnqSummary =[]

 
  }


  getAllEnquiry(){
    this.enqService.EnquiryDetails=[]
    this.enqService.getEnquiryDetails().subscribe(response=> { 
      
      

      this.entries=response['results']

       for(let i = 0; i < response['results'].length; i++ ){
         this.tableData.push(this.createNewEntry(i));
                 
       }

    this.dataSource = new MatTableDataSource(this.tableData);
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


        
      } ,err=>{
        this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
          timeOut: 2000
        });
      });
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

  createNewEntry(index: number): TableEntry {

    if(typeof this.entries[index]['referenceName'] === "undefined"){
      this.entries[index]["referenceName"]=""
    }
    else if(typeof this.entries[index]['description'] === "undefined"){
      this.entries[index]["description"]=""
    }
    else if(typeof this.entries[index]['collegeName'] === "undefined"){
      this.entries[index]["collegeName"]=""
    }

  
    return {
        
        followUps: this.entries[index]['followUps'],
        enquiredFor : this.entries[index]['enquiredFor'],
        name: this.entries[index]["name"],
        emailId: this.entries[index]["emailId"],
        contactNumber: this.entries[index]["contactNumber"],
        collegeName: this.entries[index]["collegeName"],
        referenceName : this.entries[index]["referenceName"],
        updatedAt: this.entries[index]["updatedAt"],
        enquirydate: this.entries[index]["enquirydate"],
        description: this.entries[index]["description"],
        status: this.entries[index]["status"],
       row_status : this.entries[index]["status"] == "Converted" ? true : false,
       createdAt: this.entries[index]['createdAt'],
        enquiryMode: this.entries[index]['enquiryMode'] ,
        qualification :  this.entries[index]['qualification'],
        enquireddate: this.entries[index]['enquireddate'],
        tenant: this.entries[index]['tenant'],
        id : this.entries[index]['id']
        }
  
}








onEdit(row){

  
  this.enqService.EnquiryDetails.push(row)
  this.router.navigate(['Enquiry/edit-enquiry']);


}



summarize(row){

  this.enqService.EnqSummary.push(row);
  this.router.navigate(['Enquiry/enquiry-summary']);

  

}






onDelete(row){

  const message = `Are you sure you want to delete?`;
 
    const dialogData = new ConfirmDialogModel("Delete Enquiry!", message);
 
    const dialogRef = this.dialog.open(DialogSHOWComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
      let result = dialogResult;

  if(result) {

    delete row['row_status']

  this.enqService.deleteEnq(row).subscribe(
    
    res=>{
      
      this.entries=[];
      this.tableData=[];

      this.getAllEnquiry();
  
      this.toastr.success('Enquiry Deleted Successfully', 'Success', {
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
