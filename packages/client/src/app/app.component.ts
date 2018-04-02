import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routerTransition } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [routerTransition]
})
export class AppComponent {
  getState(outlet: RouterOutlet) {
     const state = outlet.activatedRouteData.state;
     console.log('[app-root] router state is', state);

     return state;
  }
}
