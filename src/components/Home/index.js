import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import Loader from 'react-loader-spinner'

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
    showErr: false,
    username: '',
  }

  fetchProfileData = async () => {
    const username = localStorage.getItem('username')
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiKey = ''
    const apiUrl = `https://apis2.ccbp.in/gpv/profile-details/${username}?api_key=${apiKey}`
    const options = {
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        this.setState({
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({
          apiStatus: apiStatusConstants.failure,
          showErr: true,
          username: '',
        })
        localStorage.removeItem('username')
      }
    } catch (err) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
        showErr: true,
        username: '',
      })
      localStorage.removeItem('username')
    }
  }

  onClickTryAgain = () => {
    const {username} = this.state
    if (username.trim() === '') {
      this.setState({
        apiStatus: apiStatusConstants.failure,
        showErr: true,
      })
    } else {
      localStorage.setItem('username', username)
      this.fetchProfileData()
    }
  }

  onClickSearch = () => {
    const {username} = this.state
    if (username.trim() === '') {
      this.setState({
        apiStatus: apiStatusConstants.failure,
        showErr: true,
      })
    } else {
      localStorage.setItem('username', username)
      this.fetchProfileData()
    }
  }

  onChangeSearchInput = event => {
    this.setState({
      username: event.target.value,
    })
  }

  renderSearchInput = () => {
    const {showErr, username} = this.state
    const inputClass = showErr ? 'search-input search-failure' : 'search-input'
    return (
      <>
        <div className="search-container">
          <input
            type="search"
            placeholder="Enter github username"
            id="searchInput"
            className={inputClass}
            onChange={this.onChangeSearchInput}
            value={username}
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
        {showErr && <p className="err-msg">Enter the valid github username</p>}
      </>
    )
  }

  renderFailurePageView = () => (
    <div className="landingpage-container">
      <div className="search-image-container">
        {this.renderSearchInput()}
        <h1 className="failure-title">GitHub Profile Visualizer</h1>
        <img
          src="https://res.cloudinary.com/degvq1cfc/image/upload/v1769657273/failure_img_sg2agc.png"
          alt="failure view"
          className="failure-img"
        />
        <p className="something-went">Something went wrong. Please try again</p>
        <button
          type="button"
          className="try-btn"
          onClick={this.onClickTryAgain}
        >
          Try again
        </button>
      </div>
    </div>
  )

  renderProfilePageView = () => <p>Profile View</p>

  renderLoadingPageView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  renderLandingPageView = () => (
    <div className="landingpage-container">
      <div className="search-image-container">
        {this.renderSearchInput()}
        <h1 className="home-title">GitHub Profile Visualizer</h1>
        <img
          src="https://res.cloudinary.com/degvq1cfc/image/upload/v1769654736/home_img_eaodv3.png"
          alt="github profile visualizer home page"
          className="home-image"
        />
      </div>
    </div>
  )

  renderHomePageView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingPageView()
      case apiStatusConstants.success:
        return this.renderProfilePageView()
      case apiStatusConstants.failure:
        return this.renderFailurePageView()
      default:
        return this.renderLandingPageView()
    }
  }

  render() {
    return <div className="home-container">{this.renderHomePageView()}</div>
  }
}

export default Home
