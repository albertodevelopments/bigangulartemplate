/** Angular core */
import { NgModule } from '@angular/core'

/** Router */
import { RouterModule, Routes } from '@angular/router'

/** App imports */
import { NewWorkOrderComponent, WorkOrderComponent, WorkOrdersComponent } from '@modules/work-orders'

const routes: Routes = [
  {path: 'list', component: WorkOrdersComponent},
  {path: 'list/:or', component: WorkOrderComponent},
  {path: 'new', component: NewWorkOrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkOrdersRoutingModule { }
