import {
  Component,
  OnInit
} from '@angular/core';
import {
  results
} from '../exam-record/exam-record.component';
import {
  ToastrService
} from 'ngx-toastr';

import {
  NgbModal,
  ModalDismissReasons
} from '@ng-bootstrap/ng-bootstrap';
import { ExamService } from 'src/app/services/exam.service';


export class section {
  testName: string;
  totalQuestion: string;
  easy: 'Easy';
  easyQuestionNumber_E: string;
  eachQuestionNumber_E: string;
  medium: 'Medium';
  easyQuestionNumber_M: string;
  eachQuestionNumber_M: string;
  hard: 'Hard';
  easyQuestionNumber_H: string;
  eachQuestionNumber_H: string;


}
export class abc {
  home: any;
}
@Component({
  selector: 'app-exam-format',
  templateUrl: './exam-format.component.html',
  styleUrls: ['./exam-format.component.css']
})
export class ExamFormatComponent implements OnInit {

  constructor(private _examFormat: ExamService, private modalService: NgbModal,
    private toastr: ToastrService) {
    this.storeSection.push(this.ss);
  }

  // ********MODAL
  closeResult = '';
  open(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg'
    }).result.then((result) => {
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

  ngOnInit() {
    this._examFormat.examFormat().subscribe(
      result => {
      
        this.formatData = result["results"]
          this.length1 = result["results"]
       
      },
      err => {
        this.toastr.error('Network Error', 'Please Check Internet Connection', {
          timeOut: 2000
        });
      }
    )


  }
  home = new abc();
  length1 = []
  dataArray = []
  count = 1
  f_firstPanel = false;
  editToggle = false
  editToggle1 = false
  ngMarking = false
  updateStatus = false
  addFormatStatus = true
  formatData

  section = new section();
  section_arr = []

  removeSection(index) {

    if(this.editToggle == true)
    {
      if(this.existingSection.length > 1 )
      {
        this.existingSection.splice(index, 1);
      }
      else{
        this.toastr.error('Minimum 1 Section Required', 'Min:- 1', {
          timeOut: 2000
        });;
      }
    }
    else{
      if(this.section_arr.length >1 )
      {
        this.section_arr.splice(index, 1);
      }
     else{
      this.toastr.error('Minimum 1 Section Required', 'Min:- 1', {
        timeOut: 2000
      });;
     }
    }
     
     
  }
  
  newAddSectionButton = false
  AddFormat() {
    this.editToggle = !this.editToggle
    if (this.section_arr.length == 0) {
      this.section_arr.push({
        "name": '',
        "questions": 0,
        difficultyLevels: [{
            level: 'Easy',
            questions: 0,
            eachQuestionMark: 0
          },
          {
            level: 'Medium',
            questions: 0,
            eachQuestionMark: 0
          },
          {
            level: 'Hard',
            questions: 0,
            eachQuestionMark: 0
          }
        ]
      })
    }
    this.newAddSectionButton = true

  }
  negativeMarking() {
    this.ngMarking = !this.ngMarking
  }
  // *************** Existing Format Editing Block ************
  testName
  questionNumber
  easyQuestion
  easyQuestionMark
  mediumQuestion
  mediumQuestionMark
  hardQuestion
  hardQuestionMark
  qType1
  qType2
  qType3
  //***********************New Format Editing Block */
  testName1
  questionNumber1
  easyQuestion1
  easyQuestionMark1
  mediumQuestion1
  mediumQuestionMark1
  hardQuestion1
  hardQuestionMark1
placeholder

  mainEditor = false
  cancel() {
    this.addFormatStatus = true
    this.updateStatus = false
    this.editToggle = false
    this.editToggle1 = false
    this.formatTitle,
      this.totalMarks = 0
    this.ngMarking = false,
      this.negativeMarking_m = 0
      this.formatTitle=this.placeholder
      this.questionQuantity=this.placeholder
      this.totalMarks=this.placeholder
  }
  sectionLength = []

  existingSection = []

  editAddSection() {
    this.existingSection.push({
      "name": '',
      "questions": 0,
      difficultyLevels: [{
          level: 'Easy',
          questions: 0,
          eachQuestionMark: 0
        },
        {
          level: 'Medium',
          questions: 0,
          eachQuestionMark: 0
        },
        {
          level: 'Hard',
          questions: 0,
          eachQuestionMark: 0
        }
      ]
    })
    
  }

  tenant
  createdAt
  updatedAt
  id

  editMain(index) {
    this.putId = index.id
    
    this.editToggle = true
    this.editToggle1 = true
    this.mainEditor = true
    this.updateStatus = true
    this.addFormatStatus = false
    this.section_arr = []
    this.existingSection = [];
    this.newAddSectionButton = false
    let n
    this.tenant = index.tenant
    this.createdAt = index.createdAt
    this.updatedAt = index.updatedAt
    this.id = index.id

    this.questionQuantity = index.totalQuestions;
    this.formatTitle = index.name;
    this.totalMarks = index.totalMarks;
    this.ngMarking = index.isNegativeMarking;
    this.negativeMarking_m = index.negativeMarkingPercent;

    for (let i in index.sections) {
      this.existingSection.push(index.sections[i])

    }
    
    window.scrollTo(0, 0)


  }
  sectionName
  editQuestion
  difficulityLevel1
  requiredQuestion1
  eachQuestionMark1
  difficulityLevel2
  requiredQuestion2
  eachQuestionMark2
  difficulityLevel3
  requiredQuestion3
  eachQuestionMark3


  // ***********************************AddExamComponent************************
  formatTitle
  questionQuantity
  totalMarks
  negativeMarking_m

  storeSection = [];
  ss = {}
  sss = []
  index = 0
  close() {
    this.modalService.dismissAll();
  }
  saveChanges() {

    if (this.testName2 == "" || this.testName2 == undefined) {
      this.toastr.error('Please Fill Section Name', 'Error', {
        timeOut: 2000
      });;
    } else {
      if (this.updateStatus == false) {

        for (let i in this.section_arr) {
          if (this.index == parseInt(i)) {
            this.section_arr[i]["name"] = this.testName2;
            this.section_arr[i]["questions"] = this.totalQuestion2;
            this.section_arr[i]["difficultyLevels"][0]["level"] = "Easy";
            this.section_arr[i]["difficultyLevels"][0]["questions"] = this.easyQuestionNumber_E2;
            this.section_arr[i]["difficultyLevels"][0]["eachQuestionMark"] = this.eachQuestionNumber_E2;
            this.section_arr[i]["difficultyLevels"][1]["level"] = "Medium";
            this.section_arr[i]["difficultyLevels"][1]["questions"] = this.easyQuestionNumber_M2;
            this.section_arr[i]["difficultyLevels"][1]["eachQuestionMark"] = this.eachQuestionNumber_M2;
            this.section_arr[i]["difficultyLevels"][2]["level"] = "hard";
            this.section_arr[i]["difficultyLevels"][2]["questions"] = this.easyQuestionNumber_H2;
            this.section_arr[i]["difficultyLevels"][2]["eachQuestionMark"] = this.eachQuestionNumber_H2;
          }
        }
        this.modalService.dismissAll();

      } else {


        for (let i in this.existingSection) {
          if (this.index == parseInt(i)) {
            this.existingSection[i]["name"] = this.testName2;
            this.existingSection[i]["questions"] = this.totalQuestion2;
            this.existingSection[i]["difficultyLevels"][0]["level"] = "Easy";
            this.existingSection[i]["difficultyLevels"][0]["questions"] = this.easyQuestionNumber_E2;
            this.existingSection[i]["difficultyLevels"][0]["eachQuestionMark"] = this.eachQuestionNumber_E2;
            this.existingSection[i]["difficultyLevels"][1]["level"] = "Medium";
            this.existingSection[i]["difficultyLevels"][1]["questions"] = this.easyQuestionNumber_M2;
            this.existingSection[i]["difficultyLevels"][1]["eachQuestionMark"] = this.eachQuestionNumber_M2;
            this.existingSection[i]["difficultyLevels"][2]["level"] = "Hard";
            this.existingSection[i]["difficultyLevels"][2]["questions"] = this.easyQuestionNumber_H2;
            this.existingSection[i]["difficultyLevels"][2]["eachQuestionMark"] = this.eachQuestionNumber_H2;
          }
        }
        this.modalService.dismissAll();
      }
    }

  }

  // }

  // *******************************addSectionEdit*********************
  addSectionEdit(i) {
  
    this.index = i;
    for (let i in this.section_arr) {
      if (this.index == parseInt(i)) {
        this.testName2 = this.section_arr[i]["name"];
        this.totalQuestion2 = this.section_arr[i]["questions"];
       //Easy
        this.easyQuestionNumber_E2 = this.section_arr[i]["difficultyLevels"][0]["questions"];
        this.eachQuestionNumber_E2 = this.section_arr[i]["difficultyLevels"][0]["eachQuestionMark"];
      //Medium
        this.easyQuestionNumber_M2 = this.section_arr[i]["difficultyLevels"][1]["questions"];
        this.eachQuestionNumber_M2 = this.section_arr[i]["difficultyLevels"][1]["eachQuestionMark"];
        //Hard
        this.easyQuestionNumber_H2 = this.section_arr[i]["difficultyLevels"][2]["questions"];
        this.eachQuestionNumber_H2 = this.section_arr[i]["difficultyLevels"][2]["eachQuestionMark"];
      }
    }
    this.sectionName = ""
    this.editQuestion = ""
    this.difficulityLevel1 = ""
    this.requiredQuestion1 = ""
    this.eachQuestionMark1 = ""
    this.difficulityLevel2 = ""
    this.requiredQuestion2 = ""
    this.eachQuestionMark2 = ""
    this.difficulityLevel3 = ""
    this.requiredQuestion3 = ""
    this.eachQuestionMark3 = ""
  }

  // ************************************* End ************************

  existingSectionEdit(i) {
  
    this.index = i;

    for (let i in this.existingSection) {
      if (this.index == parseInt(i)) {
        this.testName2 = this.existingSection[i]["name"];
        this.totalQuestion2 = this.existingSection[i]["questions"];
        //  "Easy";
        this.easyQuestionNumber_E2 = this.existingSection[i]["difficultyLevels"][0]["questions"];
        this.eachQuestionNumber_E2 = this.existingSection[i]["difficultyLevels"][0]["eachQuestionMark"];
        // "Medium";
        this.easyQuestionNumber_M2 = this.existingSection[i]["difficultyLevels"][1]["questions"];
        this.eachQuestionNumber_M2 = this.existingSection[i]["difficultyLevels"][1]["eachQuestionMark"];
        // "hard";
        this.easyQuestionNumber_H2 = this.existingSection[i]["difficultyLevels"][2]["questions"];
        this.eachQuestionNumber_H2 = this.existingSection[i]["difficultyLevels"][2]["eachQuestionMark"];
      }
    }
    this.sectionName = ""
    this.editQuestion = ""
    this.difficulityLevel1 = ""
    this.requiredQuestion1 = ""
    this.eachQuestionMark1 = ""
    this.difficulityLevel2 = ""
    this.requiredQuestion2 = ""
    this.eachQuestionMark2 = ""
    this.difficulityLevel3 = ""
    this.requiredQuestion3 = ""
    this.eachQuestionMark3 = ""
  }
  ssss = {
    left: '70px',
    top: '40px',
  }

  ss2 = {
    left: '0px',
    top: '40px',
  }

  addSection() {
    this.section_arr.push({
      "name": '',
      "questions": 0,
      difficultyLevels: [{
          level: 'Easy',
          questions: 0,
          eachQuestionMark: 0
        },
        {
          level: 'Medium',
          questions: 0,
          eachQuestionMark: 0
        },
        {
          level: 'Hard',
          questions: 0,
          eachQuestionMark: 0
        }
      ]
    })
 
  }

  testName2
  totalQuestion2
  easyQuestionNumber_E2
  eachQuestionNumber_E2
  easyQuestionNumber_M2
  eachQuestionNumber_M2
  easyQuestionNumber_H2
  eachQuestionNumber_H2

  postData() {
    let t_question = 0;
    let t_Marks = 0;
    for (let i in this.section_arr) {
      t_question += this.section_arr[i]["questions"];
      for (let j in this.section_arr[i]["difficultyLevels"]) {
        t_Marks += this.section_arr[i]["difficultyLevels"][j]["eachQuestionMark"] * this.section_arr[i]["difficultyLevels"][j]["questions"];
      }

    }

    if (Math.sign(this.negativeMarking_m) == -1 || Math.sign(this.questionQuantity) == -1) {
      this.toastr.error('Value Not be Negative', 'Negative Value Found', {
        timeOut: 2000
      });;
    } else {
      if (this.ngMarking == true && this.negativeMarking_m == undefined) {
        this.toastr.error('Please fill Negative Marks', 'Error', {
          timeOut: 2000
        });;
      } else
      if (this.formatTitle == undefined) {
        this.toastr.error('Please fill Format Title Field', 'Error', {
          timeOut: 2000
        });;
      } else
      if (this.totalMarks == undefined) {
        this.toastr.error('Please Fill Total Question Field', 'Error', {
          timeOut: 2000
        });;

      } else
      if (this.totalMarks == undefined) {
        this.toastr.error('Please Fill Total Marks Field', 'Error', {
          timeOut: 2000
        });;
      } else
      if (this.totalMarks != t_Marks) {
        this.toastr.error('Questions Marks Did not Match', 'Error', {
          timeOut: 2000
        });;
      } else
      if (t_question != this.questionQuantity) {
        this.toastr.error('Questions Did not Match', 'Error', {
          timeOut: 2000
        });;
      } else {

        let obj = {
          "totalQuestions": this.questionQuantity,
          "sections": [{
            "name": "",
            "questions": 0,
            "difficultyLevels": [{
                "level": "",
                "questions": 0,
                "eachQuestionMark": 0
              },
              {
                "level": "",
                "questions": 0,
                "eachQuestionMark": 0
              },
              {
                "level": "",
                "questions": 0,
                "eachQuestionMark": 0
              }
            ]
          }],
          "name": this.formatTitle,
          "totalMarks": this.totalMarks,
          "isNegativeMarking": this.ngMarking,
          "negativeMarkingPercent": this.negativeMarking_m,
          "status": "Active"
        }

        obj.sections.shift();
        for (let i in this.section_arr) {
          obj.sections.push(this.section_arr[i])
        }
        this._examFormat.post(obj).subscribe(
          res => {
    
            this.ngOnInit()
            this.cancel();
            this.toastr.success('Format Add Successfully', 'Successfull', {
              timeOut: 2000
            });;
          }
        );


      }
    }
  }


  updateExam() {
    let t_question = 0;
    let t_Marks = 0;
    for (let i in this.existingSection) {
      t_question += this.existingSection[i]["questions"];
      for (let j in this.existingSection[i]["difficultyLevels"]) {
        t_Marks += this.existingSection[i]["difficultyLevels"][j]["eachQuestionMark"] * this.existingSection[i]["difficultyLevels"][j]["questions"];
      }

    }

    if (this.ngMarking == true && this.negativeMarking_m == undefined) {

      this.toastr.error('Please fill Negative Marks', 'Error', {
        timeOut: 2000
      });;
    } else
    if (this.formatTitle == undefined) {

      this.toastr.error('Please fill Format Title Field', 'Error', {
        timeOut: 2000
      });;
    } else
    if (this.totalMarks == undefined) {

      this.toastr.error('Please Fill Total Question Field', 'Error', {
        timeOut: 2000
      });;

    } else
    if (this.totalMarks == undefined) {
      this.toastr.error('Please Fill Total Marks Field', 'Error', {
        timeOut: 2000
      });;
    } else
    if (this.totalMarks != t_Marks) {

      this.toastr.error('Questions Marks Did not Match', 'Error', {
        timeOut: 2000
      });;
    } else
    if (t_question != this.questionQuantity) {

      this.toastr.error('Questions Did not Match', 'Error', {
        timeOut: 2000
      });;
    }
    if (Math.sign(this.negativeMarking_m) == -1) {
      this.toastr.error('Value Not be Negative', 'Negative Value Found', {
        timeOut: 2000
      });;
    } else

    {

      let obj = {
        "totalQuestions": this.questionQuantity,
        "sections": [{
          "name": "",
          "questions": 0,
          "difficultyLevels": [{
              "level": "",
              "questions": 0,
              "eachQuestionMark": 0
            },
            {
              "level": "",
              "questions": 0,
              "eachQuestionMark": 0
            },
            {
              "level": "",
              "questions": 0,
              "eachQuestionMark": 0
            }
          ]
        }],
        "name": this.formatTitle,
        "totalMarks": this.totalMarks,
        "isNegativeMarking": this.ngMarking,
        "negativeMarkingPercent": this.negativeMarking_m,
        "status": "Active",
        "tenant": this.tenant,
        "createdAt": this.createdAt,
        "updatedAt": this.updatedAt,
        "id": this.putId
      }

      obj.sections.shift();
      for (let i in this.existingSection) {
        obj.sections.push(this.existingSection[i])
      }


      this._examFormat.editFormat(obj).subscribe(
        res => {
 
          this.toastr.success('Update Successfully', 'Successfull', {
            timeOut: 2000
          });;

          this.ngOnInit();
          this.cancel();
        })



    }

  }
  putId
  Deactivate(row) {

    this.putId = row.id
 
    if (row["status"] == "InActive") {

      const req = {
        "id": row.id,
        "status": "Active"
      }
      this._examFormat.editFormat(req).subscribe(
        res => {

          this.ngOnInit();
          this.toastr.success('Activate Successfully', 'Successfull', {
            timeOut: 2000
          });;

        }
      )
    } else {
      const req = {
        "id": row.id,
        "status": "InActive"
      }
      this._examFormat.editFormat(req).subscribe(
        res => {
          
          this.ngOnInit();
          this.toastr.success('Deactivate Successfully', 'Successfull', {
            timeOut: 2000
          });;
        }
      );
    }
  }
}
