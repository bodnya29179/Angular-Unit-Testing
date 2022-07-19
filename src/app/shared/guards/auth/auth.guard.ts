import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Route } from '../../enums';
import { AuthFacadeService } from '../../services';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authFacadeService: AuthFacadeService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.authFacadeService.isLoggedIn$()
      .pipe(
        tap((isLoggedIn: boolean) => {
          if (!isLoggedIn) {
            this.router.navigate([Route.login]);
          }
        })
      );
  }

  canActivateChild(): Observable<boolean> {
    return this.canActivate();
  }
}
