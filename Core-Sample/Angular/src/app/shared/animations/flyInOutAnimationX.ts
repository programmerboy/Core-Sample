// import the required animation functions from the angular animations module
import { trigger, state, animate, transition, group, style } from '@angular/animations';

export const flyInOutAnimationX = trigger('flyInOut', [
  state('in', style({ opacity: 1, transform: 'translateX(0)' })),
  transition('void => *', [
    style({
      opacity: 0,
      transform: 'translateX(-100%)'
    }),
    animate('0.2s ease-in')
  ]),
  transition('* => void', [
    animate('0.2s 0.1s ease-out', style({
      opacity: 0,
      transform: 'translateX(100%)'
    }))
  ])
]);
