import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {TaskServiceService} from '../../services/task-service.service'
import { Location } from '@angular/common';
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  Project : FormGroup;

  type=[]
  status = []
  category = []
  team_members =[]

  constructor(private taskService : TaskServiceService,
              private location : Location,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {

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


  addProject(){

    if(this.Project.invalid){

      this.toastr.error('Please fill mandatory fields', 'Fields Are Empty', {
        timeOut: 2000
      });
      
      return;
    }

    else{
    const user = this.team_members.filter(c=>(c.name==this.Project.controls['team_member'].value))
    const req_payload={

      "projectType":this.Project.controls['type'].value,
      "projectCategory": this.Project.controls['category'].value,
      "projectStatus":this.Project.controls['status'].value,
      "projectName":this.Project.controls['proj_name'].value,
      "projectKey":this.Project.controls['key'].value,
      "projectDescription":this.Project.controls['proj_desc'].value,
      "projectUrl":{"liveUrl":this.Project.controls['live_url'].value,
                    "testUrl":this.Project.controls['test_url'].value},
      "userMember": user[0],
      "status":"Active"
    }

    this.taskService.createProject(req_payload).subscribe(
      res=>{
      this.toastr.success('Project Added Successfully', 'Success', {
        timeOut: 2000
      })
      this.router.navigate(['Project/viewproject']);
    this.reset();

    },err=>{
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });
    }
    )
        }
  }


  back(){
    this.location.back();

  }

  
}
