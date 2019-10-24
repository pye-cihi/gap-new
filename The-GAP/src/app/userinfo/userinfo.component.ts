import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { SkillSurveyService } from '../shared/surveyinput.service';
import { UserInfoService } from '../shared/userinfo.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  isLoading = false;

  constructor(
    private router: Router,
    private htps: HttpService,
    public sss: SkillSurveyService,
    public uis: UserInfoService) { }

  usages: number;
  supervisors: [];
  supervisees: [];
  ifsupervisor = false;
  supervisor: any;
  temp = [];

  superviseedefault: number;
  supervisordefault: number;
  usedefault: string;

  ngOnInit() {
    // GET all users from backend when the App is initiated
    this.isLoading = true;
    this.autoPop();
  }

  autoPop() {
    if (!this.uis.supervisor) { // if the first time lauching instead of redirect from other page
      this.htps.getUserdata().subscribe(
        data => {
          this.supervisors = data['users'];
          // sort the array by each Dictionary item's "name"
          this.supervisors.sort((a: any, b: any) => a.name.localeCompare(b.name));
          console.log(this.supervisors);
          this.isLoading = false;
        }
      );
    } else {
      this.supervisordefault = this.uis.supervisor;
      this.superviseedefault = this.uis.supervisee;
      this.usages = this.uis.usages;
      this.supervisors = this.uis.supervisors;
      this.supervisees = this.uis.supervisees;
      this.ifsupervisor = this.uis.ifsupervisor;

      this.isLoading = false;
    }

  }

  onSubmit(form: NgForm) {
    this.isLoading = true;

    const value = form.value;
    /// send this value to back end ...
    console.log(value);
    let param1 = 0;
    let param2 = 0;
    let param3 = 0;
    if (value['supervisor'] !== '') { param1 = value['supervisor']; }
    if (value['use'] !== undefined) { param2 = value['use']; }
    if (value['supervisee'] !== undefined) { param3 = value['supervisee']; }
    const temp_value = '/' + param1 + '/' + param2 + '/' + param3;

    // Store the user selections locally on application UserInfoService
    this.uis.supervisor = param1;
    this.uis.usages = param2;
    this.uis.supervisee = param3;

    this.uis.supervisors = this.supervisors;
    this.uis.supervisees = this.supervisees;
    this.uis.ifsupervisor = this.ifsupervisor;

    //  I am sending data to back end and getting data back     ---Start
    this.htps.getSurveydata(temp_value).subscribe(
      data => {
        // Get the data from back end
        //  and pass it to a temp object, which can be utilized by the Survey component
        this.sss.categories = data['items'];
        console.log(this.sss.categories);

        // The Navigation will initiate the Survey Component!
        this.router.navigateByUrl('/survey');
        // Only after the navigation, the component is built
        this.isLoading = false;
      });

    // -------------------------------------------------------------End
  }

  onSelectSup(event) {
    const sid = event.source.value;
    for (const s of this.supervisors) {
      // if (s.eid === sid) {
      if (s['eid'] === sid) {
        this.supervisor = s;
        break;
      }
    }

    if (this.supervisor.rid > 2) {
      this.ifsupervisor = true;
      this.supervisees = this.supervisor.supervisee;
      this.supervisees.sort((a: any, b: any) => a.name.localeCompare(b.name));
    } else { this.ifsupervisor = false; }

  }
}
