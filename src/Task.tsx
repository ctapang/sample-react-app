import Button from '@mui/material/Button'
import { Checkbox, TextField } from '@mui/material'
import { useState, ChangeEvent, FocusEvent } from 'react'
import { TaskActions } from './Actions'
import { PayloadAction } from './Reducers'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

export interface TaskProps {
    index: number
    what: string
    done: boolean
    actions?: any
}

function Task(props: TaskProps) {
    // assemble an input Task in a local state
    // const [what, setWhat] = useState<string>(props.what ? props.what : '')
    const [task, setTask] = useState<TaskProps>({ ...props })

    function handleCheck(event: ChangeEvent<HTMLInputElement>, checked: boolean) {
        event.preventDefault()
        const idstr = event.target.parentElement?.parentElement?.parentElement?.id as string
        console.log("--> checked: ", checked)
        const id = parseInt(idstr)
        console.log("--> id: ", id)
        props.actions.toggleTask(id - 1)
    }
    
    function handleDeletion(event: any) {
        event.preventDefault()
        const idstr = event.target.parentElement?.parentElement?.id as string
        console.log("--> nodeName: ", event.target.parentElement?.parentElement?.nodeName)
        console.log("--> idstr: ", idstr)
        const id = parseInt(idstr)
        props.actions.deleteTask(id - 1)
    }
    
    function handleTextInput(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        const { name, value } = event.target;
        console.log("--> handleTextInput nodeName: ", name)
        console.log("--> handleTextInput value: ", value)
        const { index, done } = task
        setTask({ index, what: value, done })
        console.log("--> after text input what: ", task.what)
    }

    function handleTextCompletion(event: FocusEvent<HTMLInputElement>) {
        event.preventDefault()
        console.log("--> task: ", props)
        console.log("--> what: ", task.what)
        const { index, what, done } = task
        props.actions.updateTask({ index, what, done })
    }
    
    return (
        <tr id={(props.index + 1).toFixed(0)}>
        <td>
            <TextField 
                onChange={(event: ChangeEvent<HTMLInputElement>) => {handleTextInput(event)}}
                onBlur={(event: FocusEvent<HTMLInputElement>) => {handleTextCompletion(event)}}
                value={task.what} />
        </td>
        <td>
            <Checkbox checked={props.done} onChange={handleCheck} />
        </td>
        <td>
            <Button onClick={handleDeletion} color='warning'>X</Button>
        </td>
        </tr>
    )
}

const mapDispatchToProps = function (
    dispatch: Dispatch<PayloadAction<any>>
  ) {
    return {
      actions: bindActionCreators(new TaskActions(), dispatch),
    }
}

export default connect(null, mapDispatchToProps)(Task)
