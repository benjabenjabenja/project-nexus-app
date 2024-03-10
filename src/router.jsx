/* eslint-disable react-refresh/only-export-components */
import {
    RouterProvider,
    createBrowserRouter
} from "react-router-dom";
import Layout, { loader as loaderRoutes} from "./compnents/layout.jsx";
import GestionProjectos from "./pages/projects/gestion-projectos.page.jsx";
import Home, { loader as loaderProjects } from "./pages/home.jsx";
import CreateProject from "./pages/projects/create-project.jsx";
import { action as createProjectAction } from './pages/projects/create-project.jsx'

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
                        path: '/projects/create-project',
                        element: <CreateProject />,
                        action: createProjectAction
                    }
                ]
            },
            /* debeode  pasar al childfren de proyecto pero no pude hacerlo andar */
            /* {
                path: '/projects/create-project',
                element: <CreateProject />

            }, */
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
