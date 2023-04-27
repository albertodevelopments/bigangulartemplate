/** Angular core */
import { Injectable, OnInit } from '@angular/core'

/** Http */
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable, of, take, tap } from 'rxjs'

/** App imports */
import { Authentication, AuthenticationConfigService } from '@core/index';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

    private _authType: string
    private _apiUrl: string
    private _menuStructure: BehaviorSubject<any>
    public  menuStructure$: Observable<any>

    constructor(
        private http: HttpClient,
    ){
        this._authType = ''
        this._apiUrl = ''
        this._menuStructure = new BehaviorSubject<any>('')
        this.menuStructure$ = this._menuStructure.asObservable()
    }

    loadMenu(): Observable<any>{
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

        const url: string = this._apiUrl + "/rest/IsiParts-WebService/WebMenu"
        const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json')

        return this.http.get<any>(url, {headers}).pipe(
            take(1),
            /** Nos guardamos en el servicio el objeto con la estructura del menú */
            tap(response => this._menuStructure.next(response))
        )
    }
}

