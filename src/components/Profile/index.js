import {HiOutlineSearch} from 'react-icons/hi'
import {RiBuildingLine} from 'react-icons/ri'
import {IoLocationOutline} from 'react-icons/io5'
import {IoMdLink} from 'react-icons/io'

import './index.css'

const Profile = props => {
  const {profileDetails} = props
  const {
    name,
    avatarUrl,
    login,
    bio,
    blog,
    followers,
    following,
    publicRepos,
    company,
    location,
    organizationsUrl,
  } = profileDetails

  const renderProfileSearchInput = () => (
    <div className="profile-search-container">
      <input
        type="search"
        value={name}
        id="searchInput"
        className="profile-search-input"
        readOnly
      />
      <button
        type="button"
        aria-label="Github Search Icon"
        data-testid="searchButton"
        className="profile-search-btn"
        disabled
      >
        <HiOutlineSearch className="profile-search-icon" />
      </button>
    </div>
  )

  return (
    <div className="profile-container">
      {renderProfileSearchInput()}
      <div className="profile-data-container">
        <div className="profile-img-container">
          <img src={avatarUrl} alt={name} className="profile-img" />
        </div>
        <h1 className="profile-name">{name}</h1>
        <p className="profile-login">{login}</p>
        <p className="profile-title">BIO</p>
        <p className="profile-bio">{bio}</p>
        <p className="profile-title">BLOG</p>
        <p className="profile-bio">{blog}</p>
      </div>
      <div className="profile-stats-container">
        <div className="stats-container">
          <p className="stats">{followers}</p>
          <p className="stats-heading">FOLLOWERS</p>
        </div>
        <hr className="hr-line" />
        <div className="stats-container">
          <p className="stats">{following}</p>
          <p className="stats-heading">FOLLOWING</p>
        </div>
        <hr className="hr-line" />
        <div className="stats-container">
          <p className="stats">{publicRepos}</p>
          <p className="stats-heading">PUBLIC REPOS</p>
        </div>
      </div>
      <div className="company-location-url">
        <div className="heading-and-icon">
          <p className="stats">Company</p>
          <div className="icon-and-description">
            <RiBuildingLine className="icon" />
            <p className="profile-description">{company}</p>
          </div>
        </div>
        <div className="heading-and-icon">
          <p className="stats">Location</p>
          <div className="icon-and-description">
            <IoLocationOutline className="icon" />
            <p className="profile-description">{location}</p>
          </div>
        </div>
        <div className="heading-and-icon">
          <p className="stats">Company Url</p>
          <div className="icon-and-description">
            <a
              href={organizationsUrl}
              className="anchor"
              aria-label="Company organization link"
            >
              <IoMdLink className="icon" />
            </a>
            <p className="profile-description">{organizationsUrl}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
