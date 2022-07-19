import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthFacadeService } from '../../services/index';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guardUnderTest: AuthGuard;
  let authFacadeService: AuthFacadeService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          }
        },
        { provide: AuthFacadeService, useValue: {} },
      ]
    });
  });

  beforeEach(() => {
    guardUnderTest = TestBed.inject(AuthGuard);

    authFacadeService = TestBed.inject(AuthFacadeService);

    router = TestBed.inject(Router);
    router.navigate = jasmine.createSpy('navigate').and.callThrough();
  })

  it('should create an instance of guard', () => {
    expect(guardUnderTest).toBeTruthy();
  });

  describe('#canActivate', () => {
    it('should return false when the user is not logged in', async () => {
      authFacadeService.isLoggedIn$ = jasmine.createSpy('isLoggedIn$').and.returnValue(of(false));

      const canActivate = await guardUnderTest.canActivate().pipe(take(1)).toPromise();

      expect(canActivate).toBe(false);
    });

    it('should return true when the user is logged in', async () => {
      authFacadeService.isLoggedIn$ = jasmine.createSpy('isLoggedIn$').and.returnValue(of(true));

      const canActivate = await guardUnderTest.canActivate().pipe(take(1)).toPromise();

      expect(canActivate).toBe(true);
    });

    it('should redirect the user to the login page when he is not logged in', async () => {
      authFacadeService.isLoggedIn$ = jasmine.createSpy('isLoggedIn$').and.returnValue(of(false));

      await guardUnderTest.canActivate().pipe(take(1)).toPromise();

      expect(router.navigate).toHaveBeenCalled();
    });
  });

  describe('#canActivateChild', () => {
    it('should return false when the user is not logged in', async () => {
      authFacadeService.isLoggedIn$ = jasmine.createSpy('isLoggedIn$').and.returnValue(of(false));

      const canActivateChild = await guardUnderTest.canActivateChild().pipe(take(1)).toPromise();

      expect(canActivateChild).toBe(false);
    });

    it('should return true when the user is logged in', async () => {
      authFacadeService.isLoggedIn$ = jasmine.createSpy('isLoggedIn$').and.returnValue(of(true));

      const canActivateChild = await guardUnderTest.canActivateChild().pipe(take(1)).toPromise();

      expect(canActivateChild).toBe(true);
    });

    it('should redirect the user to the login page when he is not logged in', async () => {
      authFacadeService.isLoggedIn$ = jasmine.createSpy('isLoggedIn$').and.returnValue(of(false));

      await guardUnderTest.canActivateChild().pipe(take(1)).toPromise();

      expect(router.navigate).toHaveBeenCalled();
    });
  });
});
