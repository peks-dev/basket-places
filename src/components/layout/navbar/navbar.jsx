import React from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";

import Button from "@/components/button/button";

// icons
import SearchIcon from "@/components/icons/search-icon";
import MapIcon from "@/components/icons/map-icon";
import AddIcon from "@/components/icons/add-icon";
import ProfileIcon from "@/components/icons/profile-icon";

function Navbar() {
  const location = useLocation();
  return (
    <header className="navbar">
      <nav className="navbar__wrap">
        <ul className="navbar__links">
          <li className={"navbar__link-item"}>
            <Button customStyle={location.pathname === "/" && "btn--active"}>
              <Link to="/">
                <MapIcon />
              </Link>
            </Button>
          </li>
          <li className="navbar__link-item">
            <Button
              customStyle={location.pathname === "/search" && "btn--active"}
            >
              <Link to="/search">
                <SearchIcon />
              </Link>
            </Button>
          </li>
          <li className="navbar__link-item">
            <Button
              customStyle={location.pathname === "/new-bp" && "btn--active"}
            >
              <Link to="/new-bp">
                <AddIcon />
              </Link>
            </Button>
          </li>
          <li className="navbar__link-item">
            <Button
              customStyle={location.pathname === "/profile" && "btn--active"}
            >
              <Link to="/profile">
                <ProfileIcon />
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
