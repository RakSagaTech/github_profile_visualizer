import {Link} from 'react-router-dom'

import './index.css'

const colorsList = ['#E879F9', '#4ADE80', '#38BDF8', '#F472B6', '#FBBF24']
const backgroundColorList = [
  '#C026D329',
  '#22C55E29',
  '#0284C729',
  '#DB277729',
  '#F59E0B29',
]

const RepositoryCard = props => {
  const {repositoriesDetails} = props
  const {
    name,
    description,
    languages,
    stargazersCount,
    forksCount,
  } = repositoriesDetails
  const renderLanguagesList = () =>
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

  return (
    <li className="repository-card-item ">
      <Link to={`/repositories/${name}`} className="repository-link">
        <h1>{name}</h1>
        <p className="repository-card-description">{description}</p>
        <ul className="repository-card-languages-list">
          {renderLanguagesList()}
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
      </Link>
    </li>
  )
}

export default RepositoryCard
