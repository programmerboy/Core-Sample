import { AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { REGEX } from '../const/regexs';

export class NumberValidators {

  static range(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
        return { 'range': true };
      }
      return null;
    };
  }

  static decimal(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && (isNaN(c.value) || !REGEX.decimal.test(c.value))) {
        return { 'decimal': true };
      }
      return null;
    };
  }

}


