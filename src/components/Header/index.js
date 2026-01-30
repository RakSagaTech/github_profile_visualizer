import './index.css'

const Header = props => {
  const {
    menuOptionsList,
    showMenuOptions,
    activeMenuId,
    updateShowMenuOptions,
    updateActiveMenuId,
  } = props

  const onClickMenu = labelId => {
    updateActiveMenuId(labelId)
  }

  const onClickHambergur = () => {
    updateShowMenuOptions()
  }

  const renderMenuOptions = () => (
    <ul className="menu-list">
      {menuOptionsList.map(eachMenu => {
        const menuOptionClass =
          eachMenu.labelId === activeMenuId
            ? 'active menu-item'
            : 'not-active menu-item'
        return (
          <li key={eachMenu.labelId} className="menu">
            <button
              type="button"
              className={menuOptionClass}
              onClick={() => onClickMenu(eachMenu.labelId)}
            >
              {eachMenu.menu}
            </button>
          </li>
        )
      })}
    </ul>
  )

  return (
    <nav className="nav-bar">
      <div className="title-and-menu">
        <h1 className="header-title">Github Profile Visualizer </h1>
        <button
          type="button"
          onClick={onClickHambergur}
          className="hamburger-btn"
        >
          <img
            src="https://res.cloudinary.com/degvq1cfc/image/upload/v1769661552/menu_img_su3fby.png"
            alt="menu"
            className="hamburger-img"
          />
        </button>
        <div className="menu-list-container-lg">{renderMenuOptions()}</div>
      </div>
      <div className="menu-list-container-sm">
        {showMenuOptions && renderMenuOptions()}
      </div>
    </nav>
  )
}

export default Header
