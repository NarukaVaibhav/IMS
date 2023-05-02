import { Component, OnInit } from '@angular/core';
import { UrlService } from '../services/url.service';
import { parseDate } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private service : UrlService , private toastr: ToastrService , private route : Router) { }

  ngOnInit() {
    this.onCall();
  }
  onCall(){
    this.service.editProfile().subscribe(
      res=>{
        this.name=res["results"][0].name;
        this.contact=res["results"][0].contactNumber;
        this.data=res["results"][0]
        this.email=res["results"][0].emailId;
        this.dob=res["results"][0].dob;
        this.country=res["results"][0].address.hasOwnProperty('country') ? (res["results"][0].address.country.countryName) :this.placeholder;
        this.password = res["results"][0].password;
        this.service.getCountry().subscribe(
          results=>{
            this.countryArray=results['results']
          }
        )
      if(this.country != undefined)
      {
        this.service.getStates(res['results'][0]['address']['country']['countryId']).subscribe(
          ids=>{ this.statesArray = ids["results"]
          }
        )
      }
      }
    )
  }

  onChangeCountry(value)
  {
    var address = this.countryArray.filter(val => (val.countryName == this.country));
    this.statesArray=[];
    this.cityArray=[];
    this.states=this.placeholder
    this.city = this.placeholder
    this.pincode = this.placeholder
    this.service.getStates(address[0]['countryId']).subscribe(
      ids=>{
        this.statesArray = ids["results"]
      }
    )
  }
  onChangeFormat(value)
  {
    var id = this.statesArray.filter(val => (val.stateName == this.states))
    this.service.getCitites(id[0].stateId ).subscribe(
      res=>{
        this.cityArray=res["results"]
      }
    )
  }

  updateProfile()
  {
    var address = this.countryArray.filter(val => (val.countryName == this.country));
    var st = this.statesArray.filter(val => (val.stateName == this.states))
    var cit = this.cityArray.filter(val => (val.cityName == this.city))
    let obj={
      "address":{
        "mailingAddress" : this.mailingAddress,
         "country":address[0] == undefined ? '' : address[0],
         "state" : st[0] == undefined ?'' : st[0] ,
     "pinCode" : this.pincode == undefined ? '' : this.pincode,
     "city" : cit[0] == undefined ? '' : cit[0]
      },
      "name":this.name,
      "contactNumber":this.contact,
      "emailId":this.email,
      "dob":parseDate(this.dob).toISOString(),
      "designation":this.data.designation,
      "password":this.password,
      "status":this.data.status,
      "tenant":this.data.tenant,
      "browserSupport":this.data.browserSupport,
      "createdAt":this.data.createdAt,
      "updatedAt":this.today.toISOString,
      "id":this.data.id
   }
   this.service.editProfileUpdate(obj).subscribe(
     res=>{
      this.toastr.success('Edit Profile SuccessFully', 'Success', {
        timeOut: 3000
        
      });
      localStorage.setItem("loginData", JSON.stringify(obj));
      this.route.navigate(['/'])
     }
   )

  }
  countryArray=[]
  statesArray=[]
  cityArray=[]
  name
  data
  contact
  dob
  email
  mailingAddress=''
  country
  states
  city
  pincode
  password
  placeholder
  today=new Date();

}
