/** Angular core */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

/** Forms */
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'

/** App imports */
import { WorkOrderInterface } from '@modules/work-orders'

@Component({
  selector: 'app-work-order-tab',
  templateUrl: './work-order-tab.component.html',
  styleUrls: ['./work-order-tab.component.scss']
})
export class WorkOrderTabComponent implements OnInit{

  @Input() action: string
  @Input() language: string
  @Input() currentWorkOrder: WorkOrderInterface
  @Output() save: EventEmitter<any>

  protected woForm: FormGroup
  protected woType: any[]

  public tiprep: string

  constructor(
    private formBuilder: FormBuilder
  ){
    this.woForm = this.formBuilder.group({
      com: new FormControl(''),
      sintoma: new FormControl(''),
      presupuesto: new FormControl(''),
      fecace: new FormControl(''),
      fecprev: new FormControl(''),
      refer: new  FormControl(''),
      maquina: new  FormControl(''),
      almnro: new FormControl(''),
      km: new FormControl(0),
      mec: new FormControl(0),
      numser: new FormControl(''),
      reparacion: new FormControl(''),
    })
    this.language = 'es'
    this.tiprep = ''
    
    this.save = new EventEmitter<any>()    
    this.woType = [
      {content: 'Reparación', id: 'R'},
      {content: 'Garantía', id: 'G'}
    ]
  }

  ngOnInit(): void {    
    if(this.currentWorkOrder !== undefined && this.action === 'M' ) this.showWorkOrderData()
  }

  showWorkOrderData(): void{

    const { almnro, km, mec, tiprep, refer, numser, presupuesto, fecace, fecprev, maquina, reparacion,
            sintoma, com } = this.currentWorkOrder

    this.woForm.patchValue({
        almnro, km, mec,refer, numser, presupuesto, fecace, fecprev, maquina, reparacion, sintoma, com
      })   
    this.tiprep = tiprep
  }

  get com(): FormControl{
    return this.woForm.get('com') as FormControl
  }

  get sintoma(): FormControl{
    return this.woForm.get('sintoma') as FormControl
  }

  get presupuesto(): FormControl{
    return this.woForm.get('presupuesto') as FormControl
  }

  get fecace(): FormControl{
    return this.woForm.get('fecace') as FormControl
  }

  get refer(): FormControl{
    return this.woForm.get('refer') as FormControl
  }

  get fecprev(): FormControl{
    return this.woForm.get('fecprev') as FormControl
  }

  get maquina(): FormControl{
    return this.woForm.get('maquina') as FormControl
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

  get numser(): FormControl{
    return this.woForm.get('numser') as FormControl
  }

  get reparacion(): FormControl{
    return this.woForm.get('reparacion') as FormControl
  }  
}
