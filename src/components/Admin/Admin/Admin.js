import React from "react";
import classes from "./Admin.module.css";
import plus from "../../../assets/AdminIcons/plus.png";
import list from "../../../assets/AdminIcons/tasks.png";

const Admin = () => {
  return (
    <div className={classes.main}>
      <a href="newProject" className={classes.header}>
        <img className={classes.icon} src={plus} alt="add"></img>
        <h1 className={classes.head}> ახალი პროექტი</h1>
      </a>
      <a href="projectList" className={classes.header}>
        <img className={classes.icon} src={list} alt="show"></img>
        <h1 className={classes.head}>წაშლა - ცვლილება</h1>
      </a>
   
    </div>
  );
};

export default Admin;
