import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./logo.css";

const Logo = () => {
  const [visible, setVisible] = useState(true);
  const location = useLocation();

  // Routes where white logo is needed
  const darkRoutes = ["/Investor/Home","/Investor/Account"];
  const isDark = darkRoutes.includes(location.pathname);

  // Pick logo source and class based on route
  const logoSrc = isDark ? "/logo-white.svg" : "/logo.png";
  const logoClass = isDark ? "header-logo white-logo" : "header-logo";

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY <= 20);
    };
    //bla bla

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`investor-header ${visible ? "show" : "hide"}`}>
      <img src={logoSrc} alt="Fund Simulator Logo" className={logoClass} />
    </div>
  );
};

export default Logo;
