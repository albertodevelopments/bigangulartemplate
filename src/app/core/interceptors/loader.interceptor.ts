/** Angular core */
import { Injectable } from '@angular/core'

/** Http */
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http'
import { finalize, Observable } from 'rxjs'

/** App imports */
import { LoaderService } from '@shared/modules/loader/services/loader.service';

@Injectable()
export class LoaderInterceptorService implements HttpInterceptor {
    
  constructor(
    private loaderService: LoaderService
  ){

  }
  intercept(request : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {

    this.loaderService.show()
    
    return next.handle(request).pipe(
      finalize(() => this.loaderService.hide())
    )
  }
}