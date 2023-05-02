import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  MatPaginator
} from '@angular/material/paginator';
import {
  MatSort
} from '@angular/material/sort';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  AssignmentService
} from '../../services/assignment.service';
import {
  Router
} from '@angular/router';
import {
  ToastrService
} from 'ngx-toastr';
import { UrlService } from 'src/app/services/url.service';

export class assignment {
  S_no: number;
  assignment: string;
  description: string;
  marks: number;
  photo: string;
  multiplePhoto: string
  imgURL: string;
  imgType: string

}
@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  constructor(private _assignment: AssignmentService,
    private address : UrlService,
    private toastr: ToastrService,
    private route: Router) {}
  ngOnInit() {
    this._assignment.batch().subscribe(
      res => {
        this.batchName = res["results"];
      },
      err=>{
        
        this.toastr.error('Network Error', 'Please Check Internet Connection', {
          timeOut: 2000
        });
      }
    )

  }
  placeholder
  tomorrow = new Date();
  assignment_arr = []
  uploadImage = false
  multipleImage = false
  sr = 1;
  batchName
  assignmentName
  lastDate
  question
  description
  images
  imageUploadActive = false
  imgFileUpload = "No"
  Upload = "No"
  multipleUpload = "No"
  marks
  selectBranch
  displayedColumns: string[] = [
    'S_no',
    'assignment',
    'description',
    'marks',
    'photo',
    'multiplePhoto',
    'action'
  ];
  dataSource = new MatTableDataSource < assignment > ();
  @ViewChild(MatPaginator, {
    static: true
  }) paginator: MatPaginator;
  @ViewChild(MatSort, {
    static: true
  }) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // ***********************
  Upload1() {
    if (this.uploadImage == true) {
      this.Upload = "Yes"
    } else {
      this.Upload = "No"
    }
  }
  multipleUpload1() {
    if (this.multipleImage == true)
      this.multipleUpload = "Yes"
    else
      this.multipleUpload = "No"
  }

  addQuestion() {

    if (this.question == null) {

      this.toastr.error('Please Enter Question Field', 'Error Field Empty', {
        timeOut: 3000
      });
    } else if (this.description == null) {

      this.toastr.error('Please Enter Description Field', 'Error Field Empty', {
        timeOut: 3000
      });
    } else if (this.marks == null) {

      this.toastr.error('Please Enter Marks Field', 'Error Field Empty', {
        timeOut: 3000
      });
    } else

    if (this.imageUploadActive == true) {
      this.assignment_arr.push({
        S_no: this.sr++,
        assignment: this.question,
        description: this.description,
        marks: this.marks,
        photo: this.Upload,
        multiplePhoto: this.multipleUpload,
        imgURL: this.image,
        imgType: this.img_Type


      })
      this.toastr.success('Question Add Successfull', 'Successfull', {
        timeOut: 2000
      });;
      this.clear();
    } else {
      this.assignment_arr.push({
        S_no: this.sr++,
        assignment: this.question,
        description: this.description,
        marks: this.marks,
        photo: this.Upload,
        multiplePhoto: this.multipleUpload,
        imgURL: '',
        imgType: ''


      })
      this.toastr.success('Question Add Successfull', 'Successfull', {
        timeOut: 2000
      });;
      this.clear();
    }

  }
  clear() {
    this.dataSource = new MatTableDataSource(this.assignment_arr)

    this.question = null;
    this.description = null;
    this.marks = null,
      this.Upload = 'No';
    this.multipleUpload = 'No'
    this.uploadImage = false
    this.multipleImage = false


    this.imageUploadActive = false;
  }
  index = 0
  edit(row, i) {
    this.cancel = true;
    this.update = true;
    this.addQuestionButton = false
    this.index = i;

    this.question = row.assignment;
    this.description = row.description;
    this.marks = row.marks;
    if (row.photo == "No") {
      this.Upload = 'No';
      this.uploadImage = false;
    } else {
      this.Upload = "Yes"
      this.uploadImage = true;

    }
    if (row.multiplePhoto == "No") {
      this.multipleUpload = 'No';
      this.multipleImage = false;

    } else {
      this.multipleUpload = "Yes"
      this.multipleImage = true
    }

  }
  delete(row: number) {
    const data = this.dataSource.data;
    data.splice(row, 1);
    this.dataSource.data = data;

  }
  cancel = false;
  update = false;
  addQuestionButton = true;
  Cancel() {
    this.question = '';
    this.description = '';
    this.marks = '';
    this.Upload = '';
    this.multipleUpload = '';
    this.image = '';
    this.img_Type = '';
    this.addQuestionButton = true
    this.cancel = false
    this.update = false
  }
  Update() {
    for (let i in this.dataSource.data) {
      if (this.index == parseInt(i)) {
        this.dataSource.data[i].assignment = this.question;
        this.dataSource.data[i].description = this.description;
        this.dataSource.data[i].marks = this.marks;
        this.dataSource.data[i].photo = this.Upload;
        this.dataSource.data[i].multiplePhoto = this.multipleUpload
        this.dataSource.data[i].imgURL = this.image
        this.dataSource.data[i].imgType = this.img_Type
      }
    }
    this.Cancel();
  }


  // ************************Image 64 Convert *****************
  image
  img_Type
  imgFileUpload1($event): void {
    this.readThis($event.target);
    this.imageUploadActive = true
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      this.img_Type = this.image.substring(5, 15);

    }
    myReader.readAsDataURL(file);
  }
  // *********************************UID ****************************

  generateUUID() { // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 = (performance && performance.now && (performance.now() * 1000)) || 0; //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16; //random number between 0 and 16
      if (d > 0) { //Use timestamp until depleted
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else { //Use microseconds since page-load if supported
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
  // *********************************Data Post *******************************

  addAssignment() {

    if (this.selectBranch == undefined || this.assignmentName == undefined) {
      this.toastr.error('Please Enter Batch Or Assignment Name Field', 'Error Field Empty', {
        timeOut: 3000
      });
    } else
    if (this.lastDate == '' || this.lastDate == undefined) {
      this.toastr.error('Please Select Date', 'Date Not Selected', {
        timeOut: 3000
      });
    } else {

      if (this.dataSource.data.length == 0) {
        this.toastr.error('Please Add Assignment First', 'Add Assignment First', {
          timeOut: 3000
        });
      } else {
        const batch123 = this.batchName.filter(v => (v.name == this.selectBranch))

        let obj = {
          "questions": [{
            question: "",
            description: "",
            photos: [{
              "file": {

              },
              "url": `blob:${this.address.fileurl}${this.generateUUID()}`,
              "resized": {
                "dataURL": '',
                "type": "image/png"
              },
              "dataURL": ""
            }],
            addPhotos: "",
            addMultiplePhotos: "",
            marks: 0,
            id:this.generateUUID()
          }],
          "assignments": [],
          "batch": batch123[0],
          "name": this.assignmentName,
          "lastDate": this.lastDate,
          "status": "Active"
        }


        let arr = this.dataSource.data;
        for (let key in this.dataSource.data) {

          obj.questions.push({
            question: this.dataSource.data[key]["assignment"],
            description: this.dataSource.data[key]["description"],
            photos: [{
              "file": {

              },
              "url": `blob:${this.address.fileurl}${this.generateUUID()}`,
              "resized": {
                "dataURL": this.dataSource.data[key]["imgURL"],
                "type": this.dataSource.data[key]["imgType"]
              },
              "dataURL": this.dataSource.data[key]["imgURL"]
            }],
            addPhotos: this.dataSource.data[key]["photo"] ,
            addMultiplePhotos: this.dataSource.data[key]["multiplePhoto"],
            marks: this.dataSource.data[key]["marks"],
            id: this.generateUUID()
          })
        }


        obj.questions.shift();
        // 
        this._assignment.postData(obj).subscribe(
          res =>{
            this.toastr.success('Assignment Add Successfull', 'Successfull', {
              timeOut: 2000
            });;
    
            this.route.navigate(['/Assignment/assignment-ViewAll'])
          }
          )


      }
    }
  }

}
