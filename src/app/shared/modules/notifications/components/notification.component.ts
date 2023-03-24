/** Angular core */
import { Component,Input,OnInit } from '@angular/core';

/** App imports */
import { NotificationEventService } from '@shared/index';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input() type: string
  @Input() title: string
  @Input() subtitle: string
  @Input() caption: string
  @Input() lowContrast: boolean
  @Input() showClose: boolean

  protected show: boolean

  constructor(
    private eventService: NotificationEventService,
  ) { 
    this.show = false
    this.type = ''
    this.title = ''
    this.subtitle = ''
    this.caption = ''
    this.lowContrast = false
    this.showClose = true
  }
  
  ngOnInit(): void {
      this.eventService.showNotification$.subscribe(() =>  this.showNotification())
  }

  dismiss(e: any){

    /** Solo cerramos la alerta si se hace clic en el botón */
    if(e.target.tagName && (e.target.tagName === 'svg' || e.target.tagName === 'BUTTON')) this.show = false
  }

  showNotification(): void {
    this.show = true;
    setTimeout(() => {
        this.show = false;
    }, 3000);
  }
}