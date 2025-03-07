import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Task, { TaskProps } from './Task'
// import { store } from './Reducers'
import Button from '@mui/material/Button'
// import { useState, ChangeEvent } from 'react'
import { TaskActions } from './Actions'
import { PayloadAction } from './Reducers'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

// Each task is an element in the tasks array.
// We retrieve the array from the store state.
// We render the tasks in the App itself.
function App(props: { actions: any, tasks: TaskProps[] }) {

  function getNextIndex() {
    let max = 0;
    for (let i = 0; i < props.tasks.length; i++) {
      const { index } = props.tasks[i]
      if (max < index) {
        max = index
      }
    }
    return (max + 1)
  }

  function handleAdd(event: any) {
    event.preventDefault()
    const index = getNextIndex()
    props.actions.addTask({ index, what: 'Edit this', done: false })
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Task Manager
        </Typography>
        <table border={1}>
          <thead>
            <tr>
            <th scope="col">Do these items today</th>
            <th scope="col">Done</th>
            <th scope="col">X</th>
            </tr>
          </thead>
          <tbody>
            { props.tasks.map((t) => ( <Task key={t.index} { ...t } />))}
          </tbody>
        </table>
        <Button onClick={handleAdd} >Add Task</Button>
      </Box>
    </Container>
  );
}

const mapDispatchToProps = function (
  dispatch: Dispatch<PayloadAction<any>>
) {
  return {
    actions: bindActionCreators(new TaskActions(), dispatch),
  }
}

const mapStateToProps = function(state: any) {
  return {
    tasks: state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
