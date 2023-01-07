/**
 * Header Component, returns a header element with the title and nav menu inside it
 */

import "./Header.scss";
import { Link } from "react-router-dom";

const Header = () => {

    return(
        <header className="header">

            <Link to ="/">TypeScript App</Link>

        </header>
    );
};

export default Header;