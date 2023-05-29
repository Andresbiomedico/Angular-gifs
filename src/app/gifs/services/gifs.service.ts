import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  public gifList: Gif[] = []
  private _tagsHistory: string[] = [];
  private apiKey: string = 'nYk360E6ykAZdsobW2Y58xkhY03vajMw';
  private serviceUrl = 'https://api.giphy.com/v1/gifs';


  constructor(private http: HttpClient) {
    this.loadLocalStorage()
    if(this._tagsHistory.length === 0) return
    this.searchTag(this._tagsHistory[0])
   }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  orginizeHistory(tag: string): void {
    tag = tag.toLocaleLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10)
    this.saveLocalStorage()
  }

  private saveLocalStorage():void{
    localStorage.setItem("history",JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage(){
    if(!localStorage.getItem("history")) return
    this._tagsHistory = JSON.parse(localStorage.getItem("history")!)
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return
    this.orginizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', 10)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe(resp => {
        this.gifList = resp.data;
      })
  }
}
