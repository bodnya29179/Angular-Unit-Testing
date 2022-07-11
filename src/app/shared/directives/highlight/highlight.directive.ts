import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.setBackgroundColor('yellow');
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.setBackgroundColor('transparent');
  }

  private setBackgroundColor(color: string): void {
    this.elementRef.nativeElement.style.backgroundColor = color;
  }
}
