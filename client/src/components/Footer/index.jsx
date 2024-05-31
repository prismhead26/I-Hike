import { Link, useLocation } from "react-router-dom";
import Auth from "../../utils/auth";

const Footer = () => {
  const location = useLocation();
  return (
    <footer className="w-100 mt-auto  p-4">
      <div className="container text-center mb-5">
        {location.pathname !== "/" && (
          <Link to={"/"} className="btn btn-dark mb-3">
            Back
          </Link>
        )}
        <h4>&copy; {new Date().getFullYear()} - iHike</h4>
        <br />
        <h4>
          Aiden Wahed and Jackson Jones. Confidential and Proprietary. All
          Rights Reserved.
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
