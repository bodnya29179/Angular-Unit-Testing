import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

@Component({
  template: `<div appHighlight>Test</div>`,
})
class MockComponent {}

describe('HighlightDirective', () => {
  let mockComponent: MockComponent;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent, HighlightDirective],
    });
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MockComponent);
    mockComponent = fixture.componentInstance;
  });

  it('should set yellow background color when mouseenter event is triggered', () => {
    const mockDiv = fixture.debugElement.query(By.directive(HighlightDirective));

    mockDiv.triggerEventHandler('mouseenter', null);

    expect(mockDiv).toBeTruthy();
    expect(mockDiv).toBeDefined();
    expect(mockDiv.nativeElement.style.backgroundColor).toEqual('yellow');
  });

  it('should set transparent background color when mouseleave event is triggered', () => {
    const mockDiv = fixture.debugElement.query(By.directive(HighlightDirective));

    mockDiv.triggerEventHandler('mouseleave', null);

    expect(mockDiv.nativeElement.style.backgroundColor).toEqual('transparent');
  });
});
