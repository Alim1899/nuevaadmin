import React from "react";
import classes from "./Preview.module.css";
import recycle from "../../../assets/icons/delete.png";
import {deleteImage} from "../Functions"

const ProjectPreview = ({ allImages,setAllImages}) => {
  const handleMouseOver = (e) => {
    const element = e.currentTarget.childNodes[1];
    element.classList.add(classes.bindiv);
    element.classList.remove(classes.none);
  };

  const handleMouseOut = (e) => {
    const element = e.currentTarget.childNodes[1];
    element.classList.remove(classes.bindiv);
    element.classList.add(classes.none);
  };
  return (
    <div className={classes.preview}>
      <h1 className={classes.prevHeader}>ატვირთული ფოტოები </h1>
        

        <div className={classes.photos}>
       
          <div className={classes.photoScroll}>
          
          {
  Object.entries(allImages).length > 0 && (
    Object.entries(allImages).map((el) => (
      <div
        key={el[0]}
        id={el[0]}
        className={classes.photo}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <img
          src={el[1].url}
          alt={el[0]}
          className={classes.imagePrev}
        />
        
        <img
          className={`${classes.none} ${classes.bin}`}
          onClick={(e) => deleteImage(e, el[0], setAllImages, allImages)}
          src={recycle}
          alt="bin"
          id={el[0]}
        />
      </div>
    ))
  )
}

            {allImages.length === 0 && (
              <div className={classes.uploadedImages}>
                ატვირთული ფოტოები გამოჩნდება აქ
              </div>
            )}
          </div>
        </div>     
    </div>
  );
};

export default ProjectPreview;