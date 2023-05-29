import { Component, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  // template con el metodo searchTag enviando la variabel
  // template: `
  //   <h5>Buscar</h5>
  //   <input type="text"
  //     placeholder="Buscar gifs ...."
  //     class="form-control"
  //     #txtTagInput
  //     (keyup.enter)="searchTag(txtTagInput.value)"
  //   >
  // `,
  template: `
    <h5>Buscar</h5>
    <input type="text"
      placeholder="Buscar gifs ...."
      class="form-control"
      #txtTagInput
      (keyup.enter)="searchTag()"
    >
  `,
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  public tagInput!:ElementRef<HTMLInputElement>;

  constructor(private gifsService:GifsService){}

  // metodo utilizando el #txtTagiInput
  // searchTag(newTag:string){
  //   console.log({newTag})
  // }

   searchTag(){
    const newTag = this.tagInput.nativeElement.value
    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }
}
