import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { IProduct } from '../../interfaces';
import { ProductFacadeService } from '../../services';

@Component({
  selector: 'app-smart',
  templateUrl: './smart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartComponent implements OnInit, OnDestroy {
  products: IProduct[];

  private unsubscribe$ = new Subject<void>();

  constructor(
    private productFacadeService: ProductFacadeService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.productFacadeService.getProducts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((products: IProduct[]) => {
        this.products = products;
        this.cd.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  async removeFromCart(productId: string): Promise<void> {
    await this.productFacadeService.removeProductFromCart(productId)
      .pipe(take(1))
      .toPromise();

    this.products = this.products.filter(({ id }: IProduct) => id !== productId);

    this.cd.detectChanges();
  }

  async plusProduct(productId: string): Promise<void> {
    await this.productFacadeService.plusProduct(productId)
      .pipe(take(1))
      .toPromise();

    this.products = this.products.map((product: IProduct) => {
      if (product.id === productId) {
        return  { ...product, amount: ++product.amount };
      }

      return product;
    });

    this.cd.detectChanges();
  }

  async minusProduct(productId: string): Promise<void> {
    await this.productFacadeService.minusProduct(productId)
      .pipe(take(1))
      .toPromise();


    this.products = this.products.map((product: IProduct) => {
      if (product.id === productId) {
        return  { ...product, amount: --product.amount };
      }

      return product;
    });

    this.cd.detectChanges();
  }
}
