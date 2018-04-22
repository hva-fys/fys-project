import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  group,
  stagger
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



export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    query(':enter, :leave', style({  }), { optional: true } ),
    query('mat-card', style({ opacity: 0 }), { optional: true }),
    group([  // block executes in parallel
      query(':enter', style({ opacity: 1 }), { optional: true }),
      query(':leave', style({ opacity: 0 }), { optional: true }),
    ]),
    query(':enter mat-card', stagger(100, [
      style({ transform: 'translateY(100px)' }),
      animate('150ms ease-in-out',
        style({ transform: 'translateY(0px)', opacity: 1 })),
    ]), { optional: true }),
  ])
]);
