import {useEffect} from "react";
import {Outlet, useLocation} from "react-router-dom";

/**
 * Scrolls to top of page when route changes
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function ScrollRoute() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return <Outlet/>;
}