import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Roster from './Roster'
import Schedule from './Schedule'
import Player from './Player'
import Task from './Task'
import TaskView from './TaskView'


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/task' component={Task}/>
      <Route path='/task/:number' component={TaskView}/>
      <Route path='/roster' component={Home}/>
      <Route path='/schedule' component={Schedule}/>
    </Switch>
  </main>
)

export default Main
