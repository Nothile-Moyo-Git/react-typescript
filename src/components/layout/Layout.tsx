/**
 * Layout component. Wraps the header and the content and the navigation menu
 */

import { ReactNode } from "react";
import Header from "../header/Header";

interface ComponentProps {
    children: ReactNode;
}

const Layout = ({ children } : ComponentProps) => {

    return(
        <main>
            <Header/>
            {children}
        </main>
    );
};

export default Layout;