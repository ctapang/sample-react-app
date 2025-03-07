import { ActionCreator, ActionCreatorsMapObject, Dispatch } from "redux";
import { PayloadAction, ADD, DELETE, TOGGLE, UPDATE } from "./Reducers";
import { TaskProps } from "./Task";

export class TaskActions implements ActionCreatorsMapObject<any> {
    [key: string]: ActionCreator<void>;

    constructor() {
        this.addTask = this.addTask.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
        this.toggleTask = this.toggleTask.bind(this)
        this.upateTask = this.updateTask.bind(this)
    }

    addTask = (task: TaskProps)  => {
        return (dispatch: Dispatch<PayloadAction<TaskProps>>) => {
            dispatch({ type: ADD, payload: task })
        }
    }

    deleteTask = (index: number) => {
        return (dispatch: Dispatch<PayloadAction<number>>) => {
            dispatch({ type: DELETE, payload: index })
        }
    }

    toggleTask = (index: number) => {
        return (dispatch: Dispatch<PayloadAction<number>>) => {
            dispatch({ type: TOGGLE, payload: index })
        }
    }

    updateTask = (task: TaskProps) => {
        return (dispatch: Dispatch<PayloadAction<TaskProps>>) => {
            dispatch({ type: UPDATE, payload: task })
        }
    }
}  
