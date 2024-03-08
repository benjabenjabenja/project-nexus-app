/* eslint-disable react-refresh/only-export-components */
import {
    RouterProvider,
    createBrowserRouter
} from "react-router-dom";
import Layout from "./compnents/layout.jsx";
import GestionProjectos from "./pages/gestion-projectos.page.jsx";
import { loader } from "./compnents/sidebar.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        loader,
        children: [
            {
                path: "/projects",
                element: <GestionProjectos />,
            },
        ],
    },
]);

function Router() {
    return (<RouterProvider router={router} />);
}
export default Router;
