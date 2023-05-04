/** Angular core */
import { Component } from '@angular/core'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  protected searchTerm: string

  constructor(){
    this.searchTerm = ''
}

  search(searchTerm: any): void{
    this.searchTerm = searchTerm        
}

  clear(): void{
      this.searchTerm = ''
  }    
}
