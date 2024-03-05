import { LOGO_URL } from "../utils/constant";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    let [btnNameReact, setBtnNameReact] = useState("Login")
    return (
        <div className="flex justify-between shadow-lg">

            <div className="logo-container">
            <img className="w-[80] mx-6" src={LOGO_URL}></img>
            </div>

            <div className="flex items-center mx-12">
                <ul className="flex text-xl font-semibold">
                    <li className="m-6"><Link to={"/"}>Home</Link></li>
                    <li className="m-6"><Link to={"/about"}>About</Link></li>
                    <li className="m-6"><Link to={"/contact"}>Contact</Link></li>
                    <li className="m-6"><Link to={"/cart"}>Cart</Link></li>
                    <li className="m-6"><Link to={"/login"}>{btnNameReact}</Link></li>
                </ul>
            </div>

        </div>
        
    )
}

export default Header;