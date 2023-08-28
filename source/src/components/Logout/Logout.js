import React, { useState } from "react";
import { auth } from "../../backend-api/FirebaseConfig";

function Logout(){
    auth.signOut();
    window.location.href = "/";
}

export default Logout;
