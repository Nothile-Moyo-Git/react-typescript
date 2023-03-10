/**
 * Loading spinner component.
 * Is used to make the api request process feel smother and it also attached to a suspense on the main App component
 * 
 * @returns LoadingSpinner : JSX
 */

import './LoadingSpinner.scss';

const LoadingSpinner = () => {

    return(
        <div className="loading-spinner">
            <span className="loading-spinner__icon"></span>
            <p className="loading-spinner__text">Loading, please wait...</p>
        </div>
    );
};

export default LoadingSpinner;