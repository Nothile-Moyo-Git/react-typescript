/**
 * Header Component, returns a header element with the title and nav menu inside it
 */

import "./Header.scss";
import { scaleRotate as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";
import { GrClose } from "react-icons/gr";

const Header = () => {

    return(
        <header className="header">

            <p>TypeScript App</p>

            <Menu customBurgerIcon={ <img src="../assets/burger-menu.svg" alt="burger-icon"/> }>
                <button>
                    <GrClose/>
                </button>
            </Menu>

            <NavLink to="/">
                <p>View Todo's</p>
            </NavLink>

            <NavLink to="/add-todo">
                <p>Add Todo</p>
            </NavLink>
        </header>
    );
};

export default Header;