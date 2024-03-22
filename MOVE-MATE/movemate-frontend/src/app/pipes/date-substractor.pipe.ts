import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateSubstractor'
})
export class DateSubstractorPipe implements PipeTransform {

  transform(value: string[], ...args: unknown[]): unknown {
    var dDate = value[0].split('-');
    var depDate = new Date(Number(dDate[0]), Number(dDate[1]) - 1, Number(dDate[2]));

    var aDate = value[1].split('-');
    var arrivDate = new Date(Number(aDate[0]), Number(aDate[1]) - 1, Number(aDate[2]));

    var diff = Math.abs(arrivDate.getTime() - depDate.getTime());

    return Math.ceil(diff / (1000 * 3600 * 24));
  }

}
