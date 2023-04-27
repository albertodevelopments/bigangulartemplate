/** Angular Core */
import { NgModule } from '@angular/core';

/** Aplicación */
import { SharedModule } from '@shared/shared.module'
import { AuthenticationGuard } from './guards/authentication.guard';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
  ],
  providers: [
    AuthenticationGuard
  ],
  exports: [
    // RouterModule,
  ]
})
export class CoreModule { }
