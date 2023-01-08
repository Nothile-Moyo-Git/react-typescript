/**
 * NavMenu component, contains the burger menu icon
 * This has to be absolutely positioned due to a limitation with the package
 * It unfortunately does not work if you have a header in place
 * 
 * It uses the react-burger-menu package
 * 
 * @returns NavMenu : FunctionComponent
 */

import { useState } from "react";
import { scaleRotate as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import BurgerIcon from '../assets/burger-menu.svg';
import './NavMenu.scss';

interface MenuState {
    isOpen : boolean
};

const NavMenu = () => {

    // Menu state
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    // Toggle Icon handler, shows or hides the burger menu icon whether the menu is open or not
    const toggleMenuHandler = (state : MenuState) => {
        setIsMenuOpen(state.isOpen);
    };

    // Custom close menu handler
    const closeMenuHandler = () => {
        setIsMenuOpen(false);
    }

    return(      
        <Menu 
            customBurgerIcon={ isMenuOpen ? false : <img src={BurgerIcon} alt="burger-icon" /> }
            width={ "300px" }
            pageWrapId={ "page-wrap" }
            outerContainerId={ "outer-container" }
            onStateChange={ toggleMenuHandler }
            isOpen={ isMenuOpen }
            onClose={ closeMenuHandler }
        >
            <button onClick={ closeMenuHandler} className="menu__close">
                <GrClose/>
            </button>

            <NavLink to="/" exact={true} className="menu__link">
                <p>View Todo's</p>
            </NavLink>

            <NavLink to="/add-todo" exact={true} className="menu__link">
                <p>Add Todo</p>
            </NavLink>
        </Menu>
    );
};

export default NavMenu;