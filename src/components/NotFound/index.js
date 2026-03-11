import {Link} from 'react-router-dom'
import './index.css'

const Notfound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/degvq1cfc/image/upload/v1770955571/not-found_rbsmwe.png"
      alt="page not found"
      className="not-found-img"
    />
    <h1 className="not-found-heading">PAGE NOT FOUND</h1>
    <p className="not-found-description">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="not-found-btn">
        Go to Home
      </button>
    </Link>
  </div>
)

export default Notfound
