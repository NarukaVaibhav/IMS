import { Component, OnInit } from '@angular/core';
import { ViewUsersService } from '../../services/view-users.service';
import {DatePipe} from '@angular/common'

import { FormControl , FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Location } from '@angular/common';
import { AddUserService } from '../../services/add-user.service';
import {Router} from '@angular/router'
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  xyz : FormGroup;

  designations =[];
  country =[];
  city=[];
  state=[];
  bsp=false;
  user_info={};
  duration;
  cont=[]
  state1=[]
  city1=[]
 

  dur : boolean = false;
  browser : boolean = false;
  desig : boolean = true;
  row_obj=[]
  

  constructor(public user: ViewUsersService, 
              public datePipe : DatePipe,
              private window: Location,
              private myservice : AddUserService,
              private formbuilder : FormBuilder,
              private router : Router,
              private toastr: ToastrService) { }

  ngOnInit() {

    if(this.user.row_obj233.length==0){
      this.router.navigate(['User/view-all-users'])
    }

  
    this.row_obj=this.user.row_obj233

    this.xyz = this.formbuilder.group({
      user_name : new FormControl('', Validators.required),
      designation : new FormControl('', Validators.required),
      address : new FormControl(''),
      states  : new FormControl(''),
      pincode : new FormControl('',Validators.maxLength(6)),
      contact : new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[6789]\d{9}|(\d[ -]?){10}\d$/gm)]),
      email : new FormControl('',[Validators.email, Validators.required, Validators.pattern(/[^@]+@[^\.]+\..+/)]),
      dob : new FormControl('',Validators.required),
      countries : new FormControl(''),
      cities : new FormControl(''),
      pass : new FormControl('', [Validators.required, Validators.minLength(6)])
    })

    this.edit();
  
  }


  edit(){
    let row={};
   row = this.row_obj[0]


if(!this.isEmpty(row)){
    this.myservice.getDesignations().subscribe(
      res => {
            for(let key in res["results"]){
              if(res["results"][key]['status']=="Active"){
              this.designations.push(res["results"][key]);
            }
      }},err=>{
        this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
          timeOut: 2000
        });
      }
      
    )
    
    this.myservice.getCountries().subscribe(
      data => {
            for(let key in data["results"]){
              this.country.push(data["results"][key]);
            }},
            err=>{
              this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
                timeOut: 2000
              });
            }
      
    )
  
    
     

   

    
    
    if(row['designation']=="Student"){
      this.browser=true;
    }
    else{
      this.browser=false;
    }
    if(typeof row['browserSupport']=== "undefined"){
      this.bsp = false
    }
    else{
      this.bsp = row['browserSupport']
    }
    if(this.row_obj[0]['designation']=="Student" || this.row_obj[0]['designation']=="Teacher"){
      this.desig = false
  }
  else{
    this.desig = true
  }
    
  

    

    this.xyz.controls['user_name'].setValue(row['name']);
    this.xyz.controls['designation'].setValue(row['designation']);
    this.xyz.controls['contact'].setValue(row['contactNumber']);
    this.xyz.controls['email'].setValue(row['emailId']);
    this.xyz.controls['pass'].setValue(row['password']);
    this.xyz.controls['dob'].setValue( this.datePipe.transform(row['dob'], 'yyyy-MM-dd') );

    
    
  
    
      
    if(typeof row['address'] === "undefined"){
      
      this.xyz.controls['address'].setValue("");
      this.xyz.controls['countries'].setValue("");
      this.xyz.controls['states'].setValue("");
      this.xyz.controls['cities'].setValue("");
      this.xyz.controls['pincode'].setValue("");

    }


    else{

      if(this.isEmpty(row['address']['country'])){
        this.xyz.controls['countries'].setValue("")
      }
      else{
        this.xyz.controls['countries'].setValue(row['address']['country']['countryId'])
      }
      if(typeof row['address']['country']['countryId']=== "undefined"){
        this.xyz.controls['countries'].setValue("")

      }

      if(this.isEmpty(row['address']['state'])){
        this.xyz.controls['states'].setValue("")
      }
      else{
        this.xyz.controls['states'].setValue(row['address']['state']['stateId'])

        this.myservice.getStates(row['address']['country']['countryId']).subscribe(
          data => {
                for(let key in data["results"]){
                  this.state.push(data["results"][key]);
                }}
          
        )
      }
      if(typeof row['address']['state']['stateId']=== "undefined"){
        this.xyz.controls['states'].setValue("")

      }
      if(this.isEmpty(row['address']['city'])){
        this.xyz.controls['cities'].setValue("")
      }
      else{
        this.xyz.controls['cities'].setValue(row['address']['city']['cityId'])

        this.myservice.getCities(row['address']['state']['stateId']).subscribe(
          data => {
                for(let key in data["results"]){
                  this.city.push(data["results"][key]);
                }}
          
        )
      }
      if(typeof row['address']['city']['cityId']=== "undefined"){
        this.xyz.controls['cities'].setValue("")

      }
      

      if(typeof row['address']['address'] === "undefined"){
      this.xyz.controls['address'].setValue("");
      }
      else{
        this.xyz.controls['address'].setValue(row['address']['address'])

      }
      if(typeof row['address']['pinCode'] === "undefined"){
        this.xyz.controls['pincode'].setValue("");
        }
        else{
        this.xyz.controls['pincode'].setValue(row['address']['pinCode'])
        }

      }
  
      

    }
    
  }
  
  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


  onChangeCountry(countryId: number) {
    if (countryId) {
      this.cont = this.country.filter(c => (c.countryId == countryId));

      this.myservice.getStates(countryId).subscribe(
        data => {
          this.state=[];
          for(let key in data["results"]){
              this.state.push(data["results"][key]);
            }
          this.city = [];
        }
      );
    } else {
      this.state = [];
      this.city = [];
    }
  }

  onChangeState(stateId: number) {
    if (stateId) {
      this.state1 = this.state.filter(c => (c.stateId == stateId));

      this.myservice.getCities(stateId).subscribe(
        res => {
          this.city=[];
          for(let key in res["results"]){
          this.city.push(res["results"][key]);
        }

        

      }
 
      );
    } else {
      this.city = [];
    }
  }


  onChangeCity(cityId: number){
    this.city1 = this.city.filter(c => (c.cityId == cityId));
  }


  back(){
    this.window.back()
    this.user.row_obj233=[]
  }






  update(){

    if (this.xyz.invalid) {
      this.toastr.error('Please fill mandatory fields', 'Fields Are Empty', {
        timeOut: 2000
      });
      return;
    }
    

    
    let date = Number(new  Date(this.xyz.controls['dob'].value).getDate())
    
   let month : number = new Date(this.xyz.controls['dob'].value).getMonth() + 1

   let year : number = new Date(this.xyz.controls['dob'].value).getFullYear()

  
    let id : string = this.row_obj[0]['id'];
    let createdAt : string = this.row_obj[0]['id']

    
    
    if(isNaN(date) || isNaN(month) || isNaN(year)){
      this.toastr.error('Enter Correct Date', 'Incorrect Date', {
        timeOut: 2000
      });
      return;
  
     }
    

   if(year > new Date().getFullYear()){
    this.toastr.error('Enter Correct DOB', 'Incorrect DOB', {
      timeOut: 2000
    });
    return;
    }
    else if(year == new Date().getFullYear()){
      if(date > new Date().getDate()){
        if(month >= (new Date().getMonth()+1)){
          this.toastr.error('Enter Correct DOB', 'Incorrect DOB', {
            timeOut: 2000
          });
        return;
        }
      }
    }

    if(this.xyz.controls['contact'].value[0] < 6){
      this.toastr.error('Enter Correct Contact Number', 'Incorrect Contact No.', {
        timeOut: 2000
      });
      return;
    }

    if (this.xyz.invalid) {
      this.toastr.error('Please fill mandatory fields', 'Fields Are Empty', {
        timeOut: 2000
      });
      return;
    }
    else{
  
      const cont = this.country.filter(c => (c.countryId == this.xyz.controls['countries'].value));
      const state1 = this.state.filter(c => (c.stateId == this.xyz.controls['states'].value));
      const city1 = this.city.filter(c => (c.cityId == this.xyz.controls['cities'].value));
      
      let add=""
      let con ={}
      let cit={}
      let st = {}
      let pin =""

      if(this.xyz.controls['address'].value==""){
        add=""
      }
      else{
        add= this.xyz.controls['address'].value;
      }

      if(this.xyz.controls['countries'].value==""){
        con={}
      }
      else{
        con = { "countryId" : cont[0]['countryId'] ,
        "countryName" : cont[0]['countryName'] ,
        "id" : cont[0]['id'] }
      }


      if(this.xyz.controls['states'].value==""){
        st={}
      }
      else{
        st = { "stateId" : state1[0]['stateId'],
        "stateName" : state1[0]['stateName'],
        "countryId" : cont[0]['countryId'] ,
        "id" :state1[0]['id'] }
      }


      if(this.xyz.controls['cities'].value==""){
        cit={}
      }
      else{
        cit = {"cityId":city1[0]['cityId'],
        "cityName": city1[0]['cityName'],
        "stateId":state1[0]['stateId'],
        "id":city1[0]['id'] }
      }


      if(this.xyz.controls['pincode'].value==""){
        pin=""
      }
      else{
        pin= this.xyz.controls['pincode'].value;
      }



if(this.bsp==false){

      this.user_info = 
   {
    "address" :
    { "address" : add,
    "country" : con,
    "state" : st,
"pinCode" : pin,
"city" : cit
},    
    "name" : this.xyz.controls['user_name'].value,
    "designation" : this.xyz.controls['designation'].value,
    "contactNumber" : this.xyz.controls['contact'].value,
    "emailId" : this.xyz.controls['email'].value,
    "dob" : new Date(Date.parse(this.xyz.controls['dob'].value)).toISOString() ,
    "password" : this.xyz.controls['pass'].value,
    "status" : "Active",
    "tenant": localStorage.getItem('tenant'),
    "createdAt": createdAt,
    "updatedAt": new Date().toISOString(),
    "id": id
  }
  
}

else{
  
        this.user_info = 
     {
      "address" :
      { "address" : add,
      "country" : con,
      "state" : st,
"pinCode" : pin,
"city" : cit
},    
      "name" : this.xyz.controls['user_name'].value,
      "designation" : this.xyz.controls['designation'].value,
      "contactNumber" : this.xyz.controls['contact'].value,
      "emailId" : this.xyz.controls['email'].value,
      "dob" : new Date(Date.parse(this.xyz.controls['dob'].value)).toISOString() ,
      "password" : this.xyz.controls['pass'].value,
      "status" : "Active",
      "tenant": localStorage.getItem('tenant'),
      "createdAt": createdAt,
      "updatedAt": new Date().toISOString(),
      "id": id,
      "browserSupport" : this.bsp,
      "browserSupportDuration" : this.duration
    }
  

}
  
  
  
         
        
        this.user.updateUser(this.user_info).subscribe(
            (res) => {
              this.toastr.success('User Updated Successfully', 'Success', {
                timeOut: 2000
              })
                    this.router.navigate(['User/view-all-users']),
                    this.user.row_obj233=[]
                  } ,
            (err)=>{
              this.user.handleError(err)
              this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
                timeOut: 2000
              });
            }
           )
        
        }
      }
 
      
      
}
