/** Angular core */
import { NgModule } from '@angular/core'

/** App imports */
import { SharedModule } from '@shared/index'
import { WorkOrdersRoutingModule, WorkOrdersComponent, WorkOrderComponent, NewWorkOrderComponent, ClientDataTabComponent, WorkOrderTabComponent } from '@modules/work-orders'

@NgModule({
  declarations: [
    WorkOrdersComponent,
    WorkOrderComponent,
    NewWorkOrderComponent,
    ClientDataTabComponent,
    WorkOrderTabComponent
  ],
  imports: [
    WorkOrdersRoutingModule,
    SharedModule
  ]
})
export class WorkOrdersModule { }
