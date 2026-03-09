import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import HeaderContext from './context/HeaderContext'
import './App.css'

class App extends Component {
  state = {
    showMenuOptions: false,
  }

  toggleMenuOptions = () => {
    this.setState(prevState => ({
      showMenuOptions: !prevState.showMenuOptions,
    }))
  }

  render() {
    const {showMenuOptions} = this.state
    return (
      <HeaderContext.Provider
        value={{
          showMenuOptions,
          toggleMenuOptions: this.toggleMenuOptions,
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </HeaderContext.Provider>
    )
  }
}

export default App
