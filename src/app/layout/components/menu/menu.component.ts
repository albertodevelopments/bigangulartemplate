/** Angular core */
import { Component, Input, OnInit} from '@angular/core'

/** App imports */
import { AuthenticationService, iUserSession } from '@core/index'
import { take } from 'rxjs'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{

  protected mediumSize: boolean

  @Input() menuStructure: any

  /** Para gestionar la apertura y cierre del menú */
  @Input() active: boolean

  protected menuArray: any[]
  protected submenuArray: any[]
  protected menuOptions: any[]

  constructor(
    private authenticationService: AuthenticationService,
  ){
    this.active = false
    this.mediumSize = false
    this.menuArray = []
    this.submenuArray = []
    this.menuOptions = []
  }

  ngOnInit(): void {
    const { response } = this.menuStructure
    const { Respuesta: responseArray } = response

    this.authenticationService.userSession$.pipe(
      take(1)
    ).
    subscribe(userSession => {
      this.loadMenuStructure(responseArray, userSession)
    })
  } 

  loadMenuStructure(responseArray: any, userSession: iUserSession): void{
    console.log(userSession);
    

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
        const { text, id } = item
        return{
          id,
          text,
          parentId: submenuItem.id
        }
      })
    })
  }
}
