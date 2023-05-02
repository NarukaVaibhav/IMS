import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private _http: HttpClient) {}



  //
  //url = `http://52.149.208.233:9000/api/v1.0/`;
  //
  //cURL =`http://52.149.208.233:9000/api/v1.0/`;
  //
  //urlWithoutTenant = 'http://52.149.208.233:9000/api/v1.0/';
  //location_url = "http://52.149.208.233:9000/api/v1.0";
  //fileurl="http://52.149.208.233:9000/";

  url = `http://20e42935f826.ngrok.io/api/v1.0/`;

  cURL =`http://20e42935f826.ngrok.io/api/v1.0/`;

  urlWithoutTenant = 'http://20e42935f826.ngrok.io/api/v1.0/';
  location_url = "http://20e42935f826.ngrok.io/api/v1.0";
  fileurl="http://20e42935f826.ngrok.io/";

   //url = `http://139.162.53.166:9000/api/v1.0/`;
   //
   //cURL =`http://139.162.53.166:9000/api/v1.0/`;
   //
   //urlWithoutTenant = 'http://139.162.53.166:9000/api/v1.0/';
   //location_url = "http://139.162.53.166:9000/api/v1.0";
   //fileurl="http://139.162.53.166:9000/";


  getLocation_url() {
    return this.location_url;
  }

  getTanant(){
    return localStorage.getItem('tenant');
  }
  getURL() {
    let url=this.url+this.getTanant();
    return url;
  }

  id
  designation
  assignedBatches

  ids() {
    try{
      return this.id = JSON.parse(localStorage.getItem('loginData'))['id']
    }catch{
      return undefined;
    }
  }


  designations() {
    try {
      return this.designation = JSON.parse(localStorage.getItem('loginData'))['designation']
    } catch {
      return undefined;
    }
  }

  assignBatches() {
    return this.assignedBatches = localStorage.getItem('allAssignedBatches');
  }
  getLoginURL() {
    return this.location_url;
  }

  getUSERDATA(){
    return JSON.parse(localStorage.getItem('loginData'))
  }

  getRoles(){
    let data=JSON.parse(localStorage.getItem('loginData'));
    return this._http.get(this.getURL()+'/getDesignationsByName/'+data.designation);
  }

  //Edit Profile

  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'x-app-version': '12',
    'Accept': 'application/json, text/plain, */*',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });



  editProfile() {
    return this._http.get < any > (`${this.getURL()}/user/?id=${this.ids()}`, {
      headers: this.header
    })
  }
  getStates(id) {
    return this._http.get < any > (`${this.urlWithoutTenant}locationmaster/states/${id}`, {
      headers: this.header
    })
  }
  getCountry() {
    return this._http.get < any > (`${this.urlWithoutTenant}locationmaster/countries`, {
      headers: this.header
    })
  }
  getCitites(ids) {
    return this._http.get < any > (`${this.urlWithoutTenant}locationmaster/cities/${ids}`, {
      headers: this.header
    })
  }
  //EDit Profit Data
  editProfileUpdate(obj) {
    return this._http.put < any > (`${this.getURL()}/user`, obj, {
      headers: this.header
    });
  }
//netparam.harsh@gmail.com
  designatio()
  {
    return this.designation = ''
  }
}
