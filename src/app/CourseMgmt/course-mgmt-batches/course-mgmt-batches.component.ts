import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  AddNewHTTPService
} from '../../services/add-new-http.service';
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  MatSort
} from '@angular/material/sort';
import {
  DatePipe
} from '@angular/common';
import {
  ToasterService
} from '../../Toast/toaster.service';
// import {Router} from "@angular/router";
import {
  ConfirmDialogModel,
  DialogSHOWComponent
} from '../../dialog-show/dialog-show.component';
import {
  MatDialog
} from '@angular/material';

declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

export interface batchTable {
  batch;
  course;
  subCourse;
  subject;
  teacher;
  duration;
  fromTo;
  timing;
  from;
  to;
  timeFrom;
  timeTo;
  status;
  id;
  tenant;
  createdAt;
  updatedAt;
}

export interface FormatTable {
  sname;
  fname;
  cname;
  due;
}

@Component({
  selector: 'app-course-mgmt-batches',
  templateUrl: './course-mgmt-batches.component.html',
  styleUrls: ['./course-mgmt-batches.component.css']
})
export class CourseMgmtBatchesComponent implements OnInit {

  batchName: string;

  today = this.datepipe.transform(new Date(), 'yyyy-MM-dd');

  studentNameFormat = [];

  selectedSubjectName: any;
  subjectNames = [];

  courseNames = [];

  selectedCourse;

  batchDuration: number;

  startDate;

  endDate;

  startTime;
  endTime;

  assignedTeacher;

  teacherNames = [];


  editable = false;
  AddEditable = false;
  msgEditable = 'false';
  attendanceEditable = 'false';
  message;
  msgID;

  batchData;
  updateBatchRow: any;

  attendanceEnd;
  attendanceStart;
  facultyName;
  batchNameFormat;
  subjectNameFormat;
  fromDateFormat;
  toDateFormat;
  stuCount;
  recordElement
  subCoursePresent:boolean = false;

  displayedColumns: string[] = ['Select', 'Batch', 'Course', 'SubCourse', 'Subject', 'Teacher', 'Duration', 'FromTo', 'Timing', 'Status', 'Action'];
  dataSource = new MatTableDataSource < batchTable > ();

  tableData: batchTable[] = [];
  selectedSubcourse: any;
  subCourseNames: any;

  constructor(public dialog: MatDialog, private toast: ToasterService, public httpServe: AddNewHTTPService, public datepipe: DatePipe) {}
  @ViewChild(MatPaginator, {
    static: true
  }) paginator: MatPaginator;
  @ViewChild(MatSort, {
    static: true
  }) sort: MatSort;
  @ViewChild('content', {
    static: true
  }) content: ElementRef;

  ngOnInit() {

    this.httpServe.getBatchData().subscribe(responseTable => {
      this.batchData = responseTable["results"];

      // Create 25 entries
      for (let i = 0; i < this.batchData.length; i++) {
        this.tableData.push(this.createNewEntry(i));
      }


      this.dataSource = new MatTableDataSource(this.tableData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    }, err => {
      this.toast.errorstatus0();
    });

    this.httpServe.getCourse().subscribe(course => {

      // add all the course names to array and bind them in select options
      for (let key in course["results"]) {
        this.courseNames.push(course["results"][key]);
      }
    }, err => {
      this.toast.errorstatus0();
    })

    this.httpServe.getTeacherNames().subscribe(response => {
      for (let ind = 0; ind < response['results'].length; ind++) {
        this.teacherNames.push(response['results'][ind]);
      }
    }, err => {
      this.toast.errorstatus0();
    })
  }

  openAddBatch() {
    this.AddEditable = true;
    this.editable = false;
    this.attendanceEditable = 'false';
    this.msgEditable = 'false';
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectSubCourse(){
    this.httpServe.getSubCourseForBatches(this.selectedCourse['id']).subscribe(response=>{

      if(response["results"].length>0){
        this.subCourseNames = response["results"];
        this.subCoursePresent = true;
      }else{
        this.subCoursePresent = false;
        this.subCourseNames = [];
        this.selectedSubcourse = undefined;
        this.selectSubject()
      }

    })
  }

  selectSubject() {
    console.log("here")
    var id;
    var sbtrue = false;
    
    if(this.selectedSubcourse == undefined){
      console.log("here2")
      id = this.selectedCourse['id'];
      sbtrue = false;
    }else{
      id = this.selectedSubcourse['id']
      sbtrue = true;
    }

    // get batches for the selected course
    this.httpServe.getSubject(id, sbtrue).subscribe(subjectInfo => {

      if (subjectInfo["results"].length < 1) {
        this.toast.errorfixhead("No subjects Found");
      } else {
        this.subjectNames = subjectInfo["results"];
      }
    }, err => {
      this.toast.errorstatus0();
    })
  }

  clearAll() {
    this.batchName = undefined;
    this.selectedSubjectName = undefined;
    this.selectedSubcourse = undefined;
    this.selectedCourse = undefined;
    this.batchDuration = undefined;
    this.startDate = undefined;
    this.endDate = undefined;
    this.startTime = undefined;
    this.endTime = undefined;
    this.assignedTeacher = undefined;
    this.AddEditable = false;
  }

  uploadCourse() {

    if (this.selectedCourse == undefined) {
      this.toast.errorfixhead("course detail cannot be empty");
      return;
    }

    if (this.selectedSubjectName == undefined) {
      this.toast.errorfixhead("Subject detail cannot be empty");
    }

    if (this.startDate == undefined || this.endDate == undefined) {
      this.toast.errorfixhead("Date cannot be empty");
      return;
    }

    if (this.startTime == undefined || this.endTime == undefined) {
      this.toast.errorfixhead("Time cannot be empty");
      return;
    }

    if (this.batchName == undefined) {
      this.toast.errorfixhead("Batch name cannot be empty");
      return;
    }

    if (this.batchDuration == undefined) {
      this.toast.errorfixhead("Batch duration cannot be empty");
      return;
    }

    if (this.batchDuration < 1) {
      this.toast.errorfixhead("Batch duration cannot be less than 1");
      return;
    }

    if (this.startDate < this.today || this.endDate < this.today) {
      this.toast.errorfixhead("Invalid date");
      return;
    }




    var data = {
      "course": this.selectedCourse["id"],
      "subject": this.selectedSubjectName["id"],
      "duration": this.batchDuration,
      "dateFrom": new Date(this.startDate).toISOString(),
      "dateTo": new Date(this.endDate).toISOString(),
      "timmingFrom": new Date(this.startDate+"T"+this.startTime+":00").toISOString(),
      "timmingTo": new Date(this.endDate+"T"+this.endTime+":00").toISOString(),
      "name": this.batchName,
      "teacher": this.assignedTeacher,
      "meta": {
        "course": this.selectedCourse,
        "subcourse":this.selectedSubcourse,
        "subject": {
          "course": this.selectedCourse,
          "name": this.selectedCourse["name"],
          "status": this.selectedCourse["status"],
          "tenant": this.selectedCourse["tenant"],
          "createdAt": this.selectedCourse["createdAt"],
          "updatedAt": this.selectedCourse["updatedAt"],
          "id": this.selectedCourse["id"]
        }
      },
      "status": this.selectedCourse["status"]
    };


    this.httpServe.uploadBatch(JSON.stringify(data)).subscribe(response => {
      this.toast.successfixhead("Batch added!");
      this.clearAll();
      this.reload();

    }, err => {
      this.toast.errorfixhead("Something went wrong");
    })

  }


  selector(element) {
    this.msgID = element["id"];
  }


  createNewEntry(index: number): batchTable {

    var fromTo = this.batchData[index]["dateFrom"].slice(0,10).toString() + " - " + this.batchData[index]["dateTo"].slice(0,10).toString();

    var fromToTime = this.batchData[index]["timmingFrom"].slice(11,16).toString() + " - " + this.batchData[index]["timmingTo"].slice(11,16).toString();



    // create a row for mat table
    return {
      'batch': this.batchData[index]["name"],
      'course': this.batchData[index]["meta"]["course"],
      'subCourse': "",
      'subject': this.batchData[index]["meta"]["subject"],
      'teacher': this.batchData[index]["teacher"] ? this.batchData[index]["teacher"] : "",
      'duration': this.batchData[index]["duration"],
      'fromTo': fromTo,
      'from': this.batchData[index]["dateFrom"],
      'to': this.batchData[index]["dateTo"],
      'timeFrom': this.batchData[index]["timmingFrom"],
      'timeTo': this.batchData[index]["timmingTo"],
      'timing': fromToTime,
      'status': this.batchData[index]["status"],
      'id': this.batchData[index]["id"],
      "tenant": this.batchData[index]["tenant"],
      "createdAt": this.batchData[index]["createdAt"],
      "updatedAt": this.batchData[index]["updatedAt"]
    }
  }

  eventAction(element, command) {

    if (command == "delete") {
      const message = `Are you sure you want to do delete?`;

      const dialogData = new ConfirmDialogModel("Delete Admission?", message);

      const dialogRef = this.dialog.open(DialogSHOWComponent, {
        maxWidth: "400px",
        data: dialogData
      });

      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult == true) {
          this.httpServe.deleteBatch(element['id']).subscribe(response => {
            this.toast.successfixhead("Batch Deleted");
            for (let i = 0; i < this.dataSource.data.length; i++) {
              if (this.dataSource.data[i] == element) {
                this.dataSource.data.splice(i, 1);
                this.dataSource._updateChangeSubscription();
              }
            }
          }, err => {
            this.toast.errorfixhead("Something went wrong");
          });
        }
      });


    } else if (command == "edit") {
      this.editable = true;
      this.AddEditable = false;
      this.updateBatchRow = element;

      this.httpServe.editCourse(element["subject"]["id"]).subscribe(response => {
        this.batchName = element['batch'];
        this.selectedCourse = element["course"];
        this.selectedSubjectName = element["subject"];
        this.assignedTeacher = element['teacher'];
        this.batchDuration = element['duration'];
        this.startDate = this.datepipe.transform(element['from'], 'yyyy-MM-dd');
        this.endDate = this.datepipe.transform(element['to'], 'yyyy-MM-dd');
        this.startTime = element['timeFrom']
        this.endTime = element['timeTo']
      }, err => {
        this.toast.errorstatus0();
      });
    } else if (command == "attendance") {
      this.attendanceEditable = 'true';
      this.recordElement = element;
    }
  }

  updateBatch() {

    if (this.selectedCourse == undefined) {
      this.toast.errorfixhead("course detail cannot be empty");
      return;
    }

    if (this.selectedSubjectName == undefined) {
      this.toast.errorfixhead("Subject detail cannot be empty");
    }

    if (this.startDate == undefined || this.endDate == undefined) {
      this.toast.errorfixhead("Date cannot be empty");
      return;
    }

    if (this.startTime == undefined || this.endTime == undefined) {
      this.toast.errorfixhead("Time cannot be empty");
      return;
    }

    if (this.batchName == undefined) {
      this.toast.errorfixhead("Batch name cannot be empty");
      return;
    }

    if (this.batchDuration == undefined) {
      this.toast.errorfixhead("Batch duration cannot be empty");
      return;
    }

    if (this.batchDuration < 1) {
      this.toast.errorfixhead("Batch duration cannot be less than 1");
      return;
    }   

    var load = {
      "name": this.batchName,
      "course": this.selectedCourse["id"],
      "subject": this.selectedSubjectName["id"],
      "duration": this.batchDuration,
      "dateFrom": new Date(this.startDate).toISOString(),
      "dateTo": new Date(this.endDate).toISOString(),
      "timmingFrom": new Date(this.startDate+"T"+this.startTime+":00").toISOString(),
      "timmingTo": new Date(this.endDate+"T"+this.endTime+":00").toISOString(),
      "teacher": this.assignedTeacher,
      "meta": {
        "course": this.selectedCourse,
        "subcourse":this.selectedSubcourse,
        "subject": {
          "course": this.selectedCourse,
          "name": this.selectedCourse["name"],
          "status": this.selectedCourse["status"],
          "tenant": this.selectedCourse["tenant"],
          "createdAt": this.selectedCourse["createdAt"],
          "updatedAt": this.selectedCourse["updatedAt"],
          "id": this.selectedCourse["id"]
        }
      },
      "status": this.selectedCourse["status"],
      "tenant": this.updateBatchRow['tenant'],
      "createdAt": this.updateBatchRow["createdAt"],
      "updatedAt": this.updateBatchRow["updatedAt"],
      "id": this.updateBatchRow["id"],

    };

    this.httpServe.putBatchUpdate(this.updateBatchRow['id'], load).subscribe(response => {
      this.toast.successfixhead("Batch Updated");
      this.clearAll()
      this.reload()
    }, err => {
      this.toast.errorfixhead("Something went wrong");
    })
  }

  sendMsgTeacher() {
    this.httpServe.sendMessageToTeacher({
      "batchId": this.msgID,
      "message": this.message
    }).subscribe(response => {
      this.toast.successfixhead("Message sent");
    }, err => {
      this.toast.errorfixhead("Something went wrong");
    })
  }

  sendMsgAll() {
    this.httpServe.sendMessageToAll({
      "batchId": this.msgID,
      "message": this.message
    }).subscribe(response => {
      this.toast.successfixhead("Message Sent");
    }, err => {
      this.toast.errorfixhead("Something went wrong");
    })
  }


  sendMsg() {
    this.msgEditable = 'true';
  }


  closeMsgDialog() {
    this.msgEditable = "false";
  }

  getAttendance() {
    this.httpServe.getAdmissionInfoForBatches(this.recordElement['id']).subscribe(response => {

      var start = new Date(this.attendanceStart);
      var end = new Date(this.attendanceEnd);

      if (start.getDay() != 1 || end.getDay() != 6) {
        this.toast.errorfixhead("Invalid Date!");
        this.toast.errorfixhead("From must be Monday and To must be Saturday.");
        return;
      }

      if (start > end) {
        this.toast.errorfixhead("Invalid date");
        return;
      }

      this.stuCount = response['info']['totalRecords'];

      for (let rec in response['results']) {
        this.studentNameFormat.push([
          (parseInt(rec) + 1),
          response['results'][rec]['basicDetails']['studentName'],
          response['results'][rec]['basicDetails']['fatherName'],
          response['results'][rec]['officeUseForm']['collegeName'],
          response['results'][rec]['receipt']['dueFees'],

        ]);

      }

      this.facultyName = this.recordElement['teacher']['name'];
      this.batchNameFormat = this.recordElement['batch'];
      this.subjectNameFormat = this.recordElement['subject']['name'];
      this.fromDateFormat = this.datepipe.transform(this.attendanceStart, 'dd-MM-yyyy');
      this.toDateFormat = this.datepipe.transform(this.attendanceEnd, 'dd-MM-yyyy');

      setTimeout(() => {
        let doc = new jsPDF('landscape');
        doc.setFontSize(22);
        doc.text(10, 20, 'Attendance Sheet');

        doc.setFontSize(14);
        var subtitle1 = `Faculty Name: ${this.facultyName}   Batch: ${this.batchNameFormat}   Subject Name: ${this.subjectNameFormat}`;
        var subtitle2 = `From: ${this.fromDateFormat}    To: ${this.toDateFormat}`;
        doc.text(10, 40, subtitle1)
        doc.text(10, 50, subtitle2)

        doc.autoTable({
          styles: {
            fontSize: 12
          },
          startY: 60,
          theme: 'grid',
          head: [
            ['Eno', 'SName', 'FName', 'College Name', 'Due', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'REMARK', ]
          ],
          body: this.studentNameFormat,
        })

        doc.setFontSize(14);
        var footer = `Faculty Sign:              Total Students: ${this.stuCount}              Received By:              Entry Date: __/__/__`;
        doc.text(10, 180, footer)

        doc.save('attendanceSheet.pdf');

      }, 500);

    }, err => {
      this.toast.errorfixhead("Something went wrong");
    })
  }

  closeAttendanceDialog() {
    this.attendanceEditable = 'false';
  }


  reload(){
    this.httpServe.getBatchData().subscribe(responseTable => {

      this.tableData = []

      this.batchData = responseTable["results"];

      // Create 25 entries
      for (let i = 0; i < this.batchData.length; i++) {
        this.tableData.push(this.createNewEntry(i));
      }


      this.dataSource = new MatTableDataSource(this.tableData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    }, err => {
      this.toast.errorstatus0();
    });
  }

}
