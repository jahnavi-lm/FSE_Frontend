import React, { useState, useEffect } from "react";
import "./logo.css";

const Logo = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 20) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`investor-header ${visible ? "show" : "hide"}`}>
      <img src="/logo.png" alt="Fund Simulator Logo" className="header-logo" />
    </div>
  );
};

export default Logo;
