/** Angular Core */
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

/** Aplicación */
import { SharedModule } from '@shared/shared.module'

/** Testing */
import { AuthenticationGuard } from './guards/authentication.guard';
import { LayoutModule } from 'app/layout/layout.module';


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
