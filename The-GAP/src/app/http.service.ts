import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

    baseUrl = 'http://127.0.0.1:5000/';
    // baseUrl = 'http://172.31.19.71/nginx/';
    temp_parameter = '/0/0/0';

    constructor(private http: HttpClient) {}

    getUserdata() {
        return this.http.get(this.baseUrl + 'users');
    }

    getSurveydata(parameter: string) {
        this.temp_parameter = parameter;
        return this.http.get(this.baseUrl + 'items' + parameter);
    }

    sendSurveydata(formdata) {
        return this.http.post(this.baseUrl + 'items' + this.temp_parameter, formdata);
    }

    getGraphData() {
        return this.http.get(this.baseUrl + 'graph');
    }
}
