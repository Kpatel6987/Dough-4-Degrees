import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/operator/map';

@Injectable()
export class ScholarshipService {

  constructor(
    private af: AngularFire
  ) { }
  

  addScholarship(uid: String, date: string, name: string, information: string) {
    const user = this.af.database.list('scholarships/' + uid);
    user.update(name, {'date':date, 'name':name, 'information':information, 'status': 'In Progress'});    
  }

  getScholarship(uid: String) {
    return this.af.database.list('scholarships/' + uid);
  }

  getSortedScholarships(uid: String) {
    return this.af.database.list('scholarships/' + uid).map((arr) => {
      arr = this.filterScholarship(arr);
      return this.sortScholarship(arr);
    });
  }

  filterScholarship(arr) {
    var newArr = [];
    var date = new Date().toISOString().split('T')[0];
    for (var i = 0; i < arr.length; i++) {
      if (date < arr[i].date) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  }

  sortScholarship(arr) {
    return arr.sort(function(a,b) {
      if (b.date < a.date) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  getScholarshipById(uid, key) {
    return this.af.database.object('scholarships/' + uid + '/' + key);
  }
}