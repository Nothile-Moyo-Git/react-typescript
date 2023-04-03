/**
 * Bubbles component
 * This component is a list of divs which rise and pop like a bubble
 * This component is hidden from screen readers for accessibility
 * You can find inspiration for this component here: https://codepen.io/diyorbek0309/pen/mdwbEve
*/

import "./Bubbles.scss";

// Bubbles component
const Bubbles = () => {

    return(
        <section className="bubbles" aria-hidden="true">
            <div className="bubbles__bubble"><span className="bubbles__dot"/></div>
            <div className="bubbles__bubble"><span className="bubbles__dot"/></div>
            <div className="bubbles__bubble"><span className="bubbles__dot"/></div>
            <div className="bubbles__bubble"><span className="bubbles__dot"/></div>
            <div className="bubbles__bubble"><span className="bubbles__dot"/></div>
            <div className="bubbles__bubble"><span className="bubbles__dot"/></div>
            <div className="bubbles__bubble"><span className="bubbles__dot"/></div>
            <div className="bubbles__bubble"><span className="bubbles__dot"/></div>
            <div className="bubbles__bubble"><span className="bubbles__dot"/></div>
            <div className="bubbles__bubble"><span className="bubbles__dot"/></div>
            <div className="bubbles__bubble"><span className="bubbles__dot"/></div>
            <div className="bubbles__bubble"><span className="bubbles__dot"/></div>
            <div className="bubbles__bubble"><span className="bubbles__dot"/></div>
            <div className="bubbles__bubble"><span className="bubbles__dot"/></div>
            <div className="bubbles__bubble"><span className="bubbles__dot"/></div>
        </section>
    );
}

export default Bubbles;