import {Component} from 'react'
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

class Repository extends Component {
  state = {
    apiStatus: apiStatusConstants.su,
    repositoriesLists: [],
    showMenuOptions: false,
    activeMenuId: menuOptionsList[0].labelId,
  }

  componentDidMount() {
    this.fetchRepositoriesData()
  }

  getOwner = owner => ({
    avatarUrl: owner.avatar_url,
    eventsUrl: owner.events_url,
    followersUrl: owner.followers_url,
    followingUrl: owner.following_url,
    gistsUrl: owner.gists_url,
    gravatarId: owner.gravatar_id,
    htmlUrl: owner.html_url,
    id: owner.id,
    login: owner.login,
    nodeId: owner.node_id,
    organizationsUrl: owner.organizations_url,
    receivedEventsUrl: owner.received_events_url,
    reposUrl: owner.repos_url,
    siteAdmin: owner.site_admin,
    starredUrl: owner.starred_url,
    subscriptionsUrl: owner.subscriptions_url,
    type: owner.type,
    url: owner.url,
  })

  getPermission = permission => ({
    admin: permission.admin,
    maintain: permission.maintain,
    pull: permission.pull,
    push: permission.push,
    triage: permission.triage,
  })

  fetchRepositoriesData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const username = this.props

    const apiKey = '*******'
    const apiUrl = `https://apis2.ccbp.in/gpv/repos/${username}?api_key=${apiKey}`
    const options = {
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        const formattedData = data.map(eachItem => ({
          allowForking: eachItem.allow_forking,
          archiveUrl: eachItem.archive_url,
          archived: eachItem.archived,
          assigneesUrl: eachItem.assignees_url,
          blobsUrl: eachItem.blobs_url,
          branchesUrl: eachItem.branches_url,
          cloneUrl: eachItem.clone_url,
          collaboratorsUrl: eachItem.collaborators_url,
          commentsUrl: eachItem.comments_url,
          compareUrl: eachItem.compare_url,
          contentsUrl: eachItem.contents_url,
          contributorsUrl: eachItem.contributors_url,
          createdAt: eachItem.crated_at,
          defaultBranch: eachItem.default_branch,
          deploymentsUrl: eachItem.deployments_url,
          description: eachItem.description,
          disabled: eachItem.disabled,
          downloadsUrl: eachItem.downloads_url,
          eventsUrl: eachItem.events_url,
          fork: eachItem.fork,
          forks: eachItem.forks,
          forksCount: eachItem.forks_count,
          forksUrl: eachItem.forks_url,
          fullName: eachItem.full_name,
          gitCommitsUrl: eachItem.git_commits_url,
          gitRefsUrl: eachItem.git_refs_url,
          gitTagsUrl: eachItem.git_tags_url,
          gitUrl: eachItem.git_url,
          hasDiscussions: eachItem.has_discussions,
          hasDownloads: eachItem.has_downloads,
          hasIssues: eachItem.has_issues,
          hasPages: eachItem.has_pages,
          hasProjects: eachItem.has_projects,
          hasWiki: eachItem.has_wiki,
          hooksUrl: eachItem.hooks_url,
          htmlUrl: eachItem.html_url,
          id: eachItem.id,
          isTemplate: eachItem.is_template,
          issueCommentsUrl: eachItem.issue_comments_url,
          issueEventsUrl: eachItem.issue_events_url,
          issuesUrl: eachItem.issues_url,
          keysUrl: eachItem.keys_url,
          labelsUrl: eachItem.labels_url,
          language: eachItem.language,
          languages: eachItem.languages.map(eachLanguage => ({
            name: eachLanguage.name,
            value: eachLanguage.value,
          })),
          languageUrl: eachItem.languages_url,
          license: eachItem.license,
          mergesUrl: eachItem.merges_url,
          milestonesUrl: eachItem.milestones_url,
          mirrorUrl: eachItem.mirror_url,
          name: eachItem.name,
          nodeId: eachItem.node_id,
          notificationsUrl: eachItem.notifications_url,
          openIssues: eachItem.open_issues,
          openIssuesCount: eachItem.open_issues_count,
          owner: this.getOwner(eachItem.owner),
          permissions: this.getPermission(eachItem.permissions),
          private: eachItem.private,
          pullsUrl: eachItem.pulls_url,
          pushedAt: eachItem.pushed_at,
          releasesUrl: eachItem.releases_url,
          size: eachItem.size,
          sshUrl: eachItem.ssh_url,
          stargazersCount: eachItem.stargazers_count,
          stargazersUrl: eachItem.stargazers_url,
          statusesUrl: eachItem.statuses_url,
          subscribersUrl: eachItem.subscribers_url,
          subscriptionUrl: eachItem.subscription_url,
          svnUrl: eachItem.svn_url,
          tagsUrl: eachItem.tags_url,
          teamsUrl: eachItem.teams_url,
          topics: eachItem.topics,
          treesUrl: eachItem.trees_url,
          updatedAt: eachItem.updated_at,
          url: eachItem.url,
          visibility: eachItem.visibility,
          watchers: eachItem.watchers,
          watchersCount: eachItem.watchers_count,
          webCommitSignOffRequired: eachItem.web_commit_signoff_required,
        }))
        this.setState({
          repositoriesLists: formattedData,
          apiStatus: apiStatusConstants.success,
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

  renderNoRepositoriesPageView = () => (
    <div className="repository-failure-container">
      <h1>No Data Found</h1>
      <p>
        GitHub Username is empty, please provide a valid username for
        Repositories
      </p>
      <button type="button">Go to Home</button>
    </div>
  )

  renderFailurePageView = () => (
    <div className="repository-failure-container">
      <p>No Repositories Found</p>
    </div>
  )

  renderRepositoriesPageView = () => {
    const {repositoriesLists} = this.state

    if (repositoriesLists.length === 0) {
      this.renderFailurePageView()
    }

    return (
      <div className="heading-and-repositories">
        <h1 className="repositories-heading">Repositories</h1>
        <ul className="repositories-list">
          {repositoriesLists.map(eachRepository => (
            <RepositoryCard
              key={eachRepository.id}
              repositoryDetails={eachRepository}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingPageView = () => (
    <div className="loader-container loader" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  renderRepositoryView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingPageView()
      case apiStatusConstants.success:
        return this.renderRepositoriesPageView()
      case apiStatusConstants.failure:
        return this.renderFailurePageView()
      default:
        return null
    }
  }

  render() {
    const {showMenuOptions, activeMenuId} = this.state
    const {username} = this.props

    if (username === undefined || username === '') {
      return this.renderNoRepositoriesPageView()
    }
    return (
      <div className="repository-container">
        <Header
          menuOptionsList={menuOptionsList}
          showMenuOptions={showMenuOptions}
          activeMenuId={activeMenuId}
          updateShowMenuOptions={this.updateShowMenuOptions}
          updateActiveMenuId={this.updateActiveMenuId}
        />
        {this.renderRepositoryView()}
      </div>
    )
  }
}

export default Repository
