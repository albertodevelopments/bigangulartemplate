/** Angular core */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutRoutingModule } from './layout-routing.module';

import { LayoutComponent, HeaderComponent, MenuComponent, UserConfigComponent } from '@layout/index';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    MenuComponent,
    UserConfigComponent
  ],
  imports: [
    RouterModule,
    SharedModule,
    LayoutRoutingModule,
  ],
  exports: [
    RouterModule,
  ]
})
export class LayoutModule { }
