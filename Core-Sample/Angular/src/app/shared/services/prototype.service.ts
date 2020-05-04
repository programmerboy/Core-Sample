import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PrototypeService {

  constructor() { }

  public toProperCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  public getLastPart = function (str: string, separator: string = '\\') {
    if (!str) {
      return '';
    }

    if (str.indexOf(separator) < 0) {
      return str;
    }

    return str.substring(str.lastIndexOf(separator) + 1);
  };

  public getDatePortionFromDateTime(str: string) {
    const pattern = /(0*)(.+)T.*/;
    const results = pattern.exec(str);

    str = results[1].replace(/00/g, '20') + results[2];
    str = str.replace(/-/g, '/');

    const dt = new Date(str);

    return dt;
  }

  public otdGetHtmlTagValue(str: string) {
    const matches = str.match(/<.*?>(.*?)<\/.*?>/i);
    return matches ? matches[1] : null;
  }

  public otdSplitString(str: string) {
    str = str.trim();
    return str.split(' ');
  }

  public otdCleanString(str: string) {
    str = str.trim();
    str = str.replace(/,+/, ',');
    str = str.replace(/\s+/, ' ');

    return str;
  }

  public cleanField(str: string) {
    return str.trim().toLowerCase().replace(/\'/g, '\'\'');
  }

  public otdFindValue(arr: any[], valueToFind: any) {
    return arr.find((element: any) => {
      return element.includes(valueToFind);
    });
  }

}
