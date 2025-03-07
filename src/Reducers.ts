import { Action } from "redux"
import { configureStore } from '@reduxjs/toolkit'
import { TaskProps } from "./Task";

// The action type is the first argument of the action object,
// which is a string that describes the action.
// The second argument is the payload, which can be any type
// The payload is optional, so we use the generic type T
export class PayloadAction<T> implements Action<string> {
  type: string = "noAction"
  payload?: T = {} as T
}

// For simplicity, we do not put the action types in a separate file
// Normally, the action types are declared in a separate file
export const ADD: string = 'ADD_TASK';
export const DELETE: string = 'DELETE_TASK';
export const TOGGLE: string = 'TOGGLE_TASK';
export const UPDATE: string = 'UPDATE_TASK';

const initialState: TaskProps[] = [
    { index: 0, what: 'Do Laundry', done: false },
    { index: 1, what: 'Buy Groceries', done: true },
    { index: 2, what: 'Have dinner', done: false },
]

// the rootReducer function
// Normally the action types consist of constans, but for simplicity, we use strings
function rootReducer(state: TaskProps[] = initialState, action: PayloadAction<any>) {
    switch (action.type) {
        case ADD:
            {
                const { index, what, done } = action.payload
                return [ ...state, { index, what, done } ]
            }
        case DELETE:
            {
                return state.filter((task) => task.index !== action.payload)
            }
        case TOGGLE:
            {
                return state.map((task) => {
                    if (task.index === action.payload) {
                        return { ...task, done: !task.done }
                    }
                    return task
                })
            }
        case UPDATE:
            {
                return state.map((task) => {
                    if (task.index === action.payload.index) {
                        return action.payload
                    }
                    return task
                })
            } 
        default:
          return state;
    }
}


// The store is created with the rootReducer
// The store is exported so that it can be used in the App component
// Normally, the store is declared in a separate file
// For simplicity, we declare it here
const store = configureStore({
  reducer: rootReducer,
});

export { store };

