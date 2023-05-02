import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DateTime } from './DateTime';
import { Router } from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatSort, MatTableDataSource, MatCheckboxChange} from '@angular/material';
import {NgbCalendar, NgbDateStruct, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { parseDate, PopoverDirective } from 'ngx-bootstrap';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmDialogModel, DialogSHOWComponent } from '../../dialog-show/dialog-show.component';
import { MatDialog } from '@angular/material';
import { ExamService } from 'src/app/services/exam.service';
import * as XLSX from 'xlsx';
export interface TableEntry {
  name : string;
  date : string;
  examStartTime : string ;
  examEndTime : string;
  batch : string;
  status : string ;
  showResults : string;
  id : string;
  
}
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  resultDisplay=true
  matbox = false
  datePipeString : string;
  constructor(private _view : ExamService,
    public dialog: MatDialog,
    private route : Router , 
    private toastr: ToastrService,
    private calendar: NgbCalendar,
    private datePipe: DatePipe,
    private modalService: NgbModal) { 
      
    }

    // ********MODAL
    closeResult = '';
    open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title' ,size: 'lg'}).result.then((result) => {
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

    a
    tempData=[]
    batchDetail
  
  ngOnInit() {
  this.recall();
  }
  
  recall()
  {
  
    this.selection = new SelectionModel<TableEntry>(true, []);
    this.tempData=[]
  
    this.dataSource = new MatTableDataSource([])
    this._view.onView().subscribe(
      response =>{
        console.log(response)
        if(response["results"].length == 0)
        {
          this.toastr.error('Network Error', 'Please Refresh Page', {
            timeOut: 2000
          });
        }
        else
        {

        
          
        this.batchDetail = response["results"]
        
        for(let i in response["results"])
        {
          this.tempData.push({
          name : response["results"][i]["name"] ?  response["results"][i]["name"] : 'NA' ,
          date : response["results"][i]["date"] ?  response["results"][i]["date"] : 'NA' ,
          examStartTime : response["results"][i]["examStartTime"] ?  response["results"][i]["examStartTime"] : 'NA' ,
          examEndTime : response["results"][i]["examEndTime"] ?  response["results"][i]["examEndTime"] : 'NA' ,
         batch : response["results"][i]["batch"] ? (response["results"][i]["batch"]["name"] ?  response["results"][i]["batch"]["name"] : 'NA') : 0,
         status : response["results"][i]["status"] ?  response["results"][i]["status"] : 'NA' ,
         showResults : response["results"][i]["showResults"],
         id : response["results"][i]["id"] ? response["results"][i]["id"]  : 'NA',
         })
        
        }
        
        
        this.dataSource = new MatTableDataSource(this.tempData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
     
      const entries = [];
      }
      },
      err=>{
        this.toastr.error('Network Error', 'Please Check Internet Connection', {
          timeOut: 2000
        });}
      
    )
    
  }
  displayedColumns: string[] = [
    'select',
    'name',
    'date',
    'examStartTime',
    'examEndTime',
    'batch',
    'status',
    'action',
    
  ];
  dataSource: MatTableDataSource < TableEntry > ;
  selection = new SelectionModel<TableEntry>(true, []);
   /** Whether the number of selected elements matches the total number of rows. */
 isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

getPageData() {
  return this.dataSource._pageData(this.dataSource._orderData(this.dataSource.filteredData));
}
pageChanged(event) {

  if(event.pageSize == 5)
  {
this.selection.clear();
  }
  
}
isEntirePageSelected() {
  return this.getPageData().every((row) => this.selection.isSelected(row));
}

masterToggle(checkboxChange: MatCheckboxChange) {
  this.isEntirePageSelected() ?
    this.selection.deselect(...this.getPageData()) :
    this.selection.select(...this.getPageData());
}

checkboxLabel(row): string {
  if (!row) {
    return `${this.isEntirePageSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
}


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



  data
  results(row)
  {
    this.resultDisplay=false;
    this.matbox = true;
    console.log(row);
    //hhh
    this._view.storeExamName(row.name)
    this.route.navigate(['/Exam/record-exam' , row.id])
  }
  eventAction(row , action , index){
    const message = `Are you sure you want to do delete?`;
 
    const dialogData = new ConfirmDialogModel("Delete Leave!", message);
 
    const dialogRef = this.dialog.open(DialogSHOWComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
      let result = dialogResult;
	  if(result){
      if(action == "delete"){
        if(result){
          this._view.deleteExam(row["id"]).subscribe(response=>{
            
            this.toastr.success('Delete Exam Successfully', 'Success', {
              timeOut: 2000
            });
  
            const data = this.dataSource.data;
             data.splice(index, 1);
             this.dataSource.data = data;
          });
        }
      }
	  }
    });




   
  }

  passCode(row)
  {
    this._view.getPassCode(row["id"]).subscribe(response=>{

      this.toastr.success( " After 30 Min this Passcode is Invalid", "PassCode : "+response["results"][0]["examPasscode"], {
        timeOut: 300000
      });
    })
  }

  visibilityOn = false
  visibilityOff= false

  visibility(row)
  {
    this.isAllSelected();
    
    if(row.showResults == true)
    {
      const req={
        "id": row.id,
        "showResults" : false
      }
      this._view.editExam(req).subscribe(
        res=>{
          
          this.toastr.success('Visibility Off', 'Success', {
            timeOut: 2000
          });
          this.recall();
          this.selection = new SelectionModel<TableEntry>(true, []);
        
      
         
        }
      )
    }
    else
    {
      const req={
        "id": row.id,
        "showResults" : true
      }
      this._view.editExam(req).subscribe(
        res=>{
          
          this.toastr.success('Visibility On', 'Success', {
            timeOut: 2000
          });
          this.recall();
          this.selection = new SelectionModel<TableEntry>(true, []);
        
        }
      );
    }

  }
  activate(row , index)
  {
    
    const date = new Date();
   
    if(this.datePipe.transform(row.date,'yyyy-MM-dd') >= this.datePipe.transform(Date.now(),'yyyy-MM-dd'))
    {
          const req={
          "id": row.id,
          "status" : "Active"
        }
        this._view.activate(req).subscribe(
          res=>{
            
            this.toastr.success('Activate Successfully', 'Success', {
              timeOut: 2000
            });
            for(let i=0;i < this.dataSource.data.length ;i++)
            {
              if(index == i)
              {
                this.dataSource.data[i].status='Active'
              }
            }
  
          }
        )
      
      
    }
    else
    {
      
      this.toastr.error('Exam Date should be any future date.', 'Date Error', {
        timeOut: 2000
      });
    }
    
  }
  editData(row)
  {
    
    this.route.navigate(['/Exam/edit-exam' , row.id])
  }

  // ****************************************** Clone ********************
  date 
  examName
  selectBranch
  
  
  tomorrow = new Date();
  model: NgbDateStruct;
  
  today = this.calendar.getToday();
  saveChanges()
  {

     
  if(this.model != undefined)
  {
    let d=this.model.year+'-'+this.model.month+'-'+this.model.day;
    this.date=parseDate(d , "YYYY-MM-DD").toISOString();
  
  }
  
   if(this.examName == undefined || this.examName == '')
   {
    this.toastr.error('Please Fill Exam Name Fields', 'Fields Are Empty', {
      timeOut: 2000
    });
   }
   else
   if(this.date == undefined || this.date == '')
   {
    this.toastr.error('Please Fill Date Fields', 'Fields Are Empty', {
      timeOut: 2000
    });
   }
   else
   if(this.selectBranch == undefined || this.selectBranch == '')
   {
    this.toastr.error('Please Fill Branch Fields', 'Fields Are Empty', {
      timeOut: 2000
    });
   }
   else
   if(this.examEndTime == undefined || this.examEndTime == '')
   {
    this.toastr.error('Please Fill Exam End Time Fields', 'Fields Are Empty', {
      timeOut: 2000
    });
   }
   else
   if(this.examStartTime == '' || this.examStartTime == undefined)
   {
    this.toastr.error('Please Fill Exam Start Time Fields', 'Fields Are Empty', {
      timeOut: 2000
    });
   }

   else
   {
     
    
    let batch = this.batchDetail.filter(c=>(c.batch ? c.batch.name == this.selectBranch : ''))
    
    let obj={
      "ids":this.selection.selected[0].id,
      "dataToUpdate":{
         "batch":batch[0].batch,
         "date":this.date,
         "examStartTime":this.examStartTime,
         "examEndTime":this.examEndTime,
         "namePrefix":this.examName,
         "status":"Inactive",
         "submissions":[],
         "sessions":{ }
      }
   }
    this._view.clone(obj).subscribe(
      res=>{
       
       this.toastr.success('Clone Successfully', 'Success', {
         timeOut: 2000
       });
       this.modalService.dismissAll();
       this.recall();
       this.examEndTime=''
       this.examStartTime='';
       this.selectBranch='';
       this.model=undefined;
       this.examName='';
      },
      err=>{
        this.toastr.error('Name Already Exist ', 'Cloning Fail', {
          timeOut: 2000
        });
      }
    )
     
     
   }

  }


  deleteSelect(action)
  {
    const message = `Are you sure you want to do delete?`;
 
    const dialogData = new ConfirmDialogModel("Delete Leave!", message);
 
    const dialogRef = this.dialog.open(DialogSHOWComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
      let result = dialogResult;
	  if(result){
      for(let i =0 ; i<this.selection.selected.length ;i++)
    {
      if(action == "delete"){
        if(result){
          this._view.deleteExam(this.selection.selected[i].id).subscribe(response=>{
            
            this.toastr.success('Delete Successfully', 'Success', {
              timeOut: 2000
            });
            this.recall();
          });
        }
      }
    }
	  }
    });

   
  }
  passCodeSelect()
  {
    for(let i =0 ; i<this.selection.selected.length ;i++)
    {
      this._view.getPassCode(this.selection.selected[i].id).subscribe(response=>{
        this.toastr.success( " After 30 Min this Passcode is Invalid", "PassCode : "+response["results"][0]["examPasscode"], {
          timeOut: 300000
        });
        })
    }
  }

  selectionActivateData()
  { 
    const date = new Date();
    
  if(this.activateVerifiy == true)
  {
    
    for(let i=0;i < this.dataSource.data.length ;i++)
    {
      for(let j =0 ; j < this.selection.selected.length ; j++)
      if(this.selection.selected[j].id == this.dataSource.data[i].id)
      {
        if(this.datePipe.transform(this.selection.selected[j].date,'yyyy-MM-dd') >= this.datePipe.transform(Date.now(),'yyyy-MM-dd'))
        {
          this.dataSource.data[i].status='Active'
        }
  
      }
    
    }
  }
  }  
  activateVerifiy = false
  activateSelect()
  {
    const date = new Date();

    for(let i =0 ; i<this.selection.selected.length ;i++)
    {
      if(this.datePipe.transform(this.selection.selected[i].date,'yyyy-MM-dd') >= this.datePipe.transform(Date.now(),'yyyy-MM-dd'))
      {   
         
            const req={
            "id": this.selection.selected[i].id,
            "status" : "Active"
          }
          this._view.activate(req).subscribe(
            res=>{
              
              this.toastr.success('Activate Successfully', 'Success', {
                timeOut: 2000
              });
              this.activateVerifiy=true;
              this.selectionActivateData();
    
            }
          )
        
        
      }
      else
      {
        this.activateVerifiy=false;
        this.toastr.error('Exam Date should be any future date.', 'Date Error', {
          timeOut: 2000
        });
      }
    }
  }

  selectionTerminateData()
  { 
    for(let i=0;i < this.dataSource.data.length ;i++)
    {
      for(let j =0 ; j < this.selection.selected.length ; j++)
      if(this.selection.selected[j].id == this.dataSource.data[i].id)
      {
        this.dataSource.data[i].status='Terminated'
      }
    
    }
  }

  terminate()
  {
    
    
    const message = `Are you sure you want to terminate the selected exams, all current sessions will be submitted... ?, This action cannot be undone`;
 
    const dialogData = new ConfirmDialogModel("Terminate!", message);
 
    const dialogRef = this.dialog.open(DialogSHOWComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
      let result = dialogResult;
	  if(result){
      for(let i =0 ; i<this.selection.selected.length ;i++)
      {
        if(result){
      const req={
            "id": this.selection.selected[i].id,
            "status" : "Terminated"
          }
          this._view.terminate(req).subscribe(
            Response=>{
              this.toastr.success('Terminate Successfully', 'Success', {
                timeOut: 2000
              });
              this.selectionTerminateData();
            }
            
          )
      }
    }
	  }
    });

  
  }

    // ********************** Date & TimeRanges

    @ViewChild('popoverRef' ,null) private _popoverRef: PopoverDirective;
    @ViewChild('popoverRef2' ,null) private __popoverRef: PopoverDirective;
    time: Date;
    date1: Date;
    isDateVisible: boolean = true;
    isMeridian: boolean = true;
    examStartTime
    
    timefunction()
   {
     
    if (this.examStartTime) {
      this.time = this.date1 = this.examStartTime;
      return;
    }
    this.date1 = this.time = new Date();
   }
   
   timefunction2()
   {
     
    if (this.examEndTime) {
      this.time2 = this.date2 = this.examEndTime;
      return;
    }
    this.date2 = this.time2 = new Date();
   }
  
  
  updateTime() {
    if (this.time) {
      this.examStartTime = DateTime.getDateTime(this.date1, this.time);
    }
  }
  
  
  close() {
    this._popoverRef.hide();
  }
  
  now() {
    this.examStartTime = DateTime.now(this.date1);
    this.time = this.examStartTime;
    
  }
  
  
  Tclear() {

    this.time = void 0;
    this.date1 = void 0;
    this.examStartTime = void 0;
  }
  
  //  ****************2
  examEndTime
    time2 :Date
  date2 :Date
  updateTime2() {
   if (this.time2) {
     this.examEndTime = DateTime.getDateTime(this.date2, this.time2);
   }
  }
  
  
  close2() {
   this.__popoverRef.hide();
  }
  
  now2() {
   this.examEndTime = DateTime.now(this.date2);
   this.time2 = this.examEndTime;
   
  }
  
  
  Tclear2() {
 
   this.time2 = void 0;
   this.date2 = void 0;
   this.examEndTime = void 0;
  }

  //Exam Question Download
temp
ExamName
  questionDownload(row)
  {
    
    this._view.edit(row.id).subscribe(
      res=>{
      
        this.temp = res['results'][0].questions;
        this.ExamName = res["results"][0].name;
        this.export();
      }
    )
  }
  exportArray = []
  excelFormat() {
    for (let i = 0; i < this.temp.length; i++) {
      this.exportArray.push({
        section: this.temp[i].section.name,
        difficulity: this.temp[i].difficultyLevel.level,
        type: this.temp[i].questionType,
        question: this.temp[i].question,
        option_1: this.temp[i].options ? this.temp[i].options[0].label : '',
        option_2: this.temp[i].options ? this.temp[i].options[1].label : '',
        option_3: this.temp[i].options ? this.temp[i].options[2].label : '',
        option_4: this.temp[i].options ? this.temp[i].options[3].label : '',
        correctAnswer: this.temp[i].correctAnswer ? this.temp[i].correctAnswer[0] : ''
      })
    }
  }

  export (): void {
    this.excelFormat();
    // array of objects to save in Excel
    let binary_univers = this.exportArray

    let binaryWS = XLSX.utils.json_to_sheet(binary_univers);

    // Create a new Workbook
    var wb = XLSX.utils.book_new()

    // Name your sheet
    XLSX.utils.book_append_sheet(wb, binaryWS, 'Binary values')

    // export your excel
    XLSX.writeFile(wb, `${this.ExamName}.xlsx`);
  }
  

}
