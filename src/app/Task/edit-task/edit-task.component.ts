import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup, Validators} from '@angular/forms';
import {TaskServiceService} from '../../services/task-service.service'
import {Router} from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';


import {DatePipe} from '@angular/common'


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  
  type=[]
  status = []
  priority = []
  team_members =[]
  label=[]
  project=[]

  selectedFile: File;



  Task : FormGroup

  constructor(private taskService : TaskServiceService,
              private datePipe : DatePipe,
              private router : Router,
              private toastr: ToastrService,
              private window : Location) { }

  ngOnInit() {
    this.Task= new FormGroup({
      project : new FormControl('', Validators.required),
      status : new FormControl('', Validators.required),
      label : new FormControl('', Validators.required),
      summary : new FormControl('', Validators.required),
      team_member : new FormControl('', Validators.required),
      st_date : new FormControl('', Validators.required),
      priority : new FormControl('', Validators.required),
      type : new FormControl('', Validators.required),
      desc : new FormControl(),
      desig : new FormControl('', Validators.required),
      time : new FormControl(),
      en_date : new FormControl('', Validators.required)
    })

    this.label=[]
    this.edit();

  }


  edit(){

    if(this.taskService.taskDetails.length==0){
      this.router.navigate(['Task/viewtask'])
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });
    }
    else{
      

    let row = this.taskService.taskDetails[0];

    

    this.taskService.getTaskConfig().subscribe(
      (res)=>{

        
        for(let key in res['results']){
         
        if(res['results'][key]['type']=="Task" && res['results'][key]['configType']=="Type"){
          this.type.push(res['results'][key])
        }
        else if(res['results'][key]['type']=="Task" && res['results'][key]['configType']=="Status"){
          this.status.push(res['results'][key])
        }
        else if(res['results'][key]['type']=="Task" && res['results'][key]['configType']=="Priority"){
          this.priority.push(res['results'][key])
        }
      }
        },err=>{
          this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
            timeOut: 2000
          });
        }

      
    )


    this.taskService.getProject().subscribe(res=>{
      for(let key in res['results']){
        if(res['results'][key]['status']=="Active"){
             this.project.push(res['results'][key])

        }
      }
    },err=>{
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });
    }
    )
    


    this.taskService.getTeamMember().subscribe(
      (res)=>{
        for(let key in res['results']){
          this.team_members.push(res['results'][key])
        }
      },err=>{
        this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
          timeOut: 2000
        });
      }
    )



    const st_month = new Date(row['date']['startDate']).getMonth() 
    const st_day = new Date(row['date']['startDate']).getDate() 
    const st_date = st_day + "-" + (st_month+1) + "-" + new Date(row['date']['startDate']).getFullYear() 

      

    const en_month = new Date(row['date']['endDate']).getMonth() 
    const en_day = new Date(row['date']['endDate']).getDate() 
    const en_date = en_day + "-" + (en_month+1) + "-" + new Date(row['date']['endDate']).getFullYear() 

    
    this.Task.setValue({
      "project" : row.project.projectName,
      "status" : row.taskStatus,
      "label" : row.taskLabel,
      "summary" : row.taskSummary,
      "team_member" : row.userMember.name,
      "st_date" : st_date,
      "priority" : row.taskPriority,
      "type" : row.taskType,
      "desc" : row.taskDescription,
      "desig" : row.userMember.designation,
      "time" : row.taskEstimatedTime,
      "en_date" : en_date,
    })


    this.taskService.getTaskConfig().subscribe(res=>{
      // this.label=[];
      this.Task.controls['label'].setValue(row.taskLabel)
      for(let key in res['results']){
        if(res['results'][key]['configType']=="Label"){
          
          if(res['results'][key]['labelType']==row.taskType){
            this.label.push(res['results'][key])

          }
        }
      }
    },err=>{
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });
    })
  }
  }


  onChangeTeam(value){
    if(value==""){
      this.Task.controls['desig'].setValue("")
    }
    else{

      let team = this.team_members.filter(v=>(v.name==value))

      this.Task.controls['desig'].setValue(team[0]['designation'])
      
    }
  }


  onChangeType(value) {
    if(value){
      this.taskService.getTaskConfig().subscribe(res=>{
        this.label=[];
        this.Task.controls['label'].setValue("")
        for(let key in res['results']){
          if(res['results'][key]['configType']=="Label"){
            
            if(res['results'][key]['labelType']==value){
              this.label.push(res['results'][key])

            }
          }
        }
      }) 
    }
    else{
      this.label=[];
    }
  }




  onFileSelected(event, imageFor) {
    this.selectedFile = <File>event.target.files[0];
  }


  update(){

    if(this.Task.invalid){
      this.toastr.error('Enter Correct Date', 'Incorrect Date', {
        timeOut: 2000
      });
      return;
    }

    else{

      const st_month = new Date(this.Task.controls['st_date'].value).getMonth() 
    const st_day = new Date(this.Task.controls['st_date'].value).getDate() 
    const st_date = st_day + "-" + (st_month+1) + "-" + new Date(this.Task.controls['st_date'].value).getFullYear() 

      

    const en_month = new Date(this.Task.controls['en_date'].value).getMonth() 
    const en_day = new Date(this.Task.controls['en_date'].value).getDate() 
    const en_date = en_day + "-" + (en_month+1) + "-" + new Date(this.Task.controls['en_date'].value).getFullYear() 

    if(isNaN(st_day) || isNaN(st_month) || isNaN(new Date(this.Task.controls['st_date'].value).getFullYear())){
      this.toastr.error('Enter Correct Date', 'Incorrect Date', {
        timeOut: 2000
      });
      return;
  
     }
     if(isNaN(en_day) || isNaN(en_month) || isNaN(new Date(this.Task.controls['en_date'].value).getFullYear())){
      this.toastr.error('Enter Correct Date', 'Incorrect Date', {
        timeOut: 2000
      });
      return;
  
     }   

    const pro = this.project.filter(c=>(c.projectName==this.Task.controls['project'].value))
    const user = this.team_members.filter(c=>(c.name==this.Task.controls['team_member'].value))

    this.taskService.taskDetails[0]['project']=pro[0]
    this.taskService.taskDetails[0]['userMember'] = user[0];
    this.taskService.taskDetails[0]['taskStatus'] = this.Task.controls['status'].value;
    this.taskService.taskDetails[0]['taskLabel'] = this.Task.controls['label'].value;
    this.taskService.taskDetails[0]['taskSummary'] = this.Task.controls['summary'].value;
    this.taskService.taskDetails[0]['date']['startDate'] = new Date(Date.parse(st_date));
    this.taskService.taskDetails[0]['taskPriority'] = this.Task.controls['priority'].value;
    this.taskService.taskDetails[0]['taskType'] = this.Task.controls['type'].value;
    this.taskService.taskDetails[0]['taskDescription'] = this.Task.controls['desc'].value;
    this.taskService.taskDetails[0]['taskDesignation'] = this.Task.controls['desig'].value;
    this.taskService.taskDetails[0]['taskEstimatedTime'] = this.Task.controls['time'].value;
    this.taskService.taskDetails[0]['date']['endDate'] = new Date(Date.parse(en_date));
    this.taskService.taskDetails[0]['updatedAt'] = new Date();



    this.taskService.updateTask(this.taskService.taskDetails[0]).subscribe(res=>{

      this.toastr.success('Task Updated Successfully', 'Success', {
        timeOut: 2000
      })

       this.router.navigate(['Task/viewtask'])
      this.reset();
    },err=>{
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });
    })

    
      
    }

  }



  reset(){
    this.Task.reset();
    this.Task.setValue({
      "project" : "",
      "status" : "",
      "label" : "",
      "summary" : "",
      "team_member" : "",
      "st_date" : "",
      "priority" : "",
      "type" : "",
      "desc" : "",
      "desig" : "",
      "time" : "",
      "en_date" : "",
    })
  }
  

  cancel(){
    this.window.back();
   this.taskService.taskDetails=[];
    this.label=[];
    this.reset();
  }
  

}
