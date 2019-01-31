import { Component } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

/**
 * @description Initializes main component
 * @class AppComponent
 * @classdesc Main Component logic.
 * @author Hotam Singh
 */
export class AppComponent {
    title = 'app';
    innerSpinner = true;
    constructor(private router: Router) {
        router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                window.scrollTo(0, 0);
            }
        });
    }

}
