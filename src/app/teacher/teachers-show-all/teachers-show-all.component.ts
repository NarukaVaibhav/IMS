import {
  Component,
  OnInit
} from '@angular/core';
import {
  TeachersService
} from '../../services/teachers.service';
import {
  Router
} from '@angular/router';
import {
  ActivatedRoute,
  ParamMap
} from '@angular/router';
import { ApiDataService } from 'src/app/services/apidata.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-teachers-show-all',
  templateUrl: './teachers-show-all.component.html',
  styleUrls: ['./teachers-show-all.component.css']
})
export class TeachersShowAllComponent implements OnInit {

  constructor(private service: TeachersService,
    private toastr: ToastrService,
    public service1: ApiDataService,
    private route: Router,
    private activatRoute: ActivatedRoute) {
    // this.showAll=this.service.getStoreDetails()
  }

  showAll
  ss = []
  addmission = []
  numberOfStudents = []
  numberOfStudent = []
  examData = []
  feedBack = []
  id
  ngOnInit() {


    this.activatRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id')
      this.service.getView().subscribe(
        res => {
          // console.log(res)
          let obj = res.filter(val => (val.id == this.id))
          for (let i in obj[0].batchId) {

            // const d = new Date(obj[0].batchId[i].batchTime.timmingFrom)
            // let a = (d.getUTCHours() + 5);
            // let b = (d.getUTCMinutes() + 30);
            // if (b >= 60) {
            //   a = a + 1;
            //   b = b - 60;
            // }
            // let r = (String(a).length == 1 ? '0' : '') + String(a) + ":" + (String(b).length == 1 ? '0' : '') + String(b);

            // const d2 = new Date(obj[0].batchId[i].batchTime.timmingTo)
            // let x = (d2.getUTCHours() + 5);
            // let y = (d2.getUTCMinutes() + 30);
            // if (y >= 60) {
            //   x = x + 1;
            //   y = y - 60;
            // }
            // let r2 = (String(x).length == 1 ? '0' : '') + String(x) + ":" + (String(y).length == 1 ? '0' : '') + String(y);

            this.ss.push({

              name: obj[0].batchId[i].name,
              date: new Date(obj[0].batchId[i].start),
              startTime: obj[0].batchId[i].batchTime.timmingFrom,
              endTime: obj[0].batchId[i].batchTime.timmingTo,
              id: obj[0].batchId[i].id,

            })
            this.service.admissionData(obj[0].batchId[i].id).subscribe(
              res => {

                this.addmission.push(res["results"]);
                this.numberOfStudents.push(res["results"].length)

                // ********************************* Exam DAta
                ['/asd']

                this.service.examData(obj[0].batchId[i].id).subscribe(
                  exam => {

                    this.examData.push({
                      totalMarks: exam["results"].length != 0 ? exam["results"][0].format.totalMarks : '',
                      examType: exam["results"].length != 0 ? exam["results"][0].format.sections[0].name : '',
                      totalQuestions: exam["results"].length != 0 ? exam["results"][0].format.totalQuestions : '',
                      submittedBy: '',
                      lastDate: exam["results"].length != 0 ? exam["results"][0].date : '',
                      id: exam["results"].length != 0 ? exam["results"][0].id : ''
                    })


                    // ************************ Feedback
                    this.service.feedBackData(obj[0].batchId[i].id).subscribe(
                      feed => {
                        this.feedBack.push({
                          'feedback' : feed["results"][0],
                          'index' : feed["results"].length != 0 ? Object.keys(feed["results"][0]["answers"]).length : ''
                        })
                      }
                    )
                  }
                )
              }
            )
          }
          this.numberOfStudent = this.numberOfStudents
          this.aa = this.ss
          this.exm = this.examData
          this.vv = this.feedBack
        }

      )
    })

  }
  aa = []
  exm = []
  vv = []
  feedb
 
  attendence(row) {
    this.route.navigate(['/Attendance/attendenceAll', row.id])
  }
  examForward(row) {

    if (row == "") {
      alert("No Exam Data")
    } else {
      this.route.navigate(['/Exam/record-exam', row])
    }

  }

  

  users=[];
  ques_ans_obj ={"user":{},"ques":[],"ans":[]}
  ques_ans_obj2 ={"user":{},"ques":{},"ans":{}}
  summary(key){
  if(key.feedback == undefined)
  {
    this.toastr.warning('No Data Available', 'Data Not Available', {
      timeOut: 2000
    });
  }
  else
  {
    // this.route.navigate(['Feedback/feedback-summary'])
  }

   
//     this.service1.getdatabyid(key).subscribe(res=>
//     {

      
       
//         this.service1.arr3 = res["results"]

//         


        

//       if(Object.keys(this.service1.arr3[0]['answers']).length >= 0){
//       this.service1.getUser(Object.keys(this.service1.arr3[0]['answers'])).subscribe(res=>{
//        this.users=res['results']
      
//        for(let u in this.users){
   
//         this.ques_ans_obj['user']=this.users[u]
//         for(let q in this.service1.arr3[0]['questions']){
//           this.ques_ans_obj['ques'].push(this.service1.arr3[0]['questions'][q])
//           this.ques_ans_obj['ans'].push(this.service1.arr3[0]['answers'][this.users[u]['id']][this.service1.arr3[0]['questions'][q]['id']])
        
//         }
//         
//         this.service1.ques_ans.push(this.ques_ans_obj)
//         
//         this.ques_ans_obj ={"user":"","ques":[],"ans":[]}
//       }
//       this.route.navigate(['Feedback/feedback-summary'])
//      })
//     }


 
// })


}

}
