import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  isArray
} from 'util';
import {
  Router
} from '@angular/router';
import {
  DatePipe
} from '@angular/common';
import {
  ApiDataService
} from '../../services/apidata.service';
import {
  ToastrService
} from 'ngx-toastr';
import {MatPaginator, MatSort, MatTableDataSource, MatCheckboxChange} from '@angular/material';
import {
  NgbModal,
  ModalDismissReasons
} from '@ng-bootstrap/ng-bootstrap';
import{PDFGENERATEService} from '../../pdfgenerate.service';
export interface TableEntry {
  receiptNumber : string;
  studentName : string;
  fatherName : string ;
  batch : string;
  courseName : string;
  payAmount : string ;
  date : string;
  id : string;

}
@Component({
  selector: 'app-fee-receipt',
  templateUrl: './fee-receipt.component.html',
  styleUrls: ['./fee-receipt.component.css']
})

export class FeeReceiptComponent implements OnInit {

  constructor(private route: Router, private serv: ApiDataService,private modalService: NgbModal, private toastr: ToastrService, private datePipe: DatePipe,public pdf:PDFGENERATEService) {}
 // ********MODAL
 closeResult = '';
 open(content) {
   this.modalService.open(content, {
     ariaLabelledBy: 'modal-basic-title',
     size: 'lg'
   }).result.then((result) => {
     this.closeResult = `Closed with: ${result}`;
   }, (reason) => {
     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
   });
 }
 private getDismissReason(reason: any): string {
   if (reason === ModalDismissReasons.ESC) {
     return 'by pressing ESC';
   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
     return 'by clicking on a backdrop';
   } else {
     return `with: ${reason}`;
   }
 }
  ngOnInit() {}
  values = '';
  result = []
  temp = []
  date
  date2
  search
  currentDate = new Date();
  checkDateInRange() {

    if(this.date == undefined || this.date2 == undefined)
    {
      this.toastr.error('Please Choose the Date', 'Date Not Selected !', {
        timeOut: 2000
      });
    }else{
      let d1 = this.datePipe.transform(this.date, 'd MMMM y');
    let d2 = this.datePipe.transform(this.date2, 'd MMMM y')
    var from = Date.parse(d1);
    var to = Date.parse(d2);
    this.dataSource.data=[]
    this.result = []
    for (let i in this.temp) {
      var check = Date.parse(this.temp[i].date);
      if ((check <= to && check >= from)) {


        if (isArray(this.temp[i].officeUseForm.course)) {
          this.result.push({
            receiptNumber: this.temp[i].receiptNumber ? this.temp[i].receiptNumber : '',
            studentName: this.temp[i].basicDetails.studentName ? this.temp[i].basicDetails.studentName : '',
            fatherName: this.temp[i].basicDetails.fatherName ? this.temp[i].basicDetails.fatherName : '',
            batch: this.temp[i].officeUseForm.batch ? (this.temp[i].officeUseForm.batch.length != 0 ? this.temp[i].officeUseForm.batch[0].name : '') : '',
            courseName: this.temp[i].officeUseForm ? (this.temp[i].officeUseForm.course[0].name ? this.temp[i].officeUseForm.course[0].name : '') : '',
            payAmount: this.temp[i].payAmount ? this.temp[i].payAmount : '',
            feeStatus:this.temp[i].feeStatus ? this.temp[i].feeStatus : '',
            date: this.temp[i].createdAt ? this.temp[i].createdAt : '',
            id: this.temp[i].id

          })
        } else {
          this.result.push({
            receiptNumber: this.temp[i].receiptNumber ? this.temp[i].receiptNumber : '',
            studentName: this.temp[i].basicDetails.studentName ? this.temp[i].basicDetails.studentName : '',
            fatherName: this.temp[i].basicDetails.fatherName ? this.temp[i].basicDetails.fatherName : '',
            batch: this.temp[i].officeUseForm.batch ? (this.temp[i].officeUseForm.batch.length != 0 ? this.temp[i].officeUseForm.batch[0].name : '') : '',
            courseName: this.temp[i].officeUseForm ? this.temp[i].officeUseForm.course.name : '',
            payAmount: this.temp[i].payAmount ? this.temp[i].payAmount : '',
            date: this.temp[i].createdAt ? this.temp[i].createdAt : '',
            feeStatus:this.temp[i].feeStatus ? this.temp[i].feeStatus : '',
            id: this.temp[i].id
          })
        }

      }




    }
    console.log("001",this.result)
    this.dataSource = new MatTableDataSource(this.result);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    }

  }
  filter() {


  }
  getAllData() { // without type info
    if(this.search == undefined)
    {
      this.toastr.error('Text Box Empty', 'Empty Field !', {
        timeOut: 2000
      });
    }else{
      this.result = []

      this.serv.getData(this.search).subscribe(
        results => {
          this.temp = results["results"];
          console.log(this.temp)
          if(this.temp.length == 0)
          {
            this.toastr.warning('', 'No Data Found', {
              timeOut: 2000
            });
          }
          else
          {
            for (let i in this.temp) {
              if (isArray(this.temp[i].officeUseForm.course)) {
                 this.result.push({
                  //  receiptNumber: this.temp[i].receiptNumber ? this.temp[i].receiptNumber : '',
                   studentName: this.temp[i].basicDetails.studentName ? this.temp[i].basicDetails.studentName : '',
                   fatherName: this.temp[i].basicDetails.fatherName ? this.temp[i].basicDetails.fatherName : '',
                   batch: this.temp[i].officeUseForm.batch ? (this.temp[i].officeUseForm.batch.length != 0 ? this.temp[i].officeUseForm.batch[0].name : '') : '',
                   courseName: this.temp[i].officeUseForm ? this.temp[i].officeUseForm.course[0].name : '',
                   payAmount: this.temp[i].receipt ? this.temp[i].receipt.paidFees : '',
                   dueFee: this.temp[i].receipt ? this.temp[i].receipt.dueFees : '',

                   date: this.temp[i].createdAt ? this.temp[i].createdAt : '',
                   feeStatus:this.temp[i].receipt.feeStatus ? this.temp[i].receipt.feeStatus : '',
                   id: this.temp[i].id
                 })
               } else {
                 this.result.push({
                  //  receiptNumber: this.temp[i].receiptNumber ? this.temp[i].receiptNumber : '',
                   studentName: this.temp[i].basicDetails.studentName ? this.temp[i].basicDetails.studentName : '',
                   fatherName: this.temp[i].basicDetails.fatherName ? this.temp[i].basicDetails.fatherName : '',
                   batch: this.temp[i].officeUseForm.batch ? (this.temp[i].officeUseForm.batch.length != 0 ? this.temp[i].officeUseForm.batch[0].name : '') : '',
                   courseName: this.temp[i].officeUseForm ? this.temp[i].officeUseForm.course.name : '',
                  payAmount: this.temp[i].receipt ? this.temp[i].receipt.paidFees : '',
                   dueFee: this.temp[i].receipt ? this.temp[i].receipt.dueFees : '',
                   date: this.temp[i].createdAt ? this.temp[i].createdAt : '',
                   feeStatus:this.temp[i].receipt.feeStatus ? this.temp[i].receipt.feeStatus : '',
                   id: this.temp[i].id
                 })
               }


             }
             this.dataSource = new MatTableDataSource(this.result);
             this.dataSource.paginator = this.paginator;
             this.dataSource.sort = this.sort;
          }
        },
        err=>{
          this.toastr.error('Network Error', 'Please Check Internet Connection', {
            timeOut: 2000
          });}
      )
    }
  }
  empty = ''
  print(res) {
    let data = this.temp.filter(value => (res.id == value.id))
    this.serv.printdata(data[0]);
    this.route.navigate(['/Receipt/print-receipt', res.id])

  }
  displayedColumns: string[] = [
    'sid',
    'studentName',
    'fatherName',
    'batch',
    'courseName',
    'payAmount',
    'dueFee',
    'action',

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

SName;
DueFees;
Date
payAmount
status;
paymentDetails
amount
placeholder
details(row)
{
  console.log(row)
  this.SName=row.studentName;
  this.DueFees=row.dueFee;
  this.Date=row.date;
  this.payAmount=row.studentName;
  this.status=row.feeStatus;
this.paymentDetails=this.temp.filter(val => (val.id == row.id))
console.log(this.paymentDetails)
}
close() {
  this.modalService.dismissAll();
}

  physicalReceipt='';
payment(){
if(this.amount=='' || this.amount== undefined )
{
  this.toastr.error('Please Fill Amount', 'Amount Filed Empty', {
    timeOut: 2000
  });
}
if(parseInt(this.amount)>this.DueFees)
{
  this.toastr.error('Amount is not greater then due Amount', 'Amount Not Correct', {
    timeOut: 2000
  });
}
else
{

  const paid =  parseInt(this.paymentDetails[0].receipt.paidFees)+parseInt(this.amount);
  this.paymentDetails[0].receipt.paidFees=paid;
  this.paymentDetails[0].receipt.dueFees-=parseInt(this.amount);
  this.paymentDetails[0]['physical_receipt_number']=this.physicalReceipt;
  this.paymentDetails[0].updatedAt=new Date().toISOString();
  if(  this.paymentDetails[0].receipt.dueFees == 0)
  {
    this.paymentDetails[0].receipt.feeStatus="Complete";
  }else
  {
    this.paymentDetails[0].receipt.feeStatus="Pending";
  }
  console.log(this.paymentDetails)
  this.serv.feePayment(this.paymentDetails[0]).subscribe(
    res=>{
      console.log(res)
      this.toastr.success('Receipt Genetrate SuccessFully', 'Payment Successfully', {
        timeOut: 2000
      });
    }
  )


this.paymentDetails[0].receiptNumber=Math.floor(Math.random() * 10000);
this.paymentDetails[0].gst="Not Applicable"
this.paymentDetails[0].bankName=""
this.paymentDetails[0].amountInWords=this.pdf.convertNumberToWords(this.amount);
this.paymentDetails[0].date=this.datePipe.transform(this.date, 'd MMMM y');
this.paymentDetails[0].payAmount=parseInt(this.amount);
this.paymentDetails[0].payableMode=""
this.paymentDetails[0].chequeOrDDNumber=""
this.paymentDetails[0].chequeOrDD_Date=""
console.log("002",this.paymentDetails)
this.serv.receiptGenerate(this.paymentDetails).subscribe(
  res=>{
    console.log(res)
    this.toastr.success('Receipt Genetrate SuccessFully', 'Payment Done', {
      timeOut: 2000
    });
    this.close();
    this.search=this.placeholder;
    this.result=[];
    this.dataSource.data=[];
  }
)
}
}
}
