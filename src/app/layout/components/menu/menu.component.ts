import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  protected mediumSize: boolean

  /** Pagar gestionar la apertura y cierre del menú */
  @Input() active: boolean

  constructor(
  ){
    this.active = false
    this.mediumSize = false
  }

}
