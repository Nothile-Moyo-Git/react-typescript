/**
 * Layout component. Wraps the header and the content and the navigation menu
 * This is to allow me to have a backdrop of the app, but also wraps the content so that we can use react-menu's slide out effect
 * 
 * @returns Layout : PureComponent
 */

import './Layout.scss';
import React, { ReactNode } from "react";
import Header from "../header/Header";
import Backdrop from './Backdrop';
import Bubbles from './Bubbles';

interface ComponentProps {
    children: ReactNode;
}

const Layout = ({ children } : ComponentProps) => {

    return(
        <main className="layout" id="page-wrap">
            <Header/>
            <Backdrop/>
            <Bubbles/>
            <section className="layout__content">
                {children}
            </section>
        </main>
    );
};

export default React.memo(Layout);