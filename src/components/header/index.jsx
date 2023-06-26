import React, { useState } from "react";
import { Link } from "react-router-dom";
import User from "../../assets/user.png";
import { useAuth } from "../../context/AuthProvider";
import "./index.scss";

const sub_menu = [{ title: "Profile", slug: "/users", icon: "" }];

const Header = ({ user }) => {
  const { logout } = useAuth();
  return (
    <div className="nav__section">
      <div className="nav__section_fixed">
        <svg
          className="nav__top-menu"
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 96 960 960"
          width="48"
        >
          <path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
        </svg>
        <div className="nav__user-section">
          <button className="nav__user-btn">
            <img
              className="nav__user-img"
              src={user?.image || User}
              alt={user?.name}
            />
            <span className="nav__user-info">{user?.name}</span>
          </button>
          <ul className="nav__user__dropdown">
            {sub_menu.map((data, index) => (
              <Link to={data.slug} key={index}>
                <li className="nav__dropdown-btn">{data.title}</li>
              </Link>
            ))}
            <li className="nav__dropdown-btn" onClick={logout}>
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
