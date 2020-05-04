import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {
  transform(value: string, maxChars: number = 30): any {
    if (value && value.length <= maxChars - 4) { return value; }

    return value.substr(0, maxChars - 5) + ' ...';
  }
}
