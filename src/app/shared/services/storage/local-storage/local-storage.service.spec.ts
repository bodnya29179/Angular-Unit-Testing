import { TestBed } from '@angular/core/testing';
import { LocalStorageKey } from '../../../enums/index';

import { LocalStorageService } from './local-storage.service';

const FAKE_KEY = 'fake-key';
const FAKE_VALUE = 'fake-value';

describe('LocalStorageService', () => {
  let serviceUnderTest: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService],
    });
  });

  beforeEach(() => {
    serviceUnderTest = TestBed.inject(LocalStorageService);

    spyOn(window.localStorage, 'setItem').and.returnValue();
    spyOn(window.localStorage, 'getItem').and.returnValue(`{ "value": "${ FAKE_VALUE }" }`);
    spyOn(window.localStorage, 'removeItem').and.returnValue();
  })

  it('should create an instance of service', () => {
    expect(serviceUnderTest).toBeTruthy();
  });

  describe('#setValue', () => {
    it('should set item to the local storage', () => {
      serviceUnderTest.setValue(FAKE_KEY as LocalStorageKey, FAKE_VALUE);

      expect(window.localStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('#getValue', () => {
    it('should get item from the local storage', () => {
      serviceUnderTest.getValue(FAKE_KEY as LocalStorageKey);

      expect(window.localStorage.getItem).toHaveBeenCalled();
    });
  });

  describe('#removeValue', () => {
    it('should remove item from the local storage', () => {
      serviceUnderTest.removeValue(FAKE_KEY as LocalStorageKey);

      expect(window.localStorage.removeItem).toHaveBeenCalled();
    });
  });
});
