import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

/**
 * @description Initializes component
 * @implements OnInit, AfterViewInit
 * @class LoginComponent
 * @classdesc Main Component logic.
 * @author Hotam Singh
 */
export class LoginComponent implements OnInit, AfterViewInit {

    constructor(public router: Router) { }

    ngOnInit() { }

    /**
	 * @implements ngAfterViewInit
	 * @description load view for login page
	 */
    ngAfterViewInit() {
        $(function () {
            $(".preloader").fadeOut();
        });

        $('#to-recover').on("click", function () {
            $("#loginform").slideUp();
            $("#recoverform").fadeIn();
        });
    }

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }

}
