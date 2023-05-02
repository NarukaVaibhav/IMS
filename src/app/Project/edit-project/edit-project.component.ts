import { Component, OnInit } from '@angular/core';
import {TaskServiceService} from '../../services/task-service.service'
import { FormControl , FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';


@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  Project : FormGroup;

  type=[]
  status = []
  category = []
  team_members =[]

  constructor(private taskService : TaskServiceService,
             private router : Router,
             private toastr: ToastrService,
             private window : Location) { }

  ngOnInit() {
    this.edit()
  }

  edit(){
    if(this.taskService.projDetails.length==0){
      this.router.navigate(['Project/viewproject'])
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });
    }
    else{
      

    

    let row = this.taskService.projDetails[0]

    this.Project = new FormGroup({
      type : new FormControl('', Validators.required),
      status : new FormControl('', Validators.required),
      key : new FormControl('', Validators.required),
      live_url : new FormControl(),
      team_member : new FormControl('', Validators.required),
      category : new FormControl('', Validators.required),
      proj_name : new FormControl('', Validators.required),
      proj_desc : new FormControl(),
      test_url : new FormControl(),
      desig : new FormControl()
  
    })
  
    this.taskService.getTaskConfig().subscribe(
      (res)=>{
  
        
        for(let key in res['results']){
          if(res['results'][key]['status']=="Active"){
        if(res['results'][key]['type']=="Project" && res['results'][key]['configType']=="Type"){
          this.type.push(res['results'][key])
        }
        else if(res['results'][key]['type']=="Project" && res['results'][key]['configType']=="Status"){
          this.status.push(res['results'][key])
        }
        else if(res['results'][key]['type']=="Project" && res['results'][key]['configType']=="Category"){
          this.category.push(res['results'][key])
        }
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
  
  
    
    this.Project.setValue({
      type : row['projectType'],
      status : row['projectStatus'],
      category : row['projectCategory'],
      key : row['projectKey'],
      live_url : row['projectUrl']['liveUrl'],
      team_member : row['userMember']['name'],
      proj_name : row['projectName'],
      proj_desc : row['projectDescription'],
      test_url : row['projectUrl']['testUrl'],
      desig : row['userMember']['designation']
    })
    }
  }

  onChangeTeam(value){
    if(value==""){
      this.Project.controls['desig'].setValue("")
    }
    else{
  
      let team = this.team_members.filter(v=>(v.name==value))
  
      this.Project.controls['desig'].setValue(team[0]['designation'])
      
    }
  }
  
  
  reset(){
    this.Project.reset();
    this.Project.setValue({
      type : "",
      status : "",
      category : "",
      key : "",
      live_url : "",
      team_member : "",
      proj_name : "",
      proj_desc : "",
      test_url : "",
      desig : ""
    })
  }
  
  
  
  
  update(){
    
    if(this.Project.invalid){
      this.toastr.error('Please fill mandatory fields', 'Fields Are Empty', {
        timeOut: 2000
      });
      return;
    }
  
    else{
    let team = this.team_members.filter(c=>(c.name==this.Project.controls['team_member'].value))
  
    this.taskService.projDetails[0]['projectType']=this.Project.controls['type'].value
    this.taskService.projDetails[0]['projectStatus']=this.Project.controls['status'].value
    this.taskService.projDetails[0]['projectCategory']=this.Project.controls['category'].value
    this.taskService.projDetails[0]['projectKey']=this.Project.controls['key'].value
    this.taskService.projDetails[0]['projectUrl']['liveUrl']=this.Project.controls['live_url'].value
    this.taskService.projDetails[0]['projectName']=this.Project.controls['proj_name'].value
    this.taskService.projDetails[0]['projectDescription']=this.Project.controls['proj_desc'].value
    this.taskService.projDetails[0]['projectUrl']['testUrl']=this.Project.controls['test_url'].value
    this.taskService.projDetails[0]['userMember']= team[0]
    this.taskService.projDetails[0]['updatedAt']=new Date().toISOString();
  
  
    this.taskService.updateProject(this.taskService.projDetails[0]).subscribe(res=>{
      
      this.toastr.success('Project Updated Successfully', 'Success', {
        timeOut: 2000
      })
      this.taskService.projDetails=[]
      this.router.navigate(['Project/viewproject'])
      this.reset();
      },err=>{
        this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
          timeOut: 2000
        });
      }

      )
  
     
      
    }
  
  }
  
  
  
  cancel(){
    this.window.back();
    this.reset()
  }
  

}
