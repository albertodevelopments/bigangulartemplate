/** Angular core */
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Observable } from 'rxjs'

/** Forms */
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

/** App imports */
import { WorkOrderInterface, WorkOrdersService } from '@modules/work-orders'

@Component({
  selector: 'app-client-data-tab',
  templateUrl: './client-data-tab.component.html',
  styleUrls: ['./client-data-tab.component.scss']
})
export class ClientDataTabComponent implements OnInit{

  @Input() action: string
  @Input() companyCode: string
  @Input() workOrderData: any
  @Input() language: string
  @Output() save: EventEmitter<any>

  public clientDataForm: FormGroup
  private _emptyHelpObject: any = { content: "" }

  /** arrays con los valores de los combos */
  protected provinces: any[] 
  protected cities: any[]
  protected paymentCodes: any[]
  protected cashDiscount: any[]
  protected paymentDays: any[]
  protected surcharge: any[]
  protected priceList: any[]
  protected vat: any[]
  protected currency: any[]
  private _currentWorkOrder: WorkOrderInterface | null

  /** Declaramos las propiedades de los combos y radioset con ngModel */
  public pro: string
  public pob: string
  public pgm: string
  public rfi: string
  public dpp: string
  public div: string
  public pgd: string
  public tar: string
  public iva: string
  public billPeriodRadio: any[]

  constructor(
    private workOrdersService: WorkOrdersService,
    private formBuilder: FormBuilder
  ){
    this.clientDataForm = this.formBuilder.group({
      cli: new FormControl(0, [Validators.required]),
      fecdoc: new FormControl({value: Date(), disabled: true}, [Validators.required]),
      raz: new FormControl(''),
      nom: new FormControl(''),
      dir: new FormControl(''),
      cif: new FormControl(''),
      tel: new FormControl(''),
      pju: new FormControl(''),
      ivac: new FormControl(true),
      req: new FormControl(false),
      perfac: new FormControl(0),
      currency: new FormControl(''),
      codpos: new FormControl('')
    })

    this.pro = ''
    this.pob =''
    this.pgm = ''
    this.pgd = ''
    this.rfi = ''
    this.dpp = ''
    this.tar = ''
    this.iva = ''
    
    this.save = new EventEmitter<any>()    
    this.cities = [this._emptyHelpObject]
    this.provinces = [this._emptyHelpObject]
    this.paymentCodes = [this._emptyHelpObject]
    this.cashDiscount = [this._emptyHelpObject]
    this.paymentDays = [this._emptyHelpObject]
    this.surcharge = [this._emptyHelpObject]
    this.priceList = [this._emptyHelpObject]
    this.vat = [this._emptyHelpObject]
    this.currency = [this._emptyHelpObject]
    this.language = 'es'    
    this.billPeriodRadio = [
      {num: 1}, {num: 2}, {num: 3}, {num: 4}, {num: 5}, {num: 6}, {num: 7}, {num: 8}, {num: 9}
    ]    
    this.workOrderData = null
  }

  ngOnInit(): void {
    
    if(this.action === 'M'){
      this.disableFields()      
    }   

    this.provinces = this.workOrderData.provinces
    this.paymentCodes = this.workOrderData.paymentCodes
    this.cashDiscount = this.workOrderData.cashDiscount
    this.paymentDays = this.workOrderData.paymentDays
    this.surcharge = this.workOrderData.surcharge
    this.priceList = this.workOrderData.priceList
    this.vat = this.workOrderData.vat
    this.currency = this.workOrderData.currency
    this._currentWorkOrder = this.workOrderData.workOrder

    if(this._currentWorkOrder !== undefined && this.action === 'M' ) this.showWorkOrderData()

  }

  showWorkOrderData(): void{
    const {cli, raz, dir, cif, nom, pro, tel, pgm, dpp, pju, fecdoc, 
           div, pgd, rfi, tar, iva, ivac, req, perfac, codpos } = this._currentWorkOrder

    this.clientDataForm.patchValue({
        cli, fecdoc, raz, dir, tel, cif, nom, pju, ivac, req, perfac,codpos
    })   
    this.pro = pro
    this.pgm = pgm
    this.pgd = pgd
    this.dpp = dpp
    this.div = div
    this.rfi = rfi
    this.iva = iva
    this.tar = tar
    this.perfac.setValue(perfac)
  }

  disableFields(){
    /** Deshabilitamos los campos que no deben editarse en Modificación */
    this.cli && this.cli.disable()
    this.raz && this.raz.disable()
    this.dir && this.dir.disable()
    this.nom && this.nom.disable()
    this.cif && this.cif.disable()
    this.pju && this.pju.disable()
    this.tel && this.tel.disable()
    this.codpos && this.codpos.disable()
  }

  get cli(): FormControl{
    return this.clientDataForm.get('cli') as FormControl
  }

  get fecdoc(): FormControl{
    return this.clientDataForm.get('fecdoc') as FormControl
  }

  get raz(): FormControl{
    return this.clientDataForm.get('raz') as FormControl
  }

  get nom(): FormControl{
    return this.clientDataForm.get('nom') as FormControl
  }

  get dir(): FormControl{
    return this.clientDataForm.get('dir') as FormControl
  }

  get cif(): FormControl{
    return this.clientDataForm.get('cif') as FormControl
  }

  get tel(): FormControl{
    return this.clientDataForm.get('tel') as FormControl
  }

  get pju(): FormControl{
    return this.clientDataForm.get('pju') as FormControl
  }

  get ivac(): FormControl{
    return this.clientDataForm.get('ivac') as FormControl
  }

  get req(): FormControl{
    return this.clientDataForm.get('req') as FormControl
  }

  get perfac(): FormControl{
    return this.clientDataForm.get('perfac') as FormControl
  }

  get codpos(): FormControl{
    return this.clientDataForm.get('codpos') as FormControl
  }

  selected(province: any): void{
    const provinceId = province.item.id
    
    this.workOrdersService.getCities(this.companyCode, provinceId).subscribe(response => {
      this.cities = response
    })
  }
}
