import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import LinearChart from '../LinearChart'
import LanguagePieChart from '../LanguagePieChart'
import CommitPieChart from '../CommitPieChart'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Analysis extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    analysisData: [],
  }

  componentDidMount() {
    this.fetchAnalysisData()
  }

  onClickFailureTry = () => {
    this.fetchAnalysisData()
  }

  fetchAnalysisData = async () => {
    const username = localStorage.getItem('username')

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiKey = ''
    const apiUrl = `https://apis2.ccbp.in/gpv/profile-summary/${username}?api_key=${apiKey}`
    const options = {
      method: 'GET',
    }
    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        this.setState({
          apiStatus: apiStatusConstants.success,
          analysisData: data,
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

  renderNoAnalysisDataView = () => (
    <div className="no-analysis-container">
      <Header />
      <div className="failure-image-description">
        <img
          src="https://res.cloudinary.com/degvq1cfc/image/upload/v1770573484/Empty_Box_Illustration_1_xuib2q.png"
          alt="empty analysis"
          className="no-data-img"
        />
        <h1 className="no-data">No Data Found</h1>
        <p className="no-data-description">
          GitHub Username is empty, please provide a valid username for Analysis
        </p>
        <Link to="/" className="nav-link">
          <button type="button" className="go-home">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  )

  renderFailurePageView = () => (
    <div className="analysis-failure">
      <Header />
      <div className="failure-image-description">
        <img
          src="https://res.cloudinary.com/degvq1cfc/image/upload/v1769657273/failure_img_sg2agc.png"
          alt="failure view"
          className="analysis-failure-img"
        />
        <p className="analysis-something-went">
          Something went wrong. Please try again
        </p>
        <button
          type="button"
          className="analysis-try-btn"
          onClick={this.onClickFailureTry}
        >
          Try again
        </button>
      </div>
    </div>
  )

  renderEmptyAnalysisView = () => (
    <div className="no-analysis-container">
      <Header />
      <div className="failure-image-description">
        <img
          src="https://res.cloudinary.com/degvq1cfc/image/upload/v1770575032/Layer_3_aloiir.png"
          alt="no analysis"
          className="no-analysis-img"
        />
        <h1 className="no-analysis">No Repositories Found</h1>
      </div>
    </div>
  )

  renderAnalysisView = () => {
    const {analysisData} = this.state
    if (analysisData.length === 0) {
      return this.renderEmptyAnalysisView()
    }
    const {user} = analysisData
    const {avatarUrl, login} = user
    return (
      <div className="heading-and-analysis">
        <Header />
        <div className="heading-analysis">
          <div className="heading-login-avatar">
            <h1 className="analysis-heading">Analysis</h1>
            <div className="login-and-avatar">
              <img src={avatarUrl} alt={login} className="repository-avatar" />
              <h1>{login}</h1>
            </div>
          </div>
          <LinearChart analysisData={analysisData} />
          <div className="language-and-commit">
            <div className="repo-commit-container">
              <h1 className="commit-heading">Language Per Repos</h1>
              <LanguagePieChart analysisData={analysisData} />
            </div>
            <div className="repo-commit-container">
              <h1 className="commit-heading">Language Per Commits</h1>
              <CommitPieChart analysisData={analysisData} />
            </div>
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

  renderAnalysisPageView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingPageView()
      case apiStatusConstants.success:
        return this.renderAnalysisView()
      case apiStatusConstants.failure:
        return this.renderFailurePageView()
      default:
        return null
    }
  }

  render() {
    const username = localStorage.getItem('username')
    if (username === null || username === undefined) {
      return this.renderNoAnalysisDataView()
    }
    return (
      <div className="analysis-container">{this.renderAnalysisPageView()}</div>
    )
  }
}

export default Analysis
