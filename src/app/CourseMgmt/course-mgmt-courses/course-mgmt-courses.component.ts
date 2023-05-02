import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  AddNewHTTPService
} from '../../services/add-new-http.service';
import {
  ToasterService
} from '../../Toast/toaster.service';
import {
  ConfirmDialogModel,
  DialogSHOWComponent
} from '../../dialog-show/dialog-show.component';
import {
  MatDialog
} from '@angular/material';


export interface courseTable {
  Name: string;
  isParent: string;
  Fee: string;
  Status: string;
  id: string;
  tenant: string;
}


@Component({
  selector: 'app-course-mgmt-courses',
  templateUrl: './course-mgmt-courses.component.html',
  styleUrls: ['./course-mgmt-courses.component.css']
})
export class CourseMgmtCoursesComponent implements OnInit {

  // if true; will open add course card
  addEditable;

  addCourseName;

  addCourseFee;

  addIsParent;

  editRow;


  // if true; will open the edit card
  editable;

  courseName;

  courseFee;

  isParent;


  tableData: courseTable[] = [];

  displayedColumns: string[] = ['Name', 'isParent', 'Fee', 'Status', 'Action'];
  dataSource = new MatTableDataSource < courseTable > (this.tableData);

  courseData;
  idString;

  constructor(public dialog: MatDialog, private toast: ToasterService, public httpServe: AddNewHTTPService) {}

  ngOnInit() {
    this.httpServe.getBatchData().subscribe(responseTable => {
      var idList = [];

      // Create 25 entries
      for (let i = 0; i < responseTable["results"].length; i++) {
        idList.push(responseTable["results"][i]['meta']['course']["id"]);
      }

      this.idString = idList.join(',');

      this.httpServe.getCourseTable(this.idString).subscribe(responseTable => {

        this.courseData = responseTable["results"];
        // Create 25 entries
        for (let i = 0; i < this.courseData.length; i++) {
          this.tableData.push(this.createNewEntry(i));
        }

        this.dataSource = new MatTableDataSource(this.tableData);
      }, err => {
        this.toast.errorstatus0();
      });

    }, err => {
      this.toast.errorstatus0();
    });


  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  createNewEntry(index: number): courseTable {
    var is_p;

    if(this.courseData[index]["parent"] == 'true' || this.courseData[index]["parent"] == 'yes' || this.courseData[index]["parent"] == true){
      is_p = "Yes"
    }else if(this.courseData[index]["parent"] == 'false' || this.courseData[index]["parent"] == 'no' || this.courseData[index]["parent"] == false){
      is_p = "No";
    }

    // create a row for mat table
    return {
      "Name": this.courseData[index]["name"] ? this.courseData[index]["name"] : "NA",
      "isParent": is_p,
      "Fee": this.courseData[index]["fee"] ? this.courseData[index]["fee"] : "NA",
      "Status": this.courseData[index]["status"] ? this.courseData[index]["status"] : "NA",
      "id": this.courseData[index]["id"],
      "tenant": this.courseData[index]["tenant"]
    }
  }

  openAddCourse() {
    this.addEditable = 'true';
  }

  editCourse() {
    if (this.courseName == undefined || this.courseName == "") {
      this.toast.errorfixhead("Course name cannot be empty");
      return;
    }

    if (this.courseFee == undefined || this.courseFee == "") {
      this.toast.errorfixhead("Course fee cannot be empty");
      return;
    }
    if (isNaN(this.courseFee)) {
      this.toast.errorfixhead("Invalid Course fee");
      return;
    }

    if (this.isParent == undefined) {
      this.toast.errorfixhead("Parent status not selected");
      return;
    }

    this.httpServe.editCourseCourses({
      "tenant": this.editRow["tenant"],
      "id": this.editRow["id"],
      "name": this.courseName,
      "fee": this.courseFee,
      "parent": this.isParent
    }).subscribe(response => {
      this.toast.successfixhead("Course Updated");


      // reload 
      if (true) {
        this.reload()
      }




    }, err => {
      this.toast.errorfixhead("Something went wrong");
    })
  }


  eventAction(row, action) {
    if (action == "edit") {
      this.editable = "true";
      this.courseName = row["Name"];
      this.courseFee = row["Fee"];
      this.editRow = row;

    } else if (action == "delete") {
      const message = `Are you sure you want to do delete?`;

      const dialogData = new ConfirmDialogModel("Delete Admission?", message);

      const dialogRef = this.dialog.open(DialogSHOWComponent, {
        maxWidth: "400px",
        data: dialogData
      });

      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult == true) {
          this.httpServe.deleteCourse(row["id"]).subscribe(response => {
            this.toast.successfixhead("Course Deleted");
            for (let i = 0; i < this.dataSource.data.length; i++) {
              if (this.dataSource.data[i] == row) {
                this.dataSource.data.splice(i, 1);
                this.dataSource._updateChangeSubscription();
              }
            }
          }, err => {
            this.toast.errorfixhead("Something went wrong");
          });
        }
      })
    } else if (action == "setStatus") {
      var statusValue;
      if (row["Status"] == "Active") {
        statusValue = "Inactive";
      } else {
        statusValue = "Active";
      }
      this.httpServe.activateCourse(row["id"], {
        "name": row["Name"],
        "fee": row["Fee"],
        "parent": row["isParent"],
        "status": statusValue,
        "tenant": row["tenant"],
        "createdAt": new Date(),
        "updatedAt": new Date(),
        "id": row["id"]
      }).subscribe(response => {
        this.toast.successfixhead("Course Updated")
      }, err => {
        this.toast.errorfixhead("Something went wrong");
      });
    }
  }

  closeDialog() {
    this.courseName = undefined;
    this.courseFee = undefined;
    this.isParent = undefined;
    this.editable = "false";

  }

  closeAddDialog() {
    this.addCourseName = undefined;
    this.addCourseFee = undefined;
    this.addIsParent = undefined;
    this.addEditable = "false";
  }

  addCourse() {

    if (this.addCourseName == undefined || this.addCourseName == "") {
      this.toast.errorfixhead("Course name cannot be empty");
      return;
    }

    if (this.addCourseFee == undefined || this.addCourseFee == "") {
      this.toast.errorfixhead("Course fee cannot be empty");
      return;
    }
    if (isNaN(this.addCourseFee)) {
      this.toast.errorfixhead("Invalid Course fee");
      return;
    }

    if (this.addIsParent == undefined) {
      this.toast.errorfixhead("Parent status not selected");
      return;
    }


    this.httpServe.addCourse({
      "name": this.addCourseName,
      "fee": this.addCourseFee,
      "parent": this.addIsParent,
      "status": "Active"
    }).subscribe(response => {
      this.toast.successfixhead("Course Added");
      this.closeAddDialog()
      // reload 
      if (true) {
        this.reload()
      }


    }, err => {
      this.toast.errorfixhead("Something went wrong");
    })
  }





  reload() {
    
    this.httpServe.getCourseTable(this.idString).subscribe(responseTable => {
      this.tableData = []
      this.courseData = responseTable["results"];
      // Create 25 entries
      for (let i = 0; i < this.courseData.length; i++) {
        this.tableData.push(this.createNewEntry(i));
      }
      
      this.dataSource = new MatTableDataSource(this.tableData);
    }, err => {
      this.toast.errorstatus0();
    });
  }
}
