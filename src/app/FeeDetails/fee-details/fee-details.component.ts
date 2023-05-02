import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { ApiDataService } from '../../services/api-data.service';
import {
  FeeReceiptService
} from '../../services/fee-receipt.service';
import { ToastrService } from 'ngx-toastr';

import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-fee-details',
  templateUrl: './fee-details.component.html',
  styleUrls: ['./fee-details.component.css']
})
export class FeeDetailsComponent implements OnInit {

  results = [];
  public searchStr: string = "";
  batch_result = [];
  attendance_result = [];
  originalResult;
  selected_val = '';
  batch_name = '';
  course_name
  course_fee = '';
  
  totalStudent=0
  selected_val_batch = '';
  url_batch = '';
  url;
  list = [];
  searchTable;
  searchTr;
  searchTd;
  pending=false;
  completedFee=false;
  onlineStatus=false;
  offlineStatus=false;

  displayedColumns: string[] = [
    'srNO',
    'studentName',
    'fatherName',
    'mobile',
    'emailId',
    'admission',
    'paymentMethod',
    'status',
    'totalFee',
    'paid',
    'due'
  ];
  dataSource = new MatTableDataSource ();
  @ViewChild(MatPaginator, {
    static: true
  }) paginator: MatPaginator;
  @ViewChild(MatSort, {
    static: true
  }) sort: MatSort;
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


  constructor(public service: ApiDataService, private toastr: ToastrService,public serve: FeeReceiptService) {

    this.service.getCource().subscribe((data) => {
      this.details=[]
      this.dummyData=[]
      this.dataSource.data=[]
        for (let key in data["results"]) {
          this.results.push(data["results"][key]);

        }

      },

      (err) => {
        this.toastr.error('Network Connection Error', 'Somthing Went Wrong', {
          timeOut: 2000
        });
      }
    )
  }




  dataBySearch
  public modelChange(str: string): void {
    let n
    this.dataSource.data=[]
    this.pending=true;
  this.completedFee=true;
  this.onlineStatus=true;
  this.offlineStatus=true;
this.details=[]
    let totalDue=0
    let totalAmount=0
    this.details=[]
    this.service.bySearching(str).subscribe(
      res=>{
        this.dataBySearch=[]
        this.dataBySearch = res["results"]
        for(let i=0;i<res["results"].length;i++)
        {
          this.details.push({
            srNO :  i+1 ,
            studentName : res["results"][i].basicDetails.studentName ,
            fatherName : res["results"][i].basicDetails.fatherName,
            mobile : res["results"][i].basicDetails.mobileNumber,
            emailId : res["results"][i].basicDetails.emailID  ,
            admission : res["results"][i].officeUseForm.dateOfRegistration,
            paymentMethod: res["results"][i].receipt.payableMode,
            status : res["results"][i].receipt.feeStatus,
            totalFee : res["results"][i].receipt.totalPayableFee,
            paid : res["results"][i].receipt.paidFees == undefined ? 0 : res["results"][i].receipt.paidFees  ,
            due : res["results"][i].receipt.dueFees == undefined ? 0 : res["results"][i].receipt.dueFees 

          })
          totalDue+=res["results"][i].receipt.dueFees == undefined  ? 0 : res["results"][i].receipt.dueFees ;
          n = parseInt(res["results"][i].receipt.paidFees)
        
          totalAmount+= isNaN(n) ? 0 : parseInt(res["results"][i].receipt.paidFees) 
        }

        this.dataSource = new MatTableDataSource(this.details)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dummyData=this.details
        
        this.course_name = ''
        this.batch_name =''
        this.totalStudent = res["results"].length
        this.course_fee =  res["results"][0].receipt.totalPayableFee
        this.total_Due = totalDue
        this.total_Ammount = totalAmount

        
      }
      
    )
   
  }

  ngOnInit() {}




  batchName
  placeholder

  selectChangeHandler(event: any) {
    this.details=[]
    this.dataSource.data=[]
  
    this.batch_result=[]
    this.batchName=this.placeholder;
    this.batchName="Select Batch"
    let id = event.target.value;
    
    this.service.getBatch(id).subscribe(
      res=>{
        
        this.batch_result = res["results"]
        this.batchName=this.placeholder;
      }
    )


  }
select=''
details=[]
dummyData
total_Ammount
total_Due


  selectBatch(event: any) {
    this.total_Ammount=0;
    this.pending=true;
  this.completedFee=true;
  this.onlineStatus=true;
  this.offlineStatus=true;
this.details=[]
this.dataSource.data=[]
    let totalDue=0;
    let totalAmount=0;
    this.service.getDetails(event.target.value).subscribe(
      res=>{
        for(let i=0;i<res["results"].length;i++)
        {
          this.details.push({
            srNO :  i+1 ,
            studentName : res["results"][i].basicDetails.studentName ,
            fatherName : res["results"][i].basicDetails.fatherName,
            mobile : res["results"][i].basicDetails.mobileNumber,
            emailId : res["results"][i].basicDetails.emailID  ,
            admission : res["results"][i].officeUseForm.dateOfRegistration,
            paymentMethod: res["results"][i].receipt.payableMode,
            status : res["results"][i].receipt.feeStatus,
            totalFee : res["results"][i].receipt.totalPayableFee,
            paid : res["results"][i].receipt.paidFees ,
            due : res["results"][i].receipt.dueFees == undefined ? 0 : res["results"][i].receipt.dueFees 

          })
          totalDue+=res["results"][i].receipt.dueFees == undefined  ? 0 : res["results"][i].receipt.dueFees ;
          totalAmount+=parseInt(res["results"][i].receipt.totalPayableFee);
        }
        this.dataSource = new MatTableDataSource(this.details)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dummyData=this.details
        this.course_name = res["results"][0].officeUseForm.course[0].name;
        this.batch_name = res["results"][0].officeUseForm.batch[0].name
        this.totalStudent = res["results"].length
        this.course_fee =  res["results"][0].receipt.totalPayableFee
        this.total_Due = totalDue
        this.total_Ammount = totalAmount

        
      }
    )
 


  }





  pendingCheck=false
  getPendingDetails(){
   if(this.pending == false)
   {
    this.toastr.error('Please Select First Course OR Batch', 'Selection Required', {
      timeOut: 2000
    });
   }
   else{
     if(this.pendingCheck == false)
     {
       this.dataSource.data=[]
      this.dummyData=[]
      let totalDue=0
      let totalAmount=0
      this.total_Ammount=0;
      this.total_Due=0;
      for(let i=0;i<this.details.length;i++)
      {
        if(this.details[i].status == "Pending")
        {
          this.dummyData.push({
            srNO :  i+1 ,
            studentName : this.details[i].studentName ,
            fatherName : this.details[i].fatherName,
            mobile : this.details[i].mobile,
            emailId : this.details[i].emailId  ,
            admission :this.details[i].admission,
            paymentMethod: this.details[i].paymentMethod,
            status : this.details[i].status,
            totalFee : this.details[i].totalFee,
            paid : this.details[i].paid,
            due : this.details[i].due
          })
        }
        totalDue+=this.details[i].due;
        totalAmount+=parseInt(this.details[i].paid);
      }
      this.dataSource = new MatTableDataSource(this.dummyData)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total_Due = totalDue
      this.total_Ammount = totalAmount
      this.totalStudent = this.dummyData.length
      this.pendingCheck=true;
     }
     else
     {
       
         this.reCall();
       this.pendingCheck=false;

     }
   }
  }

  completeCheck =false
  getCompletedDetails(){
    if(this.completedFee == false)
   {
    this.toastr.error('Please Select First Course OR Batch', 'Selection Required', {
      timeOut: 2000
    });
   }
   else
   {
     if(this.completeCheck == false)
     {
      this.dummyData=[]
      this.dataSource.data=[]
      let totalDue=0
      let totalAmount=0
      this.total_Ammount=0;
      this.total_Due=0;
      for(let i=0;i<this.details.length;i++)
      {
        if(this.details[i].status == "Completed")
        {
          this.dummyData.push({
            srNO :  i+1 ,
            studentName : this.details[i].studentName ,
            fatherName : this.details[i].fatherName,
            mobile : this.details[i].mobile,
            emailId : this.details[i].emailId  ,
            admission :this.details[i].admission,
            paymentMethod: this.details[i].paymentMethod,
            status : this.details[i].status,
            totalFee : this.details[i].totalFee,
            paid : this.details[i].paid,
            due : this.details[i].due
          })
        }
        totalDue+=this.details[i].due;
        totalAmount+=parseInt(this.details[i].paid);
      }
      this.dataSource = new MatTableDataSource(this.dummyData)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total_Due = totalDue
      this.total_Ammount = totalAmount
      this.completeCheck = true
      this.totalStudent = this.dummyData.length
     }
     else{
      this.reCall();
      this.completeCheck = false;
     }
   }

  }

onlineCheck=false
  getOnlineStatusDetails(){
    
    if(this.onlineStatus == false)
   {
    this.toastr.error('Please Select First Course OR Batch', 'Selection Required', {
      timeOut: 2000
    });
   }
   else{
     if(this.onlineCheck == false)
     {
      this.dummyData=[]
      this.dataSource.data=[]
      let totalDue=0
      let totalAmount=0
      this.total_Ammount=0;
      this.total_Due=0;
      for(let i=0;i<this.details.length;i++)
      {
        if(this.details[i].paymentMethod == "Online")
        {
          this.dummyData.push({
            srNO :  i+1 ,
            studentName : this.details[i].studentName ,
            fatherName : this.details[i].fatherName,
            mobile : this.details[i].mobile,
            emailId : this.details[i].emailId  ,
            admission :this.details[i].admission,
            paymentMethod: this.details[i].paymentMethod,
            status : this.details[i].status,
            totalFee :this.details[i].totalFee ,
            paid : this.details[i].paid ,
            due : this.details[i].due 
          })
        }
        totalDue+=this.details[i].due;
        totalAmount+=parseInt(this.details[i].paid);
      }
      this.dataSource = new MatTableDataSource(this.dummyData)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total_Due = totalDue
      this.total_Ammount = totalAmount
      this.onlineCheck=true
      this.totalStudent = this.dummyData.length
     }
     else{
      this.reCall();
      this.onlineCheck=false
     }
   }
  }

offlineCheck=false
  getOfflineStatusDetails(){
    if(this.offlineStatus == false)
   {
    this.toastr.error('Please Select First Course OR Batch', 'Selection Required', {
      timeOut: 2000
    });
   }
   else{
     if(this.offlineCheck == false)
     {
       this.dataSource.data=[]
      this.dummyData=[]
      let totalDue=0
      let totalAmount=0
      this.total_Ammount=0;
      this.total_Due=0;
      for(let i=0;i<this.details.length;i++)
      {
        if(this.details[i].paymentMethod == "Offline")
        {
          this.dummyData.push({
            srNO :  i+1 ,
            studentName : this.details[i].studentName ,
            fatherName : this.details[i].fatherName,
            mobile : this.details[i].mobile,
            emailId : this.details[i].emailId  ,
            admission :this.details[i].admission,
            paymentMethod: this.details[i].paymentMethod,
            status : this.details[i].status,
            totalFee : this.details[i].totalFee,
            paid : this.details[i].paid,
            due : this.details[i].due
          })
        }
        totalDue+=this.details[i].due;
        totalAmount+=parseInt(this.details[i].paid);
      }
      this.dataSource = new MatTableDataSource(this.dummyData)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total_Due = totalDue
      this.total_Ammount = totalAmount
      this.offlineCheck=true
      this.totalStudent = this.dummyData.length
     }
     else{
      this.reCall();
      this.offlineCheck=false;
     }
   }
  }

  reCall()
  {
    this.dummyData=[]
    this.dataSource.data=[]
    let totalDue=0
    let totalAmount=0
    this.total_Ammount=0;
    this.total_Due=0;
    for(let i=0;i<this.details.length;i++)
    {
      
      
        this.dummyData.push({
          srNO :  i+1 ,
          studentName : this.details[i].studentName ,
          fatherName : this.details[i].fatherName,
          mobile : this.details[i].mobile,
          emailId : this.details[i].emailId  ,
          admission :this.details[i].admission,
          paymentMethod: this.details[i].paymentMethod,
          status : this.details[i].status,
          totalFee : this.details[i].totalFee,
          paid : this.details[i].paid,
          due : this.details[i].due
        })
      
      totalDue+=this.details[i].due;
      totalAmount+=parseInt(this.details[i].paid);
    }
    this.total_Due = totalDue
    this.total_Ammount = totalAmount
    this.dataSource = new MatTableDataSource(this.dummyData)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.totalStudent = this.dummyData.length
   }
}
