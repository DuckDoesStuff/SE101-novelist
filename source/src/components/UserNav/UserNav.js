import React, { useState, useEffect } from "react";
import "./UserNav.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faPenToSquare,
  faBookOpen,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../backend-api/FirebaseConfig";
import { getUser } from "../../backend-api/API";

const UserNav = () => {
  const [name, setName] = useState("");
  const [Ava,setAva] = useState("");
  const [id,setId] = useState("");
  useEffect(() => {
    const fetchUser = () => {
      if(auth.currentUser.uid)
      {
      getUser(auth.currentUser.uid).then((data) => {
      setAva(data.ava);
      setName(data.name);
      setId(data.id);
          
        
        setTimeout(() => {}, 1000);
      });
      }
    };

    if (auth.currentUser.uid !== null) {
      fetchUser();
    }
  }, []);

  return (
    <div>
      <div className="UserNavContainerStyle">
        <Link to={`/profile/${id}`}>
          <div className="func user">
            <img src={Ava ? Ava : "author1.jpg"}
            alt="Avatar" className="authorIcon"></img>
            <p>{name}</p>
          </div>
        </Link>

        <Link to="/editnovel"><div className="func">
        <p><FontAwesomeIcon icon={faPenToSquare} /> Start Writing</p>
      </div></Link>
      <Link to="/setting"><div className="func">
        <FontAwesomeIcon icon={faGear} /> Setting
      </div></Link>     
      <Link to="/logout">              
      <div className="func logout" >
        <FontAwesomeIcon  icon={faRightFromBracket}  /> Logout
      </div></Link>
     </div>
    </div>
  );
};

export default UserNav;
