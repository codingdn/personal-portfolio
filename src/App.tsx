import './App.css'
import LinkdeIn from "./assets/linkedin.svg?url"
import Github from "./assets/github.svg?url"
import Instagram from "./assets/instagram.svg?url"
import Mail from "./assets/mail.svg?url"

function App() {

  return (
    <>
      <div className="app-body">
        <h1>Daneil Nguyen</h1>
        <div className="info-card">
          <p>
            🚧 Under Construction 🚧
          </p>
        </div>
        <div className="links">
          <a href="https://www.linkedin.com/in/daneil-nguyen/" target="_blank" rel="noreferrer"><img src={LinkdeIn} alt="LinkedIn"></img></a>
          <a href="https://github.com/codingdn" target="_blank" rel="noreferrer"><img src={Github} alt="Github"></img></a>
          <a href="https://www.instagram.com/badpicsinc/" target="_blank" rel="noreferrer"><img src={Instagram} alt="Instagram"></img></a>
          <a href="mailto:danthedevnguyen@gmail.com" target="_blank" rel="noreferrer"><img src={Mail} alt="Email"></img></a>
        </div>
        <footer>
          <p>© 2025 Daneil Nguyen</p>
        </footer>
      </div>
    </>
  )
}

export default App
