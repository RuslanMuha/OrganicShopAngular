import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appPrice]',
  providers: [{provide: NG_VALIDATORS, useExisting: PriceDirective, multi: true}]
})
export class PriceDirective implements Validator {

  constructor() { }
  registerOnValidatorChange(fn: () => void): void {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value < 0) {
      return {negative: true};
    }
    return null;
  }
}
