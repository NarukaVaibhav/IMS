import {
  Component,
  OnInit,
  Input,
  ViewChild
} from '@angular/core';
import {
  ExamService
} from '../../services/exam.service';


import * as XLSX from 'xlsx';
import {
  ToastrService
} from 'ngx-toastr';
import {
  DateTime
} from './DateTime';

import {
  PopoverDirective
} from 'ngx-bootstrap/popover';
import {
  Router,
  ActivatedRoute,
  ParamMap
} from '@angular/router';
import {
  isArray
} from 'util';
import {ConfirmDialogModel, DialogSHOWComponent } from '../../dialog-show/dialog-show.component';
import { MatDialog } from '@angular/material';



type AOA = any[][];

@Component({
  selector: 'app-edit-exam',
  templateUrl: './edit-exam.component.html',
  styleUrls: ['./edit-exam.component.css']
})
export class EditExamComponent implements OnInit {

  constructor(private service: ExamService,
    private rout: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
    this.tomorrow.setDate(this.tomorrow.getDate());
  }

  id
  placeholder
  editDatas
  filter
  ngOnInit() {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id')

      this.service.edit(this.id).subscribe(
        res => {
          this.editDatas = res["results"][0]

          this.examName = this.editDatas.name;
          this.examFormat = this.editDatas.format.name;
          this.batch = this.editDatas.batch.name;
          this.passcode = this.editDatas.examPasscode;
          this.examStartTime = this.editDatas.examStartTime;
          this.examEndTime = this.editDatas.examEndTime;
          this.afterSubmission = this.editDatas.showResults;
          this.timeBound = this.editDatas.timeBounded;
          this.service.onGet().subscribe(
            res => {
              this.apiExamFormat = res["results"]
              this.examStaticShow = this.apiExamFormat.filter(val => (val.name == this.examFormat))
              for (let i = 0; i < this.examStaticShow[0].sections.length; i++) {
                this.obj.push({
                  name: this.examStaticShow[0].sections[i].name,
                  easy: 0,
                  medium: 0,
                  hard: 0
                })
              }
              for (let i = 0; i < this.examStaticShow[0].sections.length; i++) {
                this.totalQuestionsCount += this.examStaticShow[0].sections[i].questions;
              }
              this.addQuestion();
              for (let i = 0; i < this.editDatas.questions.length; i++) {

                if (this.editDatas.questions[i].questionType == 'Subjective') {
                  this.customQuestion.push({
                    question: this.editDatas.questions[i].question,
                    difficulity: this.editDatas.questions[i].difficultyLevel.level,
                    type: this.editDatas.questions[i].questionType,
                    section: this.editDatas.questions[i].section.name,
                    source: this.editDatas.questions[i].sourceType
                  })
                  this.upcomminglevel(this.editDatas.questions[i].difficultyLevel, this.editDatas.questions[i].section.name);
                } else {
                  this.customQuestion.push({
                    'question': this.editDatas.questions[i].question,
                    'difficulity': this.editDatas.questions[i].difficultyLevel.level,
                    'type': this.editDatas.questions[i].questionType,
                    'section': this.editDatas.questions[i].section.name,
                    'correctAnswer': this.editDatas.questions[i].correctAnswer,
                    'option_1': this.editDatas.questions[i].options[0].label,
                    'option_2': this.editDatas.questions[i].options[1].label,
                    'option_3': this.editDatas.questions[i].options[2].label,
                    'option_4': this.editDatas.questions[i].options[3].label,
                    'source': this.editDatas.questions[i].sourceType
                  })
                  this.upcomminglevel(this.editDatas.questions[i].difficultyLevel, this.editDatas.questions[i].section.name);
                }
              
              }
            }

          )


        }

      )
    })


    this.service.onGet().subscribe(
      res => {
        this.apiExamFormat = res["results"]
  

      }
    )
    this.service.onBatch().subscribe(
      res => {
        this.apiBatch = res["results"];
       
      }
    )
  }
  // ************Variable Names **************
  apiBatch = []
  apiExamFormat = []
  examName
  examFormat
  batch
  tomorrow = new Date();
  date = new Date();
  passcode


  afterSubmission = false
  timeBound = false

  examStatic = false
  examStaticShow
  excelSection = false
  excelFile = false
  customAddSection = false
  showResult() {
    this.afterSubmission = !this.afterSubmission;
    
  }
  examTimeBound() {
    this.timeBound = !this.timeBound;
    
  }

  uploadQuestion() {
    if (this.examName == undefined || this.examName == '' || this.examFormat == undefined || this.examFormat == '' || this.batch == undefined || this.batch == '' || this.passcode == undefined || this.passcode == '' || this.examStartTime == undefined || this.examStartTime == '' || this.examEndTime == undefined || this.examEndTime == '') {
      this.toastr.error('Please Fill Mandatory Fields', 'Fields Are Empty', {
        timeOut: 2000
      });

    } else {
      this.examStatic = true;
      this.excelSection = true;
    }
  }
  addQuestion() {

    if (this.examName == undefined || this.examName == '' || this.examFormat == undefined || this.examFormat == '' || this.batch == undefined || this.batch == '' || this.passcode == undefined || this.passcode == '' || this.examStartTime == undefined || this.examStartTime == '' || this.examEndTime == undefined || this.examEndTime == '') {
      this.toastr.error('Please Fill Mandatory Fields', 'Fields Are Empty', {
        timeOut: 2000
      });

    } else {
      this.examStatic = true;
      this.excelSection = false;
      this.customAddSection = true;
    }
  }
  totalQuestionsCount = 0
  obj = []
  onChangeFormat(value) {
    this.obj = []

    this.examStaticShow = this.apiExamFormat.filter(val => (val.name == this.examFormat))

    for (let i = 0; i < this.examStaticShow[0].sections.length; i++) {
      this.obj.push({
        name: this.examStaticShow[0].sections[i].name,
        easy: 0,
        medium: 0,
        hard: 0
      })
    }

    this.customQuestion = [];
    this.totalQuestionsCount = 0
 
    for (let i = 0; i < this.examStaticShow[0].sections.length; i++) {
      this.totalQuestionsCount += this.examStaticShow[0].sections[i].questions;
    }
   

  }

  // **************************Excel Upload Process ****************
  data: AOA = [];
  questionExcel = [];
  uploadExcelData = [];
  onFileChange(evt: any) {
    /* wire up file reader */

    const target: DataTransfer = < DataTransfer > (evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {
        type: 'binary'
      });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = < AOA > (XLSX.utils.sheet_to_json(ws, {
        header: 1
      }));
      
      for (let i = 0; i < this.data.length; i++) {
        this.questionExcel.push({

          'question': this.data[i][3],
          'difficulity': this.data[i][1],
          'type': this.data[i][2],
          'section': this.data[i][0],
          'correctAnswer': this.data[i][8],
          'option_1': this.data[i][4],
          'option_2': this.data[i][5],
          'option_3': this.data[i][6],
          'option_4': this.data[i][7],
          'source': "Excel"

        })
      }
      var index = 0;
      this.excelFile = true
      for (let ab in this.questionExcel) {
        if (Number(ab) > 0) {
          index++;
    
          if ((this.questionExcel[ab]["difficulity"] == "Easy" ||
              this.questionExcel[ab]["difficulity"] == "Medium" ||
              this.questionExcel[ab]["difficulity"] == "Hard") && (this.questionExcel[ab]["type"] == "MCQ" || this.questionExcel[ab]["type"] == "Subjective") &&
            (this.questionExcel[ab]["correctAnswer"] == this.questionExcel[ab]["option_1"] ||
              this.questionExcel[ab]["correctAnswer"] == this.questionExcel[ab]["option_2"] ||
              this.questionExcel[ab]["correctAnswer"] == this.questionExcel[ab]["option_3"] ||
              this.questionExcel[ab]["correctAnswer"] == this.questionExcel[ab]["option_4"]) &&
            (this.questionExcel[ab]["section"] == this.examStaticShow[0].sections[0].name)) {
            this.uploadExcelData.push({
              'id': index,
              'noError': 'Yes',
              'question': this.questionExcel[ab]["question"],
              'difficulity': this.questionExcel[ab]["difficulity"],
              'type': this.questionExcel[ab]["type"],
              'section': this.questionExcel[ab]["section"],
              'correctAnswer': this.questionExcel[ab]["correctAnswer"],
              'option_1': this.questionExcel[ab]["option_1"],
              'option_2': this.questionExcel[ab]["option_2"],
              'option_3': this.questionExcel[ab]["option_3"],
              'option_4': this.questionExcel[ab]["option_4"],
              'source': "Excel"
            });

          } else
          if ((this.questionExcel[ab]["difficulity"] == "Easy" ||
              this.questionExcel[ab]["difficulity"] == "Medium" ||
              this.questionExcel[ab]["difficulity"] == "Hard") && (this.questionExcel[ab]["type"] == "Subjective") &&
            (this.questionExcel[ab]["section"] == this.examStaticShow[0].sections[0].name)) {
            this.uploadExcelData.push({
              'id': index,
              'noError': 'Yes',
              'question': this.questionExcel[ab]["question"],
              'difficulity': this.questionExcel[ab]["difficulity"],
              'type': this.questionExcel[ab]["type"],
              'section': this.questionExcel[ab]["section"],
              'correctAnswer': this.questionExcel[ab]["correctAnswer"],
              'option_1': this.questionExcel[ab]["option_1"],
              'option_2': this.questionExcel[ab]["option_2"],
              'option_3': this.questionExcel[ab]["option_3"],
              'option_4': this.questionExcel[ab]["option_4"],
              'source': "Excel"
            });

          } else {
            this.uploadExcelData.push({
              'id': index,
              'noError': 'No',
              'question': this.questionExcel[ab]["question"],
              'difficulity': this.questionExcel[ab]["difficulity"],
              'type': this.questionExcel[ab]["type"],
              'section': this.questionExcel[ab]["section"],
              'correctAnswer': this.questionExcel[ab]["correctAnswer"],
              'option_1': this.questionExcel[ab]["option_1"],
              'option_2': this.questionExcel[ab]["option_2"],
              'option_3': this.questionExcel[ab]["option_3"],
              'option_4': this.questionExcel[ab]["option_4"],
              'source': "Excel"
            });
          }
        }
      }
    };

   
    reader.readAsBinaryString(target.files[0]);

  }

  exportArray = []
  excelFormat() {
    for (let i = 0; i < this.customQuestion.length; i++) {
      this.exportArray.push({
        section: this.customQuestion[i].section,
        difficulity: this.customQuestion[i].difficulity,
        type: this.customQuestion[i].type,
        question: this.customQuestion[i].question,
        option_1: this.customQuestion[i].option_1,
        option_2: this.customQuestion[i].option_2,
        option_3: this.customQuestion[i].option_3,
        option_4: this.customQuestion[i].option_4,
        correctAnswer: this.customQuestion[i].correctAnswer == 'a' ? this.customQuestion[i].option_1 : (this.customQuestion[i].correctAnswer == 'b' ? this.customQuestion[i].option_2 : (this.customQuestion[i].correctAnswer == 'c') ? this.customQuestion[i].option_3 : (this.customQuestion[i].correctAnswer == 'd') ? this.customQuestion[i].option_4 : '')
      })
    }
  }
  sameDownload() {
    let arr = [{
      section: '',
      'difficultyLevel(Easy/Medium/Hard)': '',
      'questionType(MCQ/MAQ/Subjective)': '',
      question: '',
      'option 1': '',
      'option 2': '',
      'option 3': '',
      'option 4': '',
      'correctAnswers(comma-separated-for-MAQ)': ''
    }]
    // array of objects to save in Excel
    let binary_univers = arr

    let binaryWS = XLSX.utils.json_to_sheet(binary_univers);

    // Create a new Workbook
    var wb = XLSX.utils.book_new()

    // Name your sheet
    XLSX.utils.book_append_sheet(wb, binaryWS, 'Binary values')

    // export your excel
    XLSX.writeFile(wb, 'Sample_Question_Format.xlsx');
  }

  export (): void {
    this.excelFormat();
    // array of objects to save in Excel
    let binary_univers = this.exportArray

    let binaryWS = XLSX.utils.json_to_sheet(binary_univers);

    // Create a new Workbook
    var wb = XLSX.utils.book_new()

    // Name your sheet
    XLSX.utils.book_append_sheet(wb, binaryWS, 'Binary values')

    // export your excel
    XLSX.writeFile(wb, `${this.examName}.xlsx`);
  }

  editRowId
  edit(index) {
    this.editRowId = index
  }
  noErrorCheck(event) {
    var index = 0;
    
    for (let ab in this.uploadExcelData) {
      if ((this.uploadExcelData[ab]["difficulity"] == "Easy" ||
          this.uploadExcelData[ab]["difficulity"] == "Medium" ||
          this.uploadExcelData[ab]["difficulity"] == "Hard") && (this.uploadExcelData[ab]["type"] == "MCQ" || this.uploadExcelData[ab]["type"] == "Subjective") &&
        (this.uploadExcelData[ab]["correctAnswer"] == this.uploadExcelData[ab]["option_1"] ||
          this.uploadExcelData[ab]["correctAnswer"] == this.uploadExcelData[ab]["option_2"] ||
          this.uploadExcelData[ab]["correctAnswer"] == this.uploadExcelData[ab]["option_3"] ||
          this.uploadExcelData[ab]["correctAnswer"] == this.uploadExcelData[ab]["option_4"]) &&
        (this.uploadExcelData[ab]["section"] == this.examStaticShow[0].sections[0].name)) {
        this.uploadExcelData[ab]['noError'] = "Yes"
      } else {
        this.uploadExcelData[ab]['noError'] = "No"
      }
    }


  }
  excelDataClear() {
    this.excelFile = false;
    this.excelSection = false;
    this.uploadExcelData = [];
    this.questionExcel = []
  }
  AddExcelData() {
    let checking=false
    
    if (this.totalQuestionsCount == this.customQuestion.length) {

      this.toastr.error('Reached MAximum Question Limit', 'Question Limit', {
        timeOut: 2000
      });
    } else {
      for (let key in this.uploadExcelData) {
        if (this.totalQuestionsCount == this.customQuestion.length) {

          this.toastr.error('Reached MAximum Question Limit', 'Question Limit', {
            timeOut: 2000
          });
        } else
        if (this.uploadExcelData[key].noError == "No") {
          let i = parseInt(key)
          let k = 1 + i
          checking = false
          
          this.toastr.error('Error on Line No'+ k, 'Check Question ', {
            timeOut: 2000
          });
          break;
       
        } else {
         checking=true
        }
      }

 
        if(checking == true)
        {
          for(let key in this.uploadExcelData)
          {
          if (this.uploadExcelData[key].type == "MCQ") {
            this.customQuestion.push({
              question: this.uploadExcelData[key].question,
              difficulity: this.uploadExcelData[key].difficulity,
              type: this.uploadExcelData[key].type,
              section: this.uploadExcelData[key].section,
              correctAnswer: this.uploadExcelData[key].correctAnswer == this.uploadExcelData[key].option_1 ? 'a' : (this.uploadExcelData[key].correctAnswer == this.uploadExcelData[key].option_2 ? 'b' : (this.uploadExcelData[key].correctAnswer == this.uploadExcelData[key].option_3 ? 'c' : (this.uploadExcelData[key].correctAnswer == this.uploadExcelData[key].option_4 ? 'd' : ''))),
              option_1: this.uploadExcelData[key].option_1,
              option_2: this.uploadExcelData[key].option_2,
              option_3: this.uploadExcelData[key].option_3,
              option_4: this.uploadExcelData[key].option_4,
              source: this.uploadExcelData[key].source
            })
            this.excellevel(this.uploadExcelData[key].difficulity, this.uploadExcelData[key].section);
          } else {
            this.customQuestion.push({
              question: this.uploadExcelData[key].question,
              difficulity: this.uploadExcelData[key].difficulity,
              type: this.uploadExcelData[key].type,
              section: this.uploadExcelData[key].section,
              source: this.uploadExcelData[key].source
            })
            this.excellevel(this.uploadExcelData[key].difficulity, this.uploadExcelData[key].section);
          }
    
        }
        this.customAddSection = true;
        this.excelDataClear();
      }
    
    }
  }


  // ********************Custom Add Questions ***********

  customQuestion = [];
  section
  difficultiy
  qType
  question
  option_1
  option_2
  option_3
  option_4
  mcq = 'a'
  easy = 0;
  hard = 0;
  medium = 0;

  upcomminglevel(pp1, sName) {
  
    let pp = pp1.level
    let Sname = sName

    for (let i = 0; i < this.obj.length; i++) {
      if (Sname == this.obj[i].name) {
        if (pp == "Easy") {
          this.obj[i].easy = this.obj[i].easy + 1;
        }
        if (pp == "Medium") {
          this.obj[i].medium = this.obj[i].medium + 1;
        }
        if (pp == "Hard") {
          this.obj[i].hard = this.obj[i].hard + 1;
        }
      }

    }

  }

  excellevel(pp, sName) {

    for (let i = 0; i < this.obj.length; i++) {
      if (sName == this.obj[i].name) {
        if (pp == "Easy") {
          this.obj[i].easy = this.obj[i].easy + 1;
        }
        if (pp == "Medium") {
          this.obj[i].medium = this.obj[i].medium + 1;
        }
        if (pp == "Hard") {
          this.obj[i].hard = this.obj[i].hard + 1;
        }
      }

    }

  }
  level() {


    for (let i = 0; i < this.obj.length; i++) {
      if (this.section == this.obj[i].name) {
        if (this.difficultiy == "Easy") {
          this.obj[i].easy = this.obj[i].easy + 1;
        }
        if (this.difficultiy == "Medium") {
          this.obj[i].medium = this.obj[i].medium + 1;
        }
        if (this.difficultiy == "Hard") {
          this.obj[i].hard = this.obj[i].hard + 1;
        }
      }

    }


  }
  levelDecrease(index) {

    for (let i = 0; i < this.obj.length; i++) {
      if (this.customQuestion[index].section == this.obj[i].name) {
        if (this.customQuestion[index].difficulity == "Easy") {
          this.obj[i].easy = this.obj[i].easy - 1;
        }
        if (this.customQuestion[index].difficulity == "Medium") {
          this.obj[i].medium = this.obj[i].medium - 1;
        }
        if (this.customQuestion[index].difficulity == "Hard") {
          this.obj[i].hard = this.obj[i].hard - 1;
        }
      }

    }

  }
  customAdd() {


    if (this.totalQuestionsCount == this.customQuestion.length) {

      this.toastr.error('Reached MAximum Question Limit', 'Question Limit', {
        timeOut: 2000
      });
    } else {
      if ((this.question == '' || this.question == undefined)) {

        this.toastr.error('Please Fill Question  Fields', 'Fields Are Empty', {
          timeOut: 2000
        });

      } else
      if ((this.section == '' || this.section == undefined)) {
        this.toastr.error('Please Select  Fields', 'Fields Are Empty', {
          timeOut: 2000
        });
      } else
      if ((this.difficultiy == '' || this.difficultiy == undefined)) {
        this.toastr.error('Please Select Difficuility Level Fields', 'Fields Are Empty', {
          timeOut: 2000
        });
      } else
      if ((this.qType == '' || this.qType == undefined)) {
        this.toastr.error('Please Select Section Fields', 'Fields Are Empty', {
          timeOut: 2000
        });
      } else {
        if (this.qType == "Subjective") {
          this.customQuestion.push({
            'question': this.question,
            'difficulity': this.difficultiy,
            'type': this.qType,
            'section': this.section,
            'source': "Manual"
          })
          this.toastr.success('Question Add Successfully', 'Success', {
            timeOut: 2000
          });
          this.level();
          this.clear();
        } else {


          if ((this.option_1 == undefined || this.option_1 == '')) {
            this.toastr.error('Please Fill Option 1 Fields', 'Fields Are Empty', {
              timeOut: 2000
            });
          } else
          if ((this.option_2 == undefined || this.option_2 == '')) {
            this.toastr.error('Please Fill Option 2 Fields', 'Fields Are Empty', {
              timeOut: 2000
            });
          } else
          if ((this.option_3 == undefined || this.option_3 == '')) {
            this.toastr.error('Please Fill Option 3 Fields', 'Fields Are Empty', {
              timeOut: 2000
            });
          } else
          if ((this.option_4 == undefined || this.option_4 == '')) {

            this.toastr.error('Please Fill Option 4 Fields', 'Fields Are Empty', {
              timeOut: 2000
            });
          } else {
            if (this.mcq.length == 0 || this.mcq == undefined) {
              this.toastr.success('Question Add Successfully', 'Success', {
                timeOut: 2000
              });
            } else
            if (this.mcq == '' || this.mcq == undefined) {
              this.toastr.error('Please Select  MCQ Answer Button', 'Fields Are Empty', {
                timeOut: 2000
              });
            } else {
              this.customQuestion.push({
                'question': this.question,
                'difficulity': this.difficultiy,
                'type': this.qType,
                'section': this.section,
                'correctAnswer': this.mcq,
                'option_1': this.option_1,
                'option_2': this.option_2,
                'option_3': this.option_3,
                'option_4': this.option_4,
                'source': "Manual"
              })
              this.toastr.success('Question Add Successfully', 'Success', {
                timeOut: 2000
              });
              this.level();
              this.clear();

            }


          }
        }

      }
    }

  }
  // 
  editSection = false
  indexNumber
  editData(element, i) {

    this.editSection = true
    this.indexNumber = i
    this.question = element.question;
    this.qType = element.type;
    this.difficultiy = element.difficulity;
    this.section = element.section
  
    if (element.type == "MCQ") {
      
      this.mcq = isArray(element.correctAnswer) ? (isArray(element.correctAnswer[0]) ? element.correctAnswer[0][0] : element.correctAnswer) : element.correctAnswer
      this.option_1 = element.option_1
      this.option_2 = element.option_2
      this.option_3 = element.option_3
      this.option_4 = element.option_4
    }
    this.editSection = true

    
  }
  editDone() {
    if (this.question == '' || this.question == undefined) {
      this.toastr.error('Please Fill Question  Fields', 'Fields Are Empty', {
        timeOut: 2000
      });
    } else {

      if ((this.option_1.length == 0) || (this.option_2.length == 0) || (this.option_3.length == 0) || (this.option_4.length == 0)) {
        this.toastr.error('Please Fill MCQ Fields', 'Fields Are Empty', {
          timeOut: 2000
        });
      } else {
        if (this.mcq.length == 0) {
          this.toastr.success('Question Add Successfully', 'Success', {
            timeOut: 2000
          });
        } else {
          for (let key in this.customQuestion) {
            if (this.indexNumber == parseInt(key)) {
            
              this.customQuestion[this.indexNumber].question = this.question;
              this.customQuestion[this.indexNumber].type = this.qType;
              this.customQuestion[this.indexNumber].difficulity = this.difficultiy;
              this.customQuestion[this.indexNumber].section = this.section;
              if (this.customQuestion[this.indexNumber].type == "MCQ") {
                this.customQuestion[this.indexNumber].option_1 = this.option_1;
                this.customQuestion[this.indexNumber].option_2 = this.option_2;
                this.customQuestion[this.indexNumber].option_3 = this.option_3;
                this.customQuestion[this.indexNumber].option_4 = this.option_4;
                this.customQuestion[this.indexNumber].correctAnswer = this.mcq;
              }
              this.editSection = false
              this.toastr.success('Question Edit Successfully', 'Success', {
                timeOut: 2000
              });
              this.clear();
     
            }
          }
        }



      }


    }
  }


  delete(index) {
    const message = `Are you sure you want to do delete?`;
 
    const dialogData = new ConfirmDialogModel("Delete Leave!", message);
 
    const dialogRef = this.dialog.open(DialogSHOWComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
      let result = dialogResult;
	  if(result){
      if (result) {
        this.levelDecrease(index);
        this.customQuestion.splice(index, 1);
        this.toastr.success('Question Delete Successfully', 'Success', {
          timeOut: 2000
        });
      }
	  }
    });
    
  }
  Cancel() {
    this.clear();
    this.editSection = false
  }
  clear() {
    this.question = '';
    this.mcq = 'a';
    this.option_1 = '';
    this.option_2 = '';
    this.option_3 = '';
    this.option_4 = ''
  }
  // ************************Post ****************
  generateUUID() { // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 = (performance && performance.now && (performance.now() * 1000)) || 0; //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16; //random number between 0 and 16
      if (d > 0) { //Use timestamp until depleted
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else { //Use microseconds since page-load if supported
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  addExam() {
    if (this.examName == undefined || this.examName == '' || this.examFormat == undefined || this.examFormat == '' || this.batch == undefined || this.batch == '' || this.passcode == undefined || this.passcode == '' || this.examStartTime == undefined || this.examStartTime == '' || this.examEndTime == undefined || this.examEndTime == '') {
      this.toastr.error('Please Fill Mandatory Fields', 'Fields Are Empty', {
        timeOut: 2000
      });

    } else
    if (this.customQuestion.length <= 0) {
      this.toastr.error('Questions Are not Added', 'Please Add question First', {
        timeOut: 2000
      });
    } else {
      {
        let batch123 = this.apiBatch.filter(res => (res.name == this.batch))

        var obj = {

          questions: [],
          format: this.examStaticShow[0],
          batch: batch123[0],
          name: this.examName,
          
          examPasscode: this.passcode,
          examStartTime: (this.examStartTime),
          examEndTime: (this.examEndTime),
          showResults: this.afterSubmission,
          
          status: "InActive",
          submissions: [],
          sessions: {},
          date: new Date(this.date).toISOString(),
          tenant: this.editDatas.tenant,
          passcodeUpdatedAt: this.editDatas.passcodeUpdatedAt,
          timeBounded: this.timeBound,
          createdAt: this.editDatas.createdAt,
          updatedAt: this.editDatas.updatedAt,
          id: this.editDatas.id

        }
        for (let key in this.customQuestion) {
          if (this.customQuestion[key].correctAnswer == "") {
            obj.questions.push({
              section: {
                name: this.customQuestion[key]["section"]
              },
              difficultyLevel: {
                level: this.customQuestion[key]["difficulity"]
              },
              questionType: this.customQuestion[key]["type"],
              question: this.customQuestion[key]["question"],
              correctAnswer: [this.customQuestion[key]["correctAnswer"]],
              options: [

                {
                  label: this.customQuestion[key]["option_1"],
                  index: 0,
                  answer: true
                },
                {
                  label: this.customQuestion[key]["option_2"],
                  index: 1,
                  answer: false
                },
                {
                  label: this.customQuestion[key]["option_3"],
                  index: 2,
                  answer: false
                },
                {
                  label: this.customQuestion[key]["option_4"],
                  index: 3,
                  answer: false
                },
              ],
              sourceType: this.customQuestion[key]["source"],
              uid: this.generateUUID()
            })
          } else {
   
            if (this.customQuestion[key].correctAnswer == 'a') {
              obj.questions.push({
                section: {
                  name: this.customQuestion[key]["section"]
                },
                difficultyLevel: {
                  level: this.customQuestion[key]["difficulity"]
                },
                questionType: this.customQuestion[key]["type"],
                question: this.customQuestion[key]["question"],
                correctAnswer: [this.customQuestion[key]["correctAnswer"]],
                options: [

                  {
                    label: this.customQuestion[key]["option_1"],
                    index: 0,
                    answer: true
                  },
                  {
                    label: this.customQuestion[key]["option_2"],
                    index: 1,
                    answer: false
                  },
                  {
                    label: this.customQuestion[key]["option_3"],
                    index: 2,
                    answer: false
                  },
                  {
                    label: this.customQuestion[key]["option_4"],
                    index: 3,
                    answer: false
                  },
                ],
                sourceType: this.customQuestion[key]["source"],
                uid: this.generateUUID()
              })
            } else if (this.customQuestion[key]["correctAnswer"] == 'b') {
              obj.questions.push({
                section: {
                  name: this.customQuestion[key]["section"]
                },
                difficultyLevel: {
                  level: this.customQuestion[key]["difficulity"]
                },
                questionType: this.customQuestion[key]["type"],
                question: this.customQuestion[key].question,
                correctAnswer: [this.customQuestion[key]["correctAnswer"]],
                options: [

                  {
                    label: this.customQuestion[key]["option_1"],
                    index: 0,
                    answer: false
                  },
                  {
                    label: this.customQuestion[key]["option_2"],
                    index: 1,
                    answer: true
                  },
                  {
                    label: this.customQuestion[key]["option_3"],
                    index: 2,
                    answer: false
                  },
                  {
                    label: this.customQuestion[key]["option_4"],
                    index: 3,
                    answer: false
                  },
                ],
                sourceType: this.customQuestion[key]["source"],
                uid: this.generateUUID()
              })
            } else if (this.customQuestion[key]["correctAnswer"] == 'c') {
              obj.questions.push({
                section: {
                  name: this.customQuestion[key]["section"]
                },
                difficultyLevel: {
                  level: this.customQuestion[key]["difficulity"]
                },
                questionType: this.customQuestion[key]["type"],
                question: this.customQuestion[key].question,
                correctAnswer: [this.customQuestion[key]["correctAnswer"]],
                options: [

                  {
                    label: this.customQuestion[key]["option_1"],
                    index: 0,
                    answer: false
                  },
                  {
                    label: this.customQuestion[key]["option_2"],
                    index: 1,
                    answer: false
                  },
                  {
                    label: this.customQuestion[key]["option_3"],
                    index: 2,
                    answer: true
                  },
                  {
                    label: this.customQuestion[key]["option_4"],
                    index: 3,
                    answer: false
                  },
                ],
                sourceType: this.customQuestion[key]["source"],
                uid: this.generateUUID()
              })
            } else if (this.customQuestion[key]["correctAnswer"] == 'd') {
              obj.questions.push({
                section: {
                  name: this.customQuestion[key]["section"]
                },
                difficultyLevel: {
                  level: this.customQuestion[key]["difficulity"]
                },
                questionType: this.customQuestion[key]["type"],
                question: this.customQuestion[key].question,
                correctAnswer: [this.customQuestion[key]["correctAnswer"]],
                options: [

                  {
                    label: this.customQuestion[key]["option_1"],
                    index: 0,
                    answer: false
                  },
                  {
                    label: this.customQuestion[key]["option_2"],
                    index: 1,
                    answer: false
                  },
                  {
                    label: this.customQuestion[key]["option_3"],
                    index: 2,
                    answer: false
                  },
                  {
                    label: this.customQuestion[key]["option_4"],
                    index: 3,
                    answer: true
                  },
                ],
                sourceType: this.customQuestion[key]["source"],
                uid: this.generateUUID()
              })
            } else if (this.customQuestion[key]["type"] == "Subjective") {
              obj.questions.push({
                "section": {
                  "name": this.customQuestion[key]["section"]
                },
                "difficultyLevel": {
                  "level": this.customQuestion[key]["difficulity"]
                },
                "questionType": this.customQuestion[key]["type"],
                "question": this.customQuestion[key].question,
                "sourceType": this.customQuestion[key]["source"],
                "uid": this.generateUUID()
              })
            }
          }

        }
   
   
        this.service.updateExam(obj).subscribe(
          res => {

            this.rout.navigate(['/Exam/view'])
          },
          err => console.log(err)
        )

      }
    }
  }

  // ********************** Date & TimeRanges

  @ViewChild('popoverRef', null) private _popoverRef: PopoverDirective;
  @ViewChild('popoverRef2', null) private __popoverRef: PopoverDirective;
  time: Date;
  date1: Date;
  isDateVisible: boolean = true;
  isMeridian: boolean = true;
  examStartTime

  timefunction() {

    if (this.examStartTime) {
      this.time = this.date1 = this.examStartTime;
      return;
    }
    this.date1 = this.time = new Date();
  }

  timefunction2() {

    if (this.examEndTime) {
      this.time2 = this.date2 = this.examEndTime;
      return;
    }
    this.date2 = this.time2 = new Date();
  }


  updateTime() {
    if (this.time) {
      this.examStartTime = DateTime.getDateTime(this.date1, this.time);
    }
  }


  close() {
    this._popoverRef.hide();
  }

  now() {
    this.examStartTime = DateTime.now(this.date1);
    this.time = this.examStartTime;

  }


  Tclear() {

    this.time = void 0;
    this.date1 = void 0;
    this.examStartTime = void 0;
  }

  //  ****************2
  examEndTime
  time2: Date
  date2: Date
  updateTime2() {
    if (this.time2) {
      this.examEndTime = DateTime.getDateTime(this.date2, this.time2);
    }
  }


  close2() {
    this.__popoverRef.hide();
  }

  now2() {
    this.examEndTime = DateTime.now(this.date2);
    this.time2 = this.examEndTime;

  }


  Tclear2() {
   
    this.time2 = void 0;
    this.date2 = void 0;
    this.examEndTime = void 0;
  }
}
