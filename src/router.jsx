/* eslint-disable react-refresh/only-export-components */
import {
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import AuthLayout from "./layouts/auth.layout"; 
import IndexProjects from "./pages/projects/index-projects.page";
import ProjectsLayout from "./layouts/projects.layout";
import CreateProject, { action as createProjectAction } from './pages/projects/create-project.page';
import Project from './pages/projects/project.page';
import { action as addTaskAction } from './compnents/projects/project-detail';
import EditProject from "./pages/projects/edit-project.page"
import { action as editProjectAction } from './compnents/projects/form-edit-project';
import GestionTasks, { loader as loaderTasks } from "./pages/tasks/gestion-tasks.page";
import LoginPage, { action as loginAction } from "./pages/auth/login.page";
import RegisterPage, { action as registerAction } from "./pages/auth/register.page";
import ForgotPasswordPage, { action as forgotPasswordAction } from "./pages/auth/forgot-password.page";
import NewPasswordPage, { action as newPasswordAction } from "./pages/auth/new-password.page";
import ConfirmAccountPage from "./pages/auth/confirm-account.page";
import LogoutPage, { loader as logoutLoader } from "./pages/auth/logout.page";
import { AuthProvider } from "./context/AuthProvider";
import RouteProtected from "./layouts/route-protected.layout";

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
                element: <ForgotPasswordPage />,
                action: forgotPasswordAction
            },
            {
                path: "/new-password",
                element: <NewPasswordPage />,
                action: newPasswordAction
            },
            {
                path: "/confirm/:id",
                element: <ConfirmAccountPage />
            },
        ],
    },
    {// se deberian controlar el token de alguna forma
        path: "/projects",
        element: (() => (
            <RouteProtected>
                <ProjectsLayout />
            </RouteProtected>
        ))(),
        children: [
            {
                index: true,
                element: <IndexProjects />
            },
            {
                path: '/projects/create-project',
                element: <CreateProject />,
                action: createProjectAction,
            },
            {
                path: '/projects/:projectId',
                element: <Project />,
                action: addTaskAction
            },
            {
                path: "/projects/:projectId/edit",
                element: <EditProject />,
                action: editProjectAction
            },
            {
                path: "/projects/:projectId/tasks",
                element: <GestionTasks />,
                loader: loaderTasks
            }
        ]
    },
    {
        path: "/logout",
        element: <LogoutPage />,
        loader: logoutLoader
    }
]);

function Router() {
    return (
        <AuthProvider>
            <RouterProvider router={routes} />
        </AuthProvider>
    );
}

export default Router;
