/** Angular core */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '@core/guards/authentication.guard';

/** App imports */
import { SharedModule } from '@shared/shared.module';
import { LayoutComponent } from '@layout/index';

const routes: Routes = [
  {
    path: 'layout', 
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@modules/home/home.module').then(m => m.HomeModule),
        canLoad: [AuthenticationGuard]
      },
    ]
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
