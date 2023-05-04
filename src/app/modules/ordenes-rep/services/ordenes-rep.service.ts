/** Angular core */
import { Injectable, OnInit } from '@angular/core'

/** Http */
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable, map, of, take, tap } from 'rxjs'

/** App imports */
import { Authentication, AuthenticationConfigService } from '@core/index'

@Injectable({
  providedIn: 'root'
})
export class OrdenesReparacionService {

  private _authType: string
  private _apiUrl: string

  constructor(
      private http: HttpClient
    ){
      this._authType = ''
      this._apiUrl = ''
    }

  loadWorkOrders(): Observable<any>{
    /** MOCKUP DE PRUEBA 
     const url: string = 'assets/data/mockups/db.json' 
      const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json')

      return this.http.get<any>(url, {headers})*/

      /** Si no existe el fichero de conexión con la API devuelve null */
      if(!AuthenticationConfigService.apiConfiguration?.value) {
      return of(null)
    }

    /** Obtenemos los parámetros de conexión a partir del fichero de configuración */
    const auth = new Authentication()

    /** Parametrizamos la llamada http a la API con los parámetros de configuración obtenidos */
    const contentType = auth.getContentType(AuthenticationConfigService.apiConfiguration.value.authentication.type)
    this._apiUrl = AuthenticationConfigService.apiConfiguration.value.url
    this._authType = AuthenticationConfigService.apiConfiguration.value.authentication.type

    const url: string = this._apiUrl + "/rest/IsiParts-WebService/WebListaORs/01"
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json')

    return this.http.get<any>(url, {headers})
    .pipe(
      take(1)
    )
  }

  loadWorkOrder(workOrder: string): Observable<any>{
    if(!AuthenticationConfigService.apiConfiguration?.value) {
      return of(null)
    }

    /** Obtenemos los parámetros de conexión a partir del fichero de configuración */
    const auth = new Authentication()

    /** Parametrizamos la llamada http a la API con los parámetros de configuración obtenidos */
    const contentType = auth.getContentType(AuthenticationConfigService.apiConfiguration.value.authentication.type)
    this._apiUrl = AuthenticationConfigService.apiConfiguration.value.url
    this._authType = AuthenticationConfigService.apiConfiguration.value.authentication.type

    const url: string = `${this._apiUrl}/rest/IsiParts-WebService/WebDatosOR/01/${workOrder}`
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json')

    return this.http.get<any>(url, {headers})
    .pipe(
      take(1)
    )
  }
}