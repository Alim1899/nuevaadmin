import React, { useState, useEffect } from "react";
import classes from "./NewProject.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Control from "../../Layout/Inputs/Control";
import Leaflet from "../../Map/Leaflet";
import "leaflet/dist/leaflet.css";
import edit from "../../../assets/AdminIcons/tasks.png";
import admin from "../../../assets/AdminIcons/admin.png";
import office from "../../../assets/icons/office.png";
import {
  deleteAllData,
  handleLocation,
  imageUploadHandler,
  save,
} from "../Functions";
import { months, year } from "./DatePicker";
import ProjectPreview from "../Preview/Preview";

const NewProject = () => {
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [allImages, setAllImages] = useState([]);
  const [position, setPosition] = useState([42.259061, 43.00614]);
  const [marker, setMarker] = useState([42.259061, 42.66614]);
  const [flyTo, setFlyTo] = useState(null);
  const [icon, setIcon] = useState(office);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState({ ge: "", en: "" });
  const btnEnabler = (values) => {
    if (
      values.geHeader &&
      values.enHeader &&
      values.geDescription &&
      values.enDescription &&
      values.coords &&
      values.month &&
      values.year
    )
      setBtnDisabled(false);
    else setBtnDisabled(true);
  };

  useEffect(() => {
    deleteAllData();
  }, []);

  const Schema = Yup.object().shape({
    header: Yup.string().min(5, "სათაური მოკლეა").max(50, "სათაური გრძელია"),
    description: Yup.string().min(30, "მინ. 30 სიმბოლო"),
    coords: Yup.string().matches(
      /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/,
      "აკრიფეთ სწორი ფორმატით"
    ),
  });

  const handleMonthChange = (value) => {
    const month = months.find((m) => m.value === value);
    if (month) {
      setSelectedMonth({ ge: month.value, en: month.enValue });
    }
  };

  return (
    <div className={classes.main}>
      <div className={classes.headers}>
        <a className={classes.link} href="projectList">
          <img className={classes.iconl} src={edit} alt="addproject" />
          პროექტების ნახვა
        </a>
        <h1 className={classes.header}>პროექტის დეტალები</h1>
        <a className={classes.link} href="/">
          <img className={classes.iconl} src={admin} alt="addproject" />
          ადმინის პანელი
        </a>
      </div>
      <Formik
        validateOnChange
        initialValues={{
          geHeader: "",
          enHeader: "",
          coords: "",
          geDescription: "",
          enDescription: "",
          geLocation: "",
          enLocation: "",
          month: "",
          year: "",
          images: [],
        }}
        validationSchema={Schema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <div className={classes.content}>
            <Form
              className={classes.form}
              onChange={() => btnEnabler(values)}
            >
              <div className={classes.formWrapper}>
                <div className={classes.wrap}>
                  <div className={classes.projectHeaders}>
                    <Control
                      name="geHeader"
                      label="სათაური ქარ."
                      control="input"
                      type="text"
                    />
                    <Control
                      name="enHeader"
                      label="სათაური EN."
                      control="input"
                      type="text"
                    />
                  </div>
                  <div className={classes.location}>
                    <Control
                      name="coords"
                      label="კოორდინატები"
                      control="input"
                      onBlur={(e) =>
                        handleLocation(
                          e,
                          values.coords,
                          setPosition,
                          setMarker,
                          setFlyTo,
                          setIcon
                        )
                      }
                      type="text"
                    />
                    <Control
                      name="geLocation"
                      label="ლოკაცია ქარ."
                      control="input"
                      type="text"
                    />
                     <Control
                      name="enLocation"
                      label="ლოკაცია EN."
                      control="input"
                      type="text"
                    />
                  </div>
                  <div className={classes.datePicker}>
                    <Control
                      name="month"
                      label="თვე"
                      options={months}
                      control="select"
                      onChange={(e) => {
                        setFieldValue("month", e.target.value);
                        handleMonthChange(e.target.value);
                      }}
                    />
                    <Control
                      name="year"
                      label="წელი"
                      options={year}
                      control="select"
                    />
                  </div>
                </div>
                <div className={classes.description}>
                  <Control
                    name="geDescription"
                    label="აღწერა ქარ."
                    control="textarea"
                    type="text"
                  />
                  <Control
                    name="enDescription"
                    label="აღწერა EN."
                    control="textarea"
                    type="text"
                  />
                </div>
              </div>
              <div className={classes.map}>
                <Leaflet
                  popup="ოფისი"
                  center={position}
                  zoom={7}
                  icon={icon}
                  marker={marker}
                  location={flyTo}
                />
              </div>
              <div className={classes.photoInput}>
                <Control name="image" control="file" label="ფოტოს ატვირთვა" />
                <label htmlFor="image" className={classes.imageLabel}>
                  ფოტოს ატვირთვა{" "}
                </label>
                <input
                  id="image"
                  onChange={(e) => imageUploadHandler(e, setAllImages)}
                  className={classes.imageUpload}
                  type="file"
                  multiple
                />
              </div>
            </Form>
            <ProjectPreview
              allImages={allImages}
              setAllImages={setAllImages}
            />
            <button
              type="submit"
              onClick={(e) =>
                save(
                  e,
                  { ge: values.geHeader, en: values.enHeader },
                  { ge: values.geDescription, en: values.enDescription },
                  values.year,
                  selectedMonth,
                  allImages,
                  values.coords,
                  {ge:values.geLocation,en:values.enLocation},
                  setSavedSuccess
                )
              }
              className={classes.submit}
              disabled={btnDisabled}
            >
              პროექტის შენახვა
            </button>
          </div>
        )}
      </Formik>

      {savedSuccess && (
        <div className={classes.popup}>
          <h1>პროექტი შენახულია ✅</h1>
        </div>
      )}
    </div>
  );
};

export default NewProject;
