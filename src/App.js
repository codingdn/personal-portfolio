import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import "./App.css";
import { Button } from "@material-ui/core";
import PortfolioLogo from "./Images/portfolio logo.png";

/**
 * Eventually, seperate components into different files
 * BEM naming scheme
 */

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  rightToolBar: {
    marginLeft: "auto",
    marginRight: -12,
  },
  resumeButton: {
    border: 1,
    background: "white",
    color: "rgb(63,81,181)",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <div className={classes.root}>
        <header className="app__header">
          <AppBar position="static">
            <Toolbar>
              <img
                className="app__logo"
                height="50px"
                width="150px"
                src={PortfolioLogo}
              />
              <div className={classes.rightToolBar}>
                <Button color="inherit">About</Button>
                <Button color="inherit">Skills</Button>
                <Button color="inherit">Projects</Button>
                <Button color="inherit">Contact</Button>
                {/**This button will redirect to pdf of my current resume */}
                <Button className={classes.resumeButton}>Resume</Button>
              </div>
            </Toolbar>
          </AppBar>
        </header>
      </div>
      {/**------------------------------------------------- */}
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
      {/**------------------------------------------------- */}
      <div className="app__about">
        <h3>This is where the about page will be</h3>
        <div className="app__profilePic">
          {/**LinkedIn Image Here */}
          <img src="https://media-exp1.licdn.com/dms/image/C4D03AQG4_BY5dZqNPA/profile-displayphoto-shrink_200_200/0?e=1600905600&v=beta&t=bgX8cBGiHyp8i1HlbSvAVO6CJxdUr2L7CerM5VXZ83A" />
        </div>
      </div>
      {/**------------------------------------------------- */}
      <div className="app__skills">
        <h3>This is where my skill sets will be</h3>
      </div>
      {/**------------------------------------------------- */}
      <div className="app__projects">
        <h3>This is where my projects will be displayed</h3>
      </div>
      {/**------------------------------------------------- */}
      <div className="contact">
        <h3>This is where my contact information will be</h3>
      </div>
    </div>
  );
}

export default App;
