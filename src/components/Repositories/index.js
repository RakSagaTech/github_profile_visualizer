import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import RepositoryCard from '../RepositoryCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Repositories extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    repositoriesList: [],
  }

  componentDidMount() {
    this.fetchRepositoriesData()
  }

  getLanguages = data =>
    data.map(eachLanguage => ({
      name: eachLanguage.name,
      count: eachLanguage.count,
    }))

  getOwnerDetails = data => ({
    avatarUrl: data.avatar_url,
    login: data.login,
  })

  fetchRepositoriesData = async () => {
    const username = localStorage.getItem('username')
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiKey = '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'
    const apiUrl = `https://apis2.ccbp.in/gpv/repos/${username}?api_key=${apiKey}`
    const options = {
      method: 'GET',
    }
    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        const formattedData = data.map(eachData => ({
          description: eachData.description,
          forksCount: eachData.forks_count,
          name: eachData.name,
          stargazersCount: eachData.stargazers_count,
          watchers: eachData.watchers,
          watchersCount: eachData.watchers_count,
          id: eachData.id,
          owner: this.getOwnerDetails(eachData.owner),
          languages: this.getLanguages(eachData.languages),
        }))
        this.setState({
          apiStatus: apiStatusConstants.success,
          repositoriesList: formattedData,
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
    this.fetchRepositoriesData()
  }

  renderNoRepositoriesDataView = () => (
    <div className="no-repositories-container">
      <Header />
      <div className="failure-image-description">
        <img
          src="https://res.cloudinary.com/degvq1cfc/image/upload/v1770573484/Empty_Box_Illustration_1_xuib2q.png"
          alt="empty repositories"
          className="no-data-img"
        />
        <h1 className="no-data">No Data Found</h1>
        <p className="no-data-description">
          GitHub Username is empty, please provide a valid username for
          Repositories
        </p>
        <Link to="/" className="nav-link">
          <p className="go-home">Go to Home</p>
        </Link>
      </div>
    </div>
  )

  renderFailurePageView = () => (
    <div className="repositories-failure">
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

  renderEmptyRepositoryView = () => (
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

  renderRepositoriesView = () => {
    const {repositoriesList} = this.state
    if (repositoriesList.length === 0) {
      return this.renderEmptyRepositoryView()
    }
    return (
      <div className="heading-and-repositories">
        <Header />
        <div className="heading-repositories">
          <h1 className="repositories-heading">Repositories</h1>
          <ul className="repositories-list">
            {repositoriesList.map(eachRepository => (
              <RepositoryCard
                key={eachRepository.id}
                repositoriesDetails={eachRepository}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoadingPageView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  renderRepositoriesPageView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingPageView()
      case apiStatusConstants.success:
        return this.renderRepositoriesView()
      case apiStatusConstants.failure:
        return this.renderFailurePageView()
      default:
        return null
    }
  }

  render() {
    const username = localStorage.getItem('username')
    console.log(username)
    if (username === '' || username === null || username === undefined) {
      return this.renderNoRepositoriesDataView()
    }
    return (
      <div className="repositories-container">
        {this.renderRepositoriesPageView()}
      </div>
    )
  }
}

export default Repositories
