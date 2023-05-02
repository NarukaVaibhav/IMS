import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {TaskServiceService} from '../../services/task-service.service'
import {Router} from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import{ToasterService} from '../../Toast/toaster.service';


@Component({
  selector: 'app-edit-task-config',
  templateUrl: './edit-task-config.component.html',
  styleUrls: ['./edit-task-config.component.css']
})
export class EditTaskConfigComponent implements OnInit {


  TaskConfig : FormGroup

  lab_type : boolean =false
  config_label : boolean = true
  value : boolean = true
  config : boolean = true
  config_categ : boolean = true
  config_priority : boolean = true

  type=[]


  constructor(private taskService : TaskServiceService,
              private router : Router,
              private toastr: ToastrService,
              private window : Location,
              private toast : ToasterService) { }

  ngOnInit() {

    if(this.taskService.configDetails.length==0){
      this.router.navigate(['TskConfig/viewtaskconfig'])
    }
    else{
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
    this.TaskConfig = new FormGroup({
      type : new FormControl('', Validators.required),
      config_type : new FormControl('', Validators.required),
      config_value : new FormControl('', Validators.required),
      label_type : new FormControl('')
    })
  

    this.edit();

    }
    
  }



  edit(){
    
    
    

    

    let row = this.taskService.configDetails[0]

    
 
  this.TaskConfig.setValue({
    type : row['type'],
    config_type : row['configType'],
    config_value : row['configValue'],
    label_type : ""
  })

  if(this.TaskConfig.controls['config_type'].value=="Label"){
    this.lab_type=true;

    this.TaskConfig.controls['label_type'].setValue(row['labelType'])

  }
  
  if(this.TaskConfig.controls['type'].value=="Project"){
    this.config_categ=true;
    this.config_label=false;
    this.config_priority=false;
}

else if(this.TaskConfig.controls['type'].value=="Task"){
  this.config_categ=false
  this.config_label=true
  this.config_priority=true
}

  }


  onChangeType(type) {
    this.TaskConfig.controls['config_type'].setValue("");

     this.config=true
  
     if(type == "Task"){
      this.config_label=true
       this.config_categ=false
      this.config_priority=true
      this.lab_type=false

    }
    else if(type == "Project"){
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
  
  cancel(){
    this.window.back();
    this.TaskConfig.reset()
    this.TaskConfig.setValue({
      type : "",
      config_type : "",
      config_value : "",
      label_type : ""
    })
    this.taskService.configDetails=[]
  
  }


  update(){

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

      this.taskService.configDetails[0]['type'] = this.TaskConfig.controls['type'].value
    this.taskService.configDetails[0]['configType'] = this.TaskConfig.controls['config_type'].value
    this.taskService.configDetails[0]['configValue'] = this.TaskConfig.controls['config_value'].value
    this.taskService.configDetails[0]['updatedAt'] = new Date().toISOString()

      if(this.TaskConfig.controls['config_type'].value=="Label"){
        this.taskService.configDetails[0]['labelType'] == this.TaskConfig.controls['label_type'].value
      }
      else{
          if(typeof this.taskService.configDetails[0]['labelType'] === "undefined"){

          }
          else{
            delete this.taskService.configDetails[0]['labelType'];
          }
      }
    
  
    this.taskService.updateTaskConfig(this.taskService.configDetails[0]).subscribe(res=>{
      this.toastr.success('Task Configured Successfully', 'Success', {
        timeOut: 2000
      })
          this.router.navigate(['TaskConfig/viewtaskconfig'])
    },
    err=>{
      if(err['status']==0){

        this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
          timeOut: 2000
        });
        
        }else{
          this.toast.infocustomhead(err.error.msg,"Error");
        }
      
    })
  
    
  }
  }
  
  




}
