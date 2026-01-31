import './index.css'

const RepositoryCard = props => {
  const {repositoryDetails} = props
  const {name, languages, stargazersCount, forksCount} = repositoryDetails

  return (
    <li className="repository-card-item">
      <h1 className="repository-card-title">{name}</h1>
      <p className="repository-card-description">
        To create a nested list using the web editor on GitHub or a text editor
        that uses a monospaced font, like Atom, you can align your list
        visually.
      </p>
      <ul className="repository-card-languages-list">
        {languages.map(eachLanguage => {
          const randomIndex = Math.floor(Math.random() * 5) + 1
          const randomClass = `color-${randomIndex}`
          return (
            <li
              key={eachLanguage.value}
              className={`repository-card-language-item ${randomClass}`}
            >
              {eachLanguage.name}
            </li>
          )
        })}
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
            alt="git"
            className="repository-stats-img"
          />
          <p className="repository-stats-count">{forksCount}</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryCard
