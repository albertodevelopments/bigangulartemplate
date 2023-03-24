import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/** Servicio necesario para implementar la comunicación entre la notificación
 *  y el componente
 */
export class NotificationEventService {

  private _showNotificationSource: Subject<void>
  public showNotification$: Observable<void>
  
  constructor(){
    this._showNotificationSource = new Subject<void>();
    this.showNotification$ = this._showNotificationSource.asObservable()
  }

  showNotification(): void {
    this._showNotificationSource.next();
  }
}
