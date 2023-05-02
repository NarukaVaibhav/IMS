import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MasterServiceService} from '../../services/master-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-master-designation',
  templateUrl: './master-designation.component.html',
  styleUrls: ['./master-designation.component.css']
})
export class MasterDesignationComponent implements OnInit {
  MasterDesignation : FormGroup;
  EditMasterDesignation : FormGroup;


  roles_assigned =[];
  request_payload = {};
  designations =[];
  display_add : boolean = true;
  display_edit : boolean = false;
  edit_designation=[]
  
  addshow : boolean =false;

  roles=  [
    {
      "role_name": "admission_update",
      "name": "admission update"
    },
    {
      "role_name": "admission_create",
      "name": "admission create"
    },
    {
      "role_name": "admission_delete",
      "name": "admission delete"
    },
    {
      "role_name": "admission_read",
      "name": "admission read"
    },
    {
      "role_name": "apply_discount",
      "name": "apply discount"
    },
    {
      "role_name": "assignment_addAnswers",
      "name": "assignment addAnswers"
    },
    {
      "role_name": "assignment_create",
      "name": "assignment create"
    },
    {
      "role_name": "assignment_delete",
      "name": "assignment delete"
    },
    {
      "role_name": "assignment_read",
      "name": "assignment read"
    },
    {
      "role_name": "assignment_update",
      "name": "assignment update"
    },
    {
      "role_name": "attendance_addMultipleAttendance",
      "name": "attendance addMultipleAttendance"
    },
    {
      "role_name": "attendance_create",
      "name": "attendance create"
    },
    {
      "role_name": "attendance_delete",
      "name": "attendance delete"
    },
    {
      "role_name": "attendance_read",
      "name": "attendance read"
    },
    {
      "role_name": "attendance_update",
      "name": "attendance update"
    },
    {
      "role_name": "batch_create",
      "name": "batch create"
    },
    {
      "role_name": "batch_delete",
      "name": "batch delete"
    },
    {
      "role_name": "batch_read",
      "name": "batch read"
    },
    {
      "role_name": "batch_sendMessage",
      "name": "batch sendMessage"
    },
    {
      "role_name": "batch_sendMessageToTeacher",
      "name": "batch sendMessageToTeacher"
    },
    {
      "role_name": "batch_update",
      "name": "batch update"
    },
    {
      "role_name": "company_create",
      "name": "company create"
    },
    {
      "role_name": "company_delete",
      "name": "company delete"
    },
    {
      "role_name": "company_read",
      "name": "company read"
    },
    {
      "role_name": "company_update",
      "name": "company update"
    },
    {
      "role_name": "course_create",
      "name": "course create"
    },
    {
      "role_name": "course_delete",
      "name": "course delete"
    },
    {
      "role_name": "course_read",
      "name": "course read"
    },
    {
      "role_name": "course_update",
      "name": "course update"
    },
    {
      "role_name": "dashboard_staff_birthdays",
      "name": "dashboard staff birthdays"
    },
    {
      "role_name": "dashboard_stats",
      "name": "dashboard stats"
    },
    {
      "role_name": "designations_create",
      "name": "designations create"
    },
    {
      "role_name": "designations_delete",
      "name": "designations delete"
    },
    {
      "role_name": "designations_read",
      "name": "designations read"
    },
    {
      "role_name": "designations_update",
      "name": "designations update"
    },
    {
      "role_name": "enquiry_create",
      "name": "enquiry create"
    },
    {
      "role_name": "enquiry_delete",
      "name": "enquiry delete"
    },
    {
      "role_name": "enquiry_read",
      "name": "enquiry read"
    },
    {
      "role_name": "enquiry_update",
      "name": "enquiry update"
    },
    {
      "role_name": "exam_create",
      "name": "exam create"
    },
    {
      "role_name": "exam_delete",
      "name": "exam delete"
    },
    {
      "role_name": "exam_getSessions",
      "name": "exam getSessions"
    },
    {
      "role_name": "exam_read",
      "name": "exam read"
    },
    {
      "role_name": "exam_startexam",
      "name": "exam startexam"
    },
    {
      "role_name": "exam_startexam",
      "name": "exam startexam"
    },
    {
      "role_name": "exam_update",
      "name": "exam update"
    },
    {
      "role_name": "exam_updateSessions",
      "name": "exam updateSessions"
    },
    {
      "role_name": "exam_updateSubmission",
      "name": "exam updateSubmission"
    },
    {
      "role_name": "examanswer_create",
      "name": "examanswer create"
    },
    {
      "role_name": "examanswer_delete",
      "name": "examanswer delete"
    },
    {
      "role_name": "examanswer_deleteAnswersOfAdmission",
      "name": "examanswer deleteAnswersOfAdmission"
    },
    {
      "role_name": "examanswer_read",
      "name": "examanswer read"
    },
    {
      "role_name": "examformat_create",
      "name": "examformat create"
    },
    {
      "role_name": "examformat_delete",
      "name": "examformat delete"
    },
    {
      "role_name": "examformat_read",
      "name": "examformat read"
    },
    {
      "role_name": "examformat_update",
      "name": "examformat update"
    },
    {
      "role_name": "fcm_send_to_all",
      "name": "fcm send to all"
    },
    {
      "role_name": "feedback_addAnswers",
      "name": "feedback addAnswers"
    },
    {
      "role_name": "feedback_delete",
      "name": "feedback delete"
    },
    {
      "role_name": "feestype_create",
      "name": "feestype create"
    },
    {
      "role_name": "feestype_delete",
      "name": "feestype delete"
    },
    {
      "role_name": "feestype_read",
      "name": "feestype read"
    },
    {
      "role_name": "feestype_update",
      "name": "feestype update"
    },
    {
      "role_name": "followUpMode_delete",
      "name": "followUpMode delete"
    },
    {
      "role_name": "followUpMode_read",
      "name": "followUpMode read"
    },
    {
      "role_name": "followUpMode_update",
      "name": "followUpMode update"
    },
    {
      "role_name": "history_read",
      "name": "history read"
    },
    {
      "role_name": "leave_create",
      "name": "leave create"
    },
    {
      "role_name": "leave_delete",
      "name": "leave delete"
    },
    {
      "role_name": "leave_read",
      "name": "leave read"
    },
    {
      "role_name": "leave_update",
      "name": "leave update"
    },
    {
      "role_name": "logins_delete",
      "name": "logins delete"
    },
    {
      "role_name": "manageTask_create",
      "name": "manageTask create"
    },
    {
      "role_name": "manageTask_delete",
      "name": "manageTask delete"
    },
    {
      "role_name": "manageTask_read",
      "name": "manageTask read"
    },
    {
      "role_name": "manageTask_update",
      "name": "manageTask update"
    },
    {
      "role_name": "notes_create",
      "name": "notes create"
    },
    {
      "role_name": "notes_delete",
      "name": "notes delete"
    },
    {
      "role_name": "notes_read",
      "name": "notes read"
    },
    {
      "role_name": "placement_create",
      "name": "placement create"
    },
    {
      "role_name": "placement_delete",
      "name": "placement delete"
    },
    {
      "role_name": "placement_read",
      "name": "placement read"
    },
    {
      "role_name": "placement_sendMessage",
      "name": "placement sendMessage"
    },
    {
      "role_name": "placement_update",
      "name": "placement update"
    },
    {
      "role_name": "project_create",
      "name": "project create"
    },
    {
      "role_name": "project_delete",
      "name": "project delete"
    },
    {
      "role_name": "project_read",
      "name": "project read"
    },
    {
      "role_name": "project_update",
      "name": "project update"
    },
    {
      "role_name": "subcourse_create",
      "name": "subcourse create"
    },
    {
      "role_name": "subcourse_delete",
      "name": "subcourse delete"
    },
    {
      "role_name": "subcourse_read",
      "name": "subcourse read"
    },
    {
      "role_name": "subcourse_update",
      "name": "subcourse update"
    },
    {
      "role_name": "subject_create",
      "name": "subject create"
    },
    {
      "role_name": "subject_delete",
      "name": "subject delete"
    },
    {
      "role_name": "subject_read",
      "name": "subject read"
    },
    {
      "role_name": "subject_update",
      "name": "subject update"
    },
    {
      "role_name": "users_create",
      "name": "users create"
    },
    {
      "role_name": "users_delete",
      "name": "users delete"
    },
    {
      "role_name": "users_read",
      "name": "users read"
    },
    {
      "role_name": "users_search",
      "name": "users search"
    },
    {
      "role_name": "users_update",
      "name": "users update"
    }
 ]

 

  constructor(public master: MasterServiceService,
              private toastr: ToastrService) { }

  ngOnInit() {

    
    this.MasterDesignation = new FormGroup({
      designationName : new FormControl('',Validators.required),

      })

      
      this.EditMasterDesignation = new FormGroup({
        editDesignationName : new FormControl('',Validators.required)
  
        })
  

      this.getAllDesignations();
      
  }

  getAllDesignations(){
    this.master.getDesignations().subscribe(res=>{
      for(let key in res['results']){
        this.designations.push(res['results'][key])
      }
    },err=>{
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });
    })
  }




    
   

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
    }

  }


  addDesignation(){

    if (this.MasterDesignation.invalid) {
      this.toastr.error('Please fill mandatory fields', 'Fields Are Empty', {
        timeOut: 2000
      });
      return;
    }
    else{

    this.request_payload = {
      "name": this.MasterDesignation.controls['designationName'].value,
      "roles": this.roles_assigned,
      "status": "Inactive",
      "permanent": false,
        }

    this.master.createDesignation(this.request_payload).subscribe(
      res=> {
        this.toastr.success('Designation Added Successfully', 'Success', {
          timeOut: 2000
        });

      this.addshow=false;
      this.designations=[];
      this.getAllDesignations()
      },
      err=>{
        this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
          timeOut: 2000
        });
      }
    )

    this.MasterDesignation.controls['designationName'].setValue("")
          
    this.roles=  [
      {
        "role_name": "admission_update",
        "name": "admission update"
      },
      {
        "role_name": "admission_create",
        "name": "admission create"
      },
      {
        "role_name": "admission_delete",
        "name": "admission delete"
      },
      {
        "role_name": "admission_read",
        "name": "admission read"
      },
      {
        "role_name": "apply_discount",
        "name": "apply discount"
      },
      {
        "role_name": "assignment_addAnswers",
        "name": "assignment addAnswers"
      },
      {
        "role_name": "assignment_create",
        "name": "assignment create"
      },
      {
        "role_name": "assignment_delete",
        "name": "assignment delete"
      },
      {
        "role_name": "assignment_read",
        "name": "assignment read"
      },
      {
        "role_name": "assignment_update",
        "name": "assignment update"
      },
      {
        "role_name": "attendance_addMultipleAttendance",
        "name": "attendance addMultipleAttendance"
      },
      {
        "role_name": "attendance_create",
        "name": "attendance create"
      },
      {
        "role_name": "attendance_delete",
        "name": "attendance delete"
      },
      {
        "role_name": "attendance_read",
        "name": "attendance read"
      },
      {
        "role_name": "attendance_update",
        "name": "attendance update"
      },
      {
        "role_name": "batch_create",
        "name": "batch create"
      },
      {
        "role_name": "batch_delete",
        "name": "batch delete"
      },
      {
        "role_name": "batch_read",
        "name": "batch read"
      },
      {
        "role_name": "batch_sendMessage",
        "name": "batch sendMessage"
      },
      {
        "role_name": "batch_sendMessageToTeacher",
        "name": "batch sendMessageToTeacher"
      },
      {
        "role_name": "batch_update",
        "name": "batch update"
      },
      {
        "role_name": "company_create",
        "name": "company create"
      },
      {
        "role_name": "company_delete",
        "name": "company delete"
      },
      {
        "role_name": "company_read",
        "name": "company read"
      },
      {
        "role_name": "company_update",
        "name": "company update"
      },
      {
        "role_name": "course_create",
        "name": "course create"
      },
      {
        "role_name": "course_delete",
        "name": "course delete"
      },
      {
        "role_name": "course_read",
        "name": "course read"
      },
      {
        "role_name": "course_update",
        "name": "course update"
      },
      {
        "role_name": "dashboard_staff_birthdays",
        "name": "dashboard staff birthdays"
      },
      {
        "role_name": "dashboard_stats",
        "name": "dashboard stats"
      },
      {
        "role_name": "designations_create",
        "name": "designations create"
      },
      {
        "role_name": "designations_delete",
        "name": "designations delete"
      },
      {
        "role_name": "designations_read",
        "name": "designations read"
      },
      {
        "role_name": "designations_update",
        "name": "designations update"
      },
      {
        "role_name": "enquiry_create",
        "name": "enquiry create"
      },
      {
        "role_name": "enquiry_delete",
        "name": "enquiry delete"
      },
      {
        "role_name": "enquiry_read",
        "name": "enquiry read"
      },
      {
        "role_name": "enquiry_update",
        "name": "enquiry update"
      },
      {
        "role_name": "exam_create",
        "name": "exam create"
      },
      {
        "role_name": "exam_delete",
        "name": "exam delete"
      },
      {
        "role_name": "exam_getSessions",
        "name": "exam getSessions"
      },
      {
        "role_name": "exam_read",
        "name": "exam read"
      },
      {
        "role_name": "exam_startexam",
        "name": "exam startexam"
      },
      {
        "role_name": "exam_startexam",
        "name": "exam startexam"
      },
      {
        "role_name": "exam_update",
        "name": "exam update"
      },
      {
        "role_name": "exam_updateSessions",
        "name": "exam updateSessions"
      },
      {
        "role_name": "exam_updateSubmission",
        "name": "exam updateSubmission"
      },
      {
        "role_name": "examanswer_create",
        "name": "examanswer create"
      },
      {
        "role_name": "examanswer_delete",
        "name": "examanswer delete"
      },
      {
        "role_name": "examanswer_deleteAnswersOfAdmission",
        "name": "examanswer deleteAnswersOfAdmission"
      },
      {
        "role_name": "examanswer_read",
        "name": "examanswer read"
      },
      {
        "role_name": "examformat_create",
        "name": "examformat create"
      },
      {
        "role_name": "examformat_delete",
        "name": "examformat delete"
      },
      {
        "role_name": "examformat_read",
        "name": "examformat read"
      },
      {
        "role_name": "examformat_update",
        "name": "examformat update"
      },
      {
        "role_name": "fcm_send_to_all",
        "name": "fcm send to all"
      },
      {
        "role_name": "feedback_addAnswers",
        "name": "feedback addAnswers"
      },
      {
        "role_name": "feedback_delete",
        "name": "feedback delete"
      },
      {
        "role_name": "feestype_create",
        "name": "feestype create"
      },
      {
        "role_name": "feestype_delete",
        "name": "feestype delete"
      },
      {
        "role_name": "feestype_read",
        "name": "feestype read"
      },
      {
        "role_name": "feestype_update",
        "name": "feestype update"
      },
      {
        "role_name": "followUpMode_delete",
        "name": "followUpMode delete"
      },
      {
        "role_name": "followUpMode_read",
        "name": "followUpMode read"
      },
      {
        "role_name": "followUpMode_update",
        "name": "followUpMode update"
      },
      {
        "role_name": "history_read",
        "name": "history read"
      },
      {
        "role_name": "leave_create",
        "name": "leave create"
      },
      {
        "role_name": "leave_delete",
        "name": "leave delete"
      },
      {
        "role_name": "leave_read",
        "name": "leave read"
      },
      {
        "role_name": "leave_update",
        "name": "leave update"
      },
      {
        "role_name": "logins_delete",
        "name": "logins delete"
      },
      {
        "role_name": "manageTask_create",
        "name": "manageTask create"
      },
      {
        "role_name": "manageTask_delete",
        "name": "manageTask delete"
      },
      {
        "role_name": "manageTask_read",
        "name": "manageTask read"
      },
      {
        "role_name": "manageTask_update",
        "name": "manageTask update"
      },
      {
        "role_name": "notes_create",
        "name": "notes create"
      },
      {
        "role_name": "notes_delete",
        "name": "notes delete"
      },
      {
        "role_name": "notes_read",
        "name": "notes read"
      },
      {
        "role_name": "placement_create",
        "name": "placement create"
      },
      {
        "role_name": "placement_delete",
        "name": "placement delete"
      },
      {
        "role_name": "placement_read",
        "name": "placement read"
      },
      {
        "role_name": "placement_sendMessage",
        "name": "placement sendMessage"
      },
      {
        "role_name": "placement_update",
        "name": "placement update"
      },
      {
        "role_name": "project_create",
        "name": "project create"
      },
      {
        "role_name": "project_delete",
        "name": "project delete"
      },
      {
        "role_name": "project_read",
        "name": "project read"
      },
      {
        "role_name": "project_update",
        "name": "project update"
      },
      {
        "role_name": "subcourse_create",
        "name": "subcourse create"
      },
      {
        "role_name": "subcourse_delete",
        "name": "subcourse delete"
      },
      {
        "role_name": "subcourse_read",
        "name": "subcourse read"
      },
      {
        "role_name": "subcourse_update",
        "name": "subcourse update"
      },
      {
        "role_name": "subject_create",
        "name": "subject create"
      },
      {
        "role_name": "subject_delete",
        "name": "subject delete"
      },
      {
        "role_name": "subject_read",
        "name": "subject read"
      },
      {
        "role_name": "subject_update",
        "name": "subject update"
      },
      {
        "role_name": "users_create",
        "name": "users create"
      },
      {
        "role_name": "users_delete",
        "name": "users delete"
      },
      {
        "role_name": "users_read",
        "name": "users read"
      },
      {
        "role_name": "users_search",
        "name": "users search"
      },
      {
        "role_name": "users_update",
        "name": "users update"
      }
   ]

           this.roles_assigned = [];
      }

  }

  

  cancel(){
    

    this.roles=  [
      {
        "role_name": "admission_update",
        "name": "admission update"
      },
      {
        "role_name": "admission_create",
        "name": "admission create"
      },
      {
        "role_name": "admission_delete",
        "name": "admission delete"
      },
      {
        "role_name": "admission_read",
        "name": "admission read"
      },
      {
        "role_name": "apply_discount",
        "name": "apply discount"
      },
      {
        "role_name": "assignment_addAnswers",
        "name": "assignment addAnswers"
      },
      {
        "role_name": "assignment_create",
        "name": "assignment create"
      },
      {
        "role_name": "assignment_delete",
        "name": "assignment delete"
      },
      {
        "role_name": "assignment_read",
        "name": "assignment read"
      },
      {
        "role_name": "assignment_update",
        "name": "assignment update"
      },
      {
        "role_name": "attendance_addMultipleAttendance",
        "name": "attendance addMultipleAttendance"
      },
      {
        "role_name": "attendance_create",
        "name": "attendance create"
      },
      {
        "role_name": "attendance_delete",
        "name": "attendance delete"
      },
      {
        "role_name": "attendance_read",
        "name": "attendance read"
      },
      {
        "role_name": "attendance_update",
        "name": "attendance update"
      },
      {
        "role_name": "batch_create",
        "name": "batch create"
      },
      {
        "role_name": "batch_delete",
        "name": "batch delete"
      },
      {
        "role_name": "batch_read",
        "name": "batch read"
      },
      {
        "role_name": "batch_sendMessage",
        "name": "batch sendMessage"
      },
      {
        "role_name": "batch_sendMessageToTeacher",
        "name": "batch sendMessageToTeacher"
      },
      {
        "role_name": "batch_update",
        "name": "batch update"
      },
      {
        "role_name": "company_create",
        "name": "company create"
      },
      {
        "role_name": "company_delete",
        "name": "company delete"
      },
      {
        "role_name": "company_read",
        "name": "company read"
      },
      {
        "role_name": "company_update",
        "name": "company update"
      },
      {
        "role_name": "course_create",
        "name": "course create"
      },
      {
        "role_name": "course_delete",
        "name": "course delete"
      },
      {
        "role_name": "course_read",
        "name": "course read"
      },
      {
        "role_name": "course_update",
        "name": "course update"
      },
      {
        "role_name": "dashboard_staff_birthdays",
        "name": "dashboard staff birthdays"
      },
      {
        "role_name": "dashboard_stats",
        "name": "dashboard stats"
      },
      {
        "role_name": "designations_create",
        "name": "designations create"
      },
      {
        "role_name": "designations_delete",
        "name": "designations delete"
      },
      {
        "role_name": "designations_read",
        "name": "designations read"
      },
      {
        "role_name": "designations_update",
        "name": "designations update"
      },
      {
        "role_name": "enquiry_create",
        "name": "enquiry create"
      },
      {
        "role_name": "enquiry_delete",
        "name": "enquiry delete"
      },
      {
        "role_name": "enquiry_read",
        "name": "enquiry read"
      },
      {
        "role_name": "enquiry_update",
        "name": "enquiry update"
      },
      {
        "role_name": "exam_create",
        "name": "exam create"
      },
      {
        "role_name": "exam_delete",
        "name": "exam delete"
      },
      {
        "role_name": "exam_getSessions",
        "name": "exam getSessions"
      },
      {
        "role_name": "exam_read",
        "name": "exam read"
      },
      {
        "role_name": "exam_startexam",
        "name": "exam startexam"
      },
      {
        "role_name": "exam_startexam",
        "name": "exam startexam"
      },
      {
        "role_name": "exam_update",
        "name": "exam update"
      },
      {
        "role_name": "exam_updateSessions",
        "name": "exam updateSessions"
      },
      {
        "role_name": "exam_updateSubmission",
        "name": "exam updateSubmission"
      },
      {
        "role_name": "examanswer_create",
        "name": "examanswer create"
      },
      {
        "role_name": "examanswer_delete",
        "name": "examanswer delete"
      },
      {
        "role_name": "examanswer_deleteAnswersOfAdmission",
        "name": "examanswer deleteAnswersOfAdmission"
      },
      {
        "role_name": "examanswer_read",
        "name": "examanswer read"
      },
      {
        "role_name": "examformat_create",
        "name": "examformat create"
      },
      {
        "role_name": "examformat_delete",
        "name": "examformat delete"
      },
      {
        "role_name": "examformat_read",
        "name": "examformat read"
      },
      {
        "role_name": "examformat_update",
        "name": "examformat update"
      },
      {
        "role_name": "fcm_send_to_all",
        "name": "fcm send to all"
      },
      {
        "role_name": "feedback_addAnswers",
        "name": "feedback addAnswers"
      },
      {
        "role_name": "feedback_delete",
        "name": "feedback delete"
      },
      {
        "role_name": "feestype_create",
        "name": "feestype create"
      },
      {
        "role_name": "feestype_delete",
        "name": "feestype delete"
      },
      {
        "role_name": "feestype_read",
        "name": "feestype read"
      },
      {
        "role_name": "feestype_update",
        "name": "feestype update"
      },
      {
        "role_name": "followUpMode_delete",
        "name": "followUpMode delete"
      },
      {
        "role_name": "followUpMode_read",
        "name": "followUpMode read"
      },
      {
        "role_name": "followUpMode_update",
        "name": "followUpMode update"
      },
      {
        "role_name": "history_read",
        "name": "history read"
      },
      {
        "role_name": "leave_create",
        "name": "leave create"
      },
      {
        "role_name": "leave_delete",
        "name": "leave delete"
      },
      {
        "role_name": "leave_read",
        "name": "leave read"
      },
      {
        "role_name": "leave_update",
        "name": "leave update"
      },
      {
        "role_name": "logins_delete",
        "name": "logins delete"
      },
      {
        "role_name": "manageTask_create",
        "name": "manageTask create"
      },
      {
        "role_name": "manageTask_delete",
        "name": "manageTask delete"
      },
      {
        "role_name": "manageTask_read",
        "name": "manageTask read"
      },
      {
        "role_name": "manageTask_update",
        "name": "manageTask update"
      },
      {
        "role_name": "notes_create",
        "name": "notes create"
      },
      {
        "role_name": "notes_delete",
        "name": "notes delete"
      },
      {
        "role_name": "notes_read",
        "name": "notes read"
      },
      {
        "role_name": "placement_create",
        "name": "placement create"
      },
      {
        "role_name": "placement_delete",
        "name": "placement delete"
      },
      {
        "role_name": "placement_read",
        "name": "placement read"
      },
      {
        "role_name": "placement_sendMessage",
        "name": "placement sendMessage"
      },
      {
        "role_name": "placement_update",
        "name": "placement update"
      },
      {
        "role_name": "project_create",
        "name": "project create"
      },
      {
        "role_name": "project_delete",
        "name": "project delete"
      },
      {
        "role_name": "project_read",
        "name": "project read"
      },
      {
        "role_name": "project_update",
        "name": "project update"
      },
      {
        "role_name": "subcourse_create",
        "name": "subcourse create"
      },
      {
        "role_name": "subcourse_delete",
        "name": "subcourse delete"
      },
      {
        "role_name": "subcourse_read",
        "name": "subcourse read"
      },
      {
        "role_name": "subcourse_update",
        "name": "subcourse update"
      },
      {
        "role_name": "subject_create",
        "name": "subject create"
      },
      {
        "role_name": "subject_delete",
        "name": "subject delete"
      },
      {
        "role_name": "subject_read",
        "name": "subject read"
      },
      {
        "role_name": "subject_update",
        "name": "subject update"
      },
      {
        "role_name": "users_create",
        "name": "users create"
      },
      {
        "role_name": "users_delete",
        "name": "users delete"
      },
      {
        "role_name": "users_read",
        "name": "users read"
      },
      {
        "role_name": "users_search",
        "name": "users search"
      },
      {
        "role_name": "users_update",
        "name": "users update"
      }
   ]
    
    
   this.display_add =true;
   this.display_edit=false;

   

    this.roles_assigned = [];

  }

  addRole($key){
    
    this.roles.splice($key,1)
    this.roles_assigned.push($key)
  }

  removeRole($key){
    this.roles_assigned.splice($key,1)
    this.roles.push($key)
  }
  
  activate(id){
    const active_designation ={
      "id" : this.designations[id]['id'],
      "status" : "Active"
      
    }
    this.master.updateDesignations(active_designation).subscribe(res=>{
      this.toastr.success('Designation Activated', 'Success', {
        timeOut: 2000
      });
      this.designations[id]['status'] = "Active"
    },
    err=> this.inactivate(id)
    )
  }
  
  inactivate(id){
    const active_designation ={
      "id" : this.designations[id]['id'],
      "status" : "Inactive"
      
    }
    this.master.updateDesignations(active_designation).subscribe(res=>{
      this.toastr.success('Designation Inactivated', 'Success', {
        timeOut: 2000
      });
      this.designations[id]['status'] = "Inactive"
    } ,
    err=> this.activate(id)
    ) 
   }



  editDesignation(id){



    this.gotoTop();

    this.display_add=false;
    this.display_edit=true;

    this.edit_designation.push(id);

      

    this.roles_assigned = id['roles']
        

    this.EditMasterDesignation.controls['editDesignationName'].setValue(id['name'])

   
    for(let key of this.roles_assigned){
           this.roles.splice(key,1)
          } 
        
    
  }

  updateDesignation(){



    if (this.EditMasterDesignation.invalid) {
      this.toastr.error('Please fill mandatory fields', 'Fields Are Empty', {
        timeOut: 2000
      });
      
      return;
    }
    else{
    
    
      this.edit_designation[0]["name"] = this.EditMasterDesignation.controls['editDesignationName'].value,
      this.edit_designation[0]["roles"] = this.roles_assigned,
      
      this.edit_designation[0]["updatedAt"] = new Date().toISOString(),
    
    this.master.updateDesignations(this.edit_designation[0]).subscribe(res=>{
      this.toastr.success('Designation Updated Successfully', 'Success', {
        timeOut: 2000
      });

      this.designations=[]
      this.getAllDesignations()
    },err=>{
      this.toastr.error('Check Internet Connection', 'Something Went Wrong', {
        timeOut: 2000
      });
    }
      )


      this.roles=  [
        {
          "role_name": "admission_update",
          "name": "admission update"
        },
        {
          "role_name": "admission_create",
          "name": "admission create"
        },
        {
          "role_name": "admission_delete",
          "name": "admission delete"
        },
        {
          "role_name": "admission_read",
          "name": "admission read"
        },
        {
          "role_name": "apply_discount",
          "name": "apply discount"
        },
        {
          "role_name": "assignment_addAnswers",
          "name": "assignment addAnswers"
        },
        {
          "role_name": "assignment_create",
          "name": "assignment create"
        },
        {
          "role_name": "assignment_delete",
          "name": "assignment delete"
        },
        {
          "role_name": "assignment_read",
          "name": "assignment read"
        },
        {
          "role_name": "assignment_update",
          "name": "assignment update"
        },
        {
          "role_name": "attendance_addMultipleAttendance",
          "name": "attendance addMultipleAttendance"
        },
        {
          "role_name": "attendance_create",
          "name": "attendance create"
        },
        {
          "role_name": "attendance_delete",
          "name": "attendance delete"
        },
        {
          "role_name": "attendance_read",
          "name": "attendance read"
        },
        {
          "role_name": "attendance_update",
          "name": "attendance update"
        },
        {
          "role_name": "batch_create",
          "name": "batch create"
        },
        {
          "role_name": "batch_delete",
          "name": "batch delete"
        },
        {
          "role_name": "batch_read",
          "name": "batch read"
        },
        {
          "role_name": "batch_sendMessage",
          "name": "batch sendMessage"
        },
        {
          "role_name": "batch_sendMessageToTeacher",
          "name": "batch sendMessageToTeacher"
        },
        {
          "role_name": "batch_update",
          "name": "batch update"
        },
        {
          "role_name": "company_create",
          "name": "company create"
        },
        {
          "role_name": "company_delete",
          "name": "company delete"
        },
        {
          "role_name": "company_read",
          "name": "company read"
        },
        {
          "role_name": "company_update",
          "name": "company update"
        },
        {
          "role_name": "course_create",
          "name": "course create"
        },
        {
          "role_name": "course_delete",
          "name": "course delete"
        },
        {
          "role_name": "course_read",
          "name": "course read"
        },
        {
          "role_name": "course_update",
          "name": "course update"
        },
        {
          "role_name": "dashboard_staff_birthdays",
          "name": "dashboard staff birthdays"
        },
        {
          "role_name": "dashboard_stats",
          "name": "dashboard stats"
        },
        {
          "role_name": "designations_create",
          "name": "designations create"
        },
        {
          "role_name": "designations_delete",
          "name": "designations delete"
        },
        {
          "role_name": "designations_read",
          "name": "designations read"
        },
        {
          "role_name": "designations_update",
          "name": "designations update"
        },
        {
          "role_name": "enquiry_create",
          "name": "enquiry create"
        },
        {
          "role_name": "enquiry_delete",
          "name": "enquiry delete"
        },
        {
          "role_name": "enquiry_read",
          "name": "enquiry read"
        },
        {
          "role_name": "enquiry_update",
          "name": "enquiry update"
        },
        {
          "role_name": "exam_create",
          "name": "exam create"
        },
        {
          "role_name": "exam_delete",
          "name": "exam delete"
        },
        {
          "role_name": "exam_getSessions",
          "name": "exam getSessions"
        },
        {
          "role_name": "exam_read",
          "name": "exam read"
        },
        {
          "role_name": "exam_startexam",
          "name": "exam startexam"
        },
        {
          "role_name": "exam_startexam",
          "name": "exam startexam"
        },
        {
          "role_name": "exam_update",
          "name": "exam update"
        },
        {
          "role_name": "exam_updateSessions",
          "name": "exam updateSessions"
        },
        {
          "role_name": "exam_updateSubmission",
          "name": "exam updateSubmission"
        },
        {
          "role_name": "examanswer_create",
          "name": "examanswer create"
        },
        {
          "role_name": "examanswer_delete",
          "name": "examanswer delete"
        },
        {
          "role_name": "examanswer_deleteAnswersOfAdmission",
          "name": "examanswer deleteAnswersOfAdmission"
        },
        {
          "role_name": "examanswer_read",
          "name": "examanswer read"
        },
        {
          "role_name": "examformat_create",
          "name": "examformat create"
        },
        {
          "role_name": "examformat_delete",
          "name": "examformat delete"
        },
        {
          "role_name": "examformat_read",
          "name": "examformat read"
        },
        {
          "role_name": "examformat_update",
          "name": "examformat update"
        },
        {
          "role_name": "fcm_send_to_all",
          "name": "fcm send to all"
        },
        {
          "role_name": "feedback_addAnswers",
          "name": "feedback addAnswers"
        },
        {
          "role_name": "feedback_delete",
          "name": "feedback delete"
        },
        {
          "role_name": "feestype_create",
          "name": "feestype create"
        },
        {
          "role_name": "feestype_delete",
          "name": "feestype delete"
        },
        {
          "role_name": "feestype_read",
          "name": "feestype read"
        },
        {
          "role_name": "feestype_update",
          "name": "feestype update"
        },
        {
          "role_name": "followUpMode_delete",
          "name": "followUpMode delete"
        },
        {
          "role_name": "followUpMode_read",
          "name": "followUpMode read"
        },
        {
          "role_name": "followUpMode_update",
          "name": "followUpMode update"
        },
        {
          "role_name": "history_read",
          "name": "history read"
        },
        {
          "role_name": "leave_create",
          "name": "leave create"
        },
        {
          "role_name": "leave_delete",
          "name": "leave delete"
        },
        {
          "role_name": "leave_read",
          "name": "leave read"
        },
        {
          "role_name": "leave_update",
          "name": "leave update"
        },
        {
          "role_name": "logins_delete",
          "name": "logins delete"
        },
        {
          "role_name": "manageTask_create",
          "name": "manageTask create"
        },
        {
          "role_name": "manageTask_delete",
          "name": "manageTask delete"
        },
        {
          "role_name": "manageTask_read",
          "name": "manageTask read"
        },
        {
          "role_name": "manageTask_update",
          "name": "manageTask update"
        },
        {
          "role_name": "notes_create",
          "name": "notes create"
        },
        {
          "role_name": "notes_delete",
          "name": "notes delete"
        },
        {
          "role_name": "notes_read",
          "name": "notes read"
        },
        {
          "role_name": "placement_create",
          "name": "placement create"
        },
        {
          "role_name": "placement_delete",
          "name": "placement delete"
        },
        {
          "role_name": "placement_read",
          "name": "placement read"
        },
        {
          "role_name": "placement_sendMessage",
          "name": "placement sendMessage"
        },
        {
          "role_name": "placement_update",
          "name": "placement update"
        },
        {
          "role_name": "project_create",
          "name": "project create"
        },
        {
          "role_name": "project_delete",
          "name": "project delete"
        },
        {
          "role_name": "project_read",
          "name": "project read"
        },
        {
          "role_name": "project_update",
          "name": "project update"
        },
        {
          "role_name": "subcourse_create",
          "name": "subcourse create"
        },
        {
          "role_name": "subcourse_delete",
          "name": "subcourse delete"
        },
        {
          "role_name": "subcourse_read",
          "name": "subcourse read"
        },
        {
          "role_name": "subcourse_update",
          "name": "subcourse update"
        },
        {
          "role_name": "subject_create",
          "name": "subject create"
        },
        {
          "role_name": "subject_delete",
          "name": "subject delete"
        },
        {
          "role_name": "subject_read",
          "name": "subject read"
        },
        {
          "role_name": "subject_update",
          "name": "subject update"
        },
        {
          "role_name": "users_create",
          "name": "users create"
        },
        {
          "role_name": "users_delete",
          "name": "users delete"
        },
        {
          "role_name": "users_read",
          "name": "users read"
        },
        {
          "role_name": "users_search",
          "name": "users search"
        },
        {
          "role_name": "users_update",
          "name": "users update"
        }
     ]


      this.roles_assigned=[]
      this.EditMasterDesignation.controls['editDesignationName'].setValue('')

      this.display_edit=false;
      this.display_add=true;
      
    }
      

        }


        gotoTop() {
          window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
          });
        }
        
        addShow(){

          this.addshow= !(this.addshow)
      
        }
      


        reset(){


          this.roles=  [
            {
              "role_name": "admission_update",
              "name": "admission update"
            },
            {
              "role_name": "admission_create",
              "name": "admission create"
            },
            {
              "role_name": "admission_delete",
              "name": "admission delete"
            },
            {
              "role_name": "admission_read",
              "name": "admission read"
            },
            {
              "role_name": "apply_discount",
              "name": "apply discount"
            },
            {
              "role_name": "assignment_addAnswers",
              "name": "assignment addAnswers"
            },
            {
              "role_name": "assignment_create",
              "name": "assignment create"
            },
            {
              "role_name": "assignment_delete",
              "name": "assignment delete"
            },
            {
              "role_name": "assignment_read",
              "name": "assignment read"
            },
            {
              "role_name": "assignment_update",
              "name": "assignment update"
            },
            {
              "role_name": "attendance_addMultipleAttendance",
              "name": "attendance addMultipleAttendance"
            },
            {
              "role_name": "attendance_create",
              "name": "attendance create"
            },
            {
              "role_name": "attendance_delete",
              "name": "attendance delete"
            },
            {
              "role_name": "attendance_read",
              "name": "attendance read"
            },
            {
              "role_name": "attendance_update",
              "name": "attendance update"
            },
            {
              "role_name": "batch_create",
              "name": "batch create"
            },
            {
              "role_name": "batch_delete",
              "name": "batch delete"
            },
            {
              "role_name": "batch_read",
              "name": "batch read"
            },
            {
              "role_name": "batch_sendMessage",
              "name": "batch sendMessage"
            },
            {
              "role_name": "batch_sendMessageToTeacher",
              "name": "batch sendMessageToTeacher"
            },
            {
              "role_name": "batch_update",
              "name": "batch update"
            },
            {
              "role_name": "company_create",
              "name": "company create"
            },
            {
              "role_name": "company_delete",
              "name": "company delete"
            },
            {
              "role_name": "company_read",
              "name": "company read"
            },
            {
              "role_name": "company_update",
              "name": "company update"
            },
            {
              "role_name": "course_create",
              "name": "course create"
            },
            {
              "role_name": "course_delete",
              "name": "course delete"
            },
            {
              "role_name": "course_read",
              "name": "course read"
            },
            {
              "role_name": "course_update",
              "name": "course update"
            },
            {
              "role_name": "dashboard_staff_birthdays",
              "name": "dashboard staff birthdays"
            },
            {
              "role_name": "dashboard_stats",
              "name": "dashboard stats"
            },
            {
              "role_name": "designations_create",
              "name": "designations create"
            },
            {
              "role_name": "designations_delete",
              "name": "designations delete"
            },
            {
              "role_name": "designations_read",
              "name": "designations read"
            },
            {
              "role_name": "designations_update",
              "name": "designations update"
            },
            {
              "role_name": "enquiry_create",
              "name": "enquiry create"
            },
            {
              "role_name": "enquiry_delete",
              "name": "enquiry delete"
            },
            {
              "role_name": "enquiry_read",
              "name": "enquiry read"
            },
            {
              "role_name": "enquiry_update",
              "name": "enquiry update"
            },
            {
              "role_name": "exam_create",
              "name": "exam create"
            },
            {
              "role_name": "exam_delete",
              "name": "exam delete"
            },
            {
              "role_name": "exam_getSessions",
              "name": "exam getSessions"
            },
            {
              "role_name": "exam_read",
              "name": "exam read"
            },
            {
              "role_name": "exam_startexam",
              "name": "exam startexam"
            },
            {
              "role_name": "exam_startexam",
              "name": "exam startexam"
            },
            {
              "role_name": "exam_update",
              "name": "exam update"
            },
            {
              "role_name": "exam_updateSessions",
              "name": "exam updateSessions"
            },
            {
              "role_name": "exam_updateSubmission",
              "name": "exam updateSubmission"
            },
            {
              "role_name": "examanswer_create",
              "name": "examanswer create"
            },
            {
              "role_name": "examanswer_delete",
              "name": "examanswer delete"
            },
            {
              "role_name": "examanswer_deleteAnswersOfAdmission",
              "name": "examanswer deleteAnswersOfAdmission"
            },
            {
              "role_name": "examanswer_read",
              "name": "examanswer read"
            },
            {
              "role_name": "examformat_create",
              "name": "examformat create"
            },
            {
              "role_name": "examformat_delete",
              "name": "examformat delete"
            },
            {
              "role_name": "examformat_read",
              "name": "examformat read"
            },
            {
              "role_name": "examformat_update",
              "name": "examformat update"
            },
            {
              "role_name": "fcm_send_to_all",
              "name": "fcm send to all"
            },
            {
              "role_name": "feedback_addAnswers",
              "name": "feedback addAnswers"
            },
            {
              "role_name": "feedback_delete",
              "name": "feedback delete"
            },
            {
              "role_name": "feestype_create",
              "name": "feestype create"
            },
            {
              "role_name": "feestype_delete",
              "name": "feestype delete"
            },
            {
              "role_name": "feestype_read",
              "name": "feestype read"
            },
            {
              "role_name": "feestype_update",
              "name": "feestype update"
            },
            {
              "role_name": "followUpMode_delete",
              "name": "followUpMode delete"
            },
            {
              "role_name": "followUpMode_read",
              "name": "followUpMode read"
            },
            {
              "role_name": "followUpMode_update",
              "name": "followUpMode update"
            },
            {
              "role_name": "history_read",
              "name": "history read"
            },
            {
              "role_name": "leave_create",
              "name": "leave create"
            },
            {
              "role_name": "leave_delete",
              "name": "leave delete"
            },
            {
              "role_name": "leave_read",
              "name": "leave read"
            },
            {
              "role_name": "leave_update",
              "name": "leave update"
            },
            {
              "role_name": "logins_delete",
              "name": "logins delete"
            },
            {
              "role_name": "manageTask_create",
              "name": "manageTask create"
            },
            {
              "role_name": "manageTask_delete",
              "name": "manageTask delete"
            },
            {
              "role_name": "manageTask_read",
              "name": "manageTask read"
            },
            {
              "role_name": "manageTask_update",
              "name": "manageTask update"
            },
            {
              "role_name": "notes_create",
              "name": "notes create"
            },
            {
              "role_name": "notes_delete",
              "name": "notes delete"
            },
            {
              "role_name": "notes_read",
              "name": "notes read"
            },
            {
              "role_name": "placement_create",
              "name": "placement create"
            },
            {
              "role_name": "placement_delete",
              "name": "placement delete"
            },
            {
              "role_name": "placement_read",
              "name": "placement read"
            },
            {
              "role_name": "placement_sendMessage",
              "name": "placement sendMessage"
            },
            {
              "role_name": "placement_update",
              "name": "placement update"
            },
            {
              "role_name": "project_create",
              "name": "project create"
            },
            {
              "role_name": "project_delete",
              "name": "project delete"
            },
            {
              "role_name": "project_read",
              "name": "project read"
            },
            {
              "role_name": "project_update",
              "name": "project update"
            },
            {
              "role_name": "subcourse_create",
              "name": "subcourse create"
            },
            {
              "role_name": "subcourse_delete",
              "name": "subcourse delete"
            },
            {
              "role_name": "subcourse_read",
              "name": "subcourse read"
            },
            {
              "role_name": "subcourse_update",
              "name": "subcourse update"
            },
            {
              "role_name": "subject_create",
              "name": "subject create"
            },
            {
              "role_name": "subject_delete",
              "name": "subject delete"
            },
            {
              "role_name": "subject_read",
              "name": "subject read"
            },
            {
              "role_name": "subject_update",
              "name": "subject update"
            },
            {
              "role_name": "users_create",
              "name": "users create"
            },
            {
              "role_name": "users_delete",
              "name": "users delete"
            },
            {
              "role_name": "users_read",
              "name": "users read"
            },
            {
              "role_name": "users_search",
              "name": "users search"
            },
            {
              "role_name": "users_update",
              "name": "users update"
            }
         ]

         this.roles_assigned=[]
         this.MasterDesignation.controls['designationName'].setValue('');
        }
}



