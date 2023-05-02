import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

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
  AssignmentService
} from '../../services/assignment.service';
import {
  Router
} from '@angular/router';
import {
  DatePipe
} from '@angular/common';
import {
  ToastrService
} from 'ngx-toastr';
import {ConfirmDialogModel, DialogSHOWComponent } from '../../dialog-show/dialog-show.component';
import { MatDialog } from '@angular/material';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
export class TableEntry {
  name: string;
  batch: string;
  updated: string;
  submission_date: string;
  question: string;
  type: string;
  id: string;
}



@Component({
  selector: 'app-assignment-view-all',
  templateUrl: './assignment-view-all.component.html',
  styleUrls: ['./assignment-view-all.component.css']
})
export class AssignmentViewAllComponent implements OnInit {

  constructor(private assignmentService: AssignmentService,
    private route: Router,
    private modalService: NgbModal,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.onCall();

  }
  onCall() {
    this.data = [];
    this.dataSource.paginator = this.paginator;
    this.assignmentService.getView().subscribe(
      res => {
        if(res["results"].length == 0 )
        {
          this.toastr.warning('No Assignment', 'No Record Found', {
            timeOut: 2000
          });;
        }
        this.store_Results = res["results"]
        for (let key in this.store_Results) {

          this.data.push({
            'name': this.store_Results[key]["name"] ? this.store_Results[key]["name"] : " ",
            'batch': this.store_Results[key]["batch"] ? this.store_Results[key]["batch"]["name"] : '',
            'updated': this.store_Results[key]["updatedAt"] ? this.store_Results[key]["updatedAt"] : " ",
            'submission_date': this.store_Results[key]["lastDate"] ? this.store_Results[key]["lastDate"] : " ",
            'question': this.store_Results[key]["questions"] ? this.store_Results[key]["questions"].length : "",
            'type': this.store_Results[key]["status"] ? this.store_Results[key]["status"] : " ",
            'id': this.store_Results[key]["status"] ? this.store_Results[key]["id"] : " ",

          })
        }
        this.dataSource = new MatTableDataSource(this.data)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.paginator = this.paginator;
      },
      err => {
        this.toastr.error('Network Error', 'Please Check Internet Connection', {
          timeOut: 2000
        });}
    )
  }

  store_Results


  displayedColumns: string[] = [
    'name',
    'batch',
    'updated',
    'submission_date',
    'question',
    'type',
    'action',

  ];

  dataSource = new MatTableDataSource < TableEntry > ();


  @ViewChild(MatPaginator, {
    static: true
  }) paginator: MatPaginator;
  @ViewChild(MatSort, {
    static: true
  }) sort: MatSort;
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
  matbox = false
  resultDisplay = true

  results(row) {


    this.assignmentService.addId(row.id);
    this.route.navigate(['Assignment/assignment-record', row.id])
  }
  clone(row) {
    

    // var retVal = prompt("Enter  name : ");
   this.tempData = row
  }
tempData
sendClone()
{
  const row = this.tempData
  if (this.clone1 == '' || this.clone1 == undefined) {
    this.toastr.error('Please Enter Name', 'Error', {
      timeOut: 2000
    });;
  } else {
    const batch123 = this.store_Results.filter(v => (v.id == row.id))
    let obj = {
      questions: batch123[0]["questions"],
      assignments: batch123[0]["assignments"],
      batch: batch123[0]["batch"],
      name: this.clone1,
      lastDate: batch123[0]["lastDate"],
      status: batch123[0]["status"],
      tenant: batch123[0]["tenant"],
      answers: batch123[0]["answers"],
    }

    this.assignmentService.postData(obj).subscribe(
      res => {
        this.onCall();
      }
    )
    this.toastr.success('Clone Successfull', 'Successfull', {
      timeOut: 2000
    });;
    this.modalService.dismissAll();
    this.clone1=''
  }

}


  Deactivate(row, index) {
    console.clear();
    const batch123 = this.store_Results.filter(v => (v.id == row.id))
    if (batch123[0]["status"] == "InActive") {
      const req = {
        "id": row.id,
        "status": "Active"
      }
      this.assignmentService.put(req).subscribe(
        res => {
          this.onCall();
          this.toastr.success('Activate Successfull', 'Successfull', {
            timeOut: 2000
          });;
          for (let i = 0; i < this.dataSource.data.length; i++) {
            if (index == i) {
              this.dataSource.data[i].type = 'Active'
            }
          }

        },
        err => {
          batch123[0]['status'] = "InActive"
        }
      );
    } else {
      const req = {
        "id": row.id,
        "status": "InActive"
      }
      this.assignmentService.put(req).subscribe(
        res => {
          this.onCall();
          this.toastr.success('InActivate Successfull', 'Successfull', {
            timeOut: 2000
          });;
          for (let i = 0; i < this.dataSource.data.length; i++) {
            if (index == i) {
              this.dataSource.data[i].type = 'InActive'
            }
          }
        },
        err => {
          batch123[0]['status'] = "Active"
        }
      );

    }

  }


  eventAction(row: number, action) {

    const message = `Are you sure you want to do delete?`;
 
    const dialogData = new ConfirmDialogModel("Delete Leave!", message);
 
    const dialogRef = this.dialog.open(DialogSHOWComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
      let result = dialogResult;
	  if(result){
      if (action == "delete") {
        if (result) {
          this.assignmentService.delete(row["id"]).subscribe(response => {
            this.onCall();
            this.toastr.success('Delete Successfull', 'Successfull', {
              timeOut: 2000
            });;
            const data = this.dataSource.data;
            data.splice(row, 1);
            this.dataSource.data = data;
          });
        }
      }
	  }
    });

    
  }
  data = []
  batchName
  assignmentName
  lastDate
  question
  description
  images
  selectBranch
  uploadImage = false
  multipleImage = false
  marks
  imgFileUpload = "No"
  Upload = "No"
  multipleUpload = "No"
  question1 = []


  editView(row) {
    this.route.navigate(['/Assignment/edit-assignment', row.id])

  }




  closeResult = '';
    open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title' ,size: 'md'}).result.then((result) => {
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
    close(){
      this.modalService.dismissAll();
    }
    clone1
}
