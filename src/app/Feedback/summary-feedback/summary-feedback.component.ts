import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../../services/apidata.service';
import {Router} from '@angular/router'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-summary-feedback',
  templateUrl: './summary-feedback.component.html',
  styleUrls: ['./summary-feedback.component.css']
})
export class SummaryFeedbackComponent implements OnInit {

  arr3:any=[];
  
  rating_ques=[]
  rating_div : boolean =false;
  hidden_ques;
 

ques_ans=[]
ques_ans2=[]

rating1=[]
rating2=[]
rating3=[]
rating4=[]
rating5=[]

per1:any
per2:any
per3:any
per4:any
per5:any


rating1_table : boolean =false;
rating2_table : boolean =false;
rating3_table : boolean =false;
rating4_table : boolean =false;
rating5_table : boolean =false;



ques_ans_obj ={"user":{},"ques":[],"ans":[]}
ques_ans_obj2 ={"user":{},"ques":{},"ans":{}}



  constructor(private service: ApiDataService,
              private router : Router,
              private modalService: NgbModal,
              private toastr : ToastrService) { }

  ngOnInit() {
    if(this.service.arr3.length==0){
      this.router.navigate(['Feedback/feedback-view'])
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });
    }
    else{
    this.summary();
    }
  }


  closeResult = '';
    open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title' ,size: 'lg'}).result.then((result) => {
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



  summary(){
    

    this.arr3=this.service.arr3;
    this.ques_ans=this.service.ques_ans;

  }

  onChangeQues(value){

    this.rating_div=true;
    this.rating1=[]
    this.rating2=[]
    this.rating3=[]
    this.rating4=[]
    this.rating5=[]
  
    for(let key in this.ques_ans){
  
      this.ques_ans_obj2 ={"user":{},"ques":{},"ans":{}}
      
      this.ques_ans_obj2.user=this.ques_ans[key]['user']
      for(let q in this.ques_ans[key]['ques']){
        
        if(this.ques_ans[key]['ques'][q]['id']==value){
          this.hidden_ques=this.ques_ans[key]['ques'][q]['question']
      this.ques_ans_obj2.ques=this.ques_ans[key]['ques'][q]
  
          if(this.ques_ans[key]['ans'][q]['answer']==1){
          this.ques_ans_obj2.ans=this.ques_ans[key]['ans'][q]
  
            this.rating1.push(this.ques_ans_obj2)
          }
          if(this.ques_ans[key]['ans'][q]['answer']==2){
            this.ques_ans_obj2.ans=this.ques_ans[key]['ans'][q]
  
            this.rating2.push(this.ques_ans_obj2)
  
            }
            if(this.ques_ans[key]['ans'][q]['answer']==3){
              this.ques_ans_obj2.ans=this.ques_ans[key]['ans'][q]
  
              this.rating3.push(this.ques_ans_obj2)
  
              }
              if(this.ques_ans[key]['ans'][q]['answer']==4){
                this.ques_ans_obj2.ans=this.ques_ans[key]['ans'][q]
  
                this.rating4.push(this.ques_ans_obj2)
  
                }
                if(this.ques_ans[key]['ans'][q]['answer']==5){
                  this.ques_ans_obj2.ans=this.ques_ans[key]['ans'][q]
  
                  this.rating5.push(this.ques_ans_obj2)
        
                  }
        }
      
      }
    }
    this.per1=((this.rating1.length/this.ques_ans.length)*100).toFixed() + "%"
    this.per2=((this.rating2.length/this.ques_ans.length)*100).toFixed() + "%"
    this.per3=((this.rating3.length/this.ques_ans.length)*100).toFixed() + "%"
    this.per4=((this.rating4.length/this.ques_ans.length)*100).toFixed() + "%"
    this.per5=((this.rating5.length/this.ques_ans.length)*100).toFixed() + "%"
    
    if(this.ques_ans.length==0){
      this.per1=0 + "%"
      this.per2=0 + "%"
      this.per3=0 + "%"
      this.per4=0 + "%"
      this.per5=0 + "%"
    }
  }
  
  
  
  ratin1(){
    this.rating1_table=true;
    this.rating2_table=false;
    this.rating3_table=false;
    this.rating4_table=false;
    this.rating5_table=false;
  
  }
  
  
  ratin2(){
    this.rating1_table=false;
    this.rating2_table=true;
    this.rating3_table=false;
    this.rating4_table=false;
    this.rating5_table=false;
  
  }
  ratin3(){
    this.rating1_table=false;
    this.rating2_table=false;
    this.rating3_table=true;
    this.rating4_table=false;
    this.rating5_table=false;
  
  }
  ratin4(){
    this.rating1_table=false;
    this.rating2_table=false;
    this.rating3_table=false;
    this.rating4_table=true;
    this.rating5_table=false;
  
  }
  ratin5(){
    this.rating1_table=false;
    this.rating2_table=false;
    this.rating3_table=false;
    this.rating4_table=false;
    this.rating5_table=true;
  
  }

  close(){
    this.modalService.dismissAll();
  }
}

