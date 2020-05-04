// import the required animation functions from the angular animations module
import { trigger, state, animate, transition, group, style, keyframes } from '@angular/animations';

export const combineAnimation = trigger('combine', [
  state('in', style({ opacity: 1, transform: 'translateY(0)' })),
  transition('void => *', [
    animate(1000, keyframes([
      style({ opacity: 0, transform: 'translateY(-100%) rotate(0deg)', offset: 0 }),
      style({ opacity: 0.5, transform: 'translateY(30px) rotate(180deg)', offset: 0.5 }),
      style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
    ]))
  ]),
  transition('* => void', [
    animate(1000, keyframes([
      style({ opacity: 1, transform: 'translateY(0) rotate(360deg)', offset: 0 }),
      style({ opacity: 0.5, transform: 'translateY(-30px) rotate(0deg)', offset: 0.5 }),
      style({ opacity: 0, transform: 'translateY(100%)', offset: 1.0 })
    ]))
  ])
]);
