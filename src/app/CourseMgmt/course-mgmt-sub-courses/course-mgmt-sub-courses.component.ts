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
  tenant:string;
  created:string;
  updated:string;
  subcourseId;
}


@Component({
  selector: 'app-course-mgmt-sub-courses',
  templateUrl: './course-mgmt-sub-courses.component.html',
  styleUrls: ['./course-mgmt-sub-courses.component.css']
})
export class CourseMgmtSubCoursesComponent implements OnInit {

  statusNAME = "Deactivate";

  // if true; will open the edit card
  editable;

  EditEditable;

  // row for which data is to be edited
  editRow;

  courseName;
  CourseNameList = [];

  subCourseName;

  tableData: courseTable[] = [];

  displayedColumns: string[] = ['Name','Course','Status', 'Action'];
  dataSource = new MatTableDataSource<courseTable>(this.tableData);

  courseData;
  idString;
  selectedCourseName: any;

  constructor(public dialog: MatDialog, private toast:ToasterService, public httpServe:AddNewHTTPService) { }

  ngOnInit() {

    this.httpServe.getBatchData().subscribe(responseTable=>{
      var idList = [];
      this.tableData = []
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

          this.httpServe.getSubCourse(this.idString).subscribe(responseTable=>{
    
            this.courseData = responseTable["results"];
            for(let i = 0; i < this.courseData.length; i++ ){
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

    

    this.httpServe.getCourseForSubCourse().subscribe(response=>{

      response["results"].forEach(element => {
        if(element["parent"] == "yes" || element["parent"] == "true" || element["parent"] == true){
          this.CourseNameList.push(element);
        }
      });

      
    }, err=>{
      this.toast.errorfixhead("Cannot fetch courses");
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  createNewEntry(index: number): courseTable  {

    // create a row for mat table
    return {
      "Name": this.courseData[index]["name"]?this.courseData[index]["name"]:"NA",
      "id":this.courseData[index]["course"]?this.courseData[index]["course"]["name"]:"NA",
      "Status":  this.courseData[index]["status"]?this.courseData[index]["status"]:"NA",
      "tenant": this.courseData[index]["tenant"],
      "created":this.courseData[index]["createdAt"],
      "updated":this.courseData[index]["updatedAt"],
      "subcourseId":this.courseData[index]["id"],
    }
  }

  openAddSubCourse(){
    this.editable = 'true';
    
  }

  closeAddDialog(){
    this.courseName = undefined;
    this.subCourseName = undefined;
    this.editable = "false";
  }
  
  closeEditDialog(){
    this.courseName = undefined;
    this.subCourseName = undefined;
    this.EditEditable = false;  
  }

  addSubCourse(){

    if(this.courseName == undefined){
      this.toast.errorfixhead("Course name cannot be empty");
      return;
    }

    if(this.subCourseName == undefined || this.subCourseName == ""){
      this.toast.errorfixhead("Subcourse name cannot be empty");
      return;
    }
    
    var sendData = {"course":this.courseName,"name":this.subCourseName,"status":"Active"}

    this.httpServe.postSubCoursse(JSON.stringify(sendData)).subscribe(response=>{
      this.toast.successfixhead("Subcourse Added");
      this.courseName = undefined;
      this.subCourseName = undefined;
      this.editable = 'false';
      this.ngOnInit()
    },err=>{
      this.toast.errorfixhead("Something went wrong")
    })
  }

  setCourseName(){
    this.selectedCourseName = this.courseName;
  }

  editSubCourse(){
    
    if(this.selectedCourseName == undefined){
      this.toast.errorfixhead("Course name cannot be empty");
      return;
    }

    if(this.subCourseName == undefined || this.subCourseName == ""){
      this.toast.errorfixhead("Subcourse name cannot be empty");
      return;
    }

    var sendPayload = {
      "course":this.selectedCourseName,
      "name":this.subCourseName,
      "status":"Active",
      "tenant":this.editRow["tenant"],
      "createdAt":this.editRow["created"],
      "updatedAt":new Date(),
      "id":this.editRow["subcourseId"]};

    this.httpServe.editSubCourse(this.editRow["subcourseId"], sendPayload).subscribe(response=>{
      this.toast.successfixhead("Subcourse Updated")
      this.selectedCourseName = undefined;
      this.subCourseName = undefined;
      this.EditEditable = 'false';
      this.ngOnInit()
    }, err=>{
      this.toast.errorfixhead("Something went wrong");
    })
  }

  eventAction(row, action){
    if(action == "edit"){
      this.EditEditable="true";
      this.selectedCourseName = row['id'];
      this.subCourseName = row["Name"];
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
          this.httpServe.deleteSubCourse(row["subcourseId"]).subscribe(response=>{
            this.toast.successfixhead("Subcourse Deleted")
            for(let i = 0 ; i<this.dataSource.data.length; i++){
              if(this.dataSource.data[i] == row){
                this.dataSource.data.splice(i,1);
                this.dataSource._updateChangeSubscription();
              }
            }
          }, err=>{
            this.toast.errorfixhead("Something went wrong")
          });
        }
      })
    }else if(action == "setStatus"){

      var statusMove;
      
      // switch status
      if(row["Status"]=="Active"){
        
        statusMove = "Inactive";
        this.statusNAME = "Activate";
      }
      else if(row["Status"]=="Inactive"){
        statusMove = "Active";
      }

      
      var payload = {"course":this.courseName,"status":statusMove,"tenant":row["tenant"],"createdAt":row["createdAt"],"updatedAt":row["updatedAt"],"id":row["subcourseId"]};

      this.httpServe.activateSubCourse(row["subcourseId"], payload).subscribe(response=>{
        this.toast.successfixhead("Status Updated")
      },err=>{
        this.toast.errorfixhead("Something went wrong")
      });
    }
  }

}
