import {Injectable, Component,OnInit,ViewChild} from '@angular/core';
import {AddNewHTTPService} from '../../services/add-new-http.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from '../../Toast/toaster.service';
import {ConfirmDialogModel, DialogSHOWComponent } from '../../dialog-show/dialog-show.component';
import { MatDialog } from '@angular/material';

export interface TableEntry {
  studentName: string;
  fatherName: string;
  courses: string;
  batch: string;
  subject: string;
  mobile: string;
  collegeName: string;
  paymentMode: string;
  dueAmount: number;
  registrationDate: string;
  type: string;
  status: string;
  officeUseForm;
  id;

}

export interface attendanceEntry{
  date: string;
  attendance: string;
}

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
@Injectable()
export class TableViewComponent implements OnInit {

  displayedColumnsAttendance: string[] = ['date', 'attendance'];

  displayedColumns: string[] = [
    "studentName",
    "fatherName",
    "courses",
    "batch",
    "subject",
    "mobile", 
    "collegeName",
    "paymentMode",
    "dueAmount",
    "registrationDate",
    "type",
    "status",
    "action"
  ];
  dataSource: MatTableDataSource < TableEntry > ;
  tableData = [];
  dataSourceAttendance: MatTableDataSource < attendanceEntry > ;
  attendanceData = [];

  entries = [];

  init_Menu = true;
  specific_Menu=false;
  dataTitle: any;
  modalRow: Promise<void>;
  selectedMenuItem: any;
  attendanceModal: any;

  @ViewChild(MatPaginator, {
    static: true
  }) paginator: MatPaginator;
  @ViewChild(MatSort, {
    static: true
  }) sort: MatSort;
  resultMenu: any;
  result: any;
  resultID;
  assignmentMenu: boolean;
  assignmentList: any;
  feedbackMenu: boolean;
  feedbackList: any;


  constructor(public dialog: MatDialog, private modalService: NgbModal, private toast:ToasterService, public httpserv: AddNewHTTPService, private route: Router) {}

  

  ngOnInit() {
    this.httpserv.getTableData().subscribe(response=> {
      this.entries = response["results"];

      // Create entries for table
      for(let i = 0; i < this.entries.length; i++ ){
        this.tableData.push(this.createNewEntry(i));
      }

      this.dataSource = new MatTableDataSource(this.tableData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, err=>{
      this.toast.errorstatus0();
    });
  }

  // function for search bar functionality
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  createNewEntry(index: number): TableEntry {


    var batchName;

    try {
      batchName = this.entries[index]["officeUseForm"]["batch"][0].meta.subject.course.name;
    }
    catch(error) {
      batchName = "NA";
    }

    // create a row for mat table
    return {
      studentName: this.entries[index]["basicDetails"]["studentName"],
      fatherName: this.entries[index]["basicDetails"]["fatherName"],
      courses: this.entries[index]["officeUseForm"]["course"]?(this.entries[index]["officeUseForm"]["course"][0]?this.entries[index]["officeUseForm"]["course"][0].name:"NA"):"NA",

      batch: this.entries[index]["officeUseForm"]["batch"]?(this.entries[index]["officeUseForm"]["batch"][0]?this.entries[index]["officeUseForm"]["batch"][0].name:"NA"):"NA",
      
      subject: batchName,

      mobile: this.entries[index]["basicDetails"]["mobileNumber"],
      collegeName: this.entries[index]["officeUseForm"]["collegeName"],
      paymentMode: this.entries[index]["receipt"]["payableMode"],
      dueAmount: this.entries[index]["receipt"]["dueFees"],
      registrationDate: this.entries[index]["officeUseForm"]["dateOfRegistration"],

      type: this.entries[index]["officeUseForm"]["admissionType"],
      status: this.entries[index]["accountStatus"],
      officeUseForm: this.entries[index]['officeUseForm'],
      id: this.entries[index]['id']
    };
  }


  confirmDeleteRow(element){

    const message = `Are you sure you want to do delete?`;
 
    const dialogData = new ConfirmDialogModel("Delete Admission?", message);
 
    const dialogRef = this.dialog.open(DialogSHOWComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
	    if(dialogResult == true){
        this.deleteRow(element);
	    }
    });
  }

  
  deleteRow(element){

    for(let i = 0 ; i<this.entries.length; i++){

      if(this.entries[i]["basicDetails"]["studentName"]==element["studentName"]){
        this.httpserv.removeTableEntry(this.entries[i]["id"]).subscribe(response=>{
          this.toast.successfixhead("Admission deleted");
        },err=>{
          this.toast.errorfixhead("Something went wrong")
        })
      };

      if(this.dataSource.data[i] == element){
        this.dataSource.data.splice(i,1);
        this.dataSource._updateChangeSubscription();
      }
    }
  }

  changeStatus(element){

    var status;
    if(element['status'] == 'Active'){
      status = 'Inactive';
    }
    else if(element['status'] == 'Inactive'){
      status = 'Active';
    }
    

    var payload = {"id":element['id'],"accountStatus":status};

    this.httpserv.updateAdmissionStatus(element["id"], payload).subscribe(response=>{
        this.toast.successfixhead("Admission updated");
      },err=>{
        this.toast.errorfixhead("Something went wrong")
      })
  }

  routeToEdit(row){
    if(row == 'modalrow'){
      row = this.modalRow
    }
    this.route.navigate(["/Admission/edit-admissions", row["id"]]);
  }


  open(content, row) {
    this.modalRow = row;

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }


  resetModal(){
    this.init_Menu = true;
    this.specific_Menu = false;
    this.attendanceModal = false;
    this.resultMenu = false;
    this.feedbackMenu = false;
    this.assignmentMenu = false;
  }


  hideMenu(menuItem){
    this.selectedMenuItem = menuItem;
    this.init_Menu = false;
    this.specific_Menu = true;
    this.attendanceModal = false;
    this.resultMenu = false;
    this.feedbackMenu = false;
    this.assignmentMenu = false;
  }


  openExamComponent(item){
    var resultData;
    var studentData;

    this.httpserv.getResultRecord(item['id']).subscribe(response=>{
      resultData = response['results'];       

      this.httpserv.getResultRecordStudentData(this.modalRow['id']).subscribe(response=>{
        studentData = response['results'];

        this.httpserv.setExamData(resultData, studentData);
        this.resetModal();
        this.route.navigate(["/Admission/individual-result"]);
      }, err=>{
        this.toast.errorstatus0();
      })

    }, err=>{
      this.toast.errorstatus0();
    }) 
  }


  openAssignmentComponent(item){

    var userRecord;
    var assignmentRecord;

    this.httpserv.getAssignmentRecord(item['id']).subscribe(response=>{
      this.httpserv.getAssignmentUserRecord(this.modalRow['id']).subscribe(response=>{
        userRecord = response['results'];

        this.httpserv.setterForAssignmentData(assignmentRecord, userRecord);
        this.resetModal();
        this.route.navigate(["/Admission/individual-assignments"]);
      }, err=>{
        this.toast.errorstatus0();
      })
      assignmentRecord = response['results'];
    }, err=>{
      this.toast.errorstatus0();
    })
    
  }

  
  openFeedbackComponent(item){
    var feedbackRecord;
    this.httpserv.getFeedbackRecord(item['id']).subscribe(response=>{
      feedbackRecord = response['results'];
      this.httpserv.setterForFeedbackData(feedbackRecord);
      this.resetModal();
      this.route.navigate(["/Admission/individual-feedback"]);
    }, err=>{
      this.toast.errorstatus0();
    })
  }


  openSelectedModal(){
    if(this.selectedMenuItem == 'Attendance'){

      for(let i=0; i<this.entries.length; i++){
        if(this.modalRow['id'] == this.entries[i]['id']){
          var batchIdToSend =  this.entries[i]["officeUseForm"]["batch"][0]['id'];
        }
      }

      if(batchIdToSend == undefined){
        return;
      }

      this.httpserv.getAttendanceData(batchIdToSend, this.modalRow['id']).subscribe(response=>{
        for(let i in response['results']){
          this.attendanceData.push(
            {
              'date': response['results'][i]['date'], 
              'attendance': (response['results'][i]['attendance']=="p" || response['results'][i]['attendance']=="P")?"present":"absent"
            });
        }


        this.dataSourceAttendance = new MatTableDataSource(this.attendanceData);
        this.dataSourceAttendance.sort = this.sort;
        this.dataSourceAttendance.paginator = this.paginator;
        this.init_Menu = false;
        this.specific_Menu = false;
        this.attendanceModal = true;
        this.resultMenu = false;
        this.feedbackMenu = false;
        this.assignmentMenu = false;

      }, err=>{
        this.toast.errorstatus0();
      });
    }
    else if(this.selectedMenuItem == 'feedback'){
      for(let i=0; i<this.entries.length; i++){
        if(this.modalRow['id'] == this.entries[i]['id']){
          var batchIdToSend =  this.entries[i]["officeUseForm"]["batch"][0]['id'];
        }
      }

      this.httpserv.getFeedbackNames(batchIdToSend).subscribe(response=>{
        this.feedbackList = response["results"];
      }, err=>{
        this.toast.errorstatus0();
      })
      
      this.init_Menu = false;
      this.specific_Menu = false;
      this.attendanceModal = false;
      this.resultMenu = false;
      this.feedbackMenu = true;
      this.assignmentMenu = false;

    }
    else if(this.selectedMenuItem == 'assignment'){
      for(let i=0; i<this.entries.length; i++){
        if(this.modalRow['id'] == this.entries[i]['id']){
          var batchIdToSend =  this.entries[i]["officeUseForm"]["batch"][0]['id'];
        }
      }

      this.httpserv.getAssignmentData(batchIdToSend).subscribe(response=>{
        this.assignmentList = response["results"];
      }, err=>{
        this.toast.errorstatus0();
      })
      
      this.init_Menu = false;
      this.specific_Menu = false;
      this.attendanceModal = false;
      this.resultMenu = false;
      this.feedbackMenu = false;
      this.assignmentMenu = true;

    }
    else if(this.selectedMenuItem == 'results'){
      
      
      for(let i=0; i<this.entries.length; i++){
        if(this.modalRow['id'] == this.entries[i]['id']){
          var batchIdToSend =  this.entries[i]["officeUseForm"]["batch"][0]['id'];
        }
      }
      
      this.httpserv.getExamResultData(batchIdToSend).subscribe(response=>{
        this.result = response["results"];
      }, err=>{
        this.toast.errorstatus0();
      })
      
      this.init_Menu = false;
      this.specific_Menu = false;
      this.attendanceModal = false;
      this.resultMenu = true;
      this.feedbackMenu = false;
      this.assignmentMenu = false;
    }

  }


}
