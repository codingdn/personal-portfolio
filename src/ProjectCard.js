import React, {useState, useEffect} from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import "./ProjectCards.css";

//template for displaying projects
//follow ig guidelines

function ProjectCard({ projectName, description, github, technologies, image }) {

  const getMappedData = (dataProp) =>{
    if (dataProp) { 
      return dataProp.map(item =>{
      return <h2>{item}</h2>;
      })
    }
    else {
     return "";
    }
}
  return (
    <div className="projectCard">
      <div className="projectCard__image">
        <img src={image} />
      </div>
      <div className="projectCard__info">
        <div className="projectCard__header">
          <h1>{projectName}</h1>
        </div>
        <div className="projectCard__description">
          <p>{description}</p>
         
        {
          getMappedData(technologies) 
        }

        </div>
        <div className="projectCard__link">
          <GitHubIcon/>
          <h3><a href={github}>Source</a></h3>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
