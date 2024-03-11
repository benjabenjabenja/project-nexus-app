/* eslint-disable react-refresh/only-export-components */
import {
    RouterProvider,
    createBrowserRouter
} from "react-router-dom";
import Layout, { loader as loaderRoutes} from "./compnents/layout.jsx";
import GestionProjectos, { loader as loaderProjectsData } from "./pages/projects/gestion-projectos.page.jsx";
import Home, { loader as loaderProjects } from "./pages/home.jsx";
import CreateProject from "./pages/projects/create-project.jsx";
import { action as createProjectAction } from './pages/projects/create-project.jsx';
import Project, { loader as projectLoader } from './compnents/projects/project.jsx';
import EditProject from "./pages/projects/edit-project.jsx";

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
                loader: loaderProjectsData,
                children: [
                    {
                        path: '/projects/create-project',
                        element: <CreateProject />,
                        action: createProjectAction,
                    },
                    {
                        path: '/projects/:id',
                        element: <Project />,
                        loader: projectLoader
                    },
                    {
                        path: "/projects/:id/edit",
                        element: <EditProject />,
                        loader: projectLoader
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
