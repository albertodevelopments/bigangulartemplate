/** Angular core */
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import { Router } from '@angular/router'

/** App imports */
import { AuthenticationService } from '@core/index'
import { Observable, Subscription, take } from 'rxjs'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{

  protected mediumSize: boolean

  @Input() menuStructure: any

  /** Para gestionar la apertura y cierre del menú */
  @Input() active$: Observable<boolean>
  @Output() closeMenuFromParent: EventEmitter<void>

  protected menuArray: any[]
  protected submenuArray: any[]
  protected menuOptions: any[]
  private _activeMenuSubscription: Subscription
  protected active: boolean

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ){
    this.active$ = new Observable<boolean>
    this.mediumSize = false
    this.menuArray = []
    this.submenuArray = []
    this.menuOptions = []
    this.active = false
    this._activeMenuSubscription = new Subscription()
    this.closeMenuFromParent = new EventEmitter<void>()
  }

  ngOnInit(): void {
    const { response } = this.menuStructure
    const { Respuesta: responseArray } = response

    /** Activamos la subscripción para escuchar cuando se abre el menú */
    this._activeMenuSubscription = this.active$.subscribe(active => {
      this.active = active
    })

    this.authenticationService.userSession$.pipe(
      take(1)
    ).
    subscribe(() => {
      this.loadMenuStructure(responseArray)
    })
  } 

  loadMenuStructure(responseArray: any): void{
    /** Cargamos el menú */
    this.menuArray = responseArray.map((item: any) => {
      const { text: title, childs, id } = item
      
      return {
        id,
        title,
        childs
      }
    })

    /** Cargamos submenu */
    this.menuArray.forEach(menuItem => {
      this.submenuArray = menuItem.childs.map((item: any) => {
        const { text: title, childs, id } = item
        return{
          id,
          title,
          childs,
          parentId: menuItem.id
        }
      })
    })
    
    /** Cargamos opciones */
    this.submenuArray.forEach(submenuItem => {
      this.menuOptions = submenuItem.childs.map((item: any) => {
        const { text, id, route } = item
        return{
          id,
          text,
          parentId: submenuItem.id,
          url: `/layout/${route}`
        }
      })
    })
  }

  navigate(url: string): void{
    /** Si la pantalla es pequeña, cerramos el menú una vez seleccionada
     *  la opción
     */
    if(window.innerWidth <= 1024){
      this.closeMenuFromParent.emit()
    }
    this.router.navigateByUrl(url)
  }
}
