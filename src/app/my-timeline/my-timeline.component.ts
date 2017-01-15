import { Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { ScholarshipService } from '../_services/scholarship.service'
import { AlertService } from '../_services/alert.service';
import { AngularFire, FirebaseListObservable} from 'angularfire2';
import {
  startOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-my-timeline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './my-timeline.component.html',
  styleUrls: ['./my-timeline.component.css']
})

export class MyTimelineComponent implements OnInit  {

  constructor(
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private af: AngularFire,
    private scholarshipService: ScholarshipService
  ) { }

  model: any = { };
  view: string = 'month';
  private addNew: boolean = false;
  private data: FirebaseListObservable<any[]>;
  private uid: String;

  viewDate: Date = new Date();
  date: string = null;

  actions: CalendarEventAction[] = [{
    label: '<i class="fa fa-fw fa-pencil"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      console.log('Edit event', event);
    }
  }, {
    label: '<i class="fa fa-fw fa-times"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      this.events = this.events.filter(iEvent => iEvent !== event);
    }
  }];

  refresh: Subject<any> = new Subject();


  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;


  ngOnInit() {
    this.loadScholarships();
  }

  increment(): void {

    const addFn: any = {
      day: addDays,
      week: addWeeks,
      month: addMonths
    }[this.view];

    this.viewDate = addFn(this.viewDate, 1);

  }

  decrement(): void {
    const subFn: any = {
      day: subDays,
      week: subWeeks,
      month: subMonths
    }[this.view];
    this.viewDate = subFn(this.viewDate, 1);
  }

  today(): void {
    this.viewDate = new Date();
  }

  dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        (this.activeDayIsOpen === true && this.viewDate === date)
      ) {
        this.activeDayIsOpen = false;
        this.viewDate = date;
        this.date = date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate();
        console.log(this.date);
      } else {
        this.date = date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate();
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }


  eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }
  
  displayForm() {
    this.addNew = true;
  }

  hideForm() {
    this.addNew = false;
  }

  onSubmit() {
    this.scholarshipService.addScholarship(this.uid, this.model.date, this.model.name, this.model.information);
    this.alertService.success('Scholarship Added', false);
    this.addNew = false;
  }

  loadScholarships() {
    this.authenticationService.getKey().then((res) => {
      this.uid = res;
      this.data = this.scholarshipService.getScholarship(res);
      
      this.data.forEach(element => {

        element.forEach(ele => {

          this.events.push({
            start: addDays(new Date(ele.date),1),
            end: addDays(new Date(ele.date),1),
            title: ele.name,
            color: colors.yellow,
            actions: this.actions,
            resizable: {
              beforeStart: true,
              afterEnd: true
            }
          });
          this.refresh.next();

        });

      });
    }).catch((err) => {
      this.alertService.error(err);
    });
  }

}
