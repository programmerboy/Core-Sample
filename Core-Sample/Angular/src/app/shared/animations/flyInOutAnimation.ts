// import the required animation functions from the angular animations module
import { trigger, state, animate, transition, group, style, keyframes } from '@angular/animations';

export const flyInOutAnimation = trigger('flyInOut', [
  state('in', style({ opacity: 1, transform: 'translateY(0)' })),
  transition('void => *', [
    animate(500, keyframes([
      style({ opacity: 0, transform: 'translateY(-100%)', offset: 0 }),
      style({ opacity: 0.5, transform: 'translateY(15px)', offset: 0.3 }),
      style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
    ]))
  ]),
  transition('* => void', [
    animate(300, keyframes([
      style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
      style({ opacity: 0.5, transform: 'translateY(-15px)', offset: 0.7 }),
      style({ opacity: 0, transform: 'translateY(100%)', offset: 1.0 })
    ]))
  ])
]);
