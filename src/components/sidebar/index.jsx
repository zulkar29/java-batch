import React, { useState } from "react";
import "./index.scss";
import {Link, NavLink } from "react-router-dom";

const Sidebar = ({ Logo, sidebar_data }) => {
 
  return (
    <>
      <div className="sidebar__section">
        <div className="sb__top-section">
          <Link to="/" >
            <img className="sb__top-logo" src={Logo} alt="logo" />
          </Link>
        </div>
        <ul className="sb__content-list">
          {sidebar_data.map((data, index) => (
            <li key={index}>
              <NavLink className="sb__content-list__item"  key={index} to={!data?.sub_menu ? data.slug : null}>
               {data.title}
              </NavLink >
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
