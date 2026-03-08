import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'

import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    )
  }
}

export default App
