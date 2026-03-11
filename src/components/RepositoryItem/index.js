import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import RepositoryPie from '../RepositoryPie'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const colorsList = ['#E879F9', '#4ADE80', '#38BDF8', '#F472B6', '#FBBF24']
const backgroundColorList = [
  '#C026D329',
  '#22C55E29',
  '#0284C729',
  '#DB277729',
  '#F59E0B29',
]

class RepositoryItem extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    repositoryItemData: [],
  }

  componentDidMount() {
    this.fetchRepositoryItemData()
  }

  getContributors = data => ({
    avatarUrl: data.avatar_url,
  })

  getLanguages = data =>
    data.map(eachLanguage => ({
      name: eachLanguage.name,
      count: eachLanguage.value,
    }))

  getOwnerDetails = data => ({
    avatarUrl: data.avatar_url,
    login: data.login,
  })

  fetchRepositoryItemData = async () => {
    const username = localStorage.getItem('username')
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {repoName} = params
    const apiKey = ''
    const apiUrl = `https://apis2.ccbp.in/gpv/specific-repo/${username}/${repoName}?api_key=${apiKey}`
    const options = {
      method: 'GET',
    }
    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        const formattedData = {
          description: data.description,
          forksCount: data.forks_count,
          name: data.name,
          stargazersCount: data.stargazers_count,
          id: data.id,
          issuesCount: data.open_issues_count,
          commitsCount: data.commits_count,
          watchersCount: data.watchers_count,
          owner: this.getOwnerDetails(data.owner),
          languages: this.getLanguages(data.lanuages),
          contributors: data.contributors.map(eachContributor =>
            this.getContributors(eachContributor),
          ),
        }
        this.setState({
          apiStatus: apiStatusConstants.success,
          repositoryItemData: formattedData,
        })
      } else {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        })
      }
    } catch (err) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickFailureTry = () => {
    this.fetchRepositoryItemData()
  }

  renderRepositoryFailurePageView = () => (
    <div className="repository-item-failure">
      <Header />
      <div className="failure-image-description">
        <img
          src="https://res.cloudinary.com/degvq1cfc/image/upload/v1769657273/failure_img_sg2agc.png"
          alt="failure view"
          className="repositories-failure-img"
        />
        <p className="repositories-something-went">
          Something went wrong. Please try again
        </p>
        <button
          type="button"
          className="repositories-try-btn"
          onClick={this.onClickFailureTry}
        >
          Try again
        </button>
      </div>
    </div>
  )

  renderEmptyRepositoryItemView = () => (
    <div className="no-repositories-container">
      <Header />
      <div className="failure-image-description">
        <img
          src="https://res.cloudinary.com/degvq1cfc/image/upload/v1770575032/Layer_3_aloiir.png"
          alt="no repositories"
          className="no-repositories-img"
        />
        <h1 className="no-repositories">No Repositories Found</h1>
      </div>
    </div>
  )

  renderLanguagesList = languages =>
    languages.map((eachLanguage, index) => (
      <li
        key={eachLanguage.name}
        style={{
          color: colorsList[index % colorsList.length],
          backgroundColor: backgroundColorList[index % colorsList.length],
        }}
        className="repository-card-language-item"
      >
        <p>{eachLanguage.name}</p>
      </li>
    ))

  renderRepositoryItemView = () => {
    const {repositoryItemData} = this.state
    if (repositoryItemData.length === 0) {
      return this.renderEmptyRepositoryItemView()
    }
    const {
      name,
      description,
      languages,
      stargazersCount,
      forksCount,
      commitsCount,
      issuesCount,
      contributors,
      watchersCount,
    } = repositoryItemData
    return (
      <div className="heading-and-repository">
        <Header />
        <div className="heading-repository">
          <h1 className="respository-item-heading">{name}</h1>
          {description && (
            <p className="repository-description">{description}</p>
          )}
          <ul className="repository-languages-list">
            {this.renderLanguagesList(languages)}
          </ul>
          <div className="repository-card-stats">
            <div className="repository-stats-container">
              <img
                src="https://res.cloudinary.com/degvq1cfc/image/upload/v1769832476/Star_-_16px.1_deikyf.png"
                alt="star"
                className="repository-stats-img"
              />
              <p className="repository-stats-count">{stargazersCount}</p>
            </div>
            <div className="repository-stats-container">
              <img
                src="https://res.cloudinary.com/degvq1cfc/image/upload/v1769832498/Git_3_juxwya.png"
                alt="fork"
                className="repository-stats-img"
              />
              <p className="repository-stats-count">{forksCount}</p>
            </div>
          </div>
          <div className="commits-issues-container">
            <div className="count-container">
              <p className="count-heading">Commits Counts</p>
              <p className="count">
                {commitsCount === undefined ? '0' : commitsCount}
              </p>
            </div>
            <div className="issues-count-container">
              <p className="count-heading">Issues Counts</p>
              <p className="count">
                {issuesCount === undefined ? '0' : issuesCount}
              </p>
            </div>
            <div className="issues-count-container">
              <p className="count-heading">Watchers Counts</p>
              <p className="count">{watchersCount}</p>
            </div>
          </div>
          <div className="contributors-contianer">
            <h1 className="contributors-heading">Contributors :</h1>
            <p className="contributors-members">
              {contributors.length} Members
            </p>
            <ul className="contributors-list">
              {contributors.slice(0, 4).map(eachItem => (
                <li className="img-item" key={eachItem.name}>
                  <img
                    src={eachItem.avatarUrl}
                    alt="contributor profile"
                    className="contributor-img"
                  />
                </li>
              ))}

              {contributors.length > 4 && (
                <li className="img-item more-count">
                  +{contributors.length - 4}
                </li>
              )}
            </ul>
          </div>
          <div className="languages-pie-container">
            <h1 className="languages-heading">Languages :</h1>
            <RepositoryPie languages={languages} />
          </div>
        </div>
      </div>
    )
  }

  renderLoadingPageView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  renderRepositoryItemPageView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingPageView()
      case apiStatusConstants.success:
        return this.renderRepositoryItemView()
      case apiStatusConstants.failure:
        return this.renderRepositoryFailurePageView()
      default:
        return null
    }
  }

  render() {
    const username = localStorage.getItem('username')
    if (username === null || username === undefined || username === '') {
      return this.renderRepositoryFailurePageView()
    }
    return (
      <div className="repository-item-container">
        {this.renderRepositoryItemPageView()}
      </div>
    )
  }
}

export default RepositoryItem
