import {Component,OnInit} from '@angular/core';
import {AddNewHTTPService} from '../../services/add-new-http.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-individual-submission',
  templateUrl: './individual-submission.component.html',
  styleUrls: ['./individual-submission.component.css']
})
export class IndividualSubmissionComponent implements OnInit {

  studentName;
  imgURl;

  assignmentName;
  assignmentTable;


  constructor(private modalService: NgbModal, public httpserv: AddNewHTTPService) { }

  ngOnInit() {

    var records = this.httpserv.getterForAssignmentData();

    this.studentName = records[1][0]['name'];
    this.imgURl = records[1][0]['photos'][0]['dataURL'];

    this.assignmentName = records[0][0]['name'];
    this.assignmentTable = records[0][0]['questions'];
    
  }

}
