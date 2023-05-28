//reducer helper function
import { AnyAction } from 'redux';

//return type of withMatcher function
type Matchable<AC extends ()=>AnyAction>= AC & {
  type:ReturnType<AC>['type'];
  match(action: AnyAction): action is ReturnType<AC>
};

//function overlaoding withMatcher
export function withMatcher<AC extends ()=>AnyAction & {type: string}>(actionCreator:AC):Matchable<AC>;
export function withMatcher<AC extends (...args: any[])=>AnyAction & {type:string}>(actionCreator:AC):Matchable<AC>;
export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;//return type
  return Object.assign(actionCreator, {    //using assign here to define a (match) method for function withMatcher
    type,
    match(action: AnyAction) {//enum action type? -- me
      return action.type === type;
    }
  })
}

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
}

export type Action<T> = {
  type: T;
}

//function overloading createaction
// - overloaded function has same number of paramters
// implemente later
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T,P>;
export function createAction<T extends string>(type: T, payload: void): Action<T>;
// implemente
export function createAction<T extends string, P>(type: T, payload: P) {
  return {type, payload};
}