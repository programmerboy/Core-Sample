// import the required animation functions from the angular animations module
import { trigger, state, animate, transition, group, style } from '@angular/animations';

export const spinAnimation = trigger('hoverState', [
  state('out', style({
    background: 'linear-gradient(to bottom, #627d4d 0%, #1f3b08 100%)',
    transform: 'rotate(0deg)'
  })),
  state('in', style({
    background: 'linear-gradient(to bottom, #a90329 0%, #8f0222 44%, #6d0019 100%)',
    transform: 'rotate(360deg)'
  })),
  transition('in => out', animate('500ms ease-in')),
  transition('out => in', animate('500ms ease-out'))
]);
