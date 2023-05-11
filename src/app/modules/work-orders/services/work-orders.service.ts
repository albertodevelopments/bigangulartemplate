/** Angular core */
import { Injectable } from '@angular/core'

/** Http */
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable, forkJoin, map, of, take } from 'rxjs'

/** App imports */
import { Authentication, AuthenticationConfigService } from '@core/index'
import { EmptyWorkOrder, WorkOrderInterface } from '@modules/work-orders'

@Injectable({
  providedIn: 'root'
})
export class WorkOrdersService {

  private _authType: string
  private _apiUrl: string
  private _contentType: any
  private _currentWorkOrder: BehaviorSubject<WorkOrderInterface>
  public currentWorkOrder$: Observable<WorkOrderInterface>
  private headers: HttpHeaders

  constructor(
      private http: HttpClient,
    ){
      this._authType = ''
      this._apiUrl = ''
      this._currentWorkOrder = new BehaviorSubject<WorkOrderInterface>(EmptyWorkOrder)
      this.currentWorkOrder$ = this._currentWorkOrder.asObservable()

      /** Obtenemos los parámetros de conexión a partir del fichero de configuración */
      const auth = new Authentication()

      /** Parametrizamos la llamada http a la API con los parámetros de configuración obtenidos */
      this._contentType = auth.getContentType(AuthenticationConfigService.apiConfiguration.value.authentication.type)
      this._apiUrl = AuthenticationConfigService.apiConfiguration.value.url
      this._authType = AuthenticationConfigService.apiConfiguration.value.authentication.type
      this.headers = new HttpHeaders().set('Content-Type', 'application/json')
    }

  loadWorkOrders(companyCode: string): Observable<any>{
    /** MOCKUP DE PRUEBA 
     const url: string = 'assets/data/mockups/db.json' 
      const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json')

      return this.http.get<any>(url, {headers})*/

      /** Si no existe el fichero de conexión con la API devuelve null */
    if(!AuthenticationConfigService.apiConfiguration?.value) {
      return of(null)
    }

    const url: string = `${this._apiUrl}/rest/IsiParts-WebService/WebListaORs/${companyCode}`
    return this.http.get<any>(url, {headers: this.headers})
    .pipe(
      take(1),
    )
  }

  loadWorkOrder(companyCode, workOrder: string): Observable<any>{
    if(!AuthenticationConfigService.apiConfiguration?.value) {
      return of(null)
    }

    const url: string = `${this._apiUrl}/rest/IsiParts-WebService/WebDatosOR/${companyCode}/${workOrder}`
    return this.http.get<any>(url, {headers: this.headers})
    .pipe(
      take(1),
      map((response: any) => {
        const {cabecera: currentWorkOrder} = response.response.Respuesta
        this._currentWorkOrder.next(currentWorkOrder)

        return currentWorkOrder
      }
    ))
  }

  updateWorkOrder(request: any, companyCode:string, workOrderCode: string): Observable<any>{
    if(!AuthenticationConfigService.apiConfiguration?.value) {
      return of(null)
    }

    const url: string = `${this._apiUrl}/rest/IsiParts-WebService/WebGrabarOR/${companyCode}/${workOrderCode}`
    return this.http.post<WorkOrderInterface>(url, request, {headers: this.headers})
  }

  createWorkOrder(request: any, companyCode: string): Observable<any>{
    if(!AuthenticationConfigService.apiConfiguration?.value) {
      return of(null)
    }
    const url: string = `${this._apiUrl}/rest/IsiParts-WebService/WebGrabarOR/${companyCode}/alta`
    return this.http.post<WorkOrderInterface>(url, request, {headers: this.headers})
  }

  getCustomerDataCombos(companyCode: string): Observable<any>{
    if(!AuthenticationConfigService.apiConfiguration?.value) {
      return of(null)
    }

    const provinces$ = this.getProvinces(companyCode)
    const paymentCodes$ = this.getPaymentCodes(companyCode)
    const cashDiscount$ = this.getCashDiscount(companyCode)
    const paymentDays$ = this.getPaymentDays(companyCode)
    const surcharge$ = this.getSurcharge(companyCode)
    const priceList$ = this.getPriceList(companyCode)
    const vat$ = this.getVAT(companyCode)
    const currency$ = this.getCurrency(companyCode)

    return forkJoin({
      provinces: provinces$,
      paymentCodes: paymentCodes$,
      cashDiscount: cashDiscount$,
      paymentDays: paymentDays$,
      surcharge: surcharge$,
      priceList: priceList$,
      vat: vat$,
      currency: currency$
    })
  }

  getProvinces(companyCode: string): Observable<any>{
    const url: string = `${this._apiUrl}/rest/IsiParts-WebService/WebHelp/${companyCode}/01/empty/empty`
    
    return this.http.get<any>(url, {headers: this.headers})
      .pipe(
        map(response => {
          const {Respuesta: item} = response.response
          
          return item.map((item:any) => {
            return{
              content: item.provincia_prodes,
              id: item.provincia_pro
            }
          })
        }),
      )
  }

  getCities(companyCode: string, province: string): Observable<any>{
    const url: string = `${this._apiUrl}/rest/IsiParts-WebService/WebHelp/${companyCode}/02/empty/${province}`
        
    return this.http.get<any>(url, {headers: this.headers})
      .pipe(
        map(response => {
          const {Respuesta: item} = response.response
          
          return item.map((item:any) => {
            return{
              content: item.poblacion_pobdes,
              id: item.poblacion_pob
            }
          })
        })
      )
  }

  getPaymentCodes(companyCode: string): Observable<any>{
    let url: string = `${this._apiUrl}/rest/IsiParts-WebService/WebHelp/${companyCode}/06/empty/empty`
    
    return this.http.get<any>(url, {headers: this.headers})
      .pipe(
        map(response => {
          const {Respuesta: item} = response.response
          return item.map((item:any) => {
            return{
              content: item['pago-modo_pgmdes'],
              id: item['pago-modo_pgm']
            }
          })
        })
      )
  }

  getCashDiscount(companyCode: string): Observable<any>{
    let url: string = `${this._apiUrl}/rest/IsiParts-WebService/WebHelp/${companyCode}/07/empty/empty`
    
    return this.http.get<any>(url, {headers: this.headers})
      .pipe(
        map(response => {
          const {Respuesta: item} = response.response
          
          return item.map((item:any) => {
            return{
              content: item['dto-pp_dppdes'],
              id: item['dto-pp_dpp']
            }
          })
        })
      )
  }

  getPaymentDays(companyCode: string): Observable<any>{
    let url: string = `${this._apiUrl}/rest/IsiParts-WebService/WebHelp/${companyCode}/16/empty/empty`
    
    return this.http.get<any>(url, {headers: this.headers})
      .pipe(
        map(response => {
          const {Respuesta: item} = response.response
          
          return item.map((item:any) => {
            return{
              content: item['pago-dias_pgddes'],
              id: item['pago-dias_pgd']
            }
          })
        })
      )
  }

  getSurcharge(companyCode: string): Observable<any>{
    let url: string = `${this._apiUrl}/rest/IsiParts-WebService/WebHelp/${companyCode}/08/empty/empty`
    
    return this.http.get<any>(url, {headers: this.headers})
      .pipe(
        map(response => {
          const {Respuesta: item} = response.response
          
          return item.map((item:any) => {
            return{
              content: item['rec-fin_rfides'],
              id: item['rec-fin_rfi']
            }
          })
        })
      )
  }

  getPriceList(companyCode: string): Observable<any>{
    let url: string = `${this._apiUrl}/rest/IsiParts-WebService/WebHelp/${companyCode}/11/empty/empty`
    
    return this.http.get<any>(url, {headers: this.headers})
      .pipe(
        map(response => {
          const {Respuesta: item} = response.response
          
          return item.map((item:any) => {
            return{
              content: item['tarifa_tardes'],
              id: item['tarifa_tar']
            }
          })
        })
      )
  }

  getVAT(companyCode: string): Observable<any>{
    let url: string = `${this._apiUrl}/rest/IsiParts-WebService/WebHelp/${companyCode}/05/empty/empty`
    
    return this.http.get<any>(url, {headers: this.headers})
      .pipe(
        map(response => {
          const {Respuesta: item} = response.response
          
          return item.map((item:any) => {
            return{
              content: item['iva-cod_ivades'],
              id: item['iva-cod_iva']
            }
          })
        })
      )
  }

  getCurrency(companyCode: string): Observable<any>{
    let url: string = `${this._apiUrl}/rest/IsiParts-WebService/WebHelp/${companyCode}/20/empty/empty`
    
    return this.http.get<any>(url, {headers: this.headers})
      .pipe(
        map(response => {
          const {Respuesta: item} = response.response
          
          return item.map((item:any) => {
            return{
              content: item['divisa_divdes'],
              id: item['divisa_div']
            }
          })
        })
      )
  }
}

