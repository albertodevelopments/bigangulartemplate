/** Angular core */
import { NgModule } from '@angular/core'

/** Router */
import { RouterModule, Routes } from '@angular/router'

/** App imports */
import { ClienteComponent } from '@modules/cliente'

const routes: Routes = [
  {path: '', component: ClienteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
