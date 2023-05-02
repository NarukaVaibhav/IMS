import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import{UrlService} from '../../services/url.service';
import { ApiDataService } from '../../services/apidata.service';
export interface Feedback{
  sno:number
  puncutuality:string;
  attitudeWithOthers:string;
  knowledgeSharing:string;
  learningNewThings:string;
  taskTakerRegularity:string;
  plannedWorking:string;
  workingStamina:string;
  workOnTime:string;
  communicationSkill:string;
  presentationSkill:string;
  developmentSkill:string;
  understandingOfProblems:string;
  teamWork:string;
  workingResponsibility:string
  workIsWorship:string;
  priorityToOrganisation:string;
  backbite:string;
}

export interface ProjectStatus{
  sno:number;
  development:string;
  technology:string;
  status:string;
  teamMembers:string;
  totalHours:string;
  statusTeamLead:string;
}

export interface TrainingStatus{
  sno:number;
  training:string;
  technology:string;
  numberOfStudents:number;
  startDate:string;
  endDate:string;
  status:string;
}

export interface HRReport{
  sno:number;
  employeeStatusHR:string;
  month:number;
  urgentLeave:number;
  approvedLeave:number;
  unapprovedLeave:number;
  extraWorkingDay:number;
  availablePaidLeave:number;
}


@Component({
  selector: 'app-add-employee-feedback',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('250ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('250ms', style({transform: 'translateY(0)', opacity: 1}))
        ])
      ]
    )
  ],
  templateUrl: './add-employee-feedback.component.html',
  styleUrls: ['./add-employee-feedback.component.css']
})
export class AddEmployeeFeedbackComponent implements OnInit {

  // if true employee is selected, if false trainer is selected
  isEmployee:boolean = true;

  employeeName: string;
  employeeCurrentSkill: string;
  learningDetailLastMonth: string;
  learningTargetComingMonth: string;
  learningOpportunity: string;
  specialAchievement: string;
  employeeSuggestion: string;

  projectStatusRecordSNO:number = 0;
  development:string;
  technology:string;
  status:string;
  teamMembers:string;
  totalHours:string;
  statusTeamLead:string;

  projectStatusRecord:ProjectStatus[] = [];


  feedbackRecordSNO:number = 0;
  puncutuality:string;
  attitudeWithOthers:string;
  knowledgeSharing:string;
  learningNewThings:string;
  taskTakerRegularity:string;
  plannedWorking:string;
  workingStamina:string;
  workOnTime:string;
  communicationSkill:string;
  presentationSkill:string;
  developmentSkill:string;
  understandingOfProblems:string;
  teamWork:string;
  workingResponsibility:string
  workIsWorship:string;
  priorityToOrganisation:string;
  backbite:string;

  feedbackRecord:Feedback[] = [];


  HRFeedbackrecordSNO:number = 0;
  employeeStatusHR:string;
  month:number;
  urgentLeave:number;
  approvedLeave:number;
  unapprovedLeave:number;
  extraWorkingDay:number;
  availablePaidLeave:number;

  HRFeedbackrecord:HRReport[] = [];

  trainingStatusRecordSNO: number = 0;
  training: string;
  numberOfStudents: number;
  trainingEndDate: string;
  trainingStartDate: string;
  
  trainingStatusRecord:TrainingStatus[] = [];


  userdata:any=[];
  constructor(public uservice:UrlService,public http:ApiDataService) {
  this.userdata=this.uservice.getUSERDATA();
  }

  ngOnInit() {
  }

  month='';
  year='';

  AddDeveloperFeed(value){
    console.log(this.projectStatusRecord);
    let workobj={
      "title":"",
      "technology":"MEAN",
      "status":"ongoing",
      "no_of_team_member":"4",
      "total_hours":"45 hours",
      "status_by_team_lead":"still in progress"
    };
    console.log(workobj);
    let obj={
      "empid":this.userdata.id,
      "month":this.month,
      "year":this.year,
      "skill":this.employeeCurrentSkill,
      "learning_target_upcoming":this.learningTargetComingMonth,
      "learning_target_last":this.learningDetailLastMonth,
      "learning_working_hours":this.learningOpportunity,
      "special_achievements":this.specialAchievement,
      "any_suggestion":this.employeeSuggestion,
      "work":this.projectStatusRecord,
      "feedback":{
        "punctuality":"",
        "attitude_with_others":"",
        "knowledge_sharing":"",
        "learning_new_things":"",
        "task_tracker_regularity":"",
        "planned_working":"",
        "working_stamina":"",
        "work_on_time":"",
        "communication_skills":"",
        "presentation_skills":"",
        "development_skills":"",
        "understanding_of_problems":"",
        "team_work":"",
        "working_responsibility":"",
        "work_is_worship":"",
        "priority_to_organization":"",
        "backbite":""
      },
      "feedback_hr":{
        "employee_status_by_hr":"",
        "month":"",
        "urgent_leave":"",
        "approve_leave":"",
        "unapproved_leave":"",
        "extra_working_day":"",
        "available_paid_leave":""
      },
      "is_development":value
    }

    console.log(obj);
    //console.log(this.userdata);
  }


  addProjectStatusRecord(){

    this.projectStatusRecordSNO+=1;

    this.projectStatusRecord.push(
      {
        //"sno" : this.projectStatusRecordSNO,
        "title" : this.development,
        "technology" : this.technology,
        "status" : this.status,
        "no_of_team_member" : this.teamMembers,
        "total_hours" : this.totalHours,
        "status_by_team_lead" : this.statusTeamLead
      }
    );

    this.development = undefined;
    this.technology = undefined;
    this.status = undefined;
    this.teamMembers = undefined;
    this.totalHours = undefined;
    this.statusTeamLead = undefined;
    

  }

  removeProjectStatusRecord(index){
    this.projectStatusRecord.splice(index, 1);
    this.projectStatusRecordSNO-=1;
  }
  
  
  
  addFeedbackRecord(){
    
    this.feedbackRecordSNO+=1;
    
    this.feedbackRecord.push({
      "sno":this.feedbackRecordSNO,
      "puncutuality": this.puncutuality,
      "attitudeWithOthers": this.attitudeWithOthers,
      "knowledgeSharing": this.knowledgeSharing,
      "learningNewThings": this.learningNewThings,
      "taskTakerRegularity": this.taskTakerRegularity,
      "plannedWorking": this.plannedWorking,
      "workingStamina": this.workingStamina,
      "workOnTime": this.workOnTime,
      "communicationSkill": this.communicationSkill,
      "presentationSkill": this.presentationSkill,
      "developmentSkill": this.developmentSkill,
      "understandingOfProblems": this.understandingOfProblems,
      "teamWork": this.teamWork,
      "workingResponsibility": this.workingResponsibility,
      "workIsWorship": this.workIsWorship,
      "priorityToOrganisation": this.priorityToOrganisation,
      "backbite": this.backbite,
    });

    this.puncutuality = undefined;
    this.attitudeWithOthers = undefined;
    this.knowledgeSharing = undefined;
    this.learningNewThings = undefined;
    this.taskTakerRegularity = undefined;
    this.plannedWorking = undefined;
    this.workingStamina = undefined;
    this.workOnTime = undefined;
    this.communicationSkill = undefined;
    this.presentationSkill = undefined;
    this.developmentSkill = undefined;
    this.understandingOfProblems = undefined;
    this.teamWork = undefined;
    this.workingResponsibility = undefined;
    this.workIsWorship = undefined;
    this.priorityToOrganisation = undefined;
    this.backbite = undefined;
    
  }
  
  removeFeedbackRecord(index){
    this.feedbackRecord.splice(index, 1);
    this.feedbackRecordSNO-=1;
  }



  addHRFeedbackRecord(){

    this.HRFeedbackrecordSNO+=1;

    this.HRFeedbackrecord.push({
      "sno":this.HRFeedbackrecordSNO,
      "employeeStatusHR":this.employeeStatusHR,
      "month":this.month,
      "urgentLeave":this.urgentLeave,
      "approvedLeave":this.approvedLeave,
      "unapprovedLeave":this.unapprovedLeave,
      "extraWorkingDay":this.extraWorkingDay,
      "availablePaidLeave":this.availablePaidLeave
    });

    this.employeeStatusHR = undefined;
    this.month = undefined;
    this.urgentLeave = undefined;
    this.approvedLeave = undefined;
    this.unapprovedLeave = undefined;
    this.extraWorkingDay = undefined;
    this.availablePaidLeave = undefined;
    
  }
  
  removeHRFeedbackRecord(index){
    this.HRFeedbackrecord.splice(index, 1);
    this.HRFeedbackrecordSNO-=1;
  }

  
  addTrainingStatusRecord(){
  
    this.trainingStatusRecordSNO+=1;
  
    this.trainingStatusRecord.push(
      {
        "sno" : this.trainingStatusRecordSNO,
        "training" : this.training,
        "technology" : this.technology,
        "numberOfStudents" : this.numberOfStudents,
        "startDate" : this.trainingStartDate,
        "endDate" : this.trainingEndDate,
        "status" : this.status
      }
    );
  
    this.development = undefined;
    this.technology = undefined;
    this.status = undefined;
    this.teamMembers = undefined;
    this.totalHours = undefined;
    this.statusTeamLead = undefined;
    
  
  }
  
  removeTrainingStatusRecord(index){
    this.trainingStatusRecord.splice(index, 1);
    this.trainingStatusRecordSNO-=1;
  }


  switchEmployee(){
    this.clearAllFields();
    this.isEmployee = true;
  }
  
  switchTrainer(){
    this.clearAllFields();
    this.isEmployee = false;

  }

  clearAllFields() {
    this.employeeName = undefined;
    this.employeeCurrentSkill = undefined;
    this.learningDetailLastMonth = undefined;
    this.learningTargetComingMonth = undefined;
    this.learningOpportunity = undefined;
    this.specialAchievement = undefined;
    this.employeeSuggestion = undefined;

    this.projectStatusRecordSNO = 0;
    this.development = undefined;
    this.technology = undefined;
    this.status = undefined;
    this.teamMembers = undefined;
    this.totalHours = undefined;
    this.statusTeamLead = undefined;

    this.projectStatusRecord = [];


    this.feedbackRecordSNO = 0;
    this.puncutuality = undefined;
    this.attitudeWithOthers = undefined;
    this.knowledgeSharing = undefined;
    this.learningNewThings = undefined;
    this.taskTakerRegularity = undefined;
    this.plannedWorking = undefined;
    this.workingStamina = undefined;
    this.workOnTime = undefined;
    this.communicationSkill = undefined;
    this.presentationSkill = undefined;
    this.developmentSkill = undefined;
    this.understandingOfProblems = undefined;
    this.teamWork = undefined;
    this.workingResponsibility = undefined
    this.workIsWorship = undefined;
    this.priorityToOrganisation = undefined;
    this.backbite = undefined;

    this.feedbackRecord = [];


    this.HRFeedbackrecordSNO = 0;
    this.employeeStatusHR = undefined;
    this.month = undefined;
    this.urgentLeave = undefined;
    this.approvedLeave = undefined;
    this.unapprovedLeave = undefined;
    this.extraWorkingDay = undefined;
    this.availablePaidLeave = undefined;

    this.HRFeedbackrecord = [];

    this.trainingStatusRecordSNO = 0;
    this.training = undefined;
    this.numberOfStudents = undefined;
    this.trainingEndDate = undefined;
    this.trainingStartDate = undefined;

    this.trainingStatusRecord = [];
  }

}

