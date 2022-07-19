import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AuthFacadeService {
  private isUserLoggedIn$ = new Subject<boolean>();

  isLoggedIn$(): Observable<boolean> {
    return this.isUserLoggedIn$;
  }

  setIsLoggedIn(isLoggedIn: boolean): void {
    this.isUserLoggedIn$.next(isLoggedIn);
  }
}
