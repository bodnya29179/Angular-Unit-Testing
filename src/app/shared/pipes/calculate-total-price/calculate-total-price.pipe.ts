import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../../interfaces';

@Pipe({
  name: 'calculateTotalPrice',
})
export class CalculateTotalPricePipe implements PipeTransform {

  transform(products: IProduct[], currency: string): string {
    if (!products?.length) {
      return `0 ${ currency }`;
    }

    const totalPrice = this.getTotalPrice(products);

    return `${ totalPrice } ${ currency }`;
  }

  private getTotalPrice(products: IProduct[]): number {
    return products.reduce((sum: number, product: IProduct) => {
      return sum + product.price;
    }, 0);
  }

}
