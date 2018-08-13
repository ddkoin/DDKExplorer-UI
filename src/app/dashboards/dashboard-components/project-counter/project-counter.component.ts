import { Component, AfterViewInit } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';

declare var require: any;
const data: any = require('./data.json');

import { allBlockService } from '../../../shared/services/allBlock.service'
import { allTransactionsService } from '../../../shared/services/allTransactions.service';
//import { transactionsHistoryService } from '../../../shared/services/transactionsHistory.service';

@Component({
  selector: 'project-counter',
  templateUrl: './project-counter.component.html'
})
export class ProjectCounterComponent implements AfterViewInit {

  subtitle: string;
  public height: any = [];
  public transactionHistory: any = [];
  public transactionLength: any = [];
  public trsLineChartData = [
    { data: [], label: 'Transactions '}
  ];
  public balanceLineChartData = [
    { data: [], label: 'Balance '}
  ];
  public lineChartLabels: Array<any> = [
  ];
 public timeFormat = 'DD/MM/YYYY';
  public lineChartOptions: any = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        gridLines: {
          color: "rgba(0, 0, 0, 0.1)"
        }
      }],
      xAxes: [{
        type: "time",
        time: {
          format: this.timeFormat,
          tooltipFormat: 'll'
        },
        scaleLabel: {
          display: true,
          labelString: 'Date'
        }
      }],
    },
    lineTension: 10,
    responsive: true,
    maintainAspectRatio: false,



  };
  public lineChartColors: Array<any> = [
    {
      // grey
      backgroundColor: 'rgba(117,91,241,1)',
      borderColor: 'rgba(117,91,241,1)',
      pointBackgroundColor: 'rgba(117,91,241,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(117,91,241,1)'
    }


  ];
  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';

  // Doughnut
  public doughnutChartLabels: string[] = [
    'Tablet',
    'Desktop',
    'Mobile',
    'Other'
  ];
  public doughnutChartOptions: any = {
    borderWidth: 2,
    maintainAspectRatio: false,
  };
  public doughnutChartData: number[] = [150, 450, 200, 20];
  public doughnutChartType: string = 'doughnut';
  public doughnutChartLegend: boolean = false;

  constructor(private allTx: allTransactionsService, private allBx: allBlockService) {
    this.subtitle = "This is some text within a card block."
  }



  allBlockList() {
    this.allBx.getAllBlocks(25, 0).subscribe(
      resp => {
        if (resp.success) {
          this.height = resp.blocks[0].height;
        }
      },
      error => {
        console.log(error)
      }
    );
  }

  allTransactionsList() {
    this.allTx.getAllTransactions(25, 0).subscribe(
      resp => {
        if (resp.success) {
          this.transactionLength = resp.count;
        }
      },
      error => {
        console.log(error)
      }
    );
  }

  transactionsHistory() {
    this.allTx.getTransactionsHistory().subscribe(
      resp => {
        if (resp.success) {
          var data = [];
          var time = [];
          var balance = [];
          for (let i = 0; i < resp.trsData.length; i++) {
            data[i] = resp.trsData[i].count;
            if(parseInt(resp.trsData[i].amount) !== 0) {
              balance[i] = resp.trsData[i].amount / 100000000;
              if(balance[i] > 45000000) {
                balance[i] = parseInt(balance[i]) - 45000000;
              }
            } else {
              balance[i] = 0;
            }
            var timeFormat = resp.trsData[i].time.split('T')[0].split('-');
            time[i] = parseInt(timeFormat[2]) + '/' + parseInt(timeFormat[1]);
          }
          this.trsLineChartData[0].data = data;
          this.balanceLineChartData[0].data = balance;
          this.lineChartLabels = time;
        } else {
          console.log('error : ', resp);
        }
      },
      error => {
        console.log(error)
      }
    );
  }


  ngAfterViewInit() {
    this.allBlockList();
    this.allTransactionsList();
    this.transactionsHistory();
  }







}
