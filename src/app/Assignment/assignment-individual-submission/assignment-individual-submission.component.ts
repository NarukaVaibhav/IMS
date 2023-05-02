import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  ActivatedRoute,
  ParamMap
} from '@angular/router';
import {
  AssignmentService
} from '../../services/assignment.service';
import { ToastrService } from 'ngx-toastr';

export class results {
  sr: number;
  question: string;
  answer: string;
  achieved_marks: string;
  // id : string;
}
@Component({
  selector: 'app-assignment-individual-submission',
  templateUrl: './assignment-individual-submission.component.html',
  styleUrls: ['./assignment-individual-submission.component.css']
})
export class AssignmentIndividualSubmissionComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private toastr: ToastrService,
    private service: AssignmentService) {}


  ngOnInit() {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id')
      let sr = 1;
      // *****************Student Details ******************
      this.service.indiviual_submission(this.id).subscribe(
        res => {
          this.name = res["results"][0]["name"];
          this.photo = res["results"][0]["photos"] ? res["results"][0]["photos"][0]["dataURL"] : '';
          this.image = this.photo ? this.photo : ''

        }
        ,err=>{
          
        this.toastr.error('Network Error', 'Please Check Internet Connection', {
          timeOut: 2000
        });
        }
      )
      // ******************************Assignmnet Record ********************
      this.ids = this.service.getid();
      let temp
      this.service.record(this.ids[0]).subscribe(
        res1 => {
          this.assignmentName = res1["results"][0]["name"];
          this.assignmnetApi = res1["results"]
          this.questions = []
          for (let k in res1["results"]) {
            for (let j in res1["results"][k]["questions"]) {
              temp = res1["results"][k]["questions"][j]["id"];
              // 
              this.questions.push({
                sr: sr++,
                answer: res1["results"][k]["answers"].hasOwnProperty(this.id) ? (res1["results"][k]["answers"][this.id].hasOwnProperty(temp) ? res1["results"][k]["answers"][this.id][temp]["answer"] : "") : "",
                achieved_marks: res1["results"][k]["answers"].hasOwnProperty(this.id) ? (res1["results"][k]["answers"][this.id].hasOwnProperty(temp) ? res1["results"][k]["answers"][this.id][temp]["achievedMarks"] : "") : "",
                question: res1["results"][k]["questions"][j]["question"]
              })
            }
          }
          this.dataSource = new MatTableDataSource(this.questions)
        },
        err=>{
          
        this.toastr.error('Network Error', 'Please Check Internet Connection', {
          timeOut: 2000
        });
        }
      )

    },
    err=>{
      
      this.toastr.error('Network Error', 'Please Check Internet Connection', {
        timeOut: 2000
      });
    }
    )
  }


  displayedColumns: string[] = ['sr',
    'question',
    'answer',
    'achieved_marks'
  ];
  dataSource = new MatTableDataSource < results > ();
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  id
  ids = []
  name
  assignmentName
  photo
  image
  assignmnetApi
  questions = []
  getData() {
    this.image = this.photo
  }

}
