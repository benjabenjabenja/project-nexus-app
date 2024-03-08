/* eslint-disable react-refresh/only-export-components */
import {
    RouterProvider,
    createBrowserRouter
} from "react-router-dom";
import Layout, { loader as loaderRoutes} from "./compnents/layout.jsx";
import GestionProjectos from "./pages/gestion-projectos.page.jsx";
import Home, { loader as loaderProjects } from "./pages/home.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        loader: loaderRoutes,
        children: [
            {
                path: "/home",
                element: <Home />,
                loader: loaderProjects,
            },
            {
                path: "/projects",
                element: <GestionProjectos />,
                children: [
                    {
                        path: '/projects/project/:id',

                    }
                ]
            },
            {
                path: "/tasks",
                element: <GestionProjectos />,
            },
            {
                path: "/control-panel",
                element: <GestionProjectos />,
            },
        ],
    },
]);

function Router() {
    return (<RouterProvider router={router} />);
}
export default Router;
