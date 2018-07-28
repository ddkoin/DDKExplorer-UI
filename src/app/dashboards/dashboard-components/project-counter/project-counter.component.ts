import { Component, AfterViewInit } from '@angular/core';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';

declare var require: any;
const data: any = require('./data.json');

import { allBlockService } from '../../../shared/services/allBlock.service'
import { allTransactionsService } from '../../../shared/services/allTransactions.service';
//import { transactionsHistoryService } from '../../../shared/services/transactionsHistory.service'

@Component({
    selector: 'project-counter',
	templateUrl: './project-counter.component.html'
})
export class ProjectCounterComponent implements AfterViewInit { 

    subtitle:string;
    public height : any = [];
    public transactionHistory : any = [];
    public transactionLength: any = [];
		 
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
    
    /* transactionsHistory() {
		this.txHistory.getTransactionsHistory().subscribe(
			resp => {
				if (resp.success) {
          this.transactionHistory = resp.trsData;
				}
			},
			error => {
				console.log(error)
			}
		);
    } */


    ngAfterViewInit(){
        this.allBlockList();
        this.allTransactionsList();
        /* this.transactionsHistory(); */
    }


	public lineChartData: Array<any> = [
        { data: [0, 50, 30, 60, 90, 120, 100, 80], label: 'Sales ' }
	];
	public lineChartLabels: Array<any> = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'Aug'
    ];
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
            gridLines: {
              color: "rgba(0, 0, 0, 0.1)"
            }
          }],
        },
        lineTension:10,
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
    


	
}
