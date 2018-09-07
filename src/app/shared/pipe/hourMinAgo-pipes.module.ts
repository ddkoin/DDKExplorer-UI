
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'hoursMinagofilter'})

export class HoursMinAgoPipeFilter implements PipeTransform {
    
  transform(timestamp: any): any {

    var time;
    
    // Epoch time
        var d = new Date(Date.UTC(2016, 0, 1, 17, 0, 0, 0));
        var t = (d.getTime() / 1000);

        time = new Date((timestamp + t) * 1000);

        var currentTime = new Date().getTime();
        // var diffTime = (currentTime - time.getTime()) / 1000;
        var diffTime = 56678;

        if (diffTime < 60) {
            if(diffTime < 0) {
                diffTime = 0;
            }
            return Math.floor(diffTime) + ' sec ago';
        }

       function convertMinsToHrsMins(minutes) {
            var h = Math.floor(minutes / 60);
            var m = minutes % 60;
            var Hr = h < 10 ? '0' + h : h;
            var Min = m < 10 ? '0' + m : m;
            return Hr + ' Hour ' + Min + ' Minutes ago';
          }

        if (Math.floor(diffTime / 60) <= 1) {
            return Math.floor(diffTime / 60) + ' mins ' + Math.floor(diffTime) + ' sec ago';
        }
        if ((diffTime / 60) < 60) {
            return Math.floor(diffTime / 60) + ' mins '+ Math.floor(diffTime) + ' sec ago';
        }
        if (Math.floor(diffTime / 60 / 60) <= 1) {
            return convertMinsToHrsMins(Math.floor(diffTime / 60));
        }
        if ((diffTime / 60 / 60) < 24) {
            return convertMinsToHrsMins(Math.floor(diffTime / 60));
        }
        if (Math.floor(diffTime / 60 / 60 / 24) <= 1) {
            return Math.floor(diffTime / 60 / 60 / 24) + ' day '+ Math.floor(diffTime / 60 / 60) + ' hours ago';
        }
        if ((diffTime / 60 / 60 / 24) < 30) {
            return Math.floor(diffTime / 60 / 60 / 24) + ' days '+ Math.floor(diffTime / 60 / 60) + ' hours ago'
        }
        if (Math.floor(diffTime / 60 / 60 / 24 / 30) <= 1) {
            return Math.floor(diffTime / 60 / 60 / 24 / 30) + ' month ' + Math.floor(diffTime / 60 / 60 / 24) + ' days ago';
        }
        if ((diffTime / 60 / 60 / 24 / 30) < 12) {
            return Math.floor(diffTime / 60 / 60 / 24 / 30) + ' months ' + Math.floor(diffTime / 60 / 60 / 24) + ' days ago';
        }
        if (Math.floor((diffTime / 60 / 60 / 24 / 30 / 12)) <= 1) {
            return Math.floor(diffTime / 60 / 60 / 24 / 30 / 12) + ' years ' + Math.floor(diffTime / 60 / 60 / 24 / 30) + ' months ago'
        }

        return Math.floor(diffTime / 60 / 60 / 24 / 30 / 12) + ' years ' + Math.floor(diffTime / 60 / 60 / 24 / 30) + ' months ago'
    } 
  }