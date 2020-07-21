import React, { useState, useEffect } from "react";
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
import AnchorLink from "react-anchor-link-smooth-scroll";

/**
 * Eventually, seperate components into different files
 * BEM naming scheme
 * Dark mode? - After initial version is completed and operational
 * clean up code
 * https://brittanychiang.com/
 */

const useStyles = makeStyles((theme) => ({
  button: {
    background: "white",
    backgroundColor: "black",
    color: "rgb(63,81,181)",
    textDecoration: "none",
  },
  resumeButton: {
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
  const classes = useStyles();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    db.collection("Projects").onSnapshot((snapshot) => {
      setProjects(
        snapshot.docs.map((doc) => ({
          project: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="App">
      <div className="app__header">
        <AnchorLink offset="100" href="#Intro">
        <img
          className="app__logo"
          height="50px"
          width="150px"
          src={PortfolioLogo}
        />
        </AnchorLink>
        <div className="app__headerButtons">
          <AnchorLink offset="300" href="#About" className="app__anchor">
            <Button className={classes.button}>About</Button>
          </AnchorLink>
          <AnchorLink offset="100" href="#Projects" className="app__anchor">
            <Button className={classes.button}>Projects</Button>
          </AnchorLink>
          <AnchorLink offset="100" href="#Contact" className="app__anchor">
            <Button className={classes.button}>Contact</Button>
          </AnchorLink>

          {/**This button will redirect to pdf of my current resume */}
          <Button className={classes.resumeButton}>
            <a href={ResumePDF} download className="app__headerButtonsResume">
              Resume
            </a>
          </Button>
        </div>
      </div>
      {/**------------------------------------------------- */}
      <section id="Intro">
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
      </section>
      {/**------------------------------------------------- */}
      <section id="About">
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
              forth positive change in this world. However, I love programming
              and have gained an interest in web development and UI/UX recently.
              My goal is to learn full-stack development so that I can create
              and deploy modern web applications.
            </p>
            <br />

            <center>
              <h3>Skill Set/Technologies:</h3>
            </center>
            <div className="app__skills">
              {skillset.map((skill) => (
                <div className="app__skillsIndividual">
                  <h4>⚪{skill.skill}</h4>
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
      </section>
      {/**------------------------------------------------- */}

      {/**------------------------------------------------- */}
      {/**Possibly use firebase so that new projects can be easily added. Map */}
      <section id="Projects">
        <div className="app__projects">
          <center>
            <h1>My Projects</h1>
          </center>
          <div className="app__projectList">
            {projects.map(({ project }) => (
              <ProjectCard
                projectName={project.projectName}
                image={project.image}
                description={project.description}
                github={project.github}
                technologies={project.technologies}
              />
            ))}
          </div>
        </div>
      </section>
      {/**------------------------------------------------- */}
      <section id="Contact">
        <div className="app__contact">
          <div className="app__contactText">
            <center>
              <h1>Get In Touch</h1>
            </center>
            <p>
              My inbox is always open for new opportunities for employment,
              internships, etc. Otherwise, you can ask me questions and simply
              say hi!
            </p>

            {/**https://stackoverflow.com/questions/50350085/how-to-make-a-hyperlink-external-in-react */}
            <div className="app__contactButtons">
              <button>
                <a href="mailto: danthedevnguyen@gmail.com" className="app__contactIcons"  >
                  <EmailIcon />
                </a>
              </button>
              <button>
                <a href="https://www.linkedin.com/in/daneil-nguyen" className="app__contactIcons" >
                  <LinkedInIcon/>
                </a>
              </button>
              <button>
                <a href="https://github.com/codingdn" className="app__contactIcons" >
                  <GitHubIcon/>
                </a>
              </button>
              <button>
                <a href="https://www.instagram.com/coding.dan/" className="app__contactIcons" >
                  <InstagramIcon/>
                </a>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="app__footer">
        <footer>
          <h3>©Daneil Nguyen, 2020</h3>
        </footer>
      </div>
    </div>
  );
}

export default App;
