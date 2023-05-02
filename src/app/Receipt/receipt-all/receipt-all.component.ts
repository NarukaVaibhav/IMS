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
  selector: 'app-receipt-all',
  templateUrl: './receipt-all.component.html',
  styleUrls: ['./receipt-all.component.css']
})


export class ReceiptAllComponent implements OnInit {

  constructor(private route: Router, private serv: ApiDataService, private toastr: ToastrService, private datePipe: DatePipe) {}

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
            date: this.temp[i].date ? this.temp[i].date : '',
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
            date: this.temp[i].date ? this.temp[i].date : '',
            id: this.temp[i].id
          })
        }

      }




    }
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

      this.serv.getList(this.search).subscribe(
        results => {
          this.temp = results["results"];
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
                   receiptNumber: this.temp[i].receiptNumber ? this.temp[i].receiptNumber : '',
                   studentName: this.temp[i].basicDetails.studentName ? this.temp[i].basicDetails.studentName : '',
                   fatherName: this.temp[i].basicDetails.fatherName ? this.temp[i].basicDetails.fatherName : '',
                   batch: this.temp[i].officeUseForm.batch ? (this.temp[i].officeUseForm.batch.length != 0 ? this.temp[i].officeUseForm.batch[0].name : '') : '',
                   courseName: this.temp[i].officeUseForm ? this.temp[i].officeUseForm.course[0].name : '',
                   payAmount: this.temp[i].payAmount ? this.temp[i].payAmount : '',
                   date: this.temp[i].date ? this.temp[i].date : '',
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
                   date: this.temp[i].date ? this.temp[i].date : '',
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
    'receiptNumber',
    'studentName',
    'fatherName',
    'batch',
    'courseName',
    'payAmount',
    'date',
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

}
