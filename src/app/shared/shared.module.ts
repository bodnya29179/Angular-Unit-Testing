import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { DumbComponent, SmartComponent } from './components';
import { HighlightDirective, ThemeDirective } from './directives';
import { AuthFacadeService, LocalStorageService, ProductService, ProductFacadeService } from './services';
import { CalculateTotalPricePipe, ConvertToUpperCasePipe } from './pipes';
import { TokenInterceptor } from './interceptors';
import { AuthGuard } from './guards';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ConvertToUpperCasePipe,
    CalculateTotalPricePipe,
    HighlightDirective,
    ThemeDirective,
    DumbComponent,
    SmartComponent,
  ],
  providers: [
    AuthFacadeService,
    LocalStorageService,
    ProductService,
    ProductFacadeService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  exports: [
    ConvertToUpperCasePipe,
    CalculateTotalPricePipe,
    HighlightDirective,
    ThemeDirective,
  ],
})
export class SharedModule {}
