import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp } from '@angular/http';
import { tap, map } from 'rxjs/operators';
import { get, sample } from 'lodash';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WikipediaService {

  constructor(private jsonp: Jsonp) { }


  getIntro(title: string): Observable<string> {

    const search = new URLSearchParams();

    search.set('action', 'query');
    search.set('titles', title);
    search.set('format', 'json');
    search.set('prop', 'extracts');
    search.set('exintro', '');
    search.set('explaintext', '');

    const url = 'https://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK';

    const stream$ = this.jsonp.get(url, { search })
      .pipe(
        map( res => res.json()),
        map( res => sample(  get(res, 'query.pages') ) ),
        map( page => get(page, 'extract') ),
      );

    return stream$;
  }
}
