import { AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { REGEX } from '../const/regexs';

export class StringValidators {

  static website(c: AbstractControl) {
    return c.value && !REGEX.link.test(c.value) ? { 'website': true } : null;
  }

}
