
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'exponentialStrength'})

export class ExponentialStrengthPipe implements PipeTransform {
  transform(value: any): any {
    console.log(value);
    var calculateFees = value / 100000000;
    return (value == 0) ? 0 : calculateFees.toFixed(8);
  }
}
