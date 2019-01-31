import { Component, AfterViewInit, ViewContainerRef } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';

declare var require: any;
const data: any = require('./data.json');

import { BlockService } from '../../../shared/services/block.service'
import { TransactionsService } from '../../../shared/services/transactions.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'project-counter',
  templateUrl: './project-counter.component.html'
})

/**
 * @description Initializes component
 * @implements AfterViewInit
 * @class ProjectCounterComponent
 * @classdesc Main Component logic.
 * @author Hotam Singh
 */
export class ProjectCounterComponent implements AfterViewInit {

  subtitle: string;
  public height: any = [];
  public transactionHistory: any = [];
  public transactionLength: any = [];
  public trsLineChartData = [
    { data: [], label: 'Transactions ' }
  ];
  public balanceLineChartData = [
    { data: [], label: 'Volume ' }
  ];
  public lineChartLabels: Array<any> = [
  ];
  public timeFormat = 'YYYY/DD/MM';
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
          parser: this.timeFormat,
          tooltipFormat: 'll',
          unit: 'day',
          stepSize: 3
        },
        scaleLabel: {
          display: true,
          labelString: 'Days'
        }
      }],
    },
    spanGaps: true,
    lineTension: 10,
    responsive: true,
    maintainAspectRatio: false,
  };
  public lineChartColors: Array<any> = [
    {
      // blue
      backgroundColor: 'rgba(57,139,257,1)',
      pointBackgroundColor: 'rgba(57,139,257,1)',
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

  /**
   * @constructor
   * @param toastr : toast manager
   * @param vcr : view container reference
   * @param transactionService : transaction service
   * @param blockService : block service
   */
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private transactionService: TransactionsService, private blockService: BlockService) {
    this.subtitle = "This is some text within a card block."
  }


  /**
   * @function allBlockList
   * @description get all blocks
   */
  allBlockList() {
    this.blockService.getAllBlocks(25, 0).subscribe(
      resp => {
        if (resp && resp.success) {
          this.height = resp.blocks[0].height;
        }
      },
      error => {
        //this.toastr.error('This is not good!', error);
        console.log(error)
      }
    );
  }

  /**
   * @function allTransactionsList
   * @description get all transactions
   */
  allTransactionsList() {
    this.transactionService.getAllTransactions(25, 0).subscribe(
      resp => {
        if (resp && resp.success) {
          this.transactionLength = resp.count;
        }
      },
      error => {
        //this.toastr.error('This is not good!', error);
        console.log(error)
      }
    );
  }

  /**
   * @function transactionsHistory
   * @description get transactions history for last 14 days
   */
  transactionsHistory() {
    this.transactionService.getTransactionsHistory().subscribe(
      resp => {
        if (resp && resp.success) {
          var data = [];
          var time = [];
          var balance = [];
          for (let i = 0; i < resp.trsData.length; i++) {
            data[i] = resp.trsData[i].count;
            if (parseInt(resp.trsData[i].amount) !== 0) {
              balance[i] = resp.trsData[i].amount / 100000000;
              if (balance[i] > 45000000) {
                balance[i] = parseInt(balance[i]) - 45000000;
              }
            } else {
              balance[i] = 0;
            }
            var timeFormat = resp.trsData[i].time.split('T')[0].split('-');
            time[i] = parseInt(timeFormat[0]) + '/' + parseInt(timeFormat[2]) + '/' + parseInt(timeFormat[1]);
          }
          this.trsLineChartData[0].data = data;
          this.balanceLineChartData[0].data = balance;
          this.lineChartLabels = time;
        } else {
          console.log('error : ', resp);
        }
      },
      error => {
        //this.toastr.error('This is not good!', error);
        console.log(error)
      }
    );
  }

  /**
	 * @implements ngAfterViewInit
	 * @description load view for dashboard component page
	 */
  ngAfterViewInit() {
    this.allBlockList();
    this.allTransactionsList();
    this.transactionsHistory();
  }

}
