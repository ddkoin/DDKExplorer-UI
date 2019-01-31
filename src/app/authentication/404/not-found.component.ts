import { Component, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['not-found.component.css']
})
/**
 * @description Initializes component
 * @implements AfterViewInit
 * @class NotFoundComponent
 * @classdesc Main Component logic.
 * @author Hotam Singh
 */
export class NotFoundComponent implements AfterViewInit {

    /**
	 * @implements ngAfterViewInit
	 * @description load view for not found page
	 */
    ngAfterViewInit() {
        $(function () {
            $(".preloader").fadeOut();
        });
    }

}
