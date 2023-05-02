import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { AddNewHTTPService } from '../../services/add-new-http.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { ToasterService } from '../../Toast/toaster.service';
import {ConfirmDialogModel, DialogSHOWComponent } from '../../dialog-show/dialog-show.component';
import { MatDialog } from '@angular/material';


export interface questionTable {
  Question:string;
  QuestionType:string;
  ExamType:string;
  options;
  checkboxButtons;
  radioButtons;
  difficultyLevel;
  Topic:string;
  Chapter:string;
  id:string;
  correctAnswers;
  subCourse:string;
  Course:string;
  Subject:string;
  tenant:string;
  createdAt:string;
  updatedAt:string;
}

@Component({
  selector: 'app-course-mgmt-questions',
  templateUrl: './course-mgmt-questions.component.html',
  styleUrls: ['./course-mgmt-questions.component.css']
})
export class CourseMgmtQuestionsComponent implements OnInit {

  // if true; will open add questions dialog
  addEditable;
  editable;
  editRow;


  questionList;

  // courses
  selectedCourse;
  courseName;
  
  // Subjects
  subjectName;
  selectedSubject;

  // chapter
  chapterName;
  selectedChapter;
  
  // Topic
  topicName;
  selectedTopic;
  
  // Question Type
  selectedQuestionType;
  questionName = ["MCQ (Single Choice)", "MCQ (Multiple Choice)", "True/False", "Subjective"];

  // dufficulty
  selectedDifficulty;
  difficultyName = ["Easy", "Medium", "Hard", "Expert"];

  // Exam Type
  selectedExamType = [];
  examTypeNames = ["Quiz", "Interview", "Practical", "Certification", "Pre-Exam-Preparation"];

  // CKEditor content
  questionContent;

  explanation;

  // picture
  img;
  imgPreview;

  reference;
  weightage;

  radioSelector=false;
  checkSelector=false;
  booleanSelector=false;
  subjectiveSelector=false;


  //MCQ Single
  correctMCQSingleOption = [];
  MCQSingleAddedOption;
  MCQSingleList = [];

  //MCQ Multiple
  correctMCQMultipleOption;
  MCQMultipleAddedOption;
  MCQMultipleList = [];

  // True/False
  correctBooleanOption;

  // subjective answer
  correctSubjective;
  
  // array for radio buttons payload
  radioButtonsArray = [];

  // array for check box payload
  checkBoxArray = [];


  currentSelectedExamType;
  courseData
  idString

  tableData: questionTable[] = [];

  displayedColumns: string[] = ['Questions', 'Question Type', 'Exam Type', 'Topic','Chapter','Subject','SubCourse','Course', "Action"];
  dataSource = new MatTableDataSource<questionTable>(this.tableData);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

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
          this.httpServe.getQuestions(this.idString).subscribe(response=>{
      
            this.questionList = response["results"];
      
            // **************
      
            for(let i = 0; i < this.questionList.length; i++ ){
              this.tableData.push(this.createNewEntry(i));
            }
      
            // **************
      
            this.dataSource = new MatTableDataSource(this.tableData);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }, err=>{
            this.toast.errorstatus0();
          });
          

        }, err=>{
          this.toast.errorstatus0();
        })
    }, err=>{
      this.toast.errorstatus0();
    })

    

    this.httpServe.getCourse().subscribe(data=>{
      this.courseName = data["results"];
    }, err=>{
      this.toast.errorstatus0();
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createNewEntry(index: number): questionTable  {

    // create a row for mat table
    return {
      'Question':this.removeTagFromQuestion(this.questionList[index]['question']),
      'QuestionType':this.questionList[index]["questionType"],
      'ExamType':this.questionList[index]['examType'],
      'options': this.questionList[index]['texts'],
      'checkboxButtons':this.questionList[index]['checkboxButtons'],
      'radioButtons':this.questionList[index]['radioButtons'],
      'correctAnswers': this.questionList[index]['correctAnswers'],
      'difficultyLevel': this.questionList[index]['difficultyLevel'],
      
      'Topic':this.questionList[index]["topic"],
      'Chapter':this.questionList[index]["chapter"],
      'Subject':this.questionList[index]["subject"],
      'Course':this.questionList[index]["course"],
      'subCourse':this.questionList[index]["subcourse"]?this.questionList[index]["subcourse"]:"N/A",

      'id': this.questionList[index]["id"],
      'tenant':this.questionList[index]["tenant"],
      'createdAt':this.questionList[index]["createdAt"],
      'updatedAt':this.questionList[index]["updatedAt"]
    }
  }

  openAddQuestion(){
    this.addEditable = "true";
  }

  closeDialog(){
    this.addEditable = "false";
    this.editable = "false";
    this.selectedCourse = undefined;
    this.selectedSubject = undefined;
    this.selectedChapter = undefined;
    this.selectedTopic = undefined;
    this.questionContent = undefined;
    this.reference = undefined;
    this.weightage = undefined;
  }

  selectSubject(){
    this.httpServe.getSubject(this.selectedCourse["id"], false).subscribe(response=>{
      this.subjectName = response["results"];
    }, err=>{
      this.toast.errorstatus0();
    })
  }

  selectChapter(){
    this.httpServe.getChapterForTopics(this.selectedSubject["id"]).subscribe(response=>{
      this.chapterName = response["results"];
    }, err=>{
      this.toast.errorstatus0();
    })
  }

  selectTopic(){
    this.httpServe.getTopicsForQuestions(this.selectedChapter["id"]).subscribe(response=>{
      this.topicName = response["results"];
    }, err=>{
      this.toast.errorstatus0();
    })
  }

  uploadImg(event: any) {
    // uploads and previews image
    this.img = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.imgPreview = reader.result;
    };
    reader.readAsDataURL(this.img);
  }

  removeImg(){
    this.img = undefined;
    this.imgPreview = undefined;
  }


  changeQuestionType(){
    if(this.selectedQuestionType == "MCQ (Single Choice)"){
      this.radioSelector = true;
      this.checkSelector = false;
      this.booleanSelector = false;
      this.subjectiveSelector = false;
    }
    else if(this.selectedQuestionType == "MCQ (Multiple Choice)"){
      this.radioSelector = false;
      this.checkSelector = true;
      this.booleanSelector = false;
      this.subjectiveSelector = false;
    }
    else if(this.selectedQuestionType == "True/False"){
      this.radioSelector = false;
      this.checkSelector = false;
      this.booleanSelector = true;
      this.subjectiveSelector = false;
    }
    else if(this.selectedQuestionType == "Subjective"){
      this.radioSelector = false;
      this.checkSelector = false;
      this.booleanSelector = false;
      this.subjectiveSelector = true;
    }  
  }

  addMCQSingleOption(){
    if(!this.MCQSingleList.includes(this.MCQSingleAddedOption) && this.MCQSingleAddedOption!=undefined){
      this.MCQSingleList.push(this.MCQSingleAddedOption);
      this.MCQSingleAddedOption = undefined;
    }
  }

  addMCQMultipleOption(){
    if(!this.MCQMultipleList.includes(this.MCQMultipleAddedOption) && this.MCQMultipleAddedOption!=undefined)
    {
      this.MCQMultipleList.push(this.MCQMultipleAddedOption);
      this.MCQMultipleAddedOption = undefined;
    }


  }

  correctMCQMultipleOptionSelect(event:any){
    this.correctMCQMultipleOption.push(event.target.options);
  }

  selectExamType(){
    this.selectedExamType.push(this.currentSelectedExamType);
  }

  removeExamType(selected){
    for (let nameIndex = 0; nameIndex < this.selectedExamType.length; nameIndex++) {
      if (this.selectedExamType[nameIndex] === selected) {
        this.selectedExamType.splice(nameIndex, 1);
      }
    }
  }



  addQuestion(){

    if(this.selectedQuestionType==undefined){
      this.toast.errorfixhead("Question Type cannot be empty")
      return;
    }
    if(this.selectedCourse==undefined){
      this.toast.errorfixhead("Course cannot be empty")
      return;
    }
    if(this.selectedSubject==undefined){
      this.toast.errorfixhead("Subject cannot be empty")
      return;
    }
    if(this.selectedTopic==undefined){
      this.toast.errorfixhead("Topic cannot be empty")
      return;
    }
    if(this.selectedExamType==undefined){
      this.toast.errorfixhead("Exam Type cannot be empty")
      return;
    }

    // create array of exam type for the payload
    var examTypeArray = [];
    for(let e in this.selectedExamType){
      examTypeArray.push({"name":this.selectedExamType[e]});
    }

    // create object for mcq options
    var texts = {};
    Object.assign(texts, this.MCQSingleList);


    // if question type is MCQ Single
    if(this.selectedQuestionType == "MCQ (Single Choice)"){
      this.radioButtonsArray = [];
      // create an array of objects of the following type
      for(let i in this.MCQSingleList){
        this.radioButtonsArray.push({"index":parseInt(i), "correctAnswers":"","checked":false});
      }

      // get the index of the correct option
      var indexOFCorrectMCQSingle = this.MCQSingleList.indexOf(this.correctMCQSingleOption);
      // update the object at the correct index

      for(let j in this.radioButtonsArray){
        if(this.radioButtonsArray[j]["index"] == indexOFCorrectMCQSingle){
          this.radioButtonsArray[j]["correctAnswers"] = this.correctMCQSingleOption;
          this.radioButtonsArray[j]["checked"] = true;

        }
      }
    }// end if
    else if(this.selectedQuestionType == "MCQ (Multiple Choice)"){
      // create an array of objects of the following type
      for(let i in this.MCQMultipleList){
        this.checkBoxArray.push({"index":i, "correctAnswers":"","checked":false});
      }

      for(let option in this.correctMCQMultipleOption){
        // get the index of the correct option
        var indexOFCorrectMCQMultiple = this.MCQMultipleList.indexOf(this.correctMCQMultipleOption[option]);
        // update the object at the correct index

        for(let j in this.checkBoxArray){
          if(this.checkBoxArray[j]["index"] == indexOFCorrectMCQMultiple){
            this.checkBoxArray[j]["correctAnswers"] = this.correctMCQMultipleOption[option];
            this.checkBoxArray[j]["checked"] = true;

          }
        }
      } 
    }// end if


    var payload = {
    "questionType":this.selectedQuestionType,
    "texts":texts,
    "checkboxButtons":(this.checkBoxArray.length == 0)?[
      {"index":0, "correctAnswers":""},
      {"index":1, "correctAnswers":""},
      {"index":2, "correctAnswers":""},
      {"index":3, "correctAnswers":""}
    ]:this.checkBoxArray,

    "radioButtons":(this.radioButtonsArray.length == 0)?[
      {"index":0, "correctAnswers":""},
      {"index":1, "correctAnswers":""},
      {"index":2, "correctAnswers":""},
      {"index":3, "correctAnswers":""}
    ]:this.radioButtonsArray,

    "difficultyLevel":this.selectedDifficulty,
    "course":this.selectedCourse,
    "subject":this.selectedSubject,
    "chapter":this.selectedCourse,
    "topic":this.selectedTopic,
    "examType":examTypeArray,
    "correctAnswers":(this.selectedQuestionType == "True/False")?this.correctBooleanOption:this.correctSubjective,
    "expln":this.explanation,
    "reference":this.reference,
    "weightage":this.weightage,
    "question":this.questionContent}

    // post the payload
    this.httpServe.postQuestion(payload).subscribe(response=>{
      this.toast.successfixhead("Question added Successfully");
      this.reload()
    },err=>{
      this.toast.errorfixhead("Error adding question");
    })
  }

  editQuestion(){

    var putPayLoad = {
      "questionType":this.selectedQuestionType,
      "texts":this.editRow["options"],
      "checkboxButtons":this.editRow["checkboxButtons"],
      "radioButtons":this.editRow["radioButtons"],
      "difficultyLevel":this.selectedDifficulty,
      "course":this.selectedCourse,
      "subject":this.selectedSubject,
      "chapter":this.editRow["Chapter"],
      "topic":this.selectedTopic,
      "examType":this.selectedExamType,
      "correctAnswers":this.editRow["correctAnswers"],
      "expln":this.explanation,
      "reference":this.reference,
      "weightage":this.weightage,
      "question":this.questionContent,
      "tenant":this.editRow["tenant"],
      "createdAt":this.editRow["createdAt"],
      "updatedAt":new Date(),
      "id":this.editRow["id"]
    };

    if(this.selectedQuestionType==undefined){
      this.toast.errorfixhead("Question Type cannot be empty")
      return;
    }
    if(this.selectedCourse==undefined){
      this.toast.errorfixhead("Course cannot be empty")
      return;
    }
    if(this.selectedSubject==undefined){
      this.toast.errorfixhead("Subject cannot be empty")
      return;
    }
    if(this.selectedTopic==undefined){
      this.toast.errorfixhead("Topic cannot be empty")
      return;
    }
    if(this.selectedExamType==undefined){
      this.toast.errorfixhead("Exam Type cannot be empty")
      return;
    }

    this.httpServe.updateQuestion(putPayLoad).subscribe(response=>{
      this.toast.successfixhead("Question updated Successfully");
      this.reload()
    },err=>{
      this.toast.errorfixhead("Error updating Course");
    })

  }

  eventAction(row, action){
    if(action == 'delete'){
      const message = `Are you sure you want to do delete?`;
 
      const dialogData = new ConfirmDialogModel("Delete Admission?", message);
      
      const dialogRef = this.dialog.open(DialogSHOWComponent, {
        maxWidth: "400px",
        data: dialogData
      });
    
      dialogRef.afterClosed().subscribe(dialogResult => {
	      if(dialogResult == true){
          this.httpServe.deleteQuestion(row["id"]).subscribe(response=>{
            this.toast.successfixhead("Question deleted Successfully");
            for(let i = 0 ; i<this.dataSource.data.length; i++){
              if(this.dataSource.data[i] == row){
                this.dataSource.data.splice(i,1);
                this.dataSource._updateChangeSubscription();
              }
            }
          },err=>{
            this.toast.errorfixhead("Error deleting Course");
          });
        }
      })
    }
    else if(action == 'edit'){
      this.selectedCourse = row["Course"];
      this.selectedSubject = row["Subject"];
      this.selectedChapter = row["Chapter"];
      this.selectTopic();
      this.selectedQuestionType = this.removeTagFromQuestion(row["QuestionType"]);
      this.questionContent = row["Question"];
      this.editable = 'true';
      this.addEditable = 'false';
      this.editRow = row;
    }
  }  

  removeTagFromQuestion(text:string){
    return text.replace("<p>", "").replace("</p>", "");
  }

  reload(){
    this.httpServe.getQuestions(this.idString).subscribe(response=>{
      this.tableData = []
      this.questionList = response["results"];

      // **************

      for(let i = 0; i < this.questionList.length; i++ ){
        this.tableData.push(this.createNewEntry(i));
      }

      // **************

      this.dataSource = new MatTableDataSource(this.tableData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err=>{
      this.toast.errorstatus0();
    });
  }

}
