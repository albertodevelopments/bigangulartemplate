/** Anguolar Core */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';

/** Aplicación */
import { iAuthentication, iAuthenticationError, AuthenticationService, loginErrorHandler, AuthenticationConfigService } from '@core/index';
import { LayoutService } from '@layout/index';
import { NotificationEventService, TranslationPipe } from '@shared/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [TranslationPipe]
})
export class LoginComponent implements OnInit{

  public loginForm: FormGroup
  public auth: iAuthentication = {
    username: '',
    password: ''
  }

  /** Parámetros para pasar a la notificación */
  public type: string
  public title: string 
  public subtitle: string
  public caption: string
  public lowContrast: boolean
  public showClose: boolean
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private translationPipe: TranslationPipe,
    protected eventService: NotificationEventService,
    private router: Router,
    private authenticationConfigService: AuthenticationConfigService,
    private layoutService: LayoutService,
  ){
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })

    this.type = ''
    this.title = ''
    this.subtitle = ''
    this.caption = ''
    this.lowContrast = true
    this.showClose = true
  }

  /** Definimos los getters para tener las variables disponibles en el template */
  get username(): FormControl{
    return this.loginForm.get('username') as FormControl
  }

  get password(): FormControl{
    return this.loginForm.get('password') as FormControl
  }

  ngOnInit(): void {
    /** Cargamos la configuración de la API aquí y no en la inicialización de la
     *  aplicación para poder gestionar mensajes de aviso en lugar de dejar de
     *  cargar la página
     */
    this.authenticationConfigService.loadConfiguration().subscribe({
      error: () => this.showLoadingErrorMessage()
    })    
  }

  showLoadingErrorMessage(){
    this.caption = this.translationPipe.transform('global.error.api.file')
    this.showErrorMessage()
  }

  onSubmit(): void{
    this.auth = {
      username: this.username.value,
      password: this.password.value
    }
    
    /** Marcamos como pending el formulario de login para los errores asíncronos, y así, al 
     * deshabilitar el botón submit si no es válido, incluims también el momento de espera
     * hasta que se resuelve la peticón asíncrona
     */
    this.loginForm.markAsPending()

    this.authService.login(this.auth).subscribe({
      next: results => {
        /** results = null: Error genérico, ya se mostró previamente el error de que no existe el fichero de
         *  configuración
         */
        if(results === null) this.handleError(0) 
        else {
          this.layoutService.loadMenu().subscribe({
            next: () => {
              this.router.navigate(['layout/home'])
            },
            error: errorResponse => {
              this.type = 'error'
              this.title = this.translationPipe.transform('global.error.header')
              this.caption = this.translationPipe.transform('login.error.no.authorization')
              setTimeout(() => {
                this.eventService.showNotification()
                console.log(errorResponse)
              })
            }
          })
          
        }
      },
      error: error => this.handleError(error.status)
    })
  }

  /** Mostramos mensaje de error y bloqueamos formulario */
  private handleError(error: number): void{
    this.type = 'error'
    const errorResponse: iAuthenticationError = loginErrorHandler(error)

    this.title = this.translationPipe.transform('global.error.header')
    this.caption = this.translationPipe.transform(errorResponse.errorMessage)
    this.showErrorMessage()
  }

  showErrorMessage():void {
    /** Marcamos el formulario con errores (error customizado) para bloquear el botón de inicio de sesión */
    this.loginForm.setErrors({ requestResponseError: true})
    this.eventService.showNotification()
  }
}
