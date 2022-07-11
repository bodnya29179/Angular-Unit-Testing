import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductService } from '../../http/index';
import { ProductFacadeService } from './product-facade.service';

describe('ProductFacadeService', () => {
  let serviceUnderTest: ProductFacadeService;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductFacadeService,
        { provide: ProductService, useValue: {} },
      ]
    });
  });

  beforeEach(() => {
    serviceUnderTest = TestBed.inject(ProductFacadeService);

    productService = TestBed.inject(ProductService);
    productService.getProducts = jasmine.createSpy('getProducts').and.callFake(() => of([]));
    productService.removeProduct = jasmine.createSpy('removeProduct').and.callFake(() => of());
    productService.plusProduct = jasmine.createSpy('plusProduct').and.callFake(() => of());
    productService.minusProduct = jasmine.createSpy('minusProduct').and.callFake(() => of());
  });

  it('should create an instance of service', () => {
    expect(serviceUnderTest).toBeTruthy();
  });

  describe('#getProducts', () => {
    it('should call the getProducts method of the ProductService', () => {
      serviceUnderTest.getProducts();

      expect(productService.getProducts).toHaveBeenCalledWith();
    });
  });

  describe('#removeProductFromCart', () => {
    it('should call the removeProduct method of the ProductService', () => {
      const fakeId = 'fake-id';

      serviceUnderTest.removeProductFromCart(fakeId);

      expect(productService.removeProduct).toHaveBeenCalledWith(fakeId);
    });
  });

  describe('#plusProduct', () => {
    it('should call the plusProduct method of the ProductService', () => {
      const fakeId = 'fake-id';

      serviceUnderTest.plusProduct(fakeId);

      expect(productService.plusProduct).toHaveBeenCalledWith(fakeId);
    });
  });

  describe('#minusProduct', () => {
    it('should call the minusProduct method of the ProductService', () => {
      const fakeId = 'fake-id';

      serviceUnderTest.minusProduct(fakeId);

      expect(productService.minusProduct).toHaveBeenCalledWith(fakeId);
    });
  });
});
