import React from "react";
import "./App.css";

/**
 * Eventually, seperate components into different files
 * BEM naming scheme
 */
function App() {
  return (
    <div className="App">
      <div className="app__header">
        <h3>This is where the header will be</h3>
      </div>

      <div className="app__introduction">
        <article>
          <h1>
            <strong>Hi there!</strong> 👋
          </h1>
          <h1>
            I'm <strong>Daneil Nguyen</strong>, a current college student who is
            a tech enthusiast and aspiring full-stack developer 💻
          </h1>
        </article>
      </div>

      <div className="app__about">
        <h3>This is where the about page will be</h3>
        <div className="app__profilePic">
          {/**LinkedIn Image Here */}
          <img src="https://media-exp1.licdn.com/dms/image/C4D03AQG4_BY5dZqNPA/profile-displayphoto-shrink_200_200/0?e=1600905600&v=beta&t=bgX8cBGiHyp8i1HlbSvAVO6CJxdUr2L7CerM5VXZ83A" />
        </div>
      </div>
    </div>
  );
}

export default App;
