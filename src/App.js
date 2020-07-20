import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import { Button } from "@material-ui/core";
import PortfolioPic from "./Images/hs pic.jpg";
import { db } from "./firebase";
import ProjectCard from "./ProjectCard";
import PortfolioLogo from "./Images/portfolio logo.png";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import EmailIcon from "@material-ui/icons/Email";
import ResumePDF from "./Files/Resume.pdf";
/**
 * Eventually, seperate components into different files
 * BEM naming scheme
 * Dark mode? - After initial version is completed and operational
 * clean up code
 * https://brittanychiang.com/
 */

const useStyles = makeStyles((theme) => ({
  button: {
    border: 1,
    background: "white",
    color: "rgb(63,81,181)",
  },
  resumeButton: {
    border: 3,
    borderCcolor: "white",
    background: "white",
    color: "rgb(63,81,181)",
  },
}));

const skillset = [
  { skill: "JavaScript" },
  { skill: "React" },
  { skill: "HTML" },
  { skill: "CSS" },
  { skill: "Git" },
];

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
      <div className="app__header">
        <img
          className="app__logo"
          height="50px"
          width="150px"
          src={PortfolioLogo}
        />
        <div className="app__headerButtons">
          <Button className={classes.button}>About</Button>
          <Button className={classes.button}>Projects</Button>
          <Button className={classes.button}>Contact</Button>
          {/**This button will redirect to pdf of my current resume */}
          <Button className={classes.resumeButton}>
            <a href={ResumePDF} download className="app__headerButtonsResume">
              Resume
            </a>
          </Button>
        </div>
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
          <center>
            <h1>
              {/* <strong> */}
              <u>About Me</u>
              {/* </strong> */}
            </h1>
          </center>
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
          <br />

          <center>
            <h2>Skill Set/Technologies:</h2>
          </center>
          <div className="app__skills">
            {skillset.map((skill) => (
              <div className="app__skillsIndividual">
                <h3>⚪{skill.skill}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="app__profilePic">
          {/**LinkedIn Image Here */}
          <img
            src={PortfolioPic}
            alt="profile pic"
            height="400px"
            width="350px"
          />
        </div>
      </div>
      {/**------------------------------------------------- */}

      {/**------------------------------------------------- */}
      {/**Possibly use firebase so that new projects can be easily added. Map */}
      <div className="app__projects">
        <center>
          <h1>My Projects</h1>
        </center>
        <div className="app__projectList">
          {/**test projects */}
          <ProjectCard
            projectName="Test"
            image="https://99designs-start-attachments.imgix.net/alchemy-pictures/2016%2F01%2F29%2F06%2F52%2F16%2F2574220d-7737-4c39-a562-8e153a5d1497%2Fwebsite-hero3.png?auto=format&ch=Width%2CDPR&fm=png&w=824&h=457"
            description="This is where the description of the test will be"
            github="https://github.com/"
            technologies="React, JavaScript, HTML, CSS"
          />
          <ProjectCard
            projectName="Test"
            image="https://99designs-start-attachments.imgix.net/alchemy-pictures/2016%2F01%2F29%2F06%2F52%2F16%2F2574220d-7737-4c39-a562-8e153a5d1497%2Fwebsite-hero3.png?auto=format&ch=Width%2CDPR&fm=png&w=824&h=457"
            description="This is where the description of the test will be"
            github="https://github.com/"
          />
        </div>
      </div>
      {/**------------------------------------------------- */}
      <div className="app__contact">
        <div className="app__contactText">
          <center>
            <h1>Get In Touch</h1>
          </center>
          <p>
            My inbox is always open for new opportunities for employment,
            internships, etc. Otherwise, you can ask me questions and simply say
            hi!
          </p>

          {/**https://stackoverflow.com/questions/50350085/how-to-make-a-hyperlink-external-in-react */}
          <div className="app__contactButtons">
            <button>
              <a href="mailto: danthedevnguyen@gmail.com">
                <EmailIcon className="app__contactIcons" />
              </a>
            </button>
            <button>
              <a href="www.linkedin.com/in/daneil-nguyen">
                <LinkedInIcon className="app__contactIcons" />
              </a>
            </button>
            <button>
              <a href="https://github.com/codingdn">
                <GitHubIcon className="app__contactIcons" />
              </a>
            </button>
            <button>
              <a href="https://www.instagram.com/coding.dan/">
                <InstagramIcon className="app__contactIcons" />
              </a>
            </button>
          </div>
        </div>
      </div>

      <div className="app__footer">
        <footer>
          <h3>©Daneil Nguyen, 2020</h3>
        </footer>
      </div>
    </div>
  );
}

export default App;
