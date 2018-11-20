
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'exponentialStrength' })

export class ExponentialStrengthPipe implements PipeTransform {
  transform(value: any): any {
    var regEx2 = /[0]+$/;
    var calculateFees = value / 100000000;
    return (calculateFees % 1) != 0 ? calculateFees.toFixed(8).toString().replace(regEx2, '') : calculateFees.toString();

  }
}