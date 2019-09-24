import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyinputComponent } from './surveyinput/surveyinput.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { GraphBranchComponent } from './graph-branch/graph-branch.component';
import { GraphDevComponent } from './graph-dev/graph-dev.component';
import { GraphBsaComponent } from './graph-bsa/graph-bsa.component';
import { GraphTlComponent } from './graph-tl/graph-tl.component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/userinfo', pathMatch: 'full'},
    { path: 'userinfo', component: UserinfoComponent},
    { path: 'survey', component: SurveyinputComponent},
    { path: 'branchLevel', component: GraphBranchComponent },
    { path: 'bsaLevel', component: GraphBsaComponent },
    { path: 'devLevel', component: GraphDevComponent },
    { path: 'tlLevel', component: GraphTlComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}