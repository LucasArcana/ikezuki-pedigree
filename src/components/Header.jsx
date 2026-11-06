//import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header>
            
            <h1>Ikezuki</h1>
            <div className="navbtn">
                
                <button type="button">Pedigree</button>
                
                
                <button type="button">About</button>
            </div>
        </header>
    );
}

export default Header;
