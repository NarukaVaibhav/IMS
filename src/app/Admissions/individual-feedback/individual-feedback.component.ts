import {Component,OnInit} from '@angular/core';
import {AddNewHTTPService} from '../../services/add-new-http.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-individual-feedback',
  templateUrl: './individual-feedback.component.html',
  styleUrls: ['./individual-feedback.component.css']
})
export class IndividualFeedbackComponent implements OnInit {

  feedbackName;
  teacherName;
  studentName;
  courseName;
  batchName;

  feedbackTable;

  constructor(private modalService: NgbModal, public httpserv: AddNewHTTPService) { }

  ngOnInit() {
    var records  = this.httpserv.getterForFeedbackData();

    this.feedbackName = records[0]['feedbackTitle'];
    this.teacherName = records[0]['batch']['teacher']['name'];
    this.courseName = records[0]['batch']['meta']['course']['name'];
    this.batchName = records[0]['batch']['name'];
    // table data not present
  }

}
