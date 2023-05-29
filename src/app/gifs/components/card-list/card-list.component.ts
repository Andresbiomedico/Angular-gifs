import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifts-card-list',
  templateUrl: './card-list.component.html'
})
export class CardListComponent {
  @Input()
  gifs: Gif[] = []
}
