/** Angular core */
import { NgModule } from '@angular/core'

/** App imports */
import { SharedModule } from '@shared/index'
import { OrdenesReparacionRoutingModule, OrdenesReparacionComponent, OrdenReparacionComponent } from '@modules/ordenes-rep'

@NgModule({
  declarations: [
    OrdenesReparacionComponent,
    OrdenReparacionComponent
  ],
  imports: [
    OrdenesReparacionRoutingModule,
    SharedModule
  ]
})
export class OrdenesReparacionModule { }
