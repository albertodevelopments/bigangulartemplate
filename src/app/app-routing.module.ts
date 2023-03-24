/** Angular core */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** App imports */

const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo:'login'},
  {
    path: 'login',
    loadChildren: () => import('@modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'layout',
    loadChildren: () => import('@layout/layout.module').then(m => m.LayoutModule)
  },
  {path: '**', pathMatch:'full', redirectTo:'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
