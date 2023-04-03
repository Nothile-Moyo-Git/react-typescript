/**
 * Backdrop component, creates a dark outer background for the component
 * Stays fixed in place for scrolling
 * 
 * @returns Backdrop : PureComponent
 */

import "./Backdrop.scss";
import Bubbles from "./Bubbles";

const Backdrop = () => {

    return(
        <div aria-hidden="true" className="backdrop">
            <Bubbles/>
        </div>
    );
};

export default Backdrop;