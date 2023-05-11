/** Angular core */
import { Component, OnInit, ViewChild } from '@angular/core'
import { forkJoin } from 'rxjs'

/** Router */
import { Router } from '@angular/router'
import { AuthenticationService } from '@core/index'

/** App imports */
import { ClientDataTabComponent, EmptyWorkOrder, WorkOrderTabComponent, WorkOrdersService, mapLanguage } from '@modules/work-orders'

@Component({
  selector: 'app-new-work-order',
  templateUrl: './new-work-order.component.html',
  styleUrls: ['./new-work-order.component.scss']
})
export class NewWorkOrderComponent implements OnInit{

  @ViewChild(ClientDataTabComponent) clientDataComponent: ClientDataTabComponent
  @ViewChild(WorkOrderTabComponent) workOrderComponent: WorkOrderTabComponent

  protected companyCode: string
  protected workOrderData: any
  protected language: string

  constructor(
    private workOrdersService: WorkOrdersService,
    private router: Router,
    private authenticationService: AuthenticationService,
  ){
   this.language = 'es'
   this.workOrderData = null
  }

  ngOnInit(): void {
    this.authenticationService.userSession$.subscribe(userSession => {
      this.companyCode = userSession.CodEmpresaSesion
      this.language = mapLanguage(userSession.CodIdiomaSesion)

      forkJoin({
        provinces: this.workOrdersService.getProvinces(this.companyCode),
        paymentCodes: this.workOrdersService.getPaymentCodes(this.companyCode),
        cashDiscount: this.workOrdersService.getCashDiscount(this.companyCode),
        paymentDays: this.workOrdersService.getPaymentDays(this.companyCode),
        surcharge: this.workOrdersService.getSurcharge(this.companyCode),
        priceList: this.workOrdersService.getPriceList(this.companyCode),
        vat: this.workOrdersService.getVAT(this.companyCode),
        currency: this.workOrdersService.getCurrency(this.companyCode),
      }).subscribe(workOrderData => this.workOrderData = workOrderData)
    })
  }

  goBack(): void{
    this.router.navigateByUrl('layout/or/list')
  }

  saveWorkOrder(): void{

    if(!this.companyCode || this.companyCode === ''){
      return
    }

    const newWorkOrder = {
      ...EmptyWorkOrder,
      /** Tab datos cliente */
      cli: this.clientDataComponent.cli.value, fecdoc: new Date(this.clientDataComponent.fecdoc.value),
      raz: this.clientDataComponent.raz.value, dir: this.clientDataComponent.dir.value,
      pob: this.clientDataComponent.pob, pro: this.clientDataComponent.pro,
      tel: this.clientDataComponent.tel.value, nom: this.clientDataComponent.nom.value,
      cif: this.clientDataComponent.cif.value, pgm: this.clientDataComponent.pgm,
      rfi: this.clientDataComponent.rfi, dpp: this.clientDataComponent.dpp,
      pju: this.clientDataComponent.pju.value, div: this.clientDataComponent.div,
      pgd: this.clientDataComponent.pgd, tar: this.clientDataComponent.tar,
      iva: this.clientDataComponent.iva, ivac: this.clientDataComponent.ivac.value,
      req: this.clientDataComponent.req.value,
      /** Tab orden de reparación */
      codpos: this.clientDataComponent.codpos.value, perfac: this.clientDataComponent.perfac.value,      
      almnro: this.workOrderComponent.almnro.value, km: this.workOrderComponent.km.value,
      mec: this.workOrderComponent.mec.value, com: this.workOrderComponent.com.value,
      sintoma: this.workOrderComponent.sintoma.value, tiprep: this.workOrderComponent.tiprep,
      fecace: new Date(this.workOrderComponent.fecace.value), fecprev: new Date(this.workOrderComponent.fecprev.value),
      maquina: this.workOrderComponent.maquina.value, numser: this.workOrderComponent.numser.value,
      reparacion: this.workOrderComponent.reparacion.value,
    }

    const request = {
      "request": {
        "DatosIniciales": [],
        "DatosFinales": {
          "cabecera": newWorkOrder
        }
      }
    }

    this.workOrdersService.createWorkOrder(request, this.companyCode).subscribe(response => {
      const { Grabado } = response.response
      
      if(Grabado){
        this.router.navigateByUrl('layout/or/list')
      }
    })
  }
}
