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
        path: 'cliente',
        loadChildren: () => import('@modules/cliente/cliente.module').then(m => m.ClienteModule),
        canLoad: [AuthenticationGuard]
      },
      {
        path: 'or',
        loadChildren: () => import('@modules/work-orders/work-orders.module').then(m => m.WorkOrdersModule),
        canLoad: [AuthenticationGuard]
      },
      {
        path: 'home',
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
