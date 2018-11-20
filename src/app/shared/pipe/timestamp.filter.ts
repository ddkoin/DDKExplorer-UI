import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ordinal'
})
// customTimeStamp
export class OrdinalPipe implements PipeTransform {
    transform(timestamp: number): string {
        var d = new Date(Date.UTC(2016, 0, 1, 17, 0, 0, 0));
        var t = d.getTime() / 1000

        var d = new Date((timestamp + t) * 1000);
        var month = d.getMonth() + 1;

        if (month < 10) {
            month = parseInt("0" + month);
        }

        var day = d.getDate();

        if (day < 10) {
            day = parseInt("0" + day);
        }

        var h = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();

        if (h < 10) {
            h = parseInt("0" + h);
        }

        if (m < 10) {
            m = parseInt("0" + m);
        }

        if (s < 10) {
            s = parseInt("0" + s);
        }

        return d.getFullYear() + "/" + month + "/" + day + " " + h + ":" + m + ":" + s;

    }
}