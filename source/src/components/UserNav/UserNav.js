import React from "react";
import "./UserNav.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faPenToSquare,
  faBookOpen,
  faGear,
} from "@fortawesome/free-solid-svg-icons";


const UserNav = () => {
  return (
    <div>
    <div className="UserNavContainerStyle">
      <Link to="/profile">
        <div  className ="func user" >
          <img src="image.jpg" className="authorIcon">
          </img><p>Author Name</p>
        </div>
      </Link>

        <Link to="/writenovel"><div className="func">
        <p><FontAwesomeIcon icon={faPenToSquare} /> Start Writing</p>
      </div></Link>
      <Link to="/library"><div className="func">
        <FontAwesomeIcon icon={faBookOpen} /> Library
      </div></Link>
      <Link to="/setting"><div className="func">
        <FontAwesomeIcon icon={faGear} /> Setting
      </div></Link>
      <div className="func logout">
        <FontAwesomeIcon  icon={faRightFromBracket} /> Logout
      </div>
     </div>
    </div>
  );
};

export default UserNav;
