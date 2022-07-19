import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let serviceUnderTest: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
  });

  beforeEach(() => {
    serviceUnderTest = TestBed.inject(ProductService);
  })

  it('should create an instance of service', () => {
    expect(serviceUnderTest).toBeTruthy();
  });
});
