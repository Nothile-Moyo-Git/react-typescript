/**
 * Header Component, returns a header element with the title and nav menu inside it
 */

import "./Header.scss";
import { SiTypescript } from "react-icons/si";
import { Link } from "react-router-dom";

const Header = () => {

    return(
        <header className="header">

            <Link to ="/" className="header__link">
                <SiTypescript/>
                <p>To do's</p>
            </Link>

        </header>
    );
};

export default Header;