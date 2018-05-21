import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp } from '@angular/http';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class WikipediaService {

  constructor(private jsonp: Jsonp) { }


  getIntro(title: string) {

    const search = new URLSearchParams();

    search.set('action', 'opensearch');
    search.set('search', title);
    search.set('format', 'json');

    const url = 'https://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK' + title;

    const stream$ = this.jsonp.get(url, { search })
      .pipe(
        map((request) => request.json()[1])
      );

    stream$.subscribe({
      next: console.log,
      error: console.error
    });

    return stream$;
  }
}
