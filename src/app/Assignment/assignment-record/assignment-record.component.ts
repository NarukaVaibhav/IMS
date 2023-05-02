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
  AssignmentService
} from '../../services/assignment.service';
import {
  Router
} from '@angular/router';

import { ToastrService } from 'ngx-toastr';

export class results {
  studentName: string;
  fatherName: string;
  mobile: string;
  achieved_marks: string;
  id: string;
}

@Component({
  selector: 'app-assignment-record',
  templateUrl: './assignment-record.component.html',
  styleUrls: ['./assignment-record.component.css']
})
export class AssignmentRecordComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private _service: AssignmentService,
    private toastr: ToastrService,
    private routes: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id')


      this.ass_IDS = this._service.getid();

      // **********************REsponse ************
      this._service.record(this.id).subscribe(
        response => {

          this._service.record2(response["results"][0]["batch"]["id"]).subscribe(
            res => {

              this._service.record(this.id).subscribe(
                res1 => {
                  this.assignmentName = res1["results"][0].name ? res1["results"][0].name : ""

                  this.submission = res1["results"][0]["answers"]
                  let temp;
                  let q_ID = res1["results"][0]["questions"].length != 0 ? res1["results"][0]["questions"][0]["id"] : ''

                  let questions = [];

                  for (let i in res["results"]) {

                    let id = res["results"][i]["id"]

                    this.data.push({
                      studentName: res["results"][i]["basicDetails"]["studentName"],
                      fatherName: res["results"][i]["basicDetails"]["fatherName"],
                      mobile: res["results"][i]["basicDetails"]["mobileNumber"],
                      achieved_marks: this.submission.hasOwnProperty(id) ? (this.submission[id].hasOwnProperty(q_ID) ? this.submission[id][q_ID]['achievedMarks'] : 'Not Submitted') : 'Not Submitted',
                      id: res["results"][i]["id"]
                    })
                  }
                  this.dataSource = new MatTableDataSource(this.data)
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                }

              )
            }
          )
        },
        err=>{
          this.toastr.error('Network Error', 'Please Check Internet Connection', {
            timeOut: 2000
          });}
      )

    })
  }
  results(row) {

    this.routes.navigate(['Assignment/individul-submission', row.id])
  }
  displayedColumns: string[] = [
    'studentName',
    'fatherName',
    'mobile',
    'achieved_marks'
  ];

  id
  assignmentName = ""
  ass_IDS = []
  data = []
  dataSource = new MatTableDataSource < results > ();
  @ViewChild(MatPaginator, {
    static: true
  }) paginator: MatPaginator;
  @ViewChild(MatSort, {
    static: true
  }) sort: MatSort;
  submission
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
  moveToaddmission(row) {
    this.routes.navigate(['/Admission/edit-admissions', row.id])
  }

}
