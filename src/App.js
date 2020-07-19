import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import "./App.css";
import { Button } from "@material-ui/core";

import { db } from "./firebase";

import PortfolioLogo from "./Images/portfolio logo.png";

//use in contact
import ButtonGroup from "@material-ui/core/ButtonGroup";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import EmailIcon from "@material-ui/icons/Email";

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
  appBar: {
    position: "sticky",
  },
}));

function App() {
  const [resume, setResume] = useState(false);
  const classes = useStyles();

  {
    /**handles redirect when resume button is clicked */
  }
  const handleResume = (e) => {
    e.preventDefault();
    setResume(true);
  };

  return (
    <div className="App">
      <div className={classes.root}>
        <header className="app__header">
          <AppBar position="static" className={classes.appBar}>
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
        <div className="app__aboutDescription">
          <h1>
            <strong>
              <u>About Me</u>
            </strong>
          </h1>
          <p>
            Hi, I'm Daneil Nguyen, a current college student who is a tech
            enthusiast and aspiring full-stack developer.
          </p>
          <br />
          <p>
            I am based in the DMV and am attending the University of Maryland,
            College Park as an upcoming freshman this fall. I will be studying
            Computer Science with a focus on Data Science.
          </p>
          <br />
          <p>
            My overarching goal is to be able to utilize technology to bring
            forth positive change in this world. However, I love programming and
            have gained an interest in web development and UI/UX recently. My
            goal is to learn full-stack development so that I can create and
            deploy modern web applications.
          </p>
        </div>
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
      {/**Possibly use firebase so that new projects can be easily added */}
      <div className="app__projects">
        <h3>This is where my projects will be displayed</h3>
      </div>
      {/**------------------------------------------------- */}
      <div className="contact">
        <article>
          <h1>Get In Touch</h1>
          <p>
            My inbox is always open for new opportunities for employment,
            internships, etc. Otherwise, you can ask me questions and simply say
            hi!
          </p>
          <ButtonGroup className="app__contactButtons">
            <Button>
              <EmailIcon />
            </Button>
            <Button>
              <LinkedInIcon />
            </Button>
            <Button>
              <GitHubIcon />
            </Button>
            <Button>
              <InstagramIcon />
            </Button>
          </ButtonGroup>
        </article>
      </div>
    </div>
  );
}

export default App;
