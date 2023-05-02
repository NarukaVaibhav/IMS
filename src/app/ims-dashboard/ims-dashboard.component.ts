import { Component, OnInit, ViewChild } from '@angular/core';
import { AddNewHTTPService } from '../services/add-new-http.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; 
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';
import { ViewUsersService } from '../services/view-users.service';
import { ExamService } from '../services/exam.service';
import { ToasterService } from '../Toast/toaster.service';

@Component({
  selector: 'app-ims-dashboard',
  templateUrl: './ims-dashboard.component.html',
  styleUrls: ['./ims-dashboard.component.css']
})
export class ImsDashboardComponent implements OnInit {

  @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent;

  activeBatches: any;
  pendingEnquiries: any;
  activeTeachers: any;
  activeAdmissions: any;

  eventTitle;

  calendarData;

  timeline;

  events = [];

  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarEvents: EventInput[] = [];
  

  constructor(private toast:ToasterService, public user:ViewUsersService, public httpServe:AddNewHTTPService, public datepipe: DatePipe, private route: Router , private batchTenant : ExamService) { 
    
    /// Batches Tenant Store in Local Storage
    this.batchTenant.allAssignedBatches().subscribe(
      res=>{
        let batch=''
        let n = res["results"].length-1;
        for(let i=0;i<res["results"].length;i++)
        {
          batch+=res["results"][i].id;
          
          if(i<n)
          {
            
            batch+=',';
          }
         
        }
        localStorage.setItem('allAssignedBatches',batch)
      }, err=>{
        this.toast.errorstatus0();
      })
      ///////////////////End-------------------
   this.httpServe.getCalendarData().subscribe(response=>{
      this.calendarData = response;

      if(localStorage.getItem("calendarEvents")){
        this.calendarEvents = JSON.parse(localStorage.getItem("calendarEvents"));
      }
      else{
        for(let date in this.calendarData){
          this.calendarEvents.push({
            title:this.calendarData[date]["name"], 
            start:this.datepipe.transform(this.calendarData[date]["dob"], 'yyyy-MM-dd')
          })   
        }
      }
    }, err=>{
      this.toast.errorstatus0();
    }) 
  }
  teacherLoign=false
  ngOnInit() {

    let desination =JSON.parse(localStorage.getItem('loginData'))['designation']
    if(desination == "Teacher")
    {
      
      this.teacherLoign=true
      this.route.navigate(['/main'])
    }
    else
    {
      this.teacherLoign=false
      
    }

    
    this.httpServe.getDashboardSpecificCounts().subscribe(data=>{
      this.activeAdmissions = data["activeAdmissions"];
      this.activeTeachers = data["activeTeachers"];
      this.pendingEnquiries = data["pendingEnquiries"];
      this.activeBatches = data["activeBatches"];
    }, err=>{
    })

    this.httpServe.getTimelineData().subscribe(data=>{
      this.timeline = data["results"];

      for(let evt in this.timeline){
        this.events.push(
          {
            id: evt,
            title: this.timeline[evt]["userName"],
            content: this.timeline[evt]["action"]+ " in " + this.timeline[evt]["model"] + " modal",
            date: this.datepipe.transform(this.timeline[evt]["createdAt"], 'dd-MM-yyyy'),
            icon: "../assets/icon.png"
          }
        )
      }

    }, err=>{
    })
    
  }

  routeToTeachers(){
    this.user.setRouteStatus(true);
    this.route.navigate(["/User/view-all-users"]);
  }

  handleDateClick(arg) {
    if (this.eventTitle = prompt('Event Title for ' + arg.dateStr)) {
      this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
        title: this.eventTitle,
        start: arg.date,
        allDay: arg.allDay
      })
    }
    this.saveCalendar(this.calendarEvents);
  }

  eventClick(evt){
    if(confirm("Delete event (click cancel to edit)")){
      for(let i  = 0; i<this.calendarEvents.length; i++){
        if(this.calendarEvents[i]['title'] == evt.title){
          evt.remove();
          this.calendarEvents.splice(i, 1);
        }
      }
    }else if (this.eventTitle = prompt('Event Title for ' + this.datepipe.transform(evt.start, 'MMMM d, y'))) {
      evt.setProp('title', this.eventTitle);
    }
    this.saveCalendar(this.calendarEvents);
  }

  saveCalendar(cal){
    localStorage.setItem("calendarEvents", JSON.stringify(cal));
  }

}
