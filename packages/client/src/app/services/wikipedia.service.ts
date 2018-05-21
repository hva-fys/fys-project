import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable()
export class WikipediaService {

  constructor(private http: HttpClient) { }


  getIntro(title: string) {
    const url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + title;
    const stream$ = this.http.get(url)
      .pipe( tap( res => console.log(res)) );

    return stream$;
  }
}
