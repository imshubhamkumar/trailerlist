import React, { useEffect, useState } from "react";
import { getGenres, getLanguages } from "../../services/apiService";
const Navbar = () => {
  const [langs, setLangs] = useState([]);
  const [geners, setGeners] = useState([]);
  const [type, setType] = useState(["Popular", "Fresh"]);
  useEffect(() => {
    setTimeout(() => {
      setLangs(getLanguages());
      setGeners(getGenres);
    }, 100);
  }, []);
  return (
    <>
      <div className="topnav">
        <div className="logo-placeholder nav-left-items">
          <span>Movies Trailers</span>
        </div>
        <div className="nav-btn-group nav-left-items">
          <div className="left-nav-btn">
            <button className="btn primary-bg ">Coming Soon</button>
          </div>
          <div className="left-nav-btn">
            <button className="btn secondary-bg">Now Showing</button>
          </div>
        </div>
        <div className="nav-right-items">
          <div className="dropdown-container">
            <select className="dropdown primary-outline">
              <option value="Popular">Popular</option>
            </select>
            <select className="dropdown primary-outline">
              {langs.map((lang, idx) => (
                <option key={lang + idx} value={lang.toLowerCase()}>
                  {lang}
                </option>
              ))}
            </select>
            <select className="dropdown primary-outline">
              <option value="all">All Genres</option>
              {geners.map((gener, idx) => (
                <option key={gener + idx} value={gener.toLowerCase()}>
                  {gener}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
