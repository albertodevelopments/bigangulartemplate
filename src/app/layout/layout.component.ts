/** Angular core */
import { Component, HostListener, OnInit } from '@angular/core'

/** Routing */
import { Observable, Subject } from 'rxjs'

/** App imports */
import { AuthenticationService } from '@core/index'
import { LayoutService } from '@layout/index'
import { NotificationEventService } from '@shared/index'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit{

  @HostListener('window:resize', ['$event'])
  onResize(event: Event){
    this.largeSize = window.innerWidth > 1024
  }

  protected menuOpen: boolean
  private _menuOpenSubject: Subject<boolean>
  protected menuOpen$: Observable<boolean>
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
    this._menuOpenSubject = new Subject<boolean>()
    this.menuOpen$ = this._menuOpenSubject.asObservable()
  }

  ngOnInit(): void {
    this.layoutService.menuStructure$.subscribe(response => {
      this.menuStructure = response
    })    
  }

  toggleMenu(){
    this.menuOpen = !this.menuOpen
    this.largeSize = window.innerWidth > 1024

    this._menuOpenSubject.next(this.menuOpen)
  }
}
