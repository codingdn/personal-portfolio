import React from "react";
import LinkIcon from "@material-ui/icons/Link";
import "./ProjectCards.css";

//template for displaying projects
//follow ig guidelines

function ProjectCard({ projectName, description, github, technologies }) {
  return (
    <div className="projectCard">
        <h1>Projects go here</h1>
      <div className="projectCard__header">
        <h3>{projectName}</h3>
      </div>
      <div className="projectCard__description">
        <p>{description}</p>
        {/**Map out list of technologies in database */}
        {/* {technologies.map((tech) => (
              
                <h3>⚪{tech}</h3>
              
            ))} */}
      </div>
      <div className="projectCard__link"></div>
    </div>
  );
}

export default ProjectCard;
