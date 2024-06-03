import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useLocation } from "react-router-dom";

import BackButton from '../BackButton';

const Footer = () => {
  const location = useLocation();
  return (
    <footer className="w-100 mt-auto p-2">
      <div className="container text-center mb-5">
        {location.pathname !== "/" && (
          <BackButton/>
        )}
        <h5>
          &copy; {new Date().getFullYear()} - <b><i>iHike</i></b>
          <a
            href="https://github.com/prismhead26/I-Hike"
            target="_blank"
            rel="noopener noreferrer"
            className="githubIcon ml-2"
          >
            <FontAwesomeIcon icon={faGithub} size="1x" />
          </a>
        </h5>
        <br />
        <h6>
          Aiden Wahed and Jackson Jones. Confidential and Proprietary. All
          Rights Reserved.
        </h6>
      </div>
    </footer>
  );
};

export default Footer;

