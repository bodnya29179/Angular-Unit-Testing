import { IProduct } from '../../interfaces';
import { CalculateTotalPricePipe } from './calculate-total-price.pipe';

const enum Currency {
  usd = '$',
  uah = '₴',
}

const FAKE_PRODUCTS: IProduct[] = [
  { name: 'fake-product-1', price: 10 },
  { name: 'fake-product-2', price: 20 },
  { name: 'fake-product-3', price: 30 },
];

function getFakeTotalPrice(): number {
  return FAKE_PRODUCTS.reduce((sum: number, product: IProduct) => {
    return sum + product.price;
  }, 0);
}

describe('CalculateTotalPricePipe', () => {
  let pipeUnderTest: CalculateTotalPricePipe;

  beforeEach(() => {
    pipeUnderTest = new CalculateTotalPricePipe();
  });

  it('create the instance of pipe', () => {
    expect(pipeUnderTest).toBeTruthy();
  });

  describe('#transform', () => {
    it(`should return 0 ${ Currency.uah } when there are no products`, () => {
      const totalPrice = pipeUnderTest.transform([], Currency.uah);

      expect(totalPrice).toEqual(`0 ${ Currency.uah }`);
    });

    it('should return a total price when there are products', () => {
      const totalPrice = pipeUnderTest.transform(FAKE_PRODUCTS, Currency.usd);
      const fakeTotalPrice = getFakeTotalPrice();

      expect(totalPrice).toEqual(`${ fakeTotalPrice } ${ Currency.usd }`)
    });

    it(`should be called with the ${ Currency.uah } currency`, () => {
      const transformSpy = spyOn(pipeUnderTest, 'transform');

      pipeUnderTest.transform(FAKE_PRODUCTS, Currency.uah);

      expect(transformSpy).toHaveBeenCalledWith(FAKE_PRODUCTS, Currency.uah);
    });
  });
});
