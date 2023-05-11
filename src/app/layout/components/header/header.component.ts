/** Angular core */
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'

/** App imports */
import { AuthenticationService, iUserSession } from '@core/index'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  /** Pagar gestionar la apertura y cierre del menú */
  @Input() active: boolean
  @Output() toggle: EventEmitter<void> = new EventEmitter<void>()

  protected userSession$: Observable<iUserSession>
  protected userConfigOpen: boolean

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ){
    this.active = false
    this.userSession$ = this.authenticationService.userSession$
    this.userConfigOpen = false
  }

  handleClickMenu(): void{
    this.toggle.emit()
  }

  openUserConfig(): void{
    this.userConfigOpen = true
  }

  closeUserConfig(): void{
    this.userConfigOpen = false
  }

  goHome(): void{
    this.router.navigate(['layout/home'])
  }

  logOut(): void{
    this.authenticationService.handleLogout()
    this.router.navigate(['login'])
  }  
}
