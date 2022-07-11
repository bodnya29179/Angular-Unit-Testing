import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';
import { AuthFacadeService } from './auth-facade.service';

describe('AuthFacadeService', () => {
  let serviceUnderTest: AuthFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthFacadeService],
    });
  });

  beforeEach(() => {
    serviceUnderTest = TestBed.inject(AuthFacadeService);
  })

  it('should create an instance of service', () => {
    expect(serviceUnderTest).toBeTruthy();
  });

  describe('#isLoggedIn$ & #setIsLoggedIn', () => {
    it('should set & get the value of isUserLoggedIn$ property', (done: DoneFn) => {
      serviceUnderTest.isLoggedIn$()
        .pipe(take(1))
        .subscribe((isLoggedIn: boolean) => {
          expect(isLoggedIn).toEqual(true);
          done();
        });

      serviceUnderTest.setIsLoggedIn(true);
    });
  });
});
