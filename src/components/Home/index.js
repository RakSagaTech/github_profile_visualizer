import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    username: '',
  }

  onClickSearch = () => {
    this.fetchUserData()
  }

  onChangeSearch = event => {
    const {value} = event.target
    this.setState({
      username: value,
    })
  }

  renderSearchInput = () => {
    const {username} = this.state
    return (
      <div className="search-container">
        <input
          type="search"
          placeholder="Enter github username"
          value={username}
          id="searchInput"
          className="search-input"
          onChange={this.onChangeSearch}
        />
        <button
          type="button"
          aria-label="Github Search Icon"
          data-testid="searchButton"
          className="search-btn"
          onClick={this.onClickSearch}
        >
          <HiOutlineSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderLandingPageView = () => (
    <div className="landing-page-container">
      {this.renderSearchInput()}
      <h1 className="title">Github Profile Visualizer</h1>
      <img
        src="https://res.cloudinary.com/degvq1cfc/image/upload/v1769654736/home_img_eaodv3.png"
        alt="github profile visualizer home page"
        className="home-page_img"
      />
    </div>
  )

  renderHomePageView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.renderLandingPageView()
      default:
        return null
    }
  }

  render() {
    return <div className="home-container">{this.renderHomePageView()}</div>
  }
}

export default Home
