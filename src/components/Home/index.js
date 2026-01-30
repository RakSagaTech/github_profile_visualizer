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

const menuOptionsList = [
  {
    menu: 'Home',
    labelId: 'home',
  },
  {
    menu: 'Repositories',
    labelId: 'repositories',
  },
  {
    menu: 'Analysis',
    labelId: 'analysis',
  },
]

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    username: '',
    profileDetails: {},
    showErrMsg: false,
    showMenuOptions: false,
    activeMenuId: menuOptionsList[0].labelId,
  }

  apiKey = process.env.REACT_APP_GITHUB_API_KEY

  fetchProfileData = async () => {
    const {username} = this.state

    if (username.trim() === '') {
      this.setState({showErrMsg: true})
      return
    }

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiKey = process.env.REACT_APP_GITHUB_API_KEY

    const apiUrl = `https://apis2.ccbp.in/gpv/profile-details/${username}?api_key=${apiKey}`
    const options = {
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        const formattedData = {
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
        }
        this.setState({
          profileDetails: formattedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({
          apiStatus: apiStatusConstants.failure,
          showErrMsg: true,
          username: '',
        })
      }
    } catch {
      this.setState({
        apiStatus: apiStatusConstants.failure,
        showErrMsg: true,
        username: '',
      })
    }
  }

  updateActiveMenuId = id => {
    this.setState({
      activeMenuId: id,
    })
  }

  updateShowMenuOptions = () => {
    this.setState(prevState => ({
      showMenuOptions: !prevState.showMenuOptions,
    }))
  }

  onClickTry = () => {
    this.setState({showErrMsg: false}, this.fetchProfileData)
  }

  onClickSearch = () => {
    const {username} = this.state
    if (username.trim() === '') {
      this.setState({showErrMsg: true})
      return
    }
    this.fetchProfileData()
  }

  onChangeSearch = event => {
    this.setState({
      username: event.target.value,
      showErrMsg: false,
    })
  }

  renderSearchInput = () => {
    const {username, showErrMsg} = this.state
    const searchClassName = showErrMsg
      ? 'search-input search-failure-input'
      : 'search-input'
    return (
      <div className="search-container">
        <input
          type="search"
          placeholder="Enter github username"
          value={username}
          id="searchInput"
          className={searchClassName}
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

  renderProfilePageView = () => {
    const {profileDetails, showMenuOptions, activeMenuId} = this.state
    return (
      <>
        <Header
          menuOptionsList={menuOptionsList}
          showMenuOptions={showMenuOptions}
          activeMenuId={activeMenuId}
          updateShowMenuOptions={this.updateShowMenuOptions}
          updateActiveMenuId={this.updateActiveMenuId}
        />
        <div className="profile-container">
          <Profile profileDetails={profileDetails} />
        </div>
      </>
    )
  }

  renderFailurePageView = () => {
    const {showErrMsg} = this.state
    return (
      <div className="landing-page-container">
        <div>
          {this.renderSearchInput()}
          {showErrMsg && (
            <p className="err-msg">Enter the valid github username</p>
          )}
        </div>
        <h1 className="failure-title">Github Profile Visualizer</h1>
        <img
          src="https://res.cloudinary.com/degvq1cfc/image/upload/v1769657273/failure_img_sg2agc.png"
          alt="github profile visualizer home page"
          className="failure-page_img "
        />
        <p className="something-went">Something went wrong. Please try again</p>
        <button type="button" className="try-btn" onClick={this.onClickTry}>
          Try again
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

  renderLoadingPageView = () => (
    <div className="loader-container loader" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  renderHomePageView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.renderLandingPageView()
      case apiStatusConstants.failure:
        return this.renderFailurePageView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingPageView()
      case apiStatusConstants.success:
        return this.renderProfilePageView()
      default:
        return null
    }
  }

  render() {
    return <div className="home-container">{this.renderHomePageView()}</div>
  }
}

export default Home
