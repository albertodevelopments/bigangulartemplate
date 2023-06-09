/** Angular core */
import { NgModule } from '@angular/core'

/** Router */
import { RouterModule, Routes } from '@angular/router'

/** App imports */
import { HomeComponent } from '@modules/home'

const routes: Routes = [
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
