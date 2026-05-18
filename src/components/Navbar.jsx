import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg px-4 py-3"
      style={{
        backgroundColor: "#F8F1FF",
        borderBottom: "1px solid #E7DDF5",
      }}
    >
      <div className="container-fluid">

        {/* Logo */}
        <Link
          to="/"
          className="navbar-brand fw-bold"
          style={{
            color: "#7C3AED",
            fontSize: "18px",
          }}
        >
          PromptHub
        </Link>

        {/* Right Side */}
        <div className="d-flex align-items-center gap-3">

          <Link
            to="/login"
            className="text-decoration-none"
            style={{
              color: "#333",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Login
          </Link>

          <Link
            to="/register"
            className="btn"
            style={{
              background:
                "linear-gradient(90deg, #8B5CF6, #7C3AED)",
              color: "white",
              borderRadius: "20px",
              padding: "6px 18px",
              fontSize: "14px",
              fontWeight: "500",
              border: "none",
            }}
          >
            Sign Up
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;