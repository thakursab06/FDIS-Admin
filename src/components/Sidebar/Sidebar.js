import React from "react";
import { NavLink, Link, useHistory,useRouteMatch } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

var ps;

function Sidebar(props) {
  const { path } = useRouteMatch();
  const history = useHistory();
  const handleLogout = () => {
    /* eslint-disable */
    const toLogout = confirm("Are you sure to logout ?");

    if (toLogout) {
      localStorage.removeItem('token');
      history.push("/");
      window.location.reload(true);
    }
  };
  const sidebar = React.useRef();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {props.routes.map((prop, key) => {
            return (
              <li
                className={
                  activeRoute(prop.path) + (prop.pro ? " active-pro" : "")
                }
              >
                <NavLink className="nav-link" to={prop.layout + prop.path}>
                  {prop.name}
                  <li
                    key={key}
                    className={
                      activeRoute(prop.path) + (prop.pro ? " active-pro" : "")
                    }
                    // className="dropdown-content"
                  >
                    {prop.childs.map((child, key) => {
                      return (
                        <NavLink
                          className="nav-link"
                          activeClassName="active"
                          to={child.layout + child.path}
                        >
                          {child.name}
                        </NavLink>
                      );
                    })}
                  </li>
                </NavLink>
              </li>
            );
          })}
        </Nav>

        <div>
          <Link className="nav_link">
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "white",
              }}
            >
              <p className="nav-link">Logout</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
