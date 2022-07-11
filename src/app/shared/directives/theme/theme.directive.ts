import { Directive, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges } from '@angular/core';
import { ThemeType } from '../../types';

@Directive({
  selector: '[appTheme]'
})
export class ThemeDirective implements OnChanges {
  @Input()
  theme: ThemeType;

  @Output()
  previousTheme = new EventEmitter<ThemeType>();

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.theme) {
      this.setTheme(changes.theme.currentValue);
      this.previousTheme.emit(changes.theme.previousValue);
    }
  }

  private setTheme(selectedTheme: ThemeType): void {
    this.renderer.addClass(this.elementRef.nativeElement, selectedTheme);
  }
}
