import {Link, withRouter} from 'react-router-dom'
import HeaderContext from '../../context/HeaderContext'

import './index.css'

export const menuOptionsList = [
  {
    menu: 'Home',
    label: 'HOME',
    path: '/',
  },
  {
    menu: 'Repositories',
    label: 'REPOSITORIES',
    path: '/repositories',
  },
  {
    menu: 'Analysis',
    label: 'ANALYSIS',
    path: '/analysis',
  },
]

const Header = props => {
  const {history} = props
  const {pathname} = history.location
  const renderMenuOptionsList = () => (
    <ul className="menu-options-list">
      {menuOptionsList.map(eachOption => {
        const itemClass = pathname === eachOption.path ? 'active' : ' inactive'
        return (
          <li key={eachOption.label} className="menu-item">
            <Link to={eachOption.path} className={`${itemClass} nav-link`}>
              {eachOption.menu}
            </Link>
          </li>
        )
      })}
    </ul>
  )

  return (
    <HeaderContext.Consumer>
      {value => {
        const {showMenuOptions, toggleMenuOptions} = value
        return (
          <nav className="nav-bar-container">
            <div className="title-hamburger-container">
              <Link to="/" className="nav-link">
                <h1 className="header-title">GitHub Profile Visualizer</h1>
              </Link>

              <button
                type="button"
                className="hamburger-btn"
                onClick={toggleMenuOptions}
              >
                <img
                  src="https://res.cloudinary.com/degvq1cfc/image/upload/v1769661552/menu_img_su3fby.png"
                  alt="hamburger"
                  className="hamburger-img"
                />
              </button>
              <div className="menu-options-lg">{renderMenuOptionsList()}</div>
            </div>
            {showMenuOptions && renderMenuOptionsList()}
          </nav>
        )
      }}
    </HeaderContext.Consumer>
  )
}

export default withRouter(Header)
