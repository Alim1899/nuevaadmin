import React, { useState, useEffect, useMemo } from "react";
import { retrieveData, deleteProject } from "../Functions";
import Project from "./Project";
import add from "../../../assets/AdminIcons/plus.png";
import admin from "../../../assets/AdminIcons/admin.png";

import classes from "./ProjectList.module.css";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    retrieveData(setProjects);
  }, []);

  const memoizedProjects = useMemo(() => projects, [projects]);

  const handleDeleteProject = (projectId) => {
    const updatedProjects = memoizedProjects.filter(
      ([id, _]) => id !== projectId
    );
    setProjects(updatedProjects);

    deleteProject(projectId);
  };

  return (
    <div className={classes.main}>
      <div className={classes.headers}>
        <a className={classes.link} href="newproject">
          <img className={classes.iconl} src={add} alt="addproject"></img>
          პროექტის დამატება
        </a>
        <h1 className={classes.header}>პროექტები</h1>
        <a className={classes.link} href="/">
          <img className={classes.iconl} src={admin} alt="addproject"></img>{" "}
          ადმინის პანელი
        </a>
      </div>

      {memoizedProjects.length === 0 && (
        <div className={classes.animation}>
          <h2>იტვირთება პროექტები</h2>
          <div className={classes.loader}></div>
        </div>
      )}
      {memoizedProjects.length > 0 && (
        <div className={classes.projectList}>
          {memoizedProjects.map(([projectId, project], index) => (
            <Project
              key={projectId}
              project={project}
              id={projectId}
              deleteProject={() => handleDeleteProject(projectId)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
