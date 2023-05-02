import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { AddNewHTTPService } from '../../services/add-new-http.service';
import { ToasterService } from '../../Toast/toaster.service';
import {ConfirmDialogModel, DialogSHOWComponent } from '../../dialog-show/dialog-show.component';
import { MatDialog } from '@angular/material';


export interface courseTable {
  Name:string;
  id:string;
  Status:string;
  Course:string;
  SubCourse:string;
  SBMapped:string;
  tenant:string;
  createdAt:string;
  updatedAt:string;

}


@Component({
  selector: 'app-course-mgmt-sub-subjects',
  templateUrl: './course-mgmt-sub-subjects.component.html',
  styleUrls: ['./course-mgmt-sub-subjects.component.css']
})
export class CourseMgmtSubSubjectsComponent implements OnInit {

  statusNAME = "Deactivate";

  // if true; will open the edit card
  editable;

  SBEditable;

  // row for which data is to be edited
  editRow;

  SBrow;

  courseName;

  CourseNameList = [];

  editSubjectName;

  SBCourseName = [];
  selectedSBCourse;
  SBSubCourse = [];
  selectedSBSubCourse;

  tableData: courseTable[] = [];

  displayedColumns: string[] = ['Name','Course', 'SubCourse','Status', 'SBMapped', 'Action'];
  dataSource = new MatTableDataSource<courseTable>(this.tableData);

  // courseData;
  batchData;
  idString;
  courseData;
  addEditable: string;
  newSubjectName;
  selectedCourse: any;
  subCourseName: any;
  selectedSubCourse: any;
  showSubCourseMenu: boolean = false;
  selectedSubCourse_show: any;
  selectedCourse_show: any;

  constructor(public dialog: MatDialog, private toast:ToasterService, public httpServe:AddNewHTTPService) { }

  ngOnInit() {

    this.httpServe.getBatchData().subscribe(responseTable=>{
      var idList = [];

      // Create 25 entries
      for(let i = 0; i < responseTable["results"].length; i++ ){
        idList.push(responseTable["results"][i]['meta']['course']["id"]);
      }

      this.idString = idList.join(',');

      this.httpServe.getCourseTable(this.idString).subscribe(responseTable=>{

        this.courseData = responseTable["results"];

        for(let i = 0; i < responseTable["results"].length; i++ ){
          idList.push(responseTable["results"][i]["id"]);
        }

          this.idString = idList.join(',');

          this.httpServe.getBatchList(this.idString).subscribe(responseTable=>{

          // console.log(responseTable["results"]);

          this.batchData = responseTable["results"];

          for(let i = 0; i < this.batchData.length; i++ ){
            this.tableData.push(this.createNewEntry(i));
          }

          this.dataSource = new MatTableDataSource(this.tableData);
        }, err=>{
          this.toast.errorstatus0();
        });

      }, err=>{
        this.toast.errorstatus0();
      })
    }, err=>{
      this.toast.errorstatus0();
    })

    this.httpServe.getSBCourses().subscribe(response=>{

      this.SBCourseName = response["results"];
    }, err=>{
      this.toast.errorfixhead("cannot fetch data");
    })

    this.httpServe.getSubjectCourses().subscribe(response=>{
      this.CourseNameList = response["results"];
    }, err=>{
      this.toast.errorfixhead("Cannot fetch data");
    });
  }

  createNewEntry(index: number): courseTable  {

    // create a row for mat table
    return {
      "Name": this.batchData[index]["name"]?this.batchData[index]["name"]:"NA",
      "id":this.batchData[index]["id"],
      "Status":  this.batchData[index]["status"]?this.batchData[index]["status"]:"NA",
      "Course": this.batchData[index]["name"]?this.batchData[index]["name"]:"NA",
      "SubCourse": this.batchData[index]["subcourse"]?this.batchData[index]["subcourse"]:{"name":"N/A"},
      "SBMapped":"NO",
      "tenant":this.batchData[index]["tenant"],
      "createdAt": this.batchData[index]["createdAt"],
      "updatedAt": this.batchData[index]["updatedAt"]

    }
  }

  closeDialog(){
    this.selectedSBCourse = undefined;
    this.selectedSBSubCourse = undefined;
    this.selectSubCourse = undefined;
    this.selectedCourse = undefined;
    this.showSubCourseMenu = false;
    this.newSubjectName = undefined;
    this.editable = "false";
    this.SBEditable = "false";
  }


  editSubject(){

    if(this.selectedCourse==undefined){
      this.selectedCourse = this.selectedCourse_show;
    }

    if(this.selectedSubCourse==undefined){
      this.selectedSubCourse = this.selectedSubCourse_show;
    }

    if(this.selectedSubCourse_show == undefined){
      this.selectedSubCourse = "N/A"
    }

    var sendPayload = {"course":this.selectedCourse, "subcourse":this.selectedSubCourse, "name":this.newSubjectName,"status":this.editRow["status"],"tenant":this.editRow,"createdAt":this.editRow["createdAt"],"updatedAt":this.editRow["updatedAt"],"id":this.editRow["id"]}

    this.httpServe.editSubjectPUT(this.editRow["id"], sendPayload).subscribe(response=>{
      this.toast.successfixhead("Subject updated");
      this.reload()
    }, err=>{
      this.toast.errorfixhead("something went wrong");
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editSBCourse(){
    this.httpServe.mapSBCourse(
      this.SBrow["id"], {
        "course": this.SBCourseName,
        "name":this.SBrow["name"],
        "status":this.SBrow["status"],
        "tenant":this.SBrow["tenant"],
        "createdAt":this.SBrow["createdAt"],
        "updatedAt":this.SBrow["updatedAt"],
        "id":this.SBrow["id"],
        "skillBharat":{
          "course":this.selectedSBCourse,
          "subject":this.selectedSBSubCourse
        }
      }).subscribe(response=>{

      this.toast.successfixhead("Course Mapped");
      this.reload()
    }, err=>{
      this.toast.errorfixhead("something went wrong");
    })
  }

  selectSBSubCourse(){
    this.httpServe.getSBSubcourse(this.selectedCourse["id"]).subscribe(data=>{
      this.SBSubCourse = data["results"];
    }, err=>{
      this.toast.errorfixhead("cannot fetch data");
    });
  }

  selectSubCourse(){
    this.httpServe.getSubCourseForSubjects(this.selectedCourse["id"]).subscribe(data=>{
      if(data["results"].length>0){
        this.showSubCourseMenu = true;
        this.subCourseName = data["results"];
      }else{
        this.showSubCourseMenu = false;
        this.subCourseName = [];
      }


    }, err=>{
      this.toast.errorfixhead("cannot fetch data");
    });
  }


  eventAction(row, action){
    if(action == "edit"){

      this.selectedSubCourse_show = false;

      this.selectedCourse_show = row["Course"]

      this.newSubjectName = row["Name"]
      this.selectedSubCourse_show = row["SubCourse"]


      if(this.selectedSubCourse_show.name != "N/A"){
        this.showSubCourseMenu = true;
      }
      this.editable="true";
      this.editRow = row;
    }
    else if(action == "delete"){
      const message = `Are you sure you want to do delete?`;

      const dialogData = new ConfirmDialogModel("Delete Admission?", message);

      const dialogRef = this.dialog.open(DialogSHOWComponent, {
        maxWidth: "400px",
        data: dialogData
      });

      dialogRef.afterClosed().subscribe(dialogResult => {
	      if(dialogResult == true){
        this.httpServe.deleteSubject(row["id"]).subscribe(response=>{
          this.toast.successfixhead("Subject deleted");
          for(let i = 0 ; i<this.dataSource.data.length; i++){
            if(this.dataSource.data[i] == row){
              this.dataSource.data.splice(i,1);
              this.dataSource._updateChangeSubscription();
            }
          }
        }, err=>{
          this.toast.errorfixhead("something went wrong");
        });
      }
    })
    }else if(action == "mapSB"){
      this.SBEditable = "true";
      this.SBrow = row;
    }
    else if(action == "setStatus"){

      var statusMove;

      // switch status
      if(row["status"]=="Active"){
        statusMove = "Inactive";
        this.statusNAME = "Activate";
      }
      else if(row["status"]=="Inactive"){
        statusMove = "Active";
        this.statusNAME = "Deactivate";
        var payload = {"course":this.courseName,"name":row["name"],"status":statusMove,"tenant":row["tenant"],"createdAt":row["createdAt"],"updatedAt":row["updatedAt"],"id":row["id"]};

        this.httpServe.deactivateSubject(row["id"], payload).subscribe(response=>{
          this.toast.successfixhead("Subject updated");
        }, err=>{
          this.toast.errorfixhead("something went wrong");
        })
      }


    }
  }


  addSubject(){



    if(this.selectedCourse ==undefined || this.selectedCourse == ''){
      this.toast.errorfixhead("Course cannot be empty");
      return;
    }
    if(this.showSubCourseMenu && this.selectedSubCourse == undefined || this.selectedSubCourse == ""){
      this.toast.errorfixhead("Sub Course cannot be empty");
      return;
    }

    if(this.newSubjectName == undefined || this.newSubjectName == ""){
      this.toast.errorfixhead("Subject name cannot be empty");
      return;
    }

    var payload = {
      "course":this.selectedCourse,
      "name":this.newSubjectName,
      "subcourse":this.selectedSubCourse?this.selectedSubCourse:"N/A",
      "status":"Active"
    };

    this.httpServe.addSubject(payload).subscribe(response=>{
      this.toast.successfixhead("Subject added");
      this.addEditable = 'false';
      this.reload()
    },err=>{
      this.toast.errorfixhead("Something went wrong");
    })

  }


  openAddSubject(){
    this.editable = 'false';
    this.SBEditable = 'false';
    this.addEditable = 'true';
  }

  closeAddSubject(){
    this.selectedSBCourse = undefined;
    this.selectSBSubCourse = undefined;
    this.selectSubCourse = undefined;
    this.selectedCourse = undefined;
    this.showSubCourseMenu = false;
    this.newSubjectName = undefined;
    this.editable = 'false';
    this.SBEditable = 'false';
    this.addEditable = 'false';

  }

  reload(){
    this.httpServe.getBatchList(this.idString).subscribe(responseTable=>{
      this.tableData = []

      this.batchData = responseTable["results"];

      for(let i = 0; i < this.batchData.length; i++ ){
        this.tableData.push(this.createNewEntry(i));
      }

      this.dataSource = new MatTableDataSource(this.tableData);
    }, err=>{
      this.toast.errorstatus0();
    });
  }
}
