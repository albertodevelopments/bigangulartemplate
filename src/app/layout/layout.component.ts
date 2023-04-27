/** Angular core */
import { Component, HostListener, OnInit } from '@angular/core'

/** Routing */
import { Observable } from 'rxjs'

/** App imports */
import { AuthenticationService } from '@core/index'
import { LayoutService } from '@layout/index'
import { NotificationEventService, TranslationPipe } from '@shared/index'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [TranslationPipe]
})
export class LayoutComponent implements OnInit{

  @HostListener('window:resize', ['$event'])
  onResize(event: Event){
    this.largeSize = window.innerWidth > 1024    
  }

  protected menuOpen: boolean
  protected isLoggedIn$: Observable<boolean>
  protected largeSize: boolean
  protected menuStructure: any

  constructor(
    private authenticationService: AuthenticationService,
    private layoutService: LayoutService,
    protected eventService: NotificationEventService,
  ){
    this.isLoggedIn$ = this.authenticationService.loggedIn$
    this.menuOpen = false
    this.largeSize = true
  }

  ngOnInit(): void {
    this.layoutService.menuStructure$.subscribe(response => {
      this.menuStructure = response
    })    
  }

  toggleMenu(){
    this.menuOpen = !this.menuOpen
    this.largeSize = window.innerWidth > 1024
  }
}
