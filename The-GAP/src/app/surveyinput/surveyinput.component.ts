import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder, NgForm } from '@angular/forms';
import { SkillSurveyService } from '../shared/surveyinput.service';
import { SliderService } from './slider.service';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-test',
  templateUrl: './surveyinput.component.html',
  styleUrls: ['./surveyinput.component.css']
})
export class SurveyinputComponent implements OnInit {
  isLoading = false;
  name: string;
  userForm: FormGroup;
  skillForm: FormGroup;
  fields: any;

  constructor(
    private fb: FormBuilder,
    private sss: SkillSurveyService,
    public sd: SliderService,
    private router: Router,
    private htps: HttpService
    ) { }

  ngOnInit() {
    this.isLoading = true;
    this.fields = this.sss.categories;
    this.userForm = this.fb.group({
      type: this.fb.group({
        options: this.fb.array([])
      })
    });
    this.patch();
    this.isLoading = false;
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    const value = form.value['type']['options'];
    console.log(value);
    const dataextracted = this.extractInfoData(value);
    console.log(dataextracted);
    // console.log(this.userForm.value.type);
    // this.htps.sendSurveydata(value).subscribe(
    this.htps.sendSurveydata(dataextracted).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl('/userinfo');
        this.isLoading = false;
      }
    );
  }

  patch() {
    const control =  this.userForm.get('type.options') as FormArray;
    this.fields.forEach(x => {
      control.push(this.patchValues(x.catid, x.catname, x.skill));
    });
  }

  patchValues(cid, label , sarray) {
    this.skillForm = this.fb.group({
      catname: [label],
      catid: [cid],
      skill: this.fb.array([])
    });

    const control = this.skillForm.get('skill') as FormArray;
    sarray.forEach(y => {
      control.push(this.patchskills(y.skillid, y.skillname, y.score, y.desc));
    });

    return this.skillForm;
  }

  patchskills(sid, sname, sc, desc) {
    return this.fb.group({
      skillid: [sid],
      skillname: [sname],
      score: [sc],
      desc: [desc]
    });
  }

  getControls() {
    return (this.userForm.get('type.options') as FormArray).controls;
  }

  onCancel() {
    this.router.navigateByUrl('/userinfo');
  }

  extractInfoData(value) {
    const skills = [];
    for (const cat of value) {
      for (const skill of cat['skill']) {
        skills.push([skill['skillid'], skill['score']]);
      }
    }
    return skills;
  }
}
