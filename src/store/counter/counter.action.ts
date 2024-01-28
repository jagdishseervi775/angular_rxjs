import { createAction } from '@ngrx/store';

export const increment = createAction('inrementFn');
export const decrement = createAction('decrementFn');
export const reset = createAction('resetFn');