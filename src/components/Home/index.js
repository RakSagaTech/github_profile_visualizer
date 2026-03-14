import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Profile from '../Profile'

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
    failurePage: false,
    username: '',
    profileData: {},
  }

  componentDidMount() {
    const savedUsername = localStorage.getItem('username')
    if (savedUsername) {
      this.setState({username: savedUsername}, this.fetchProfileData)
    }
  }

  getProfileData = data => ({
    avatarUrl: data.avatar_url,
    bio: data.bio,
    blog: data.blog,
    company: data.company,
    createdAt: data.created_at,
    email: data.email,
    eventsUrl: data.events_url,
    followers: data.followers,
    followersUrl: data.followers_url,
    following: data.following,
    followingUrl: data.following_url,
    gistsUrl: data.gists_url,
    gravatarId: data.gravatar_id,
    hireable: data.hireable,
    htmlUrl: data.html_url,
    id: data.id,
    location: data.location,
    login: data.login,
    name: data.name,
    nodeId: data.node_id,
    organizationsUrl: data.organizations_url,
    publicGists: data.public_gists,
    publicRepos: data.public_repos,
    receivedEventsUrl: data.received_events_url,
    reposUrl: data.repos_url,
    siteAdmin: data.site_admin,
    starredUrl: data.starred_url,
    subscriptionsUrl: data.subscriptions_url,
    twitterUsername: data.twitter_username,
    type: data.type,
    updatedAt: data.updated_at,
    url: data.url,
  })

  fetchProfileData = async () => {
    const {username} = this.state
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
        const formattedData = this.getProfileData(data)
        this.setState({
          apiStatus: apiStatusConstants.success,
          profileData: formattedData,
        })
      } else {
        this.setState({
          apiStatus: apiStatusConstants.failure,
          showErr: true,
          failurePage: true,
          username: '',
        })
      }
    } catch (err) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
        showErr: true,
        failurePage: true,
        username: '',
      })
    }
  }

  onClickTryAgain = () => {
    this.setState(
      {
        failurePage: false,
      },
      this.fetchProfileData,
    )
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
    const {showErr, username, failurePage} = this.state
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
            disabled={failurePage}
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
      <div className="home-header">
        <Header />
      </div>
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

  renderProfilePageView = () => {
    const {profileData} = this.state
    return (
      <div className="home-profile-container">
        <Header />
        <Profile profileDetails={profileData} />
      </div>
    )
  }

  renderLoadingPageView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  renderLandingPageView = () => (
    <div className="landingpage-container">
      <div className="home-header">
        <Header />
      </div>
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
