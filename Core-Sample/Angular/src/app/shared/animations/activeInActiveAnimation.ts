// import the required animation functions from the angular animations module
import { trigger, state, animate, transition, group, style } from '@angular/animations';

export const activeInActiveAnimation = trigger('heroState', [
  state('inactive', style({
    background: 'linear-gradient(to bottom, #627d4d 0%, #1f3b08 100%)',
    transform: 'scale(1)'
  })),
  state('active', style({
    background: 'linear-gradient(to bottom, #a90329 0%, #8f0222 44%, #6d0019 100%)',
    transform: 'scale(1.1)'
  })),
  transition('inactive => active', animate('100ms ease-in')),
  transition('active => inactive', animate('100ms ease-out'))
]);
