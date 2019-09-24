import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SurveyinputComponent } from './surveyinput/surveyinput.component';
import { SkillSurveyService } from './shared/surveyinput.service';
import { MaterialModule } from './material-module';
import { SliderService } from './surveyinput/slider.service';
import { HeaderComponent } from './header/header.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpService } from './http.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { UserInfoService } from './shared/userinfo.service';
import { MatVerticalStepperScrollerDirective } from './shared/stepperscroller.directive';
import { GraphBranchComponent } from './graph-branch/graph-branch.component';
import { GraphDevComponent } from './graph-dev/graph-dev.component';
import { GraphBsaComponent } from './graph-bsa/graph-bsa.component';
import { GraphTlComponent } from './graph-tl/graph-tl.component';


@NgModule({
  declarations: [
    AppComponent,
    SurveyinputComponent,
    HeaderComponent,
    UserinfoComponent,
    LoadingSpinnerComponent,
    MatVerticalStepperScrollerDirective,
    GraphBranchComponent,
    GraphDevComponent,
    GraphBsaComponent,
    GraphTlComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [SkillSurveyService, SliderService, HttpService, UserInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
