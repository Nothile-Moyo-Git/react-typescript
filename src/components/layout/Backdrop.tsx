/**
 * Backdrop component, creates a dark outer background for the component
 * Stays fixed in place for scrolling
 * 
 * @returns Backdrop : JSX
 */

import "./Backdrop.scss";
import React from "react";

const Backdrop : React.FC = () => {

    return(
        <span aria-hidden="true" className="backdrop">
        </span>
    );
};

export default Backdrop;