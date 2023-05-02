import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  ActivatedRoute,
  ParamMap
} from '@angular/router';
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  MatSort
} from '@angular/material/sort';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  SelectionModel
} from '@angular/cdk/collections';
import {
  ToastrService
} from 'ngx-toastr';
import {
  ExamService
} from 'src/app/services/exam.service';
import {ConfirmDialogModel, DialogSHOWComponent } from '../../dialog-show/dialog-show.component';
import { MatDialog } from '@angular/material';


declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

export class results {
  studentName: string;
  fatherName: string;
  mobile: string;
  email: string;
  courseName: string;
  batchName: string;
  optainedMarks: string;
  percentage: string;
}

export class examSubmission {
  photo: string;
  studentName: string;
  fatherName: string;
  startedAt: string;
  exceptedEndAt: string;
  status: string;
  submissionMessage: string;
  id;

}

@Component({
  selector: 'app-exam-record',
  templateUrl: './exam-record.component.html',
  styleUrls: ['./exam-record.component.css']
})
export class ExamRecordComponent implements OnInit {
  displayedColumns: string[] = [
    'studentName',
    'fatherName',
    'mobile',
    'email',
    'courseName',
    'batchName',
    'optainedMarks',
    'percentage',
      'action'
  ];

  examManagementColumns: string[] = [
    'select',
    'photo',
    'studentName',
    'fatherName',
    'startedAt',
    'exceptedEndAt',
    'status',
    'submissionMessage'
  ];

  constructor(private _recordService: ExamService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private route: ActivatedRoute) {}
  firstApi = []
  demo
  id
  test = []
  admissionId
  admissionRecords = []
  status
  startedAt
  expectedEndAt
  submissionMessage
  admissionIds = [];
  storedata = []
  store1 = []
  store2 = []
  dataSource = new MatTableDataSource < results > ();
  searchKey
  onSearchClear() {

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

  // **************2
  searchKey2
  onSearchClear2() {

    this.searchKey2 = "";
    this.applyFilter2();
  }

  subjectiveColumn: string[] = [
    'question',
    'answer',
    'marks'
  ];
  MCQColumn: string[] = [
    'question',
    'correctAnswer',
    'marks',
    'answer',
  ];

  subEDATA:any=[];

  mcqEDATA:any=[];
  showMAIN=true;
  stname='tst';
  showmcq=false;
  showsubjective=false;
  //Student Result
  StudentResult(data){

    this.stname=data.studentName;
    console.log(data);
    this._recordService.getResult(data.examid,data.admissionID).subscribe((res)=>{
      console.log(res);
      let data:any=res;
      this.showMAIN=false;
      if(data.length>0){
        if(data[0].questiontype=="MCQ"){
          this.mcqEDATA=data;
          this.showmcq=true;
          this.showsubjective=false;
        }else{
          this.showmcq=false;
          this.showsubjective=true;
          this.subEDATA=data;
        }
      }


    },(err)=>{
      console.log(err);
    })
  }

  goBACK(){
    this.showMAIN=true;
  }

  // function for search bar functionality
  applyFilter2() {
    this.examRecord.filter = this.searchKey2.trim().toLowerCase();

    if (this.examRecord.paginator) {
      this.examRecord.paginator.firstPage();
    }
  }


  examRecord = new MatTableDataSource < examSubmission > ();
  selection = new SelectionModel < examSubmission > (true, []);

  applyFilter1(filterValue: string) {
    this.examRecord.filter = filterValue.trim().toLowerCase();

    if (this.examRecord.paginator) {
      this.examRecord.paginator.firstPage();
    }

  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.examRecord.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.examRecord.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row ? : examSubmission): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row}`;
  }

  
  selectionhaulteData()
  { 
    for(let i=0;i < this.examRecord.data.length ;i++)
    {
      for(let j =0 ; j < this.selection.selected.length ; j++)
      if(this.selection.selected[j].id == this.examRecord.data[i].id)
      {
        this.examRecord.data[i].status='Hault'
      }
    
    }
  }
  
  selectionresumeData()
  { 
    for(let i=0;i < this.examRecord.data.length ;i++)
    {
      for(let j =0 ; j < this.selection.selected.length ; j++)
      if(this.selection.selected[j].id == this.examRecord.data[i].id)
      {
        this.examRecord.data[i].status='In Progress'
      }
    
    }
  }
  haultExam(action) {
    console.log(this.selection.selected)
    this.isAllSelected();
    let message = `Are you sure, this CANNOT be UNDONE...!!`;
    let dialogData = new ConfirmDialogModel("resume EXAM!", message);
if(action == 'hault')
{
   dialogData = new ConfirmDialogModel("HAULT EXAM!", message);
}
if(action=="resume")
{
  dialogData = new ConfirmDialogModel("RESUME EXAM!", message);
}
if(action=="refereshDAta")
{
  message = 'Are You Sure ,You want to refresh Data';
  dialogData = new ConfirmDialogModel("REFRESH DATA!", message);
  
}
 
    const dialogRef = this.dialog.open(DialogSHOWComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
      let result = dialogResult;
	  if(result){
      for (let i = 0; i < this.selection.selected.length; i++) {
      
        const req = {
          "id": this.id,
          "status": "Hault",
          "admissionId": this.selection.selected[0].id
        }
        if (action == "hault") {
          if (result) {
            this._recordService.haultExam(req).subscribe(
              res => {
                this.toastr.error('Hault Exam Successfully', 'Hault Exam', {
                  timeOut: 2000
                });;
                console.log(res)
               this.selectionhaulteData();
                this.selection = new SelectionModel<examSubmission>(true, []);
              }
            )
          }
        } else
        if (action == 'resume') {
          const req = {
            "id": this.id,
          }
          if (result) {
            this._recordService.resumeExam(req).subscribe(
              res => {
               
                let obj2w = {
                  "examId": this.id,
                  "status": 'In Progress',
                  "admissionId": this.selection.selected[0].id
                }
                
                this._recordService.resumeExam2(obj2w).subscribe(
                  res2 => {
                 
                    this.toastr.success('Resume Exam Successfully !!', 'Resume Exam', {
                      timeOut: 2000
                    });;
                  this.selectionresumeData();
                    this.selection = new SelectionModel<examSubmission>(true, []);
                  }
                )
              }
            )
          }
        }
  
      }
  
	  }
    });

    
    if (action == 'refereshDAta') {

      this.dataSource = new MatTableDataSource < results > ();
      this.examRecord = new MatTableDataSource < examSubmission > ();
      this.onCall();
    }
  }

  ngOnInit() {
    this.onCall();
  }
  @ViewChild(MatPaginator, {
    static: true
  }) paginator: MatPaginator;
  @ViewChild(MatSort, {
    static: true
  }) sort: MatSort;

  @ViewChild('uploadResultPaginator', {
    static: true
  }) uploadResultPaginator: MatPaginator;
  @ViewChild('uploadResultSort', {
    static: true
  }) uploadResultSort: MatSort;

  examName = ''
  totalMArks
  onCall() {
    this.examName = this._recordService.getExamName();
    this.store1 = [];
    this.store2 = [];
    let test;
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id')
      this._recordService.edit(this.id).subscribe(
        res=>{
        
          this.totalMArks=res.results[0].format.totalMarks;
        
        }
      )
     
      this._recordService.getId(this.id).subscribe(
        res => {
            console.log("RES",res)
          if (res["results"].length == 0) {
            this.toastr.error('No Data Available', 'Error', {
              timeOut: 2000
            });;
          } else {
            this.demo = res["results"]

            this._recordService.examEnswer(this.id).subscribe(
              res2 => {
               
              }
            )

            this._recordService.examEnswer(this.id).subscribe(
              res2 => {
                

                let count = 0
                let mark = 0
                let percentage = 0;
                let i=0
                for (let row in this.demo) {

                  this._recordService.admissionDetails(this.demo[row]["admissionId"]).subscribe(
                    res1 => {
                    
                     if(res1["results"].length == 0)
                     {
                      count++;
                      if(count == 1)
                      {
                        this.toastr.warning('No Data Longer Available ', 'Data Deleted', {
                          timeOut: 2000
                        });;
                      }
                     }
                     else{
                      for (let i in res2["results"]) {
                       
                        mark += res1["results"].length != 0 ? (res2["results"][i]["admissionId"] ? (res2["results"][i]["admissionId"] == res1["results"][0]["id"] ? res2["results"][i]["marks"] : 0) : 0) : '';
                       
                      }
                      
                      percentage = Math.floor((mark / this.totalMArks) * 100)
                      
                      this.store1.push({
                        studentName:  res1["results"].length != 0 ? (res1["results"][0]["basicDetails"]["studentName"])  : '',
                        fatherName:res1["results"].length != 0 ? (res1["results"][0]["basicDetails"]["fatherName"] )  : '', 
                        mobile:  res1["results"].length != 0 ? (res1["results"][0]["basicDetails"]["mobileNumber"])  : '' ,
                        email: res1["results"].length != 0 ? ( res1["results"][0]["basicDetails"]["emailID"])  : '',
                        courseName: res1["results"].length != 0 ? (res1["results"][0]["officeUseForm"]["course"][0]["name"])  : '' ,
                        batchName: res1["results"].length != 0 ? (res1["results"][0]["officeUseForm"]["batch"][0]["name"])  : '' ,
                        optainedMarks: (mark + "/"+this.totalMArks),
                        percentage: (percentage + "%"),
                        studentID:res1["results"].length != 0 ? (res1["results"][0].id):'',
                        admissionID:this.demo[row]["admissionId"],
                        examid:this.id
                      })
                      mark = 0
                      percentage = 0
                      this.dataSource = new MatTableDataSource(this.store1)
                      this.dataSource.paginator = this.paginator;
                      this.dataSource.sort = this.sort;
                      
                      this.store2.push({
                        id: res1["results"].length != 0 ? (  res1["results"][0].id)  : '',
                        photo: res1["results"].length != 0 ? (  res1["results"][0]["basicDetails"]["photos"] ? (res1["results"][0]["basicDetails"]["photos"].length == 0 ? '' : res1["results"][0]["basicDetails"]["photos"][0]["resized"]["dataURL"]) : '')  : '',
                        studentName:  res1["results"].length != 0 ? ( res1["results"][0]["basicDetails"]["studentName"])  : '',
                        fatherName: res1["results"].length != 0 ? (  res1["results"][0]["basicDetails"]["fatherName"])  : '',
                        startedAt: this.demo[row]["startedAt"],
                        exceptedEndAt: this.demo[row]["expectedEndAt"],
                        status: this.demo[row]["status"],
                        submissionMessage: this.demo[row]["submissionMessage"]
                      })
                      this.examRecord = new MatTableDataSource(this.store2)
                      this.examRecord.paginator = this.uploadResultPaginator;
                      this.examRecord.sort = this.uploadResultSort;
                     }
                    },
                    err => console.log(err)

                  )
                }
              }
            )
          }



        }


      )
    })

    // *****************Admission Api *************


  }

  // ***********PDF Print
  printDocument() {

    let doc = new jsPDF('landscape');
    var row = []
    let index = 1
    for (let i = 0; i < this.store1.length; i++) {
      let temp = [index + i, this.store1[i].studentName, this.store1[i].fatherName, this.store1[i].mobile, this.store1[i].email, this.store1[i].courseName, this.store1[i].batchName, this.store1[i].optainedMarks, this.store1[i].percentage];
      row.push(temp)
    }
    let col = ['Sr_NO.', 'Student Name', 'Father Name', 'Mobile', 'Email', 'Course Name', 'Batch Name', 'Optained Marks', 'Percentage', ];
    doc.autoTable(col, row);
    doc.save('Exam Result.pdf');

  }

}
