/** Angular Core */
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

/** App imports */
import { AuthenticationService, CoreModule } from '@core/index';
import { SharedModule, TranslationService } from '@shared/index';
import { LayoutModule } from '@layout/layout.module';
import { LoaderComponent } from '@shared/modules/loader/components/loader.component';
import { LoaderInterceptorService } from '@core/interceptors/loader.interceptor'
import { AuthInterceptorService } from '@core/interceptors/authorization.interceptor';

/** Incicializamos la aplicación cargando las traducciones. Si devuelve error,
 *  no cargará la página
  */
export function initializeApp(
  translationService: TranslationService,
  authenticationService: AuthenticationService
  ) {
  return async () => {
    const userSession = authenticationService.checkUserLoggedIn()    
    if(userSession){
      await translationService.setTranslations(userSession.CodIdiomaSesion)  
    }else{
      await translationService.setTranslations('es')
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    LayoutModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [TranslationService, AuthenticationService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
