/** Angular core */
import { NgModule } from '@angular/core'
import { ClienteRoutingModule } from '@modules/cliente'

/** App imports */
import { SharedModule } from '@shared/index'
import { ClienteComponent } from '@modules/cliente'

@NgModule({
  declarations: [
    ClienteComponent
  ],
  imports: [
    ClienteRoutingModule,
    SharedModule
  ]
})
export class ClienteModule { }
