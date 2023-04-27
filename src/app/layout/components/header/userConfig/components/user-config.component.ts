/** Angular core */
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/** App imports */
import { TranslationService } from '@shared/index';
import { AuthenticationService, iUserSession, UserSession } from '@core/index';

/** Librerías */

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss'],
})
export class UserConfigComponent {

  @Input() open: boolean = false
  @Output() close: EventEmitter<void>

  public configForm: FormGroup
  public userSession: iUserSession

  constructor(
    private translationsService: TranslationService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder
  ){
    this.close = new EventEmitter<void>()
    this.configForm = this.formBuilder.group({
      CodIdiomaSesion: new FormControl('', [Validators.required]),
      NomUsuarioSesion: new FormControl('', [Validators.required]),
      NomEmpresaSesion: new FormControl('')
    })
        
    this.authenticationService.getUserSession().subscribe(response => {
      this.userSession = response
      this.configForm.patchValue({
        NomUsuarioSesion: this.userSession.NomUsuarioSesion,
        NomEmpresaSesion: this.userSession.NomEmpresaSesion,
        CodIdiomaSesion: this.userSession.CodIdiomaSesion
      }) 
    })
    this.userSession = new UserSession(
      {
        CodUsuarioSesion: '',
        NomUsuarioSesion: '',
        CodIdiomaSesion: '',
        CodEmpresaSesion: '',
        NomEmpresaSesion: '',
        CodVendedorSesion: 0,
        NomVendedorSesion: '',
        CodAgenteSesion: 0,
        NomAgenteSesion: ''
      }
    )
  }

  get CodIdiomaSesion(): FormControl{
    return this.configForm.get('CodIdiomaSesion') as FormControl
  }

  get NomUsuarioSesion(): FormControl{
    return this.configForm.get('NomUsuarioSesion') as FormControl
  }

  get NomEmpresaSesion(): FormControl{
    return this.configForm.get('NomEmpresaSesion') as FormControl
  }

  onSubmit(){
    this.configForm.markAsPending()
    
    this.authenticationService.setUserSession({
      ...this.userSession,
      NomUsuarioSesion: this.userSession.NomUsuarioSesion,
      NomEmpresaSesion: this.userSession.NomEmpresaSesion,
      CodIdiomaSesion: this.userSession.CodIdiomaSesion
    })
  }

  saveLanguage(language: string): void{

    this.translationsService.setTranslations(language)
    this.router.navigate(['login'])
    this.closeModal()
  }

  closeModal(){
    this.close.emit()
  }

}