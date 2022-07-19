import { Component, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThemeType } from '../../types';
import { ThemeDirective } from './theme.directive';

@Component({
  template: `
    <div
      appTheme
      [theme]="selectedTheme"
      (previousTheme)="getPreviousTheme($event)">
    </div>

    <button class="light-btn" (click)="setTheme('light')">Light Theme</button>
    <button class="dark-btn" (click)="setTheme('dark')">Dark Theme</button>
  `
})
class MockComponent implements OnInit {
  selectedTheme: ThemeType;

  ngOnInit(): void {
    this.setTheme('default');
  }

  setTheme(theme: ThemeType): void {
    this.selectedTheme = theme;
  }

  getPreviousTheme(theme: ThemeType): void {
    // do some actions...
  }
}

describe('ThemeDirective', () => {
  let mockComponent: MockComponent;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        declarations: [MockComponent, ThemeDirective],
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockComponent);
    mockComponent = fixture.componentInstance;
    mockComponent.getPreviousTheme = jasmine.createSpy('getPreviousTheme');

    fixture.detectChanges();
  });

  it('should set the default theme class when component is initialized', () => {
    const mockDiv = fixture.debugElement.query(By.directive(ThemeDirective));
    const divClasses = mockDiv.nativeElement.classList as DOMTokenList;

    expect(divClasses.contains('default')).toBeTrue();
  });

  it('should give the previous theme class when component is initialized', () => {
    expect(mockComponent.getPreviousTheme).toHaveBeenCalledWith(undefined);
  });

  it('should change the current theme to "dark" when the button is clicked', () => {
    const darkThemeBtn = fixture.debugElement.query(By.css('.dark-btn'));

    darkThemeBtn.triggerEventHandler('click', null);
    fixture.detectChanges();

    const mockDiv = fixture.debugElement.query(By.directive(ThemeDirective));
    const divClasses = mockDiv.nativeElement.classList as DOMTokenList;

    expect(divClasses.contains('dark')).toBeTrue();
    expect(mockComponent.getPreviousTheme).toHaveBeenCalledWith('default');
  });

  it('should change the current theme to "light" when the button is clicked', () => {
    const lightThemeBtn = fixture.debugElement.nativeElement.querySelector('.light-btn');

    lightThemeBtn.click();
    fixture.detectChanges();

    const mockDiv = fixture.debugElement.query(By.directive(ThemeDirective));
    const divClasses = mockDiv.nativeElement.classList as DOMTokenList;

    expect(divClasses.contains('light')).toBeTrue();
    expect(mockComponent.getPreviousTheme).toHaveBeenCalledWith('default');
  });
});
