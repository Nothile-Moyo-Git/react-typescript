/**
 * Backdrop component, creates a dark outer background for the component
 * Stays fixed in place for scrolling
 * 
 * @returns Backdrop : PureComponent
 */

import "./Backdrop.scss";

const Backdrop = () => {

    return(
        <div aria-hidden="true" className="backdrop"/>
    );
};

export default Backdrop;