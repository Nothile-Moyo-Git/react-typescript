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

const Layout : React.FC<ComponentProps> = ({ children }) => {

    return(
        <main className="layout" id="page-wrap">
            <Header/>
            <Backdrop/>
            <section className="layout__content">
                {children}
            </section>
        </main>
    );
};

export default Layout;