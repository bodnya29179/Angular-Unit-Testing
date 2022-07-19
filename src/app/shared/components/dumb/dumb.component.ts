import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../interfaces';

@Component({
  selector: 'app-dumb',
  templateUrl: './dumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DumbComponent {
  @Input()
  product: IProduct;
  @Input()
  isAmountShown = false;
  @Input()
  isAddBtnShown = false;
  @Input()
  isRemoveBtnShown = false;

  @Output()
  addToCart = new EventEmitter<void>();
  @Output()
  removeFromCart = new EventEmitter<void>();
  @Output()
  minusProduct = new EventEmitter<void>();
  @Output()
  plusProduct = new EventEmitter<void>();
}
