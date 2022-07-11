import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToUpperCase',
})
export class ConvertToUpperCasePipe implements PipeTransform {

  transform(value: any): string {
    const isString = typeof value === 'string';

    if (!isString) {
      return '';
    }

    return value.toUpperCase();
  }

}
