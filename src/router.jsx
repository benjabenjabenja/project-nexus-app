/* eslint-disable react-refresh/only-export-components */
import {
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import GestionProjectos, { loader as loaderProjectsData } from "./pages/projects/gestion-projectos";
import Layout, { loader as loaderMenu } from "./compnents/layout";
import CreateProject from "./pages/projects/create-project";
import { action as createProjectAction } from './pages/projects/create-project';
import Project, { loader as projectLoader } from './compnents/projects/project';
import EditProject from "./pages/projects/edit-project";
import { action as editProjectAction } from "./compnents/projects/form-edit-project"
import GestionTasks, { loader as loaderTasks } from "./pages/tasks/gestion-tasks";
import Home, { loader as loaderProjects } from "./pages/home";
import AuthLayout from "./layouts/auth.layout"; 
import LoginPage, { action as loginAction } from "./pages/auth/login.page";
import RegisterPage, { action as registerAction } from "./pages/auth/register.page";
import ForgotPasswordPage from "./pages/auth/forgot-password.page";
import NewPasswordPage from "./pages/auth/new-password.page";
import ConfirmAccountPage from "./pages/auth/confirm-account.page";
import LogoutPage, { loader as logoutLoader } from "./pages/auth/logout.page";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <LoginPage />,
                action: loginAction,
            },
            {
                path: "/login",
                element: <LoginPage />,
                action: loginAction,
            },
            {
                path: "/register",
                element: <RegisterPage />,
                action: registerAction
            },
            {
                path: "/forgot-password",
                element: <ForgotPasswordPage />
            },
            {
                path: "/new-password",
                element: <NewPasswordPage />
            },
            {
                path: "/confirm/:id",
                element: <ConfirmAccountPage />
            },
        ],
    },
    {// se deberian controlar el token de alguna forma
        path: "/home",
        element: <Layout />,
        loader: loaderMenu,
        children: [
            {
                index: true,
                element: <Home />,
                loader: loaderProjects
            },
            {
                path: "/home/projects",
                element: <GestionProjectos />,
                loader: loaderProjectsData,
                children: [
                    {
                        path: '/home/projects/create-project',
                        element: <CreateProject />,
                        action: createProjectAction,
                    },
                    {
                        path: '/home/projects/:id',
                        element: <Project />,
                        loader: projectLoader
                    },
                    {
                        path: "/home/projects/:id/edit",
                        element: <EditProject />,
                        loader: projectLoader,
                        action: editProjectAction
                    },
                    {
                        path: "/home/projects/tasks",
                        element: <GestionTasks />,
                        loader: loaderTasks
                    },
                    {
                        path: "/home/projects/control-panel",
                        element: <GestionProjectos />,
                        loader: loaderProjectsData
                    },
                ]
            },
        ]
    },
    {
        path: "/logout",
        element: <LogoutPage />,
        loader: logoutLoader
    }
]);

function Router() {
    return (<RouterProvider router={routes} />);
}
export default Router;
