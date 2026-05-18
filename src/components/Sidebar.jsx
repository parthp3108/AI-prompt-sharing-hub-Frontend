import {
  FaHome,
  FaCompass,
  FaThLarge,
  FaBookmark,
  FaFileAlt,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaPlus,
} from "react-icons/fa";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useDispatch } from "react-redux";

import { logout } from "../redux/authSlice";

import "../App.css";

const Sidebar = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // CREATE PROMPT
  const handleClick = () => {

    navigate("/addprompt");

  };

  // LOGOUT
  const handleLogout = () => {

    // Redux Clear
    dispatch(logout());

    // LocalStorage Clear
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    // Redirect
    navigate("/login");

  };

  return (
    <div className="sidebar">

      {/* Top */}
      <div>

        {/* Navigation */}
        <div className="sidebar-menu">

          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive
                ? "sidebar-item active"
                : "sidebar-item"
            }
          >
            <FaHome size={16} />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "sidebar-item active"
                : "sidebar-item"
            }
          >
            <FaCompass size={16} />
            <span>Browse</span>
          </NavLink>

          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive
                ? "sidebar-item active"
                : "sidebar-item"
            }
          >
            <FaThLarge size={16} />
            <span>Categories</span>
          </NavLink>

          <NavLink
            to="/bookmarks"
            className={({ isActive }) =>
              isActive
                ? "sidebar-item active"
                : "sidebar-item"
            }
          >
            <FaBookmark size={16} />
            <span>Bookmarks</span>
          </NavLink>

          <NavLink
            to="/addprompt"
            className={({ isActive }) =>
              isActive
                ? "sidebar-item active"
                : "sidebar-item"
            }
          >
            <FaFileAlt size={16} />
            <span>Add Prompt</span>
          </NavLink>

          <div className="sidebar-divider"></div>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "sidebar-item active"
                : "sidebar-item"
            }
          >
            <FaUser size={16} />
            <span>Profile</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? "sidebar-item active"
                : "sidebar-item"
            }
          >
            <FaCog size={16} />
            <span>Settings</span>
          </NavLink>

          {/* LOGOUT */}
          <div
            className="sidebar-item logout"
            onClick={handleLogout}
          >
            <FaSignOutAlt size={16} />
            <span>Logout</span>
          </div>

        </div>
      </div>

      {/* Bottom Button */}
      <button
        className="create-btn"
        onClick={handleClick}
      >
        <FaPlus size={14} />
        <span>Create Prompt</span>
      </button>

    </div>
  );
};

export default Sidebar;