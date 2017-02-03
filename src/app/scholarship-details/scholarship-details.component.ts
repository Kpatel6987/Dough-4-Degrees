import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FirebaseObjectObservable} from 'angularfire2';
import { AuthenticationService } from '../_services/authentication.service';
import { ScholarshipService } from '../_services/scholarship.service';
import { ContactsService } from '../_services/contacts.service';

@Component({
  selector: 'app-scholarship-details',
  templateUrl: './scholarship-details.component.html',
  styleUrls: ['./scholarship-details.component.css']
})
export class ScholarshipDetailsComponent implements OnInit {

  private uid: String;
  private scholarship: FirebaseObjectObservable<any>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private authenticationService : AuthenticationService,
    private scholarshipService: ScholarshipService
  ) { }

  ngOnInit() {
    this.loadId();
  }

  loadId() {
    this.authenticationService.getKey().then((res) => {
      this.uid = res;
      this.route.params.subscribe(params => {
        this.scholarship = this.scholarshipService.getScholarshipById(this.uid, params['id']);
      })
    });
  }

  goBack() {
    this.location.back();
  }

}