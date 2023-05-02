import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Location } from '@angular/common';
import { AddUserService } from '../../services/add-user.service';
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  AddUser : FormGroup; 
  designations =[];
  country =[];
  city=[];
  state=[];
  data;
  user_info={};
  cont=[]
  state1=[]
  city1=[]
  

  constructor( private myservice : AddUserService ,
               private location : Location,
                private router : Router,
                private formbuilder : FormBuilder,
                private toastr: ToastrService) { }

  ngOnInit() {
    this.AddUser = this.formbuilder.group({

      user_name : new FormControl('', Validators.required),
      designation : new FormControl('', Validators.required),
      address : new FormControl(),
      states  : new FormControl(),
      pincode : new FormControl('', [ Validators.maxLength(6),Validators.pattern(this.getPostalCodeRegex())]),
      contact : new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[6789]\d{9}|(\d[ -]?){10}\d$/gm)]),
      email : new FormControl('',[Validators.email, Validators.required,Validators.pattern(/[^@]+@[^\.]+\..+/)]),
      dob : new FormControl('',[Validators.required]),
      countries : new FormControl(),
      cities : new FormControl(),
      pass : new FormControl('', [Validators.required, Validators.minLength(6)])
    })

    this.myservice.getDesignations().subscribe(
      res => {
            for(let key in res["results"]){
              if(res["results"][key]['status']=="Active"){
              this.designations.push(res["results"][key]);
            }
            }},
            err=>{
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

    this.AddUser.controls['designation'].setValue('')
    this.AddUser.controls['countries'].setValue('')
    this.AddUser.controls['cities'].setValue('')
    this.AddUser.controls['states'].setValue('')

    
    
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


  getPostalCodeRegex() {
    for(let i in this.country){
    if (this.country[i].countryName == "United States") {
      return /^[0-9]{5}(?:-[0-9]{4})?$/;
    } else if (this.country[i].countryName == "Canada") {
      return /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    }
        return /./;
  }
  }

  
  back(){
    this.location.back();

  }


  
  create(){ 
    
    if (this.AddUser.invalid) {
      this.toastr.error('Please fill mandatory fields', 'Fields Are Empty', {
        timeOut: 2000
      });
      return;
    }
    
   let date= new  Date(this.AddUser.controls['dob'].value).getDate()
   let month = new Date(this.AddUser.controls['dob'].value).getMonth() + 1
   let year = new Date(this.AddUser.controls['dob'].value).getFullYear()


   if(isNaN(date) || isNaN(month) || isNaN(year)){
    this.toastr.error('Enter Correct Date', 'Incorrect Date', {
      timeOut: 2000
    });
    return;

   }
   
   if(year > new Date().getFullYear()){
    this.toastr.error('Enter correct DOB', 'Incorrect DOB', {
      timeOut: 2000
    });

    return;
    }
    else if(year == new Date().getFullYear()){
      if(date > new Date().getDate()){
        if(month >= (new Date().getMonth()+1)){
          this.toastr.error('Enter correct DOB', 'Incorrect DOB', {
            timeOut: 2000
          });
              return;
        }
      }
    }

    if(this.AddUser.controls['contact'].value[0] < 6){
      this.toastr.error('Enter correct Contact Number', 'Incorrect Contact No.', {
        timeOut: 2000
      });
  
      return;
    }
    

    if (this.AddUser.invalid) {
      this.toastr.error('Please fill mandatory fields', 'Fields Are Empty', {
        timeOut: 2000
      });
      return;
    }

    else{

      let add=""
      let con ={}
      let cit={}
      let st = {}
      let pin =""

    


      if(this.AddUser.controls['address'].value==""){
        add=""
      }
      else{
        add= this.AddUser.controls['address'].value;
      }

      if(this.AddUser.controls['countries'].value==""){
        con={}
      }
      else{
        con = { "countryId" : this.cont[0]['countryId'] ,
        "countryName" : this.cont[0]['countryName'] ,
        "id" : this.cont[0]['id'] }
      }


      if(this.AddUser.controls['states'].value==""){
        st={}
      }
      else{
        st = { "stateId" : this.state1[0]['stateId'],
        "stateName" : this.state1[0]['stateName'],
        "countryId" : this.cont[0]['countryId'] ,
        "id" :this.state1[0]['id'] }
      }


      if(this.AddUser.controls['cities'].value==""){
        cit={}
      }
      else{
        cit = {"cityId":this.city1[0]['cityId'],
        "cityName": this.city1[0]['cityName'],
        "stateId":this.state1[0]['stateId'],
        "id":this.city1[0]['id'] }
      }


      if(this.AddUser.controls['pincode'].value==""){
        pin=""
      }
      else{
        pin= this.AddUser.controls['pincode'].value;
      }





      this.user_info = 
   {
     "address" :
            { "address" : add,
            "country" : con,
            "state" : st,
    "pinCode" : pin,
    "city" : cit
    },  
    "name" : this.AddUser.controls['user_name'].value,
    "designation" : this.AddUser.controls['designation'].value,
    "contactNumber" : this.AddUser.controls['contact'].value,
    "emailId" : this.AddUser.controls['email'].value,
    "dob" : new Date(this.AddUser.controls['dob'].value).toISOString() ,
    "password" : this.AddUser.controls['pass'].value,
    "status" : "Active"
  }
       
      this.myservice.addUser(this.user_info).subscribe(
          res => {
            this.toastr.success('User Added Successfully', 'Success', {
              timeOut: 2000
            });
            this.router.navigate(['User/view-all-users']);
        this.clear();

          },err=>{
            this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
              timeOut: 2000
            });
          } 
         )
        
               }
     
  }

  clear(){
    this.AddUser.reset();
    this.AddUser.setValue({
      user_name : '',
      designation : "",
      address : '',
      
      pincode : '',
      contact : '',
      email : '',
      dob : '',
      countries : "",
      pass : '',
    

    })
    
  }

  
}

