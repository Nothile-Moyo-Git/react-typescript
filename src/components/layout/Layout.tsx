/**
 * Layout component. Wraps the header and the content and the navigation menu
 */

import './Layout.scss';
import { ReactNode } from "react";
import Header from "../header/Header";
import Backdrop from './Backdrop';

interface ComponentProps {
    children: ReactNode;
}

const Layout = ({ children } : ComponentProps) => {

    return(
        <main className="layout" id="page-wrap">
            <Header/>
            <Backdrop/>
            <div>
                {children}
            </div>
        </main>
    );
};

export default Layout;