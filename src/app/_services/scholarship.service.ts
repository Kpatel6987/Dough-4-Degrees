import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Injectable()
export class ScholarshipService {

  constructor(
    private af: AngularFire
  ) { }
  

  addScholarship(uid: String, date: string, name: string, information: string) {
    const user = this.af.database.list('scholarships/' + uid);
    user.update(name, {'date':date, 'name':name, 'information':information});    
  }

  getScholarship(uid: String) {
    return this.af.database.list('scholarships/' + uid);
  }

}