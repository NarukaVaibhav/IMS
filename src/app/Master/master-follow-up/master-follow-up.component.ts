import { Component, OnInit } from '@angular/core';
import { MasterServiceService } from '../../services/master-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {ConfirmDialogModel, DialogSHOWComponent } from '../../dialog-show/dialog-show.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-master-follow-up',
  templateUrl: './master-follow-up.component.html',
  styleUrls: ['./master-follow-up.component.css']
})
export class MasterFollowUpComponent implements OnInit {

  MasterFollowUp : FormGroup;
  EditMasterFollowUp : FormGroup;

  FollowUps =[];
  
  
  addFollow : boolean = true
  editFollow : boolean = false
  req=[];
  edit_foll=[]
  addshow : boolean =false;
  



  constructor(private master : MasterServiceService,
             private toastr: ToastrService,
             private dialog : MatDialog) { }



  
  ngOnInit() {

    this.MasterFollowUp = new FormGroup({
      addMode : new FormControl('',Validators.required),

      })

      this.EditMasterFollowUp = new FormGroup({
        editMode : new FormControl('',Validators.required)
  
        })
  
      
      this.getAllFollowUps();
  
  }


  getAllFollowUps(){
    this.master.getFolllowUps().subscribe(res=>{
      for(let key in res['results']){
        this.FollowUps.push(res['results'][key])
      }
    },err=>{
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });
    })
  }


  addFollowUp(){

    if (this.MasterFollowUp.invalid) {

      this.toastr.error('Please fill mandatory fields', 'Fields Are Empty', {
        timeOut: 2000
      });

      return;
    }
    else{
    
    const request_payload ={
      "name": this.MasterFollowUp.controls['addMode'].value,
      "roles":{}
    }

    this.master.putFolllowUps(request_payload).subscribe(

      res=>{
        this.FollowUps=[];
        this.getAllFollowUps()
        this.toastr.success('Follow Up Added Successfully', 'Success', {
          timeOut: 2000
        });
        this.addshow=false;
    this.MasterFollowUp.controls['addMode'].setValue('')

      },err=>{
        this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
          timeOut: 2000
        });
      }   
    )
   

    }
  }

  editFollowUp($key){

    

    this.gotoTop();
    this.addFollow = false
    this.editFollow = true
    this.edit_foll.push($key)

    this.EditMasterFollowUp.controls['editMode'].setValue( $key['name'])

    

  }

  deleteFollowUp($key){

    const message = `Are you sure you want to delete?`;
 
  const dialogData = new ConfirmDialogModel("Delete Follow Up!", message);

  const dialogRef = this.dialog.open(DialogSHOWComponent, {
    maxWidth: "400px",
    data: dialogData
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
    let result = dialogResult;

    if(result) {
  
    this.master.deleteFolllowUps(this.FollowUps[$key]['id']).subscribe(res=>{
      this.FollowUps=[];
      this.getAllFollowUps();
      this.toastr.success('Follow Up Deleted Successfully', 'Success', {
        timeOut: 2000
      });

    },err=>{
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });
    })
    
    
    }
  })
  }

  updateFollowUp(){

    if (this.EditMasterFollowUp.invalid) {

      this.toastr.error('Please fill mandatory fields', 'Fields Are Empty', {
        timeOut: 2000
      });


      return;
    }
    else{
    
      this.edit_foll[0]["name"]=this.EditMasterFollowUp.controls['editMode'].value,
      
      
      this.edit_foll[0]["updatedAt"]=new Date().toISOString()
      

    this.master.updateFolllowUps(this.edit_foll[0]).subscribe(res=>{
      this.FollowUps=[]
      this.getAllFollowUps();
      this.toastr.success('Follow Up Updated Successfully', 'Success', {
          timeOut: 2000
        });
        this.EditMasterFollowUp.controls['editMode'].setValue('')
        this.editFollow = false
        this.addFollow = true
    

    },err=>{
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });
    })

   
  }
  }

  cancel(){
    this.EditMasterFollowUp.controls['editMode'].setValue('')
    this.addFollow=true
    this.editFollow=false;

  }

  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  reset(){
    this.MasterFollowUp.controls['addMode'].setValue('');
  }

  addShow(){

    this.addshow= !(this.addshow)

  }

  
  
  
}
