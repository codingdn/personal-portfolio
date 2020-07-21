import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import ModalImage from "react-modal-image";
import "./ProjectCards.css";

//template for displaying projects
//follow ig guidelines

function ProjectCard({
  projectName,
  description,
  github,
  technologies,
  image,
}) {
  //   const getMappedData = (dataProp) =>{
  //     if (dataProp) {
  //       return dataProp.map(item =>{
  //           return <div>{item}</div>;
  //       })
  //     }
  //     else {
  //      return "";
  //     }
  // }

  return (
    <div className="projectCard">
      <div className="projectCard__image">
        <ModalImage hideDownload = {true} small={image} medium={image} className="projectCard__modal"/>
      </div>
      <div className="projectCard__info">
        <div className="projectCard__header">
          <h1>{projectName}</h1>
        </div>
        <div className="projectCard__description">
          <p>{description}</p>
          <br/>
          <hr/>
          <br/>
          <p><strong>-Built with:</strong> {technologies}</p>
        </div>
        <div className="projectCard__link">
          <GitHubIcon />
          <h3>
            <a href={github} className="projectCard__github">Source</a>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
