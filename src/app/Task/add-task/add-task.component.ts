import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {TaskServiceService} from '../../services/task-service.service'
import { Location } from '@angular/common';
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  Task : FormGroup

  type=[]
  status = []
  priority = []
  team_members =[]
  label=[]
  project=[]

  selectedFile: File;
  designation = JSON.parse(localStorage.getItem('loginData'))['designation'];

  constructor(private taskService : TaskServiceService,
              private location : Location,
              private router: Router,
              private toastr: ToastrService) { }

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
        }
        ,err=>{
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
        if(this.designation=="Teacher"){
        for(let key in res['results']){

          if(res['results'][key]['designation'] != "Teacher"){
          this.team_members.push(res['results'][key])
            
          }
        }
        }

        else{
        for(let key in res['results']){
          this.team_members.push(res['results'][key])
        }
      }
      },err=>{
        this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
          timeOut: 2000
        });
      }
    )
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

  back(){
    this.location.back();

  }


  addTask(){

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


    if(this.Task.invalid){
      this.toastr.error('Please fill mandatory fields', 'Fields Are Empty', {
        timeOut: 2000
      });
  
      return;
    }
    else{
    const pro = this.project.filter(c=>(c.projectName==this.Task.controls['project'].value))
    const user = this.team_members.filter(c=>(c.name==this.Task.controls['team_member'].value))



    const req_payload={

      "date":
              {
                "startDate": new Date(this.Task.controls['st_date'].value).toISOString(),
                "endDate": new Date(this.Task.controls['en_date'].value).toISOString()
               },
      "taskType":this.Task.controls['type'].value,
      "taskLabel":this.Task.controls['label'].value,
      "project": pro[0],
      "taskPriority":this.Task.controls['priority'].value,
      "taskStatus":this.Task.controls['status'].value,
      "taskSummary":this.Task.controls['summary'].value,
      "taskDescription":this.Task.controls['desc'].value,
      "userMember": user[0],
      "taskEstimatedTime":this.Task.controls['time'].value,
      "key_Id": pro[0]['projectKey']+"_TICKET_1"
    }

    this.taskService.createTask(req_payload).subscribe(
      res=>{
        this.toastr.success('Task Added Successfully', 'Success', {
          timeOut: 2000
        });
        this.router.navigate(['Task/viewtask'])
      },err=>{
        this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
          timeOut: 2000
        });
      }
    )
    
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

}
