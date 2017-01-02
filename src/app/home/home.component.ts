import { Component, OnInit } from '@angular/core';
import { ScholarshipService } from '../_services/scholarship.service';
import { AuthenticationService } from '../_services/authentication.service';
import { FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  private uid: String;
  private scholarships: FirebaseListObservable<any>;

  constructor(
    private scholarshipService : ScholarshipService,
    private authenticationService : AuthenticationService
    ) { }

  ngOnInit() {
    this.authenticationService.getKey().then((res) => {
      this.uid = res;
      this.scholarships = this.scholarshipService.getScholarship(res);
    });
  }

}
