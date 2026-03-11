import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Repositories from './components/Repositories'
import RepositoryItem from './components/RepositoryItem'
import Analysis from './components/Analysis'
import NotFound from './components/NotFound'
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
          <Route exact path="/repositories" component={Repositories} />
          <Route
            exact
            path="/repositories/:repoName"
            component={RepositoryItem}
          />
          <Route exact path="/not-found" component={NotFound} />
          <Route exact path="/analysis" component={Analysis} />
          <Redirect to="/not-found" />
        </Switch>
      </HeaderContext.Provider>
    )
  }
}

export default App
