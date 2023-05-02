import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../../services/apidata.service';
import { ToastrService } from 'ngx-toastr';
import {Router, ActivatedRoute, ParamMap} from '@angular/router'
import {ConfirmDialogModel, DialogSHOWComponent } from '../../dialog-show/dialog-show.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-edit-feedback',
  templateUrl: './edit-feedback.component.html',
  styleUrls: ['./edit-feedback.component.css']
})
export class EditFeedbackComponent implements OnInit {
  public question:string;
  public question1:string;
  public title;
  public select:string;
  public select1:string;
  batch
  ques
  sele
  content1:boolean=true;
  content2:boolean=false;
  new_results = [];
  feed = {}
  options =[]
  questions=[]




  constructor(public serve : ApiDataService, 
              private dialog : MatDialog,
              private route : ActivatedRoute,
              private toastr: ToastrService,
              private router : Router) {
    
  }


  ngOnInit() {
    this.onCall();
    this.title=""
    this.select=""
    this.select1=""
    this.question=""
    this.question1=""

    this.serve.batchdata().subscribe((data) => {

      for(let key in data["results"]){
        this.new_results.push(data["results"][key])
      }
      },err=>{
        this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
          timeOut: 2000
        });
      }
      )

    this.questions=[]
    for(let i=0;i<4 ;i++)
    {
      this.optionss();
    }
    if(this.options.length <= 4)
    {
      this.disable = true;
    
    }
  }
onCall()
{
  this.route.paramMap.subscribe((params : ParamMap)=>{
    this.id= params.get('id')
    this.serve.editService(this.id).subscribe(
      res=>{
        this.results=res["results"][0];
        this.title=this.results.feedbackTitle;
         this.batch=this.results.batch.name
        this.questions = this.results.questions
      }
    )
  })
}
id
results
editOption=false
  editOptions
  editType =false
 edit(key , index){
  
  if(this.editOption == true)
  {
    this.toastr.error('Please First Finish Update', 'Update Pending', {
      timeOut: 2000
    });
  }
  else
  {
    this.editOption=true
    if(key['questionType'] == 'Option')
    {
      this.editType= true
      this.editOptions = key['options']
    }
    for(let i of this.questions){
     key['index'] = this.questions.indexOf(i)
   }
 
    this.question= key['question']
    this.select = key['questionType']
 
     this.questions.splice(index,1)
 
  }
    
 }
 editOptionIncrease()
 {
  this.editOptions.push({
    "index":this.options.length,
      "answer":false
  })
 }

 editOptionDecrease()
 {
  
    this.editOptions.pop()
   
 }


 delete(key){
  const message = `Are you sure you want to delete?`;
 
  const dialogData = new ConfirmDialogModel("Delete Question!", message);

  const dialogRef = this.dialog.open(DialogSHOWComponent, {
    maxWidth: "400px",
    data: dialogData
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
    let result = dialogResult;

if(result) {

   if(this.questions.length >0 ){
    for(let i of this.questions){
      key['index'] = this.questions.indexOf(i)
    }
   }
  this.questions.splice(key,1)

}
  })

 }

 update(){
 let ques={}
 let temp=false
 if(this.select ==""){
   this.toastr.error('Please Select Question Type', 'Question Type Not Selected', {
     timeOut: 2000
   });
 }
 else if(this.question ==""){
   this.toastr.error('Please Enter a Question', 'No Question Entered', {
     timeOut: 2000
   });
 }
 else
 {
   if(this.select == "Option")
   {
     
     for(let i=0;i<this.editOptions.length ;i++)
     {
       if(this.editOptions[i].hasOwnProperty('label'))
       {
         this.check = true
       }
       else
       {
        this.check = false
         this.toastr.error('Please Enter Option', 'Option Empty', {
           timeOut: 2000
         });
         break;
       }
     }
     if(this.check == true)
     {
       ques={"questionType":this.select, 
       "question":this.question,
       "id" : this.generateUUID(),
       "options" : this.editOptions,
       "index" : this.questions.length
     }
     this.questions.push(ques);
     this.clear()
     this.check = false
     this.editOption=false
     this.editType=false;
     this.editOptions=[]
     }
   }
   else
   {
     
     ques={"questionType":this.select, 
     "question":this.question,
     "id" : this.generateUUID(),
     "index" : this.questions.length
   }
   this.questions.push(ques);
   this.clear()
   this.editOption=false
   this.editType=false;

   }
 }


 }

check = false
clear()
{
  this.select ='';
  this.question = ''
  this.options=[]
  for(let i=0;i<4 ;i++)
  {
    this.optionss();
  }
}
  add(){
    let ques={}
    let temp=false
    if(this.select ==""){
      this.toastr.error('Please Select Question Type', 'Question Type Not Selected', {
        timeOut: 2000
      });
    }
    else if(this.question ==""){
      this.toastr.error('Please Enter a Question', 'No Question Entered', {
        timeOut: 2000
      });
    }
    else
    {
      if(this.select == "Option")
      {
        
        for(let i=0;i<this.options.length ;i++)
        {
          if(this.options[i].hasOwnProperty('label'))
          {
            this.check = true
          }
          else
          {
           this.check = false
            this.toastr.error('Please Enter Option', 'Option Empty', {
              timeOut: 2000
            });
            break;
          }
        }
        if(this.check == true)
        {
          ques={"questionType":this.select, 
          "question":this.question,
          "id" : this.generateUUID(),
          "options" : this.options,
          "index" : this.questions.length
        }
        this.questions.push(ques);
        this.clear()
        this.check = false
        }
      }
      else
      {
        
        ques={"questionType":this.select, 
        "question":this.question,
        "id" : this.generateUUID(),
        "index" : this.questions.length
      }
      this.questions.push(ques);
      this.clear()

      }
    }

    
    
}



submit(){


  if(this.title ==""){
    this.toastr.error('Please Enter Feedback Title', 'Feedback Title is Empty', {
      timeOut: 2000
    });
  }
  else if(this.batch ==""){
    this.toastr.error('Please Select Batch', 'No Batch Selected', {
      timeOut: 2000
    });
  }

  else{
  const arr = this.new_results.filter(c=>(c.name==this.batch))
  let obj ={
    "questions":this.questions,
    "feedbacks":[ ],
    "feedbackFor":"Batch",
    "feedbackTitle":this.title,
    "batch":arr[0],
    "status":"Inactive",
    "answers":{ },
    "tenant":this.results.tenant,
    "createdAt":this.results.createdAt,
    "updatedAt":new Date().toISOString(),
    "id":this.results.id
 }

     this.serve.put(obj).subscribe(
       res=>{
       this.toastr.success('Feedback Added Successfully', 'Success', {
            timeOut: 2000
          })
          this.router.navigate(['Feedback/feedback-view'])

       },
       err=>{
        this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
          timeOut: 2000
        });
       }
     )




        }
        
}


  
  optionss()
  {
    this.options.push({
      "index":this.options.length,
      "answer":false
    })
  }
  disable=false
  option_1
  removeOptions()
  {
    if(this.options.length <= 4)
    {
      this.disable = true;
      alert("Minimum 4 Option Required")
    }
    else
    {
      this.options.pop()
      for(let key of this.options){
        key['index'] = this.options.indexOf(key)
      }
    }
  }


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
}
