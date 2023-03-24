/** Angular core */
import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';

/** App imports */
import { SharedModule } from '@shared/index';
import { LoginComponent } from '@modules/login';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    LoginRoutingModule,
    SharedModule
  ]
})
export class LoginModule { }
