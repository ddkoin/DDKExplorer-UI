import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

declare var jquery: any;
declare var $: any;

@Component({
    selector: 'full-layout',
    templateUrl: './full.component.html',
    styleUrls: ['./full.component.scss']
})

/**
 * @description Initializes component
 * @implements OnInit
 * @class FullComponent
 * @classdesc Main Component logic.
 * @author Hotam Singh
 */
export class FullComponent implements OnInit {

    color = 'defaultdark';
    showSettings = false;
    showMinisidebar = false;
    showDarktheme = false;

    public config: PerfectScrollbarConfigInterface = {};

    constructor(public router: Router) { }

    /**
	 * @implements ngOnInit
	 * @description navigate to URL
	 */
    ngOnInit() {
        if (this.router.url === '/') {
            this.router.navigate(['/dashboard']);
        }
    }

}
