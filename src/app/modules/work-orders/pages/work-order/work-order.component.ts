/** Angular core */
import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { forkJoin } from 'rxjs'

/** Router */
import { ActivatedRoute, Router } from '@angular/router'
import { AuthenticationService } from '@core/index'

/** App imports */
import { ClientDataTabComponent, EmptyWorkOrder, WorkOrderTabComponent, WorkOrdersService, mapLanguage } from '@modules/work-orders'

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.scss']
})
export class WorkOrderComponent implements OnInit{

  @Input() workOrderData: any

  @ViewChild(ClientDataTabComponent) clientDataComponent: ClientDataTabComponent
  @ViewChild(WorkOrderTabComponent) workOrderComponent: WorkOrderTabComponent

  protected companyCode: string
  protected language: string
  protected workOrderCode: string
  
  constructor(
    private workOrdersService: WorkOrdersService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ){
   this.language = 'es'
   this.workOrderCode = this.route.snapshot.params['or']
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
        workOrder: this.workOrdersService.loadWorkOrder(this.companyCode, this.workOrderCode)
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
      cif: this.clientDataComponent.cif.value, dpp: this.clientDataComponent.dpp,
      pju: this.clientDataComponent.pju.value, div: this.clientDataComponent.div,
      rfi: this.clientDataComponent.rfi, pgm: this.clientDataComponent.pgm,
      pgd: this.clientDataComponent.pgd, tar: this.clientDataComponent.tar,
      iva: this.clientDataComponent.iva, ivac: this.clientDataComponent.ivac.value,
      req: this.clientDataComponent.req.value,
      /** Tab orden de reparación */
      codpos: this.clientDataComponent.codpos.value, perfac: this.clientDataComponent.perfac.value,      
      almnro: this.workOrderComponent.almnro.value, km: this.workOrderComponent.km.value,
      mec: this.workOrderComponent.mec.value, com: this.workOrderComponent.com.value,
      sintoma: this.workOrderComponent.sintoma.value, presupuesto: this.workOrderComponent.presupuesto.value,
      tiprep: this.workOrderComponent.tiprep, fecace: new Date(this.workOrderComponent.fecace.value),
      fecprev: new Date(this.workOrderComponent.fecprev.value), maquina: this.workOrderComponent.maquina.value,
      numser: this.workOrderComponent.numser.value, reparacion: this.workOrderComponent.reparacion.value,
    }

    const request = {
      "request": {
        "DatosIniciales": {
          "cabecera": this.workOrderData.workOrder
        },
        "DatosFinales": {
          "cabecera": newWorkOrder
        }
      }
    }
    
    this.workOrdersService.updateWorkOrder(request, this.companyCode, this.workOrderCode).subscribe(response => {
      const { Grabado } = response.response
      
      if(Grabado){
        this.router.navigateByUrl('layout/or/list')
      }
    })
  }
}

