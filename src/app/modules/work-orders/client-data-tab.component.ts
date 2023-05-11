/** Angular core */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Observable } from 'rxjs'

/** Forms */
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

/** Router */
import { Router } from '@angular/router'

/** App imports */
import { EmptyWorkOrder, WorkOrdersService } from '@modules/work-orders'
import { AuthenticationService } from '@core/index'

@Component({
  selector: 'app-client-data-tab',
  templateUrl: './client-data-tab.component.html',
  styleUrls: ['./client-data-tab.component.scss']
})
export class ClientDataTabComponent implements OnInit{

  @Input() companyCode: string
  @Input() helpCombos: Observable<any[]>
  @Output() save: EventEmitter<any>

  // protected provinces$: Observable<any>
  protected woForm: FormGroup
  private _emptyHelpObject: any = { content: "" }
  protected provinces: any[] 
  protected cities: any[]
  protected paymentCodes: any[]
  protected cashDiscount: any[]
  protected paymentDays: any[]
  protected surcharge: any[]
  protected priceList: any[]
  protected vat: any[]

  constructor(
    private workOrdersService: WorkOrdersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ){
    this.woForm = this.formBuilder.group({
      cli: new FormControl(0, [Validators.required]),
      raz: new FormControl(''),
      dir: new FormControl(''),
      pob: new FormControl(''),
      pobdes: new FormControl(''),
      pro: new FormControl(''),
      prodes: new FormControl(''),
      tel: new FormControl(''),
      almnro: new FormControl(''),
      km: new FormControl(0),
      mec: new FormControl(0),
      com: new FormControl(''),
      pgm: new FormControl(''),
      dpp: new FormControl(''),
      div: new FormControl(''),
      pgd: new FormControl(''),
      tar: new FormControl(''),
      iva: new FormControl(''),
      ivac: new FormControl(true),
      req: new FormControl(false),
      perfac: new FormControl(0),
    })
    
    this.save = new EventEmitter<any>()    
    this.cities = [this._emptyHelpObject]
    this.provinces = [this._emptyHelpObject]
    this.paymentCodes = [this._emptyHelpObject]
    this.cashDiscount = [this._emptyHelpObject]
    this.paymentDays = [this._emptyHelpObject]
    this.surcharge = [this._emptyHelpObject]
    this.priceList = [this._emptyHelpObject]
    this.vat = [this._emptyHelpObject]
  }

  ngOnInit(): void {
    this.helpCombos.subscribe((response: any) => {
      console.log(response);
      this.provinces = response.provinces
      this.paymentCodes = response.paymentCodes
      this.cashDiscount = response.cashDiscount
      this.paymentDays = response.paymentDays
      this.surcharge = response.surcharge
      this.priceList = response.priceList
      this.vat = response.vat
    })
    
    // this.provinces = this.helpCombos.
    // this.paymentCodes = this.helpCombos.paymentCodes
    // this.paymentDays = this.helpCombos.paymentDays
    // this.surcharge = this.helpCombos.surcharge
    // this.priceList = this.helpCombos.priceList
    // this.vat = this.helpCombos.vat
  }

  get cli(): FormControl{
    return this.woForm.get('cli') as FormControl
  }

  get raz(): FormControl{
    return this.woForm.get('raz') as FormControl
  }

  get dir(): FormControl{
    return this.woForm.get('dir') as FormControl
  }

  get pob(): FormControl{
    return this.woForm.get('pob') as FormControl
  }

  get pro(): FormControl{
    return this.woForm.get('pro') as FormControl
  }

  get tel(): FormControl{
    return this.woForm.get('tel') as FormControl
  }

  get almnro(): FormControl{
    return this.woForm.get('almnro') as FormControl
  }

  get km(): FormControl{
    return this.woForm.get('km') as FormControl
  }
  
  get mec(): FormControl{
    return this.woForm.get('mec') as FormControl
  }
  
  get com(): FormControl{
    return this.woForm.get('com') as FormControl
  }

  get pgm(): FormControl{
    return this.woForm.get('pgm') as FormControl
  }

  get ddp(): FormControl{
    return this.woForm.get('ddp') as FormControl
  }

  get div(): FormControl{
    return this.woForm.get('div') as FormControl
  }

  get pgd(): FormControl{
    return this.woForm.get('pgd') as FormControl
  }

  get tar(): FormControl{
    return this.woForm.get('tar') as FormControl
  }

  get iva(): FormControl{
    return this.woForm.get('vat') as FormControl
  }

  goBack(): void{
    this.router.navigateByUrl('layout/or/list')
  }

  saveWorkOrder(): void{

    const newWorkOrder = {
      ...EmptyWorkOrder,
      cli: this.cli.value,
      raz: this.raz.value,
      dir: this.dir.value,
      pob: this.pob.value.id,
      pro: this.pro.value.id,
      tel: this.tel.value,
      almnro: this.almnro.value,
      km: this.km.value,
      mec: this.mec.value,
      com: this.com.value
    }
    const request = {
      "request": {
        "DatosIniciales": {},
        "DatosFinales": {
          "cabecera": newWorkOrder
        }
      }
    }

    this.save.emit(request)
  }

  selected(province: any): void{
    this.workOrdersService.getCities(this.companyCode, province.item.id).subscribe(response => {
      this.cities = response
    })
  }

  onClose(event: any): void{
    
  }
}
