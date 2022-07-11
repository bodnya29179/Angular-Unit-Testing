import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { IProduct } from '../../interfaces/index';
import { ProductFacadeService } from '../../services/index';
import { DumbComponent } from '../dumb/dumb.component';
import { SmartComponent } from './smart.component';

const FAKE_PRODUCTS: IProduct[] = [
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
  },
];

describe('SmartComponent', () => {
  let componentUnderTest: SmartComponent;
  let fixture: ComponentFixture<SmartComponent>;
  let productFacadeService: ProductFacadeService;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        declarations: [SmartComponent, DumbComponent],
        providers: [
          { provide: ProductFacadeService, useValue: {} },
          { provide: ChangeDetectorRef, useValue: {} },
        ]
      })
      .overrideComponent(DumbComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartComponent);
    componentUnderTest = fixture.componentInstance;

    productFacadeService = TestBed.inject(ProductFacadeService);
    productFacadeService.getProducts = jasmine.createSpy('getProducts').and.returnValue(of(JSON.parse(JSON.stringify(FAKE_PRODUCTS))));
    productFacadeService.removeProductFromCart = jasmine.createSpy('removeProductFromCart').and.returnValue(of());
    productFacadeService.minusProduct = jasmine.createSpy('minusProduct').and.returnValue(of());
    productFacadeService.plusProduct = jasmine.createSpy('plusProduct').and.returnValue(of());

    fixture.detectChanges();
  });

  it('should create an instance of component', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should initialize the products', fakeAsync(() => {
      // waiting for the observable response
      tick(500);

      expect(componentUnderTest.products).toEqual(FAKE_PRODUCTS);
      expect(productFacadeService.getProducts).toHaveBeenCalled();
    }));

    it('should render the products', fakeAsync(() => {
      tick(500);

      const products = fixture.debugElement.query(By.directive(DumbComponent));

      expect(products).toBeTruthy();
    }));
  });

  describe('#removeFromCart', () => {
    it('should remove the product from cart - solution 2', fakeAsync(() => {
      componentUnderTest.removeFromCart(FAKE_PRODUCTS[0].id);

      tick(500);

      expect(productFacadeService.removeProductFromCart).toHaveBeenCalledWith(FAKE_PRODUCTS[0].id);
      expect(componentUnderTest.products.length).not.toEqual(FAKE_PRODUCTS.length);
    }));
  });

  describe('#plusProduct', () => {
    it('should increase the amount of product', fakeAsync(() => {
      componentUnderTest.plusProduct(FAKE_PRODUCTS[0].id);

      tick(500);

      expect(productFacadeService.plusProduct).toHaveBeenCalledWith(FAKE_PRODUCTS[0].id);
      expect(componentUnderTest.products[0].amount).not.toEqual(FAKE_PRODUCTS[0].amount);
    }));
  });
});
