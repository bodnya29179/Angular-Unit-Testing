import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IProduct } from '../../interfaces/index';
import { DumbComponent } from './dumb.component';

const FAKE_PRODUCT: IProduct = {
  id: 'fake-id',
  name: 'fake-name',
  amount: 10,
  price: 5.99,
};

describe('DumbComponent', () => {
  let componentUnderTest: DumbComponent;
  let fixture: ComponentFixture<DumbComponent>;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        declarations: [ DumbComponent ]
      })
      .overrideComponent(DumbComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DumbComponent);

    componentUnderTest = fixture.componentInstance;
    componentUnderTest.product = FAKE_PRODUCT;

    fixture.detectChanges();
  });

  it('should create an instance of component', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should render the amount actions when isAmountShown is equal to true', () => {
    componentUnderTest.isAmountShown = true;

    fixture.detectChanges();

    const buttons = fixture.debugElement.query(By.css('.amount-btn'));

    expect(buttons).toBeTruthy();
  });

  it('should hide the amount actions when isAmountShown is equal to false', () => {
    componentUnderTest.isAmountShown = false;

    fixture.detectChanges();

    const buttons = fixture.debugElement.query(By.css('.amount-btn'));

    expect(buttons).toBeFalsy();
  });

  it('should disable the minus button when the product amount is equal to zero', () => {
    componentUnderTest.isAmountShown = true;
    componentUnderTest.product = { ...FAKE_PRODUCT, amount: 0 };

    fixture.detectChanges();

    const minusButton = fixture.debugElement.query(By.css('.minus-btn'));
    const isDisabled = minusButton.nativeElement.disabled;

    expect(isDisabled).toBeTrue();
  });

  it('should emmit the minusProduct event when the user clicks on it', () => {
    spyOn(componentUnderTest.minusProduct, 'emit').and.callThrough();

    componentUnderTest.isAmountShown = true;
    fixture.detectChanges();

    const minusButton = fixture.debugElement.nativeElement.querySelector('.minus-btn');
    minusButton.click();

    expect(componentUnderTest.minusProduct.emit).toHaveBeenCalled();
  });

  /*  The same tests for other action buttons... */
});
