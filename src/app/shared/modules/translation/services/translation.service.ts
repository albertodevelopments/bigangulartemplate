import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { localUrls } from '@data/consts';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private _translationsSet: BehaviorSubject<any | null>
  public  translationSet$: Observable<any | null>

  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend
  ) {
    // this._translationsFile = `${localUrls.translationsPath}${navigator.language}.json`
    this._translationsSet = new BehaviorSubject<any | null>(null)
    this.translationSet$ = this._translationsSet.asObservable()
    
    /** Utilizamos el httpbackend para que esta consulta no pase por los interceptores */
    this.http = new HttpClient(httpBackend)
  }

  private getTranslationsFile(language: string): string{
    switch(language){
      case 'es':
        return localUrls.spanishTranslationsPath
      case 'pt':
        return localUrls.portugueseTranslationsPath
      default:
        return localUrls.spanishTranslationsPath
    }
  }

  /** Nos guartdamos en la memoria del servicio los datos de los ficheros de traducción y 
   * creamos método para devolver las traducciones
   */
  setTranslations(language: string): any{
    const translationsFile = this.getTranslationsFile(language)
    return new Promise<void>((resolve, reject) => {
      return this.http.get<any>(translationsFile)
        .pipe(take(1))
        .subscribe({
          next: data => {
            this._translationsSet.next(data)
            resolve()
          },
          error: err => {
            console.log(err);
            
            console.error('Error al cargar el fichero de traducciones');
            reject()
          }
        })
    })
  }

  getTranslation(word: string): Observable<string>{
    return this.translationSet$
      .pipe(
        map(response => {
          return response[word] as string
        })
      )
  }
}
