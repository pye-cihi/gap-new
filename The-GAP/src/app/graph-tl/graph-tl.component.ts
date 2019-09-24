import { NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { Component } from '@angular/core';
import * as percentile from 'percentile';
import * as  Highcharts from 'highcharts';
import More from 'highcharts/highcharts-more';
More(Highcharts);
import Tree from 'highcharts/modules/treemap';
Tree(Highcharts);
import Heatmap from 'highcharts/modules/heatmap';
Heatmap(Highcharts);
// Load the exporting module.
import Exporting from 'highcharts/modules/exporting';
// Initialize exporting module.
Exporting(Highcharts);

@Component({
  selector: 'app-graph-tl',
  templateUrl: './graph-tl.component.html',
  styleUrls: ['./graph-tl.component.css']
})
export class GraphTlComponent implements OnInit {
  public org_data = [];
  public graph_data = [];
  public cat = [];
  public ifcatselected = false;
  public ifskillselected = false;
  public skill_data = [];
  private per_90 = 0;
  private per_75 = 0;
  private per_25 = 0;
  private per_16 = 0;
  public someValue = 0;
  private sliderID;

  constructor(private router: Router,
    private htps: HttpService) {
  }
  ngOnInit() {
    this.getData();
  }

  public getData(changeVal = null, changeID = null) {
    this.htps.getGraphData().subscribe(
      data => {
        this.org_data = data['gdata'];
        this.getCat(this.org_data);
        if (changeVal == 0 || changeID == 0) {
          this.calculate_GAP(this.org_data);
        }
        else {
          this.calculate_GAP(this.org_data, changeVal, changeID);
        }
        console.log(this.graph_data);
        console.log(this.org_data);

        var chart = Highcharts.chart('container', {
          plotOptions: {
            series: {
              dataLabels: {
                enabled: true,
                align: 'left',
                color: '#FFFFFF',
                verticalAlign: 'top'
              }
            }
          },
          series: [{
            type: 'treemap',

            layoutAlgorithm: 'squarified',
            data: this.graph_data
          }],
          title: {
            text: 'Team Lead Level'
          }
        })
        chart.redraw();
      }
    );
  }

  public getCat(data_list) {
    this.cat = []
    for (var i = 0; i < data_list.length; i++) {
      if (!(this.cat.includes(data_list[i].category))) {
        this.cat.push(data_list[i].category);
      }
    }

  }

  public getSkill(data_list, cat_name) {
    var temp_name = "";
    this.skill_data = []
    for (var i = 0; i < data_list.length; i++) {
      if (data_list[i].category == cat_name) {
        if (temp_name != data_list[i].name) {
          var temp_dic = { 'id': data_list[i].id, 'name': data_list[i].name };
          this.skill_data.push(temp_dic);
          temp_name = data_list[i].name;
        }
      }

    }
  }

  public calcPercentile(data_list) {
    var temp = []
    for (var i = 0; i < data_list.length; i++) {
      temp.push(data_list[i].value);
    }
    temp = temp.sort();

    // this.per_90 = temp[Math.floor(0.90 * temp.length)];
    // this.per_75 = temp[Math.floor(0.75 * temp.length)];
    // this.per_25 = temp[Math.floor(0.25 * temp.length)];
    // this.per_16 = temp[Math.floor(0.16 * temp.length)];

    this.per_90 = percentile(90, temp);
    this.per_75 = percentile(75, temp);
    this.per_25 = percentile(25, temp);
    this.per_16 = percentile(16, temp);

  }

  public calculate_GAP(data_list, changeVal = 0, changeID = 0) {
    this.graph_data = []
    var temp_id = data_list[0].id;
    var temp_name = data_list[0].name;
    var temp_gap = 0;

    for (var i = 0; i < data_list.length; i++) {
      
      if(data_list[i].job_role == 3) { //TL data only
        var temp_need = data_list[i].need;
        //console.log(changeID);
        if (changeID == data_list[i].id) {
          temp_need = changeVal;
          console.log("New need is: " + temp_need + " for id: " + changeID);
        }
  
        if (temp_id == data_list[i].id) {
          if (temp_need - data_list[i].have > 0) {
            temp_gap += temp_need - data_list[i].have;
          }
        }
  
        else {
          var temp_dic = { 'name': temp_name, 'value': temp_gap, 'color': '' };
          if (temp_gap != 0) {
            this.graph_data.push(temp_dic);
          }
          temp_id = data_list[i].id;
          temp_name = data_list[i].name;
          if (temp_need - data_list[i].have > 0) {
            temp_gap = temp_need - data_list[i].have;
          }
          else {
            temp_gap = 0;
          }
        }
    }
    }
    this.calcPercentile(this.graph_data);

    for (var i = 0; i < this.graph_data.length; i++) {
      var temp_value = this.graph_data[i].value;
      if (temp_value >= this.per_90) {
        this.graph_data[i].color = '#96281B';
      }
      else if (temp_value >= this.per_75 && temp_value < this.per_90) {
        this.graph_data[i].color = '#ED5440';
      }
      else if (temp_value >= this.per_25 && temp_value < this.per_75) {
        this.graph_data[i].color = '#8c982c';
      }
      else if (temp_value <= this.per_16) {
        this.graph_data[i].color = '#81B9B4';
      }
    }
  }

  public getSliderScore(data_list, id) {
    var total_people = 0;
    var score = 0;
    
    for(var i = 0; i < data_list.length; i++) {
      if(data_list[i].id == id && data_list[i].job_role == 3) { //TL
        score += data_list[i].need;
        total_people += 1;
      }
    }
    console.log("score is: " + score);
    console.log("total people is: " + total_people);

    this.someValue = Math.round(score/total_people);
    
  }

  public changeGraph(event) {
    console.log("NEW need is: " + event.source.value);
    this.getData(event.source.value, this.sliderID);
  }

  onSelectSup(event) {
    var sid = event.source.value;
    this.getSkill(this.org_data, sid);
    this.ifcatselected = true;
  }
  onSelectSkill(event) {
    var sid = event.source.value;
    this.sliderID = sid;
    this.getSliderScore(this.org_data, sid);
    this.ifskillselected = true;
  }

}