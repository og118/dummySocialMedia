import React from "react";
import classes from "./UserNav.module.css";
import { NavLink } from 'react-router-dom';


const userNav = (props) => {
  const toggleDropdown = () => {
    // document.getElementsByClassName("dropdownContent")[1].style.display = "block"
    if (
      document.getElementsByClassName("dropdownContent")[0].style.display !==
      "block"
    ) {
      document.getElementsByClassName("dropdownContent")[0].style.display =
        "block";
    } else {
      document.getElementsByClassName("dropdownContent")[0].style.display =
        "none";
    }
    if (
      document.getElementsByClassName("dropdownContent")[1].style.display !==
      "block"
    ) {
      document.getElementsByClassName("dropdownContent")[1].style.display =
        "block";
    } else {
      document.getElementsByClassName("dropdownContent")[1].style.display =
        "none";
    }
  };
  return (
    <div>
      <NavLink className={classes.UserNav} onClick={toggleDropdown}>
        {props.children}
      </NavLink>
      <div
        className={classes.dropdownContent + " dropdownContent"}
        id="dropdown"
      >
        <a className={classes.profileLink} href='/me'>Profile</a>
        <p onClick={props.logout}>Log Out</p>
      </div>
    </div>
  );
};

export default userNav;
