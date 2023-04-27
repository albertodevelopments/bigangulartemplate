/** Angular core */
import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

/** App imports */
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translate'
})
export class TranslationPipe implements PipeTransform {

  constructor(private translationService: TranslationService){}

  /** Traducimos las etiquetas de la aplicación a través de un servicio
   *  que consulta los ficheros de idiomas y devuelve las traducciones
   */
  // transform(word: string): Observable<string>{
  //   return this.translationService.getTranslation(word)
  // }

  transform(word: string): string{
    return this.translationService.getTranslation(word)
  }

}
