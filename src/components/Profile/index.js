import {HiOutlineSearch} from 'react-icons/hi'

import {RiBuildingLine} from 'react-icons/ri'

import {IoLocationOutline} from 'react-icons/io5'

import {IoMdLink} from 'react-icons/io'

import './index.css'

const Profile = props => {
  const {profileDetails} = props
  const {
    avatarUrl,
    name,
    login,
    bio,
    followers,
    following,
    publicRepos,
    company,
    location,
    organizationsUrl,
  } = profileDetails
  const renderProfileSearch = () => (
    <div className="profile-search-container">
      <input
        type="search"
        value={name}
        id="searchInput"
        className="profile-search-input"
      />
      <button
        type="button"
        aria-label="Github Search Icon"
        data-testid="searchButton"
        className="profile-search-btn"
        disabled="true"
      >
        <HiOutlineSearch className="profile-search-icon" />
      </button>
    </div>
  )

  return (
    <>
      {renderProfileSearch()}
      <div className="profile-details-container">
        <div className="profile-img-contianer">
          <img src={avatarUrl} alt="name" className="avatar" />
        </div>
        <h1 className="profile-name">{name}</h1>
        <p className="profile-login">{login}</p>
        <p className="profile-bio">{bio}</p>
        <div className="profile-stats-container">
          <div className="followers-stats-container">
            <p className="followers-stats">{followers}</p>
            <p className="followers-heading">FOLLOWERS</p>
          </div>
          <div className="following-stats-container">
            <p className="following-stats">{following}</p>
            <p className="following-heading">FOLLOWING</p>
          </div>
          <div className="public-stats-container">
            <p className="public-stats">{publicRepos}</p>
            <p className="public-heading">PUBLIC REPOS</p>
          </div>
        </div>
        <div className="company-location-container">
          <div className="company-container">
            <p className="company-heading">Company</p>
            <div className="icon-and-company">
              <RiBuildingLine className="icon" />
              <p className="company-description">{company}</p>
            </div>
          </div>
          <div className="companyurl-container-lg">
            <p className="company-url">Company Url</p>
            <div className="icon-and-company">
              <a
                href={organizationsUrl}
                className="anchor"
                aria-label="Company organization link"
              >
                <IoMdLink className="icon" />
              </a>
              <p className="organization-url">{organizationsUrl}</p>
            </div>
          </div>
          <div className="company-container">
            <p className="company-heading">Location</p>
            <div className="icon-and-company">
              <IoLocationOutline className="icon" />
              <p className="company-description">{location}</p>
            </div>
          </div>
        </div>
        <div className="companyurl-container">
          <p className="company-heading">Company Url</p>
          <div className="icon-and-company ">
            <a
              href={organizationsUrl}
              className="anchor"
              aria-label="Company organization link"
            >
              <IoMdLink className="icon" />
            </a>
            <p className="organization-url">{organizationsUrl}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
