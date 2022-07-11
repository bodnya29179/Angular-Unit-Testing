import { Injectable } from '@angular/core';
import { LocalStorageKey } from '../../../enums';

@Injectable()
export class LocalStorageService {
  setValue<T>(key: LocalStorageKey, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getValue<T>(key: LocalStorageKey): T | null {
    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : null;
  }

  removeValue(key: LocalStorageKey): void {
    localStorage.removeItem(key);
  }
}
