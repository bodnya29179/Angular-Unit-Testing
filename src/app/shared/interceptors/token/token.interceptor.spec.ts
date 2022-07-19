import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';
import { LocalStorageKey } from '../../enums/index';
import { LocalStorageService } from '../../services';
import { TokenInterceptor } from './token.interceptor';

const FAKE_DATA = {
  url: 'https://httpbin.org/get',
  token: 'fake-token',
  userId: 'fake-user-id',
};

class MockLocalStorage {
  getValue(key: LocalStorageKey): string | null {
    if (key === LocalStorageKey.token) { return FAKE_DATA.token; }
    if (key === LocalStorageKey.userId) { return FAKE_DATA.userId; }

    return null;
  }
}

describe('TokenInterceptor', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: LocalStorageService,
          useClass: MockLocalStorage,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should add the user token and identifier to http request', inject([HttpClient], (http: HttpClient) => {
    http.get(FAKE_DATA.url).pipe(take(1)).subscribe(console.log);

    const expectedHttpRequest = httpTestingController.expectOne({
      method: 'GET',
      url: FAKE_DATA.url,
    });

    expect(expectedHttpRequest.request.headers.has('Authorization')).toBeTrue();
    expect(expectedHttpRequest.request.headers.has('Identifier')).toBeTrue();
  }));
});
