import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

/**
 * This animation will fade in / out items using their opacity
 */
export const fadeInOut = [
  trigger('fadeInOut', [
    transition(':enter', [
      style({
        opacity: 0
      }),
      animate('350ms cubic-bezier(0.4, 0.0, 1, 1)', style({
        opacity: 1
      }))
    ]),
    transition(':leave', [
      animate('350ms cubic-bezier(0.190, 1.000, 0.220, 1.000)', style({
        opacity: 0
      }))
    ])
  ])
];

