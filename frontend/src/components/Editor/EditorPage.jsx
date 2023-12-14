import MyNavbar from "./EditorNav/EditorNav";
import Stats from "./Stats/Stats";
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Import assets
import ENav from "./EditorNav/EditorNav";

function EditorPage () {
    
    
    
    return (
        <div>
            
            <h1>Editor Page</h1>
            <Stats/>

            <ENav/>




        </div>
    )
}

export default EditorPage;