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
  }

  renderSearchInput = () => {
    const {showErr} = this.state
    return (
      <>
        <div className="search-container">
          <input
            type="search"
            placeholder="Enter github username"
            id="searchInput"
            className="search-input"
          />
          <button
            type="button"
            aria-label="Github Search Icon"
            data-testid="searchButton"
            className="search-btn"
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
        <button type="button" className="try-btn">
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
          alt="gitHub profile visualizer home page"
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
