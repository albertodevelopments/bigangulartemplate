/** Angular core */
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { FormGroup } from '@angular/forms'

/** App imports */
import { TranslationPipe } from '@shared/index'
import { WorkOrdersService } from '@modules/work-orders'

/** Librerías */
import { TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular'
import { Router } from '@angular/router'
import { AuthenticationService } from '@core/index'

@Component({
  selector: 'app-work-orders',
  templateUrl: './work-orders.component.html',
  styleUrls: ['./work-orders.component.scss'],
  providers: [TranslationPipe]
})
export class WorkOrdersComponent implements OnInit{

  @ViewChild("actionsTemplate", { static: false })

  protected actionsTemplate: TemplateRef<any>
  protected tableModel: TableModel
  protected searchForm: FormGroup
  protected tableData: any[]
  protected searchValue: string
  private _companyCode: string

  constructor(
    private translationPipe: TranslationPipe,
    private workOrdersService: WorkOrdersService,
    private router: Router,
    private authenticationService: AuthenticationService
  ){
    this.tableModel = new TableModel()
    this.loadTableModel()
    this.tableData = []
    this.searchValue = ''
    this._companyCode = ''
  }

  ngOnInit(): void {
    this.setFilters()
    this.loadWorkOrders()
  }

  setFilters(): void{
    this.tableModel.isRowFiltered = (index: number) => {

      const OR = this.tableModel.row(index)[1].data
      const almnro = this.tableModel.row(index)[2].data
      const cli = this.tableModel.row(index)[3].data
      const cif = this.tableModel.row(index)[4].data
      const raz = this.tableModel.row(index)[5].data
      const dir = this.tableModel.row(index)[6].data
      const pobdes = this.tableModel.row(index)[7].data
      const prodes = this.tableModel.row(index)[8].data
      const tel = this.tableModel.row(index)[9].data
      const km = this.tableModel.row(index)[10].data
      const mec = this.tableModel.row(index)[11].data
      const com = this.tableModel.row(index)[12].data

      return !((OR && OR.includes(this.searchValue)) || 
             (almnro && almnro.toLowerCase().includes(this.searchValue.toLowerCase())) ||
             (cli && cli.toString().toLowerCase().includes(this.searchValue.toLowerCase())) ||
             (cif && cif.toLowerCase().includes(this.searchValue.toLowerCase())) ||
             (raz && raz.toLowerCase().includes(this.searchValue.toLowerCase())) ||
             (dir && dir.toLowerCase().includes(this.searchValue.toLowerCase())) ||
             (pobdes && pobdes.toLowerCase().includes(this.searchValue.toLowerCase()))||
             (prodes && prodes.toLowerCase().includes(this.searchValue.toLowerCase())) ||
             (tel && tel.toLowerCase().includes(this.searchValue.toLowerCase())) ||
             (km && km.toString().toLowerCase().includes(this.searchValue.toLowerCase())) ||
             (mec && mec.toString().toLowerCase().includes(this.searchValue.toLowerCase())) ||
             (com && com.toString().toLowerCase().includes(this.searchValue.toLowerCase())))
    }
  }

  loadTableModel(): void{
    /** Cargamos las etiquetas del header */
    const OR:string = this.translationPipe.transform('work.order.OR')
    const fecdoc:string = this.translationPipe.transform('work.order.document.date')
    const almnro:string = this.translationPipe.transform('work.order.salesrep')
    const cli:string = this.translationPipe.transform('work.order.client')
    const cif:string = this.translationPipe.transform('work.order.cif')
    const raz:string = this.translationPipe.transform('work.order.corporate.name')
    const dir:string = this.translationPipe.transform('work.order.address')
    const pobdes:string = this.translationPipe.transform('work.order.city.name')
    const prodes:string = this.translationPipe.transform('work.order.province.name')
    const tel:string = this.translationPipe.transform('work.order.phone')
    const mec:string = this.translationPipe.transform('work.order.mechanic')
    const km:string = this.translationPipe.transform('work.order.km')
    const com:string = this.translationPipe.transform('work.order.comments')

    this.tableModel.header = [
      new TableHeaderItem({data: ''}),
      new TableHeaderItem({data: OR}),
      new TableHeaderItem({data: fecdoc}),
      new TableHeaderItem({data: almnro}),
      new TableHeaderItem({data: cli}),
      new TableHeaderItem({data: cif}),
      new TableHeaderItem({data: raz}),
      new TableHeaderItem({data: dir}),
      new TableHeaderItem({data: pobdes}),
      new TableHeaderItem({data: prodes}),
      new TableHeaderItem({data: tel}),
      new TableHeaderItem({data: mec}),
      new TableHeaderItem({data: km}),
      new TableHeaderItem({data: com}),
    ]
  }

  loadWorkOrders(): void{
    /** Obtenemos primero el id de la empresa */
    this.authenticationService.userSession$.subscribe(userObject => {
      const _companyCode = userObject.CodEmpresaSesion

      this.loadData(_companyCode)
    })
  }

  loadData(companyCode: string): void{
    if (this.tableModel !== undefined){
      this.workOrdersService.loadWorkOrders(companyCode).subscribe(response => {
        const {RespuestaDatos} = response.response

        this.tableData = RespuestaDatos
        this.loadTableModelData()
      })
    }
  }

  loadTableModelData(): void{
    this.tableModel.data = this.tableData.map(row => {
      return  [new TableItem({data: row.OR, template: this.actionsTemplate }),
               new TableItem({data: row.OR}),
               new TableItem({data: row.fecdoc}),
               new TableItem({data: row.almnro}),
               new TableItem({data: row.cli}),
               new TableItem({data: row.cif}),
               new TableItem({data: row.raz}),
               new TableItem({data: row.dir}),
               new TableItem({data: row.pobdes}),
               new TableItem({data: row.prodes}),
               new TableItem({data: row.tel}),
               new TableItem({data: row.mec}),
               new TableItem({data: row.km}),
               new TableItem({data: row.com})]
    })
  }

  searchByTerm(searchTerm): void{
    this.searchValue = searchTerm
  }

  newWorkOrder(): void{
    this.router.navigateByUrl('layout/or/new')
  }
}
