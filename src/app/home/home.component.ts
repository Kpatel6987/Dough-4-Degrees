import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ScholarshipService } from '../_services/scholarship.service';
import { AuthenticationService } from '../_services/authentication.service';
import { FirebaseListObservable} from 'angularfire2';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  private uid: String;
  private scholarships;
  private allScholarships: FirebaseListObservable<any>;

  constructor(
    private scholarshipService : ScholarshipService,
    private authenticationService : AuthenticationService
    ) { }

  ngOnInit() {
    this.authenticationService.getKey().then((res) => {
      this.uid = res;
      this.scholarships = this.scholarshipService.getSortedScholarships(res);
      this.allScholarships = this.scholarshipService.getScholarship(res);
    });
  }

}
