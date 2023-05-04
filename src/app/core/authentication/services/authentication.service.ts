/** Angular core */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, take, tap, throwError } from 'rxjs';

/** App imports */
import { iAuthentication, Authentication, AuthenticationConfigService, iAuthenticationSuccess, iUserSession } from '@core/index';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _loggedIn: BehaviorSubject<boolean>
  public loggedIn$: Observable<boolean>
  private _token: string
  private _authType: string
  private _apiUrl: string
  private _userSession: BehaviorSubject<iUserSession>
  public userSession$: Observable<iUserSession>

  constructor(private http: HttpClient) {    
    this._loggedIn = new BehaviorSubject<boolean>(false)

    /** Pasamos la variable _loggedIn a un observable para encapsular el servicio
     *  y que sólo se acceda al estado a traves del observable
     */
    this.loggedIn$ = this._loggedIn.asObservable()
    this._token = ''
    this._authType = ''
    this._apiUrl = ''
    this._userSession = new BehaviorSubject<iUserSession>({
        CodUsuarioSesion: '',
        NomUsuarioSesion: '',
        CodIdiomaSesion: '',
        CodEmpresaSesion: '',
        NomEmpresaSesion: '',
        CodVendedorSesion: 0,
        NomVendedorSesion: '',
        CodAgenteSesion: 0,
        NomAgenteSesion: ''
      })
    this.userSession$ = this._userSession.asObservable()
  }

  login(authObject: iAuthentication): Observable<iAuthenticationSuccess | null>{

    /** Si no existe el fichero de conexión con la API devuelve null */
    if(!AuthenticationConfigService.apiConfiguration?.value) {
      return throwError(() => null )
    }

    /** Obtenemos los parámetros de conexión a partir del fichero de configuración */
    const auth = new Authentication()
    auth.setAuthObject(authObject)

    /** Parametrizamos la llamada http a la API con los parámetros de configuración obtenidos */
    this._apiUrl = AuthenticationConfigService.apiConfiguration.value.url
    this._authType = AuthenticationConfigService.apiConfiguration.value.authentication.type

    const body = auth.getAuthenticationRequestData()
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    const url = AuthenticationConfigService.apiConfiguration.value.authentication.url

    return this.http.post<iAuthenticationSuccess>(url, body, {headers}).pipe(
      take(1),
      tap({
        next: result => {
          this.handleSuccessfulLogin(result.response.Tocken)
          this.getAuthenticatedUser(result.response.Tocken).subscribe(userSession => {
            this._userSession.next(userSession)
            this.saveSession(userSession)
          })
        }
      })
    )
  }

  private getAuthenticatedUser(token: string): Observable<iUserSession>{
    const url: string = this._apiUrl + "/rest/IsiParts-WebService/WebGlobalData"
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    // const headers: HttpHeaders = new HttpHeaders({ 'Authorization': `${this._authType} ${token}` }); 

    return this.http.get<any>(url, {headers})
      .pipe(
        take(1),
        map(data => {
          const userSession: iUserSession = {
            CodUsuarioSesion: data.response.VariablesGlobales.CodUsuarioSesion,
            NomUsuarioSesion: data.response.VariablesGlobales.NomUsuarioSesion,
            CodIdiomaSesion: data.response.VariablesGlobales.CodIdiomaSesion,
            CodEmpresaSesion: data.response.VariablesGlobales.CodEmpresaSesion,
            NomEmpresaSesion: data.response.VariablesGlobales.NomEmpresaSesion,
            CodVendedorSesion: data.response.VariablesGlobales.CodEmpresaSesion,
            NomVendedorSesion: data.response.VariablesGlobales.NomVendedorSesion,
            CodAgenteSesion: data.response.VariablesGlobales.CodAgenteSesion,
            NomAgenteSesion: data.response.VariablesGlobales.NomAgenteSesion,
          }
          return userSession
        })
      )
  }

  /** Guardamos el token de autenticación en memoria y en la sesión del navegador */
  private handleSuccessfulLogin(token: string): void{
    this._loggedIn.next(true)
    this._token = token
    this.saveToken(token)
  }

  public handleLogout(): void{
    this._loggedIn.next(false)
    this._token = ''
    this.removeToken()
  }

  private saveToken(token: string): void{
    this.removeToken()
    sessionStorage.setItem('isiPartsToken', token)
  }

  private removeToken(): void{
    if(sessionStorage.getItem('isiPartsToken')){
      sessionStorage.removeItem('isiPartsToken')
    }
  }

  private saveSession(session: iUserSession): void{
    const sessionString = JSON.stringify(session)
    sessionStorage.setItem('isiparts-session', sessionString)
  }

  getToken(): string{
    return sessionStorage.getItem('isiPartsToken') as string
  }

  public checkUserLoggedIn(): iUserSession | null{
    const userSession = sessionStorage.getItem('isiparts-session')
    if(userSession){
      const userSessionObject = JSON.parse(userSession)
      this._userSession.next(userSessionObject)

      return userSessionObject
    }

    return null
  }

  setUserSession(userSessionObject: iUserSession): void{
    this._userSession.next(userSessionObject)
    this.saveSession(userSessionObject)
  }

  public getUserSession(): Observable<iUserSession>{
    return this.userSession$.pipe(
      take(1),
      map(data => {
        return data as iUserSession
      })
    )
  }
}
