import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../../../interfaces';
import { ProductService } from '../../http';

@Injectable()
export class ProductFacadeService {
  constructor(private productService: ProductService) {}

  getProducts(): Observable<IProduct[]> {
    return this.productService.getProducts();
  }

  removeProductFromCart(productId: string): Observable<void> {
    return this.productService.removeProduct(productId);
  }

  plusProduct(productId: string): Observable<void> {
    return this.productService.plusProduct(productId);
  }

  minusProduct(productId: string): Observable<void> {
    return this.productService.minusProduct(productId);
  }
}
