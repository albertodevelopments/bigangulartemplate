/** Angular core */
import { NgModule } from '@angular/core'

/** Router */
import { RouterModule, Routes } from '@angular/router'

/** App imports */
import { OrdenReparacionComponent, OrdenesReparacionComponent } from '@modules/ordenes-rep'

const routes: Routes = [
  {path: '', component: OrdenesReparacionComponent},
  {path: ':or', component: OrdenReparacionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenesReparacionRoutingModule { }
