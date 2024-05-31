import { Link, useLocation } from "react-router-dom";

import Auth from "../../utils/auth";

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

// import { ColorModeContext } from "../../DarkMode";
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const Header = ({ toggleBackgroundColor }) => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const currentPage = useLocation().pathname;

  const theme = useTheme();

  return (
    <header>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#92AFD7" }}
      >
        <div className="container fluid">
          <a className="custom navbar-brand" href="/">
            <b>
              <i>iHike</i>
            </b>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {/* add darkmode icon btn */}
              <li className="custom mx-2 nav-item">
                <b>

                </b>
                <IconButton
                  sx={{ ml: 1 }}
                  onClick={toggleBackgroundColor}
                  color="inherit"
                >
                  {theme.palette.mode === "dark" ? (
                    <Brightness7Icon />
                  ) : (
                    <Brightness4Icon />
                  )}
                </IconButton>
              </li>

              {/* if logged in show myHikes and logout else show login and signup */}
              {Auth.loggedIn() ? (
                <>
                  <li className="custom mx-2 nav-item">
                    <Link
                      to="/me"
                      className={
                        currentPage === "/me" ? "nav-link active" : "nav-link"
                      }
                    >
                      <b>
                        <i>myHikes</i>
                      </b>
                    </Link>
                  </li>
                  <li className="custom mx-2 nav-item">
                    <a href="/" onClick={logout} className="nav-link">
                      <b>
                        <i>Logout</i>
                      </b>
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="custom mx-2 nav-item">
                    <Link
                      to="/login"
                      className={
                        currentPage === "/login"
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      <b>
                        <i>Login</i>
                      </b>
                    </Link>
                  </li>
                  <li className="custom mx-2 nav-item">
                    <Link
                      to="/signup"
                      className={
                        currentPage === "/signup"
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      <b>
                        <i>Signup</i>
                      </b>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
export { ColorModeContext };
