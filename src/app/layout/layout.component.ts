/** Angular core */
import { Component, HostListener } from '@angular/core';

/** App imports */
import { AuthenticationService } from '@core/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  protected menuOpen: boolean
  protected isLoggedIn$: Observable<boolean>
  protected largeSize: boolean

  @HostListener('window:resize', ['$event'])
  onResize(event: Event){
    this.largeSize = window.innerWidth > 1024
  }

  constructor(
    private authenticationService: AuthenticationService
  ){
    this.isLoggedIn$ = this.authenticationService.loggedIn$
    this.menuOpen = false
    this.largeSize = false
  }

  toggleMenu(){
    this.menuOpen = !this.menuOpen
  }
}
