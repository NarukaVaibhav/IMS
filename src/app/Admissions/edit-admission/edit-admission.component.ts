import {Component, OnInit, NgZone} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AddNewHTTPService} from '../../services/add-new-http.service';
import { AddUserService } from '../../services/add-user.service';
import { MatTableDataSource } from '@angular/material';
import { ToasterService } from '../../Toast/toaster.service';
import { DatePipe } from '@angular/common';
import { PDFGENERATEService } from '../../pdfgenerate.service';

export interface EducationalData {
  stream: string
  schoolName: string
  boardName: string
  currentStatus: string
  percentage: number
  marksheetFile: File
  marksheet: string
}

export interface allInstallments{
  dueDate
  amount
  status
  transactions
}

export interface CourseName {
  name;
  fee;
  parent;
  status;
  tenant;
  createdAt;
  updatedAt;
  id;
}


@Component({
  selector: 'app-edit-admission',
  templateUrl: './edit-admission.component.html',
  styleUrls: ['./edit-admission.component.css']
})
export class EditAdmissionComponent implements OnInit {
  
  id: string;
  dataSource;
  tabCount = 0;

  today = this.datepipe.transform(new Date(), 'yyyy-MM-dd');

  // holds fetched API course names
  courseNames: CourseName[] = [];

  // holds seleceted course names
  selectedCourses: CourseName[] = [];

  // holds fetched API batch names
  batchNames;
  // holds seleceted batch names
  selectedBatch = [];

  // admisssion type List
  admissionType = ["Direct", "Converted", "Online"];
  selectedAdmissionType: string = "";

  //Registration Date
  dateRegistration;

  //Joining Date
  dateJoining;

  // Reference Name
  refName: string = "";

  // college Name
  collegeName: string = "";

  // categories
  categories = ["GENERAL", "OBC", "SC", "ST", "SBC", "PH", "other"];

  // Gender
  Gender = ["Male", "female", "Other"];

  // Marital Status
  maritalList = ["Married", "Unmarried"];

  // is BPL
  BPLList = ["Yes", "No"];

  // countries
  countries = [];

  // states
  states = [];

  // cities
  cities = [];

  // streams
  Streams = ["Class 10", "Class 12", "Graduation", "Post Graduation", "Other"];

  // Passed/Failed
  currentStatusList = ["Passed", "Failed", "Pursuing"];

  // Image file
  img: File;
  imgPreview;

  ///////// Reciept Tab
  // discount
  discount;

  courseFee: number;
  discountFee: number;
  totalFees: number;

  paidFees;
  dueFees;
  amtToSettle;
  installmentList:allInstallments[] = [];
  // installmentCount = [1];
  installmentDate;
  installmentPending;

  // other Fees
  otherFee;

  // is GSt Applicable
  isGST;
  gstOptions = ["Applicable", "Not Applicable"];

  isGSTIncluded;
  gstOptionsIncluded = ["Included", "Excluded"];

  // referenceNumber
  referenceNumber;

  selectedPaymentSelection;
  paymentSelection = ["Full Payment", "Installments"];

  programName;
  programList = ["Internship", "Training", "PG-DAC", "DASDM"]

  payableModeIsOnline;
  onlineList = ["online", "offline"];

  selectedPaymentMedium;
  paymentMediumList = ["Cash", "Demand Draft", "Cheque", "Free"];


  DD_Cheque_Date;
  DD_Cheque_bankName;
  DD_Cheque_Number;


  admissionUploadFile: File;

  //////////////

  sameAsCorrespondanceAddressStatus;


  ///////// Educational Details
  stream
  schoolName
  boardName
  currentStatus
  percentage;
  marksheet: File;
  displayedColumns: string[] = ['Stream', 'School/College/Institute Name', 'Board/University Name', 'Current Status', 'Percentage', 'Marksheet', 'Action'];
  EducationalDataEntries: EducationalData[] = [];
  ///////////

  // Basic Details form
  studentName
  fatherName
  motherName
  DOB
  category
  mobNumber
  gender
  maritalStatus
  isBPL
  phoneNumber
  alternatePhoneNumber
  email
  address
  pincode
  country;
  state;
  city;
  permanentAddress;
  permanentPincode;
  permanentCountry;
  permanentState;
  permanentCity;
  parentOccupation
  parentPhone
  guardianAddress
  guardianName
  guardianPhone
  eligibleForPlacements;
  EducationalDetails: any;
  
  feeStatus: any;
  createdAt: any;
  payLoadID: any;
  currentSelectedCourse: CourseName;
  currentSelectedBatch: any;
  

  table_button: string = "Add Record";
  
  // following functions are for bootstrap accordian visibility
  step = 0;
  educationalRecordRow: any;
  imagePayload;
  amtToSettleFinal: any;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  ////////////////////////////////////////////////////////////

  constructor(private numtowords: PDFGENERATEService,private router: Router, private toast:ToasterService, public AddNewhttpServe: AddNewHTTPService, private route: ActivatedRoute, public countryhttp: AddUserService,  private _ngZone: NgZone, public datepipe: DatePipe) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id')

      this.AddNewhttpServe.getEditAdmissionData(this.id).subscribe(response=>{

        try{
          this.imgPreview = response["results"][0]["basicDetails"]["photos"][0]["dataURL"];
        }catch{
          this.imgPreview = undefined;
        }
        this.EducationalDetails = response["results"][0]["educationDetails"];

        for(let record in this.EducationalDetails){
          this.EducationalDataEntries.push({
            stream: this.EducationalDetails[record]['stream'],
            schoolName: this.EducationalDetails[record]['collegeName'],
            boardName: this.EducationalDetails[record]['boardUniversityName'],
            currentStatus: this.EducationalDetails[record]['currentStatus'],
            percentage: this.EducationalDetails[record]['markCGPA'],
            marksheetFile: this.EducationalDetails[record]['marksheet'],
            marksheet: this.EducationalDetails[record]['marksheet']?"Uploaded":"NOT Uploaded"
          })
        }
        this.dataSource = new MatTableDataSource(this.EducationalDataEntries);

        // basic details
        this.studentName = response["results"][0]["basicDetails"]["studentName"];
        this.fatherName = response["results"][0]["basicDetails"]["fatherName"];
        this.motherName = response["results"][0]["basicDetails"]["motherName"];
        this.gender = response["results"][0]["basicDetails"]["gender"];
        if(response["results"][0]["basicDetails"]["dateOfBirth"].length ==0 || response["results"][0]["basicDetails"]["dateOfBirth"] ==""){
        }else{
          this.DOB = this.datepipe.transform(response["results"][0]["basicDetails"]["dateOfBirth"], 'yyyy-MM-dd');
        }
        this.maritalStatus = response["results"][0]["basicDetails"]["maritalStatus"];
        this.category = response["results"][0]["basicDetails"]["category"];
        this.isBPL = response["results"][0]["basicDetails"]["isBPL"];
        this.mobNumber = response["results"][0]["basicDetails"]["mobileNumber"];
        this.phoneNumber = response["results"][0]["basicDetails"]["phoneNumber"];
        this.address = response["results"][0]["basicDetails"]["correspondingAddress"]?response["results"][0]["basicDetails"]["correspondingAddress"]["address"]:undefined;
        this.country = response["results"][0]["basicDetails"]["correspondingAddress"]?response["results"][0]["basicDetails"]["correspondingAddress"]["country"]:undefined;
        this.state = response["results"][0]["basicDetails"]["correspondingAddress"]?response["results"][0]["basicDetails"]["correspondingAddress"]["state"]:undefined;
        this.city = response["results"][0]["basicDetails"]["correspondingAddress"]?response["results"][0]["basicDetails"]["correspondingAddress"]["city"]:undefined;
        this.pincode = response["results"][0]["basicDetails"]["correspondingAddress"]?response["results"][0]["basicDetails"]["correspondingAddress"]["pinCode"]:undefined;
        this.permanentAddress = response["results"][0]["basicDetails"]["permanentAddress"]?response["results"][0]["basicDetails"]["permanentAddress"]["address"]:undefined;
        this.permanentCountry = response["results"][0]["basicDetails"]["permanentAddress"]?response["results"][0]["basicDetails"]["permanentAddress"]["country"]:undefined;
        this.permanentState = response["results"][0]["basicDetails"]["permanentAddress"]?response["results"][0]["basicDetails"]["permanentAddress"]["state"]:undefined;
        this.permanentCity = response["results"][0]["basicDetails"]["permanentAddress"]?response["results"][0]["basicDetails"]["permanentAddress"]["city"]:undefined;
        this.permanentPincode = response["results"][0]["basicDetails"]["permanentAddress"]?response["results"][0]["basicDetails"]["permanentAddress"]["pinCode"]:undefined;
        this.email = response["results"][0]["basicDetails"]["emailID"];

        // Office Use Form
        if(response["results"][0]["officeUseForm"]["dateOfRegistration"] != ""){
          this.dateRegistration = this.datepipe.transform(response["results"][0]["officeUseForm"]["dateOfRegistration"], 'yyyy-MM-dd');
        }
        if(response["results"][0]["officeUseForm"]["dateOfJoining"] != ""){
          this.dateJoining = this.datepipe.transform(response["results"][0]["officeUseForm"]["dateOfJoining"], 'yyyy-MM-dd');
        }
        this.selectedCourses = response["results"][0]["officeUseForm"]["course"];
        // this.admissionType = response["results"][0]["officeUseForm"]["admissionType"];
        this.collegeName = response["results"][0]["officeUseForm"]["collegeName"];
        this.selectedBatch = response["results"][0]["officeUseForm"]["batch"];
        
        // receipt
        this.totalFees = response["results"][0]["receipt"]["totalPayableFee"];
        this.selectedPaymentSelection = response["results"][0]["receipt"]["paymentSelection"];
        this.installmentList = response["results"][0]["receipt"]["allInstallments"];
        this.paidFees = response["results"][0]["receipt"]["paidFees"];
        this.courseFee = response["results"][0]["receipt"]["courseFee"];
        this.dueFees = response["results"][0]["receipt"]["dueFees"];
        this.payableModeIsOnline = response["results"][0]["receipt"]["payableMode"];
        this.feeStatus = response["results"][0]["receipt"]["feeStatus"];
        this.installmentList = response["results"][0]["receipt"]['allInstallments']
        this.currentStatus = response["results"][0]["accountStatus"];
        this.createdAt = response["results"][0]["createdAt"];
        this.payLoadID = response["results"][0]["id"];
      }, err=>{
        this.toast.errorstatus0();
      })

      

    })

    this.AddNewhttpServe.getCourse().subscribe(course => {

      // add all the course names to array and bind them in select options
      for (let key in course["results"]) {
        this.courseNames.push(course["results"][key]);
      }
    }, err=>{
      this.toast.errorstatus0();
    })

    this.countryhttp.getCountries().subscribe(
      data => {
        for (let key in data["results"]) {
          this.countries.push(data["results"][key]);
        }

      }, err=>{
        this.toast.errorstatus0();
      })

  }

  // course utility
  //pushes selected courses in selectedCourses array
  selectCourse() {
    this.selectedCourses.push(this.currentSelectedCourse);
    for (let sc in this.selectedCourses) {
      this.courseFee += this.selectedCourses[sc].fee;
    }

    this.totalFees = this.courseFee;
    this.discountFee = this.courseFee;
    // get batches for the selected course
    this.AddNewhttpServe.getBatch(this.currentSelectedCourse.id).subscribe(batchInfo => {
      if (batchInfo["results"].length < 1) {
        this.toast.errorfixhead("No batches Found");
      } else {
        this.batchNames = batchInfo["results"];
      }
    }, err=>{
      this.toast.errorstatus0();
    })
  }

  // removes selected course
  removeCourse(selectedCourseRemove) {
    for (let nameIndex = 0; nameIndex < this.selectedCourses.length; nameIndex++) {
      if (this.selectedCourses[nameIndex].name === selectedCourseRemove.name) {
        this.courseFee-=this.selectedCourses[nameIndex]['fee'];
        this.totalFees = this.courseFee;
        this.discountFee = this.courseFee;
        this.selectedCourses.splice(nameIndex, 1);
      }
    }
  }


  // batch utility
  //pushes selected courses in selectedCourses array
  selectBatch() {
    this.selectedBatch.push(this.currentSelectedBatch);
  }

  // removes selected course
  removeBatch(selectedBatchRemove) {
    for (let nameIndex = 0; nameIndex < this.selectedBatch.length; nameIndex++) {
      if (this.selectedBatch[nameIndex].name === selectedBatchRemove.name) {
        this.selectedBatch.splice(nameIndex, 1);
      }
    }
  }

  // download Admission Format
  downloadAdmissionFormat() {

  }

  uploadImg(event: any) {
    // uploads and previews image
    this.img = event.target.files[0];
    console.log(this.img)
    const reader = new FileReader();
    reader.readAsDataURL(this.img);
    reader.onload = () => {
      this.imgPreview = reader.result;

      this.imagePayload = [
        {
          dataUrl: reader.result,
          file: {},
          type: this.img.type,
        }
      ]

    };
  }

  removeProfile() {
    this.img = null;
    this.imagePayload = null;
    this.imgPreview = null;
  }

  uploadMarkSheet(event: any) {
    // uploads and previews image
    this.marksheet = event.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(this.marksheet);

  }

  uploadAdmissionFile(event: any) {
    this.admissionUploadFile = event.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(this.admissionUploadFile);
  }

  // get a list of all states
  onChangeCountry(countryId: number) {
    if (countryId) {
      this.countryhttp.getStates(countryId).subscribe(
        data => {

          this.states = [];
          for (let key in data["results"]) {
            this.states.push(data["results"][key]);
          }
          this.cities = [];
        }, err=>{
          this.toast.errorstatus0();
        }
      );
    } else {
      this.states = [];
      this.cities = [];
    }
  }

  onChangeState(stateId: number) {
    if (stateId) {
      this.countryhttp.getCities(stateId).subscribe(
        res => {
          this.cities = [];
          for (let key in res["results"]) {
            this.cities.push(res["results"][key]);
          }
        }, err=>{
          this.toast.errorstatus0();
        });
    } else {
      this.cities = [];
    }
  }

  sameAsCorrespondanceAddress(evt) {
    if (evt.target.checked == true) {
      this.permanentAddress = this.address;
      this.permanentCountry = this.country;
      this.permanentState = this.state;
      this.permanentCity = this.city;
      this.permanentPincode = this.pincode;
      this.sameAsCorrespondanceAddressStatus = true;
    } else if (evt.target.checked == false) {
      this.permanentAddress = undefined;
      this.permanentCountry = undefined;
      this.permanentState = undefined;
      this.permanentCity = undefined;
      this.permanentPincode = undefined;
      this.sameAsCorrespondanceAddressStatus = false;
    }

  }

  addEducationalRecord() {

    if(this.table_button == 'Update Record'){

      for(let i in this.dataSource.data){
        if(this.dataSource.data[i] == this.educationalRecordRow){

          this.EducationalDataEntries[i]['stream'] = this.stream,
          this.EducationalDataEntries[i]['schoolName'] = this.schoolName,
          this.EducationalDataEntries[i]['boardName'] = this.boardName,
          this.EducationalDataEntries[i]['currentStatus'] = this.currentStatus,
          this.EducationalDataEntries[i]['percentage'] = this.percentage,
          this.EducationalDataEntries[i]['marksheetFile'] = this.marksheet,
          this.EducationalDataEntries[i]['marksheet'] = this.marksheet?"Uploaded":"NOT Uploaded"

        }
      }
      this.table_button = "Add Record";
    }else{

      if(this.stream == undefined || this.schoolName == undefined || this.boardName == undefined || this.percentage == undefined || this.currentStatus == undefined){
        this.toast.errorfixhead("Empty educational details can't be added");
        return;
      }

      this.EducationalDataEntries.push({
        stream: this.stream,
        schoolName: this.schoolName,
        boardName: this.boardName,
        currentStatus: this.currentStatus,
        percentage: this.percentage,
        marksheetFile: this.marksheet,
        marksheet: this.marksheet?"Uploaded":"NOT Uploaded"
      })
      this.dataSource = new MatTableDataSource(this.EducationalDataEntries);
    }

    this.stream = undefined;
    this.schoolName = undefined;
    this.boardName = undefined;
    this.currentStatus = undefined;
    this.percentage = undefined;
    this.marksheet = undefined;
    this.marksheet = undefined;

    
  }


  submitForm() {
    var course = [];

    for (let v in this.selectedCourses) {
      course.push(v)
    }

    if(this.installmentList.length<1 && this.selectedPaymentSelection == 'Full Payment'){
      this.installmentList.push({
        'dueDate': new Date().toISOString(), 
        'amount' : 0,
        'status' : 'Pending',
        'transactions':[]
      })
      this.dueFees = 0;
      this.amtToSettle = 0;
      this.paidFees = this.totalFees; 
      // this.installmentCount.push(this.installmentCount[this.installmentCount.length - 1] + 1);
    }
    
    if(this.selectedCourses.length == 0){
      this.toast.errorfixhead("Course not selected");
      return;
    }

    if(this.selectedBatch.length == 0){
      this.toast.errorfixhead("Batch not selected");
      return;
    }
    if(this.dateRegistration==undefined){
      this.toast.errorfixhead("Invalid Registration Date");
      return;
    }
    
    if(this.dateJoining==undefined){
      this.toast.errorfixhead("Invalid Joining Date");
      return;
    }

    if(this.collegeName == undefined){
      this.toast.errorfixhead("College Name cannot be empty");
      return;
    }
    if(this.admissionType == undefined){
      this.toast.errorfixhead("Admission Type cannot be empty");
      return;
    }
    
    if(this.studentName == undefined){
      this.toast.errorfixhead("Student Name cannot be empty");
      return;
    }
    
    if(this.fatherName == undefined){
      this.toast.errorfixhead("Father Name cannot be empty");
      return;
    }
    
    if(this.motherName == undefined){
      this.toast.errorfixhead("Mother Name cannot be empty");
      return;
    }
    
    if(this.gender == undefined){
      this.toast.errorfixhead("Gender cannot be empty");
      return;
    }

    if(this.maritalStatus == undefined){
      this.toast.errorfixhead("Marital Status cannot be empty");
      return;
    }
    
    if(this.mobNumber == undefined){
      this.toast.errorfixhead("Mobile Number cannot be empty");
      return;
    }
    
    if(isNaN(this.mobNumber) || this.mobNumber.length!=10){
      this.toast.errorfixhead("Invalid mobile number");
      return;
    }
    if(this.phoneNumber == undefined){
      this.toast.errorfixhead("Phone number cannot be empty");
      return;
    }    
    
    if(isNaN(this.phoneNumber) || this.phoneNumber.length!=10){
      this.toast.errorfixhead("Invalid Phone number");
      return;
    }    
    
    if(this.email == undefined){
    
      this.toast.errorfixhead("Email cannot be empty");
      return;
    }
    
    var re = /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([\.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i;

    if(!re.test(this.email)){
      this.toast.errorfixhead("Invalid Email");
      return;
    }
    if(this.address == undefined){
      this.toast.errorfixhead("Address cannot be empty");
      return;
    }    
    
    if(this.pincode == undefined){
      this.toast.errorfixhead("pincode cannot be empty");
      return;
    }    
    
    if(this.pincode.length!=6 || isNaN(this.pincode)){
      this.toast.errorfixhead("Invalid pincode");
      return;
    }    
    
    if(this.permanentAddress == undefined){
      this.toast.errorfixhead("Address cannot be empty");
      return;
    }    
    
    if(this.permanentPincode == undefined){
      this.toast.errorfixhead("pincode cannot be empty");
      return;
    }

    if(this.permanentPincode.length!=6 || isNaN(this.pincode)){
      this.toast.errorfixhead("Invalid pincode");
      return;
    } 

    
    if(this.payableModeIsOnline == undefined){
      this.toast.errorfixhead("Payment mode cannot be empty");
      return;
    }
    
    if(this.programName == undefined){
      this.toast.errorfixhead("Program Name cannot be empty");
      return;
    }
    
    if(this.payableModeIsOnline == undefined){
      this.toast.errorfixhead("Payment mode not specified");
      return;
    }

    if(this.amtToSettle >0 && this.selectedPaymentSelection == 'Installments'){
      this.toast.errorfixhead("kindly settle due amount in installments");
      return;
    }

    
    
    var AdmissionFormInfo = {
      "officeUseForm": {
        "dateOfRegistration": this.dateRegistration,
        "dateOfJoining": this.dateJoining,
        "course": this.selectedCourses,
        "batch": this.selectedBatch,
        "referenceName": this.refName,
        "collegeName": this.collegeName,
        "admissionType": this.admissionType,
        "eligibleForPlacement": this.eligibleForPlacements
      },
      "basicDetails": {
        "photos": this.imagePayload,
        "studentName": this.studentName,
        "fatherName": this.fatherName,
        "motherName": this.motherName,
        "dateOfBirth": this.DOB,
        "gender": this.gender,
        "maritalStatus": this.maritalStatus,
        "category": this.category,
        "isBPL": this.isBPL,
        "mobileNumber": this.mobNumber,
        "phoneNumber": this.phoneNumber,
        "emailID": this.email,
        "alternatePhoneNumber": this.alternatePhoneNumber,
        "correspondingAddress": {
          "address": this.address,
          "country": this.country,
          "state": this.state,
          "city": this.city,
          "pinCode": this.pincode
        },
        "permanentAddress": {
          "address": this.permanentAddress,
          "country": this.permanentCountry,
          "state": this.permanentState,
          "city": this.permanentCity,
          "pinCode": this.permanentPincode
        },
        "parentOccupaton": this.parentOccupation,
        "parentPhoneNumber": this.parentPhone,
        "guardianName": this.guardianName,
        "guardianPhoneNumber": this.guardianPhone,
        "guardianAddress": this.guardianAddress
      },
      "educationDetails": this.EducationalDataEntries, 
      "receipt": {
        "defaultGSTTax": 18,
        "appliedFees": {
          "fgh": this.otherFee==true?1:0
        },
        "totalPayableFee": this.totalFees,
        "paymentSelection": this.selectedPaymentSelection,
        "allInstallments":this.installmentList,
        "paidFees": this.paidFees,
        "courseFee": this.courseFee,
        "programName": this.programName,
        "appliedDiscount": this.discount,
        "isGSTTaxApplicable": this.isGST,
        "isGSTTaxIncluded": this.isGSTIncluded,
        "payableMode": this.payableModeIsOnline,
        "referenceNumber": this.referenceNumber,
        "dueFees": this.dueFees,
        "amtToSettle": this.amtToSettle,
        "feeStatus": (this.dueFees!=0)?'Pending':'Completed'
      },
      "accountStatus": this.currentStatus,
      "admissionType": this.selectedAdmissionType,
      "submission": "new",
      // "status": "Active",
      "tenant": localStorage.getItem("tenant"),
      "createdAt": this.createdAt,
      "updatedAt": new Date(),
      "id": this.payLoadID
    }



    if (1) {
      this.AddNewhttpServe.updateAdmissions(this.id, JSON.stringify(AdmissionFormInfo)).subscribe(data => {
        this.toast.successfixhead("Admission Updated");
        this.router.navigate(["/Admission/view-admissions"]);
    }, err=>{
      this.toast.errorfixhead("Something went wrong");
    })
    }
  }


  updatePaymentMode(){
    this.installmentList = [];
    // this.installmentCount = [0];
    if(this.selectedPaymentSelection == 'Full Payment'){
      this.amtToSettle = 0;
      this.dueFees = 0;
      this.installmentDate = undefined;
      this.installmentPending = undefined;
    }
  }


  eventAction(element, code) {
    if (code == 'edit') {
      this.educationalRecordRow = element;
      this.table_button = "Update Record";
      this.stream = element['stream'];
      this.schoolName = element['schoolName'];
      this.boardName = element['boardName'];
      this.currentStatus = element['currentStatus'];
      this.percentage = element['percentage'];
      this.marksheet = element['marksheet'];

    } else if (code == 'delete') {
      for (let i = 0; i < this.EducationalDataEntries.length; i++) {
        if (this.dataSource.data[i] == element) {
          this.dataSource.data.splice(i, 1);
          this.dataSource._updateChangeSubscription();
        }
      }
    }
  }

  addOtherFee(stat) {

    if (stat == true) {
      this.totalFees = this.totalFees + 1;
    } else if (stat == false) {
      this.totalFees = this.totalFees - 1;
    }
  }

  applyDiscount(discountValue: number) {

    this.discountFee = this.courseFee - (this.courseFee * Number(discountValue) * 0.01);
    this.totalFees = this.discountFee;
  }

  includeGST(selection) {
    var afterGST: number = 0;

    if (selection == '2: Excluded') {
      afterGST = this.totalFees + (this.totalFees * 0.18);
    } else {
      afterGST = this.totalFees;
    }

    this.totalFees = afterGST;

  }


  updateDueFees(evt){
    this.dueFees = this.totalFees-evt;
    this.amtToSettle = this.dueFees;
    this.amtToSettleFinal = this.dueFees;

    if(this.installmentList.length>0){
      for(let i=0; i<this.installmentList.length; i++){
        this.amtToSettle-=this.installmentList[i]['amount'];
      }
    }

  }

  amountToSettle(value){

    this.amtToSettle = this.amtToSettleFinal-value;
    
  }

  appendInstallment(status) {
    if (status == 'remove' && this.installmentList.length > 0) {
      this.amtToSettleFinal+=this.installmentList[this.installmentList.length-1]['amount'];
      this.amtToSettle = this.amtToSettleFinal;
      this.installmentList.pop();
    } else if (status == 'add') {


      if(this.installmentDate == undefined){
        this.toast.errorfixhead("Installment Date cannot be empty")
        return;
      }
      if(this.installmentPending == undefined){
        this.toast.errorfixhead("Installment amount cannot be empty")
        return;
      }

      this.amtToSettleFinal -= this.installmentPending;

      this.installmentList.push({
        'dueDate': new Date(this.installmentDate).toISOString(), 
        'amount' : this.installmentPending,
        'status' : 'pending',
        'transactions':[]
      })
      // this.installmentCount.push(this.installmentCount[this.installmentCount.length - 1] + 1);
    }
    this.installmentDate = undefined
    this.installmentPending = undefined
  }

  selectTabNext() {
    if (this.tabCount < 3) {
      this.tabCount += 1;
    }
  }
  selectTabPrevious() {
    if (this.tabCount > 0) {
      this.tabCount -= 1;

    }
  }
  isSelected(index){
    if(this.tabCount == index){
      return false;
    }
    else{
      return true;
    }
  }
}
