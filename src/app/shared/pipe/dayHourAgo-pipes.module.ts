import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dayHoursMinagofilter' })

export class DayHourAgoPipeFilter implements PipeTransform {

    transform(timestamp: number): any {
        var time;
        // Epoch time
        var d = new Date(Date.UTC(2016, 0, 1, 17, 0, 0, 0));
        var t = (d.getTime() / 1000);

        time = new Date((timestamp + t) * 1000);

        var currentTime = new Date().getTime();
        var diffTime = (currentTime - time.getTime()) / 1000;
        console.log("diffTime : " + diffTime);

        if (diffTime < 60) {
            if (diffTime < 0) {
                diffTime = 0;
            }
            return Math.floor(diffTime) + ' sec ago';
        }
        if ((diffTime / 60) < 60) {
            var t = Math.floor(diffTime / 60);
            return t + ' mins ' + Math.floor((diffTime - (t * 60))) + ' sec ago';
        }
        if ((diffTime / 60 / 60) < 24) {
            var t = Math.floor(diffTime / 60 / 60);
            return t + ' hours ' + Math.floor((diffTime - (t * 60 * 60)) / 60) + ' mins ago';;
        }
        if ((diffTime / 60 / 60 / 24) < 30) {
            var t = Math.floor(diffTime / 60 / 60 / 24);
            return t + ' days ' + Math.floor((diffTime - (t * 60 * 60 * 24)) / 60 / 60) + ' hours ago';
        }
        if ((diffTime / 60 / 60 / 24 / 30) < 12) {
            var t = Math.floor(diffTime / 60 / 60 / 24 / 30);
            return t + ' months ' + Math.floor((diffTime - (t * 60 * 60 * 24 * 30)) / 60 / 60 / 24) + ' days ago';
        }
        var t = Math.floor(diffTime / 60 / 60 / 24 / 30 / 12);
        return t + ' years ' + Math.floor((diffTime - (t * 60 * 60 * 24 * 30 * 12)) / 60 / 60 / 24 / 30) + ' months ago';
    }
}
