/** Angular core */
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'

/** App imports */
import { TranslationPipe } from '@shared/index'
import { OrdenesReparacionService } from '@modules/ordenes-rep'

/** Librerías */
import { TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular'

@Component({
  selector: 'app-ordenes-rep',
  templateUrl: './ordenes-rep.component.html',
  styleUrls: ['./ordenes-rep.component.scss'],
  providers: [TranslationPipe]
})
export class OrdenesReparacionComponent implements OnInit{

  @ViewChild("actionsTemplate", { static: false })

  protected actionsTemplate: TemplateRef<any>
  protected tableModel: TableModel
  protected searchForm: FormGroup
  protected tableData: any[]
  // private initialTableData: any[]
  protected searchValue: string

  constructor(
    private translationPipe: TranslationPipe,
    private ordenesReparacionService: OrdenesReparacionService,
    private formBuilder: FormBuilder
  ){
    this.tableModel = new TableModel()
    this.loadTableModel()
    // this.searchForm = this.formBuilder.group({
    //   search: new FormControl('')
    // })
    this.tableData = []
    // this.initialTableData = []
    this.searchValue = ''
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
    const OR:string = this.translationPipe.transform('work.order.list.OR')
    const almnro:string = this.translationPipe.transform('work.order.list.salesrep')
    const cli:string = this.translationPipe.transform('work.order.list.client')
    const cif:string = this.translationPipe.transform('work.order.list.cif')
    const raz:string = this.translationPipe.transform('work.order.list.corporate.name')
    const dir:string = this.translationPipe.transform('work.order.list.address')
    const city:string = this.translationPipe.transform('work.order.list.city')
    const pobdes:string = this.translationPipe.transform('work.order.list.city.name')
    const pro:string = this.translationPipe.transform('work.order.list.province')
    const prodes:string = this.translationPipe.transform('work.order.list.province.name')
    const tel:string = this.translationPipe.transform('work.order.list.phone')
    const mec:string = this.translationPipe.transform('work.order.list.mechanic')
    const km:string = this.translationPipe.transform('work.order.list.km')
    const com:string = this.translationPipe.transform('work.order.list.comments')

    this.tableModel.header = [
      new TableHeaderItem({data: ''}),
      new TableHeaderItem({data: OR}),
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
    if (this.tableModel !== undefined){
      this.ordenesReparacionService.loadWorkOrders().subscribe(response => {
        const {RespuestaDatos} = response.response

        /** Nos guardamos la tabla original para restaurar filtros */
        // this.initialTableData = RespuestaDatos

        this.tableData = RespuestaDatos
        this.loadTableModelData()
      })
    }
  }

  loadTableModelData(): void{
    this.tableModel.data = this.tableData.map(row => {
      return  [new TableItem({data: row.OR, template: this.actionsTemplate }),
               new TableItem({data: row.OR}),
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

  // get search(): FormControl{
  //   return this.searchForm.get('search') as FormControl
  // }

  searchByTerm(searchTerm): void{
    this.searchValue = searchTerm
    console.log(this.searchValue);
    
  }

  // searchByTerm(): void{
  //   this.tableData = this.tableData.filter((row: any) => {
  //     return (row.cli  && row.cli.toString().includes(this.searchValue)) ||
  //            (row.cif && row.cif.includes(this.searchValue)) ||
  //            (row.raz && row.raz.includes(this.searchValue)) ||
  //            (row.dir && row.dir.includes(this.searchValue)) ||
  //            (row.pobdes && row.pobdes.includes(this.searchValue))||
  //            row.prodes.includes(this.searchValue) ||
  //            row.tel.includes(this.searchValue) ||
  //            row.almnro.includes(this.searchValue) ||
  //            (row.km && row.km.toString().includes(this.searchValue)) ||
  //            (row.mec && row.mec.toString().includes(this.searchValue)) ||
  //            (row.com && row.com.includes(this.searchValue))
  //   })
  //   this.loadTableModelData()
  // }
}
