import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {TaskServiceService} from '../../services/task-service.service'
import { Location } from '@angular/common';
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import{ToasterService} from '../../Toast/toaster.service';


@Component({
  selector: 'app-task-configuration',
  templateUrl: './task-configuration.component.html',
  styleUrls: ['./task-configuration.component.css']
})
export class TaskConfigurationComponent implements OnInit {

  TaskConfig : FormGroup

  lab_type : boolean =false
  config_label : boolean = true
  value : boolean = false
  config : boolean = false
  config_categ : boolean = false
  config_priority : boolean = false
  

  type=[]
  


  
  constructor(private taskService : TaskServiceService,
              private location : Location,
              private router: Router,
              private toastr: ToastrService,
              private toast : ToasterService) { }

 


  ngOnInit() {
    this.TaskConfig = new FormGroup({
      type : new FormControl('', Validators.required),
      config_type : new FormControl('', Validators.required),
      config_value : new FormControl('', Validators.required),
      label_type : new FormControl('')
    })


    this.taskService.getTaskConfig().subscribe(
      (res)=>{

        for(let key in res['results']){
          if(res['results'][key]['type']=="Task" && res['results'][key]['configType']=="Type"){
            this.type.push(res['results'][key])
          }
        }

      },err=>{
        this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
          timeOut: 2000
        });
      }
    )
  }

  onChangeType(type) {
    this.TaskConfig.controls['config_type'].setValue("");
    this.TaskConfig.controls['config_value'].setValue("");
    this.TaskConfig.controls['label_type'].setValue("");


    this.config=true

    if(type == "Task"){
      this.config_label=true
      this.config_categ=false
      this.config_priority=true
      this.lab_type=false
    }
    else{
      this.config_label=false
      this.config_categ=true
      this.config_priority=false
      this.lab_type=false

    }
  }

  onChangeConfig(config){
    this.value=true;
    this.lab_type=false;
    if(config == "Label"){
      this.lab_type=true;
    }
    else{
      this.lab_type=false;
    }
  }

  reset(){
    this.TaskConfig.reset()
    this.TaskConfig.setValue({
      type : "",
      config_type : "",
      config_value : "",
      label_type : ""
    })
    this.config=false;
    this.value=false;
  }


  back(){
    this.location.back();

  }


  addTaskConfig(){

    if(this.TaskConfig.controls['config_type'].value == "Label" && this.TaskConfig.controls['label_type'].value =="" ){
      this.toastr.error('Please fill Label Type', 'Fields Are Empty', {
        timeOut: 2000
      });
      return;
    }

    else if(this.TaskConfig.invalid){
      this.toastr.error('Please fill mandatory fields', 'Fields Are Empty', {
        timeOut: 2000
      });
      return;
    }

    else{
    let req_payload={};
    
      if(this.TaskConfig.controls['config_type'].value !="Label"){

      req_payload={
        "type" : this.TaskConfig.controls['type'].value,
        "configType" : this.TaskConfig.controls['config_type'].value,
        "configValue" : this.TaskConfig.controls['config_value'].value
      }
    }
    else{
      req_payload={
        "type" : this.TaskConfig.controls['type'].value,
        "configType" : this.TaskConfig.controls['config_type'].value,
        "configValue" : this.TaskConfig.controls['config_value'].value,
        "labelType" :   this.TaskConfig.controls['label_type'].value
      }
    }

      this.taskService.createTaskConfig(req_payload).subscribe(res=>{
        this.toastr.success('Task Configured Successfully', 'Success', {
          timeOut: 2000
        })
        this.reset();
        

      this.ngOnInit();

      },
        err=>{

          if(err['status']==0){

            this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
              timeOut: 2000
            });
            
            }else{
              this.toast.infocustomhead(err.error.msg,"Error");
            }
          
        }
        )
            }

          }

  }

