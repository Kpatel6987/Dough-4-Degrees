import { Component } from '@angular/core';


@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent  {

  constructor() { }
  model: any = { };

  public addNew: boolean = false;

  displayForm() {
    this.addNew = true;
  }

  hideForm() {
    this.addNew = false;
  }

}
