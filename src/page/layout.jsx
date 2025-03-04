import {Outlet} from "react-router-dom";

export default function Layout() {
    return (
        <div>

            <body>
            <h2>test</h2>
            <Outlet/>
            </body>
        </div>
    )
}