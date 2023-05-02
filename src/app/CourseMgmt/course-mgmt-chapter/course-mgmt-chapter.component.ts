import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  AddNewHTTPService
} from '../../services/add-new-http.service';
import {
  MatSort
} from '@angular/material/sort';
import {
  MatPaginator
} from '@angular/material/paginator';
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


export interface chapterTable {
  Chapter: string;
  id: string;
  Status: string;
  Course: string;
  Subject: string;
  SubCourse: string;
  tenant: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-course-mgmt-chapter',
  templateUrl: './course-mgmt-chapter.component.html',
  styleUrls: ['./course-mgmt-chapter.component.css']
})
export class CourseMgmtChapterComponent implements OnInit {

  statusNAME = "Deactivate";

  // if true; will open the edit card
  editable;
  addEditable;
  editRow;
  statusMove;

  chapterList;

  // courses
  selectedCourse;
  courseName;

  // Subjects
  subjectName;
  selectedSubject;

  chapterName;
  idString;
  courseData

  tableData: chapterTable[] = [];

  displayedColumns: string[] = ['Chapter', 'Subject', 'SubCourse', 'Course', 'Status', "Action"];
  dataSource = new MatTableDataSource < chapterTable > (this.tableData);

  @ViewChild(MatPaginator, {
    static: true
  }) paginator: MatPaginator;
  @ViewChild(MatSort, {
    static: true
  }) sort: MatSort;

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

        for (let i = 0; i < responseTable["results"].length; i++) {
          idList.push(responseTable["results"][i]["id"]);
        }

        this.idString = idList.join(',');

        this.httpServe.getChapters(this.idString).subscribe(response => {

          this.chapterList = response["results"];

          for (let i = 0; i < this.chapterList.length; i++) {
            this.tableData.push(this.createNewEntry(i));
          }

          this.dataSource = new MatTableDataSource(this.tableData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, err => {
          this.toast.errorstatus0();
        })

      }, err => {
        this.toast.errorstatus0();
      })
    }, err => {
      this.toast.errorstatus0();
    })




    this.httpServe.getCourse().subscribe(data => {
      this.courseName = data["results"];
    }, err => {
      this.toast.errorstatus0();
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createNewEntry(index: number): chapterTable {

    // create a row for mat table
    return {
      'Chapter': this.chapterList[index]["name"],
      'id': this.chapterList[index]["id"],
      'Status': this.chapterList[index]["status"],
      'Course': this.chapterList[index]["course"]["name"],
      'Subject': this.chapterList[index]["subject"]["name"],
      'SubCourse': this.chapterList[index]["subcourse"] ? this.chapterList[index]["subcourse"]["name"] : "N/A",
      'tenant': this.chapterList[index]["tenant"],
      'createdAt': this.chapterList[index]["createdAt"],
      'updatedAt': this.chapterList[index]["updatedAt"]
    }
  }

  openAddchapter() {
    this.addEditable = "true";
  }

  closeDialog() {
    this.addEditable = "false";
    this.editable = "false";
    this.selectedCourse = undefined;
    this.selectedSubject = undefined;
  }

  selectSubject() {
    this.httpServe.getSubject(this.selectedCourse["id"], false).subscribe(response => {
      this.subjectName = response["results"];
    }, err => {
      this.toast.errorstatus0();
    })
  }

  addChapter() {
    var payLoad = {
      "course": this.selectedCourse,
      "subject": this.selectedSubject,
      "name": this.chapterName,
      "status": "Active"
    };

    this.httpServe.postChapter(payLoad).subscribe(response => {
      this.toast.successfixhead("Chapter Added")
      this.selectedCourse = undefined;
      this.selectSubject = undefined;
      this.chapterName = undefined;
      this.reload()
    }, err => {
      this.toast.errorfixhead("Something went wrong")
    })
  }


  editChapter() {

    var courseObj = this.courseName.find(obj => {
      return obj["name"] == this.editRow["Course"];
    });

    this.httpServe.updateChapter({
      "course": courseObj,
      "subject": {
        "course": courseObj,
        "name": this.selectedSubject,
        "status": this.editRow["Status"],
        "tenant": this.editRow["tenant"],
        "createdAt": this.editRow["createdAt"],
        "updatedAt": this.editRow["updatedAt"],
        "id": this.editRow["id"]
      },
      "name": this.chapterName,
      "status": this.editRow["Status"],
      "tenant": this.editRow["tenant"],
      "createdAt": this.editRow["createdAt"],
      "updatedAt": this.editRow["updatedAt"],
      "parent": false,
      "id": this.editRow["id"]
    }).subscribe(response => {
      this.toast.successfixhead("Chapter Updated")
      this.selectedCourse = undefined;
      this.selectSubject = undefined;
      this.chapterName = undefined;
      this.reload()
    }, err => {
      this.toast.errorfixhead("Something went wrong");
    })
  }

  eventAction(row, action) {
    if (action == "edit") {
      this.selectedCourse = row["Course"];
      this.selectedSubject = row["Subject"];
      this.chapterName = row["Chapter"];
      this.editable = "true";
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
          this.httpServe.deleteChapter(row["id"]).subscribe(response => {
            this.toast.successfixhead("Chapter Deleted")
            for (let i = 0; i < this.dataSource.data.length; i++) {
              if (this.dataSource.data[i] == row) {
                this.dataSource.data.splice(i, 1);
                this.dataSource._updateChangeSubscription();
              }
            }
          }, err => {
            this.toast.errorfixhead("Something went wrong")
          })
        }
      })
    } else if (action == "setStatus") {
      // switch status
      if (row["Status"] == "Active") {
        this.statusMove = "Inactive";
        this.statusNAME = "Activate";
      } else if (row["Status"] == "Inactive") {
        this.statusMove = "Active";
        this.statusNAME = "Deactivate";
      }
      var courseObj = this.courseName.find(obj => {
        return obj["name"] == row["Course"];
      });

      this.httpServe.deactivateChapter({
        "course": courseObj,
        "subject": {
          "name": row["Subject"],
          "id": row["id"]
        },
        "name": row["Chapter"],
        "status": this.statusMove,
        "tenant": row["tenant"],
        "createdAt": row["createdAt"],
        "updatedAt": row["updatedAt"],
        "id": row["id"]
      }).subscribe(response => {
        this.toast.successfixhead("Chapter Updated");
        this.reload();
      }, err => {
        this.toast.errorfixhead("Something went wrong")
      });

    }
  }

  reload() {
    this.httpServe.getChapters(this.idString).subscribe(response => {
      this.tableData = []
      this.chapterList = response["results"];

      for (let i = 0; i < this.chapterList.length; i++) {
        this.tableData.push(this.createNewEntry(i));
      }

      this.dataSource = new MatTableDataSource(this.tableData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      this.toast.errorstatus0();
    })
  }

}
