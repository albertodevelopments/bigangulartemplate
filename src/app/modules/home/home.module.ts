/** Angular core */
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';

/** App imports */
import { SharedModule } from '@shared/index';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
