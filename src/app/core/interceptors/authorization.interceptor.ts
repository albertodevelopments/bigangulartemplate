/** Angular core */
import { Injectable } from '@angular/core'

/** Http */
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http'
import { catchError, finalize, Observable, throwError } from 'rxjs'
import { Authentication, AuthenticationConfigService, AuthenticationService } from '..'
import { Router } from '@angular/router'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    
  private _authType: string

  constructor(
    private authenticationService:AuthenticationService,
    private router: Router
  ){
    this._authType = ''
  }
  intercept(req : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {

    /** Si no existe el fichero de conexión con la API devuelve null */
    if(!AuthenticationConfigService.apiConfiguration?.value) {
      this.router.navigateByUrl('/login')
      return throwError(() => new Error('Ha fallado la autorización') )
    }

    /** Obtenemos los parámetros de conexión a partir del fichero de configuración */
    const auth = new Authentication()

    /** Parametrizamos la llamada http a la API con los parámetros de configuración obtenidos */
    const contentType = auth.getContentType(AuthenticationConfigService.apiConfiguration.value.authentication.type)
    this._authType = AuthenticationConfigService.apiConfiguration.value.authentication.type
    const token = this.authenticationService.getToken()

    let request = req

    if(token){
      request = req.clone({
        setHeaders: {
          authorization: `${this._authType} ${token}`
        }
      })
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        this.router.navigate(['/login'])
        return throwError(() => new Error('Ha fallado la autorización') )
      })
    )
  }
}