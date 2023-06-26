import "./App.scss";
import React from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import PageRoutes from "./pages";
import Logo from "./assets/bjit_ltd.webp";

import { useAuth } from "./context/AuthProvider";
import { redirect, useNavigate } from "react-router-dom";

function App() {
  const currentPath = window.location.pathname;
  const { user } = useAuth();
  const navigation = useNavigate();


  const sidebar_data = [
    { title: "Dashboard", slug: "/", icon: "" },
    { title: "Blogs", slug: "/blog", icon: "" },
    { title: "Faq", slug: "/faq", icon: "" },
    { title: "Gallerys", slug: "/gallerys", icon: "" },
    { title: "Catalog", slug: "/products", icon: "" },
    { title: "Pop Up", slug: "/popup", icon: "" },
    { title: "Slider", slug: "/slider", icon: "" },
    { title: "Pages", slug: "/pages", icon: "" },
    { title: "Contacts", slug: "/contacts", icon: "" },
    { title: "Certificates", slug: "/certificate", icon: "" },
    { title: "Testmonial", slug: "/testmonial", icon: "" },
    { title: "Subscribes", slug: "/subscribes", icon: "" },
    { title: "Settings", slug: "/settings", icon: "" },
 
  ];
  return (
    <div className="App">
      {currentPath !== "/login" ? (
        <div className="container__section">
          <div className="sidebar__section">
            <Sidebar Logo={Logo} sidebar_data={sidebar_data} />
          </div>
          <div className="body__section">
            <Header user={user} />
            <PageRoutes />
            <Footer text={`Copyright @ `+(new Date().getFullYear())} />
          </div>
        </div>
      ) : (
        <PageRoutes />
      )}
    </div>
  );
}

export default App;
