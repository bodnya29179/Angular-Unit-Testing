import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProduct } from '../../../interfaces';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    /* return this.http.get(...); */
    return of([
      {
        id: 'fake-id-1',
        name: 'fake-name-1',
        amount: 1,
        price: 1,
      },
      {
        id: 'fake-id-2',
        name: 'fake-name-2',
        amount: 2,
        price: 2,
      },
      {
        id: 'fake-id-3',
        name: 'fake-name-3',
        amount: 3,
        price: 3,
      }
    ]);
  }

  removeProduct(productId: string): Observable<void> {
    /* return this.http.delete(...); */
    return of();
  }

  plusProduct(productId: string): Observable<void> {
    /* return this.http.put(...); */
    return of();
  }

  minusProduct(productId: string): Observable<void> {
    /* return this.http.put(...); */
    return of();
  }
}
